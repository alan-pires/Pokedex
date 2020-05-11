import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'

const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
};

function Pokemon() {

    const [name, setName] = useState('')
    const [pokeIndex, setPokeIndex] = useState('')
    const [imagemUrl, setImagemUrl] = useState('')
    const [types, setTypes] = useState([])
    const [description, setDescription] = useState('')
    const [stats, setStats] = useState({
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        specialAttack: "",
        specialDefense: ""
    })
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")
    const [eggGroup, setEggGroup] = useState("")
    const [abilities, setAbilities] = useState("")



    const { pokemonIndex } = useParams()

    useEffect(async () => {

        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`

        //get pokemon information
        const pokemonResponse = await axios.get(pokemonUrl)

        const name = pokemonResponse.data.name;
        const imageUrl = pokemonResponse.data.sprites.front_default
        //const imageUrl = `https://projectpokemon.org/images/normal-sprite/${name}.gif`;

        let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

        pokemonResponse.data.stats.map(stat => {
            switch (stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;
                case 'defense':
                    defense = stat['base_stat'];
                    break;
                case 'speed':
                    speed = stat['base_stat'];
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat'];
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat'];
                    break;
            }
        })

        const height = pokemonResponse.data.height
        const weight = pokemonResponse.data.weight
        const types = pokemonResponse.data.types.map(type => type.type.name)
        const abilities = pokemonResponse.data.abilities.map(ability =>{            
        return ability.ability.name
        .toLowerCase()
        .split('-')
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
        }).join(', ');

        await axios.get(pokemonSpeciesUrl).then(response => {
            let description = '';
            response.data.flavor_text_entries.some(flavor => {
                if (flavor.language.name === 'en') {
                    description = flavor.flavor_text;
                    return description
                }
            })

            const eggGroups = response.data['egg_groups'].map(group => {
                return group.name.toLowerCase()
                    .split(' ')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ')
            }).join(", ")

            setDescription(description)
            setEggGroup(eggGroups)
            setImagemUrl(imageUrl)
            setPokeIndex(pokemonIndex)
            setName(name)
            setTypes(types)
            setStats({
                hp,
                attack,
                defense,
                speed,
                specialAttack,
                specialDefense
            })
            setHeight(height)
            setWeight(weight)
            setAbilities(abilities)


        })

    }, [])

    return (
        <div className="col">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-5">
                            <h5>{pokeIndex}</h5>
                        </div>
                        <div className="col-7">
                            <div className="float-right">
                                {types.map(type => (
                                    <span key={type}
                                        className="badge badge-primary badge-pill mr-1"
                                        style={{
                                            backgroundColor: `#${TYPE_COLORS[type]}`,
                                            color: 'white'
                                        }}
                                    >{type}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <img
                                src={imagemUrl}
                                className="card-img-top rounded mx-auto mt-2"
                            />
                        </div>
                        <div className="col-md-9">
                            <h4 className="mx-auto">{name.toLowerCase()
                                .split(" ")
                                .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                                )
                                .join(' ')}
                            </h4>
                            <div className="row align-items-center">
                                <div className="col-12 col-md-3">
                                    HP
                                </div>
                                <div className="col-12 col-md-9">
                                    <div className="progress">
                                        <div
                                            className="progress-bar"
                                            role="progressBar"
                                            style={{
                                                width: `${stats.hp}%`
                                            }}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            <small>{stats.hp}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-12 col-md-3">
                                    Attack
                                </div>
                                <div className="col-12 col-md-9">
                                    <div className="progress">
                                        <div className="progress-bar"
                                            role="progressBar"
                                            style={{
                                                width: `${stats.attack}%`
                                            }}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            <small>{stats.attack}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-12 col-md-3">Defense</div>
                                <div className="col-12 col-md-9">
                                    <div className="progress">
                                        <div className="progress-bar"
                                            role="progressBar"
                                            style={{
                                                width: `${stats.defense}%`
                                            }}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            <small>{stats.defense}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-12 col-md-3">Special Attack</div>
                                <div className="col-12 col-md-9">
                                    <div className="progress">
                                        <div className="progress-bar"
                                            role="progressBar"
                                            style={{
                                                width: `${stats.specialAttack}%`
                                            }}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            <small>{stats.specialAttack}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-12 col-md-3">Special Defense</div>
                                <div className="col-12 col-md-9">
                                    <div className="progress">
                                        <div className="progress-bar"
                                            role="progressBar"
                                            style={{
                                                width: `${stats.specialDefense}%`
                                            }}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            <small>{stats.specialDefense}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-12 col-md-3">
                                    Speed
                                </div>
                                <div className="col-12 col-md-9">
                                    <div className="progress">
                                        <div
                                            className="progress-bar"
                                            role="progressBar"
                                            style={{
                                                width: `${stats.speed}%`
                                            }}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            <small>{stats.speed}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col ">
                                <p className="pl-5">{description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="card-body">
                    <h5 className="card-title text-center">Profile</h5>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6 className="float-right">Height: </h6>
                                </div>
                                        <div className="col-md-6"><h6 className="float-lef">{height} mts</h6></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6 className="float-right">Weight: </h6>
                                </div>
                                        <div className="col-md-6"><h6 className="float-lef">{weight} kgs</h6></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6 className="float-right">Abilities: </h6>
                                </div>
                                        <div className="col-md-6"><h6 className="float-lef">{abilities}</h6></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6 className="float-right">Egg group: </h6>
                                </div>
                                        <div className="col-md-6"><h6 className="float-lef">{eggGroup} </h6>
                                </div>
                            </div>
                        </div>
                    </div>                   
                </div>
                <div className="card-footer text-muted pt-3 pl-5">
                        Data from{' '}
                        <a
                         href="https://pokeapi.co"
                         target="_blank"
                         className="card-link"
                         >
                             PokeAPI.co
                         </a>
                    </div>
            </div>
        </div>

    )
}

export default Pokemon
