import React, {useState, useEffect} from 'react'
import axios from 'axios'
import PokemonCard from './PokemonCard'

function PokemonList() {
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/?limit=151')
    const [pokemon, setPokemon] = useState(null)

    useEffect(async () => {        
        const res = await axios.get(url)
        setPokemon(res.data['results'])
    }, [])

     

    return (
        <React.Fragment>
            {pokemon ? (
                <div className="row">
                {pokemon.map(pokemon => (
                  <PokemonCard
                  key={pokemon.name}
                  name= {pokemon.name}
                  url= {pokemon.url}
                  />  
                ))}              
                 </div>
            ): (<h1>Loading Pokemon</h1> )}
        
        </React.Fragment>
    )
}

export default PokemonList
