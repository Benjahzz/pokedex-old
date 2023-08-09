import React from "react";
import { useState, useEffect } from "react";
import "../scss/layout/Card.scss";
import { searchPokemon } from "../api";
import UseAnimations from "react-useanimations";
import loadingIcon from 'react-useanimations/lib/loading'
import {useNavigate} from "react-router-dom";
export const CardPokemonItemView = ({ pokemon, onLoading, buscarPokemon }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



  const getPokemon = async () => {
    try {
      const data = await searchPokemon(pokemon.name);
      setPokemonData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPokemon();
    


  }, []);
  const onCLickCard = () => {
    onLoading(true)
    buscarPokemon(pokemon.name);
    navigate("/pokemon/" + pokemon.name);
  }
  return (
    <div className="cardPokemonItem" onClick={onCLickCard}>
      <div className="cardPokemonItem__header">
        <div className="cardPokemonItem__number">
          #{!loading ? pokemonData.id : "cargando"}
        </div>
        <div className="cardPokemonItem__header__image">
          {
            !loading ? <img src={pokemonData.sprites.front_default} alt=""/> : <UseAnimations animation={loadingIcon} className='loading-iconPokemon' />
          }
          
        </div>
      </div>
      <div className="cardPokemonItem__body">
        <div className="cardPokemonItem__body__name">
          {!loading ? (pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)) : "cargando"}
        </div>
        <div className="cardPokemonItem__body__type__container">
          {!loading
            ? pokemonData.types.map((type) => {
                return (
                  <img
                    className="cardPokemonItem__body__type"
                    src={require(`../images/Pokemon${switchTipoEnglish(
                      type.type.name
                    )}.png`)}
                  />
                );
              })
            : "cargando"}
        </div>
      </div>
      <div className="cardPokemonItem__footer">
        <div className="cardPokemonItem__footer__weight">
          <span>Peso</span>
          <div>{!loading ? pokemonData.weight : "cargando"}</div>
        </div>
        <div className="cardPokemonItem__footer__height">
          <span>Altura</span>
          <div >{!loading ? pokemonData.height : "cargando"}</div>
        </div>
      </div>
    </div>
  );
};

function switchTipoEnglish(tipo) {
  switch (tipo) {
    case "normal":
      return "Normal";
    case "fighting":
      return "Lucha";
    case "flying":
      return "Volador";
    case "poison":
      return "Veneno";
    case "ground":
      return "Tierra";
    case "rock":
      return "Roca";
    case "bug":
      return "Bicho";
    case "ghost":
      return "Fantasma";
    case "steel":
      return "Acero";
    case "fire":
      return "Fuego";
    case "water":
      return "Agua";
    case "grass":
      return "Planta";
    case "electric":
      return "Electrico";
    case "psychic":
      return "Psiquico";
    case "ice":
      return "Hielo";
    case "dragon":
      return "Dragon";
    case "dark":
      return "Siniestro";
    case "fairy":
      return "Hada";
    default:
      return "Desconocido";
  }
}
