import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Sprite = styled.img`
    width: 4em;
    height: 4em;
    `
    const Card = styled.div`
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgb(0, 0, 0, 0.24)
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        &:hover {
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)
        }
       `
       const StyledLink = styled(Link)`
       text-decoration: none;
       color: black;
       &:focus,
       &:visited,
       &:link,
       &:active {
           text-decoration: none;
       }
       ` 

function PokemonCard(props) {
    const [nome, SetNome] = useState('')
    const [imagemUrl, setImagemUrl] = useState('')
    const [pokemonIndex, setPokemonIndex] = useState('')
    //const [imageLoading, setImageLoading] = useState(true)
    //const [tooManyRequests, setTooManyRequests] = useState(false)

    const {name, url} = props
    const pokeIndex = url.split("/")[url.split("/").length - 2]
    const imageUrl = `https://projectpokemon.org/images/normal-sprite/${name}.gif`;
    
    useEffect(() => {
        SetNome(name)
        setImagemUrl(imageUrl)
        setPokemonIndex(pokeIndex)

    }, [])    
    

    return (
        <div className="col-md-3 col-sm-6 mb-5" >
            <StyledLink to={`pokemon/${pokemonIndex}`}>
            <Card className="card">
                <h5 className='card-header'> {pokemonIndex}</h5>
                <Sprite className="card-img-top rounded mx-auto mt-2"
                src={imagemUrl}
                >
                     
                </Sprite>
                
                <div className='card-body mx-auto'>
                <h6 className='card-title'>{nome.toLowerCase()
                .split(" ")
                .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                )
                .join(' ')}
                </h6>
                </div>
            </Card>
            </StyledLink>
        </div>
    )
}

export default PokemonCard
