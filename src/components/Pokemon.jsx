import React from "react";
import { useState, useEffect } from "react";
import UseAnimations from "react-useanimations";
import loadingIcon from "react-useanimations/lib/loading";
import { searchPokemon, searchTypesMoves } from "../api";
import "../scss/layout/Pokemon.scss";

export const Pokemon = ({ pokemonData, onLoading }) => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shiny, setShiny] = useState(false);

  const getPokemon = async () => {
    try {
      const dataPokemon = await searchPokemon(pokemonData[0].name);

      setPokemon(dataPokemon);

      onLoading(false);
      setLoading(false);
    } catch (error) {
      console.log("aaa");
    }
  };
  useEffect(() => {
    getPokemon();
  }, []);
  const handleShiny = () => {
    setShiny(!shiny);
  };
  return (
    <div className="containerPokemon container">
      <div className="containerPokemon__infoPersonal">
        <div className="containerPokemon__infoPersonal__header">
          <div className="containerPokemon__infoPersonal__header__number">
            #{!loading ? pokemon.id : "cargando"}
          </div>
          <div className="containerPokemon__infoPersonal__header__image">
            {!loading ? (
              shiny ? (
                <img src={pokemon.sprites.front_shiny} alt="pokemon" />
              ) : (
                <img src={pokemon.sprites.front_default} alt="pokemon" />
              )
            ) : (
              <UseAnimations
                animation={loadingIcon}
                className="loading-iconPokemon"
              />
            )}
          </div>
          <div className="containerPokemon__infoPersonal__header__iconShiny">
            {!loading ? (
              pokemon.sprites.front_shiny ? (
                <img
                  src={require("../images/shinyIcon.png")}
                  alt=""
                  onClick={handleShiny}
                />
              ) : null
            ) : null}
          </div>
        </div>
        <div className="containerPokemon__infoPersonal__info">
          <div className="containerPokemon__infoPersonal__info__name">
            {!loading
              ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
              : "cargando"}
          </div>
          <div className="containerPokemon__infoPersonal__info__type">
            {!loading
              ? pokemon.types.map((type) => {
                  return (
                    <img
                      className="containerPokemon__infoPersonal__info__type__image"
                      src={require(`../images/Pokemon${switchTipoEnglish(
                        type.type.name
                      )}.png`)}
                    />
                  );
                })
              : null}
          </div>
          <div className="containerPokemon__infoPersonal__info__footer">
            <div className="containerPokemon__infoPersonal__info__footer__height">
              <span>Altura</span>
              <div>{!loading ? pokemon.height : "cargando"}</div>
            </div>
            <div className="barSeparator"></div>
            <div className="containerPokemon__infoPersonal__info__footer__weight">
              <span>Peso</span>
              <div>{!loading ? pokemon.weight : "cargando"}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="containerPokemon__stats">
        <div className="containerPokemon__stats__stat">
          <span className="containerPokemon__stats__stat__HP ">HP</span>
          <div className="containerPokemon__stats__stat__amount stat__HP">
            {!loading ? pokemon.stats[0].base_stat : "cargando"}
          </div>
        </div>
        <div className="containerPokemon__stats__stat">
          <span className="containerPokemon__stats__stat__ATK ">ATK</span>
          <div className="containerPokemon__stats__stat__amount stat__ATK">
            {!loading ? pokemon.stats[1].base_stat : "cargando"}
          </div>
        </div>
        <div className="containerPokemon__stats__stat">
          <span className="containerPokemon__stats__stat__DEF ">DEF</span>
          <div className="containerPokemon__stats__stat__amount stat__DEF">
            {!loading ? pokemon.stats[2].base_stat : "cargando"}
          </div>
        </div>
        <div className="containerPokemon__stats__stat">
          <span className="containerPokemon__stats__stat__SPATK ">SPATK</span>
          <div className="containerPokemon__stats__stat__amount stat__SPATK">
            {!loading ? pokemon.stats[3].base_stat : "cargando"}
          </div>
        </div>
        <div className="containerPokemon__stats__stat">
          <span className="containerPokemon__stats__stat__SPDEF ">SPDEF</span>
          <div className="containerPokemon__stats__stat__amount stat__SPDEF">
            {!loading ? pokemon.stats[4].base_stat : "cargando"}
          </div>
        </div>
        <div className="containerPokemon__stats__stat">
          <span className="containerPokemon__stats__stat__SPD ">SPD</span>
          <div className="containerPokemon__stats__stat__amount stat__SPD">
            {!loading ? pokemon.stats[5].base_stat : "cargando"}
          </div>
        </div>
      </div>
      <div className="containerPokemon__moves">
          {!loading
            ? pokemon.moves.map((move) => {
                return (
                  <div className="containerPokemon__moves__move">
                    <div className="containerPokemon__moves__move__name">
                      {move.move.name}
                    </div>
                    <div className="containerPokemon__moves__move__type">
                      {!loading ? move.move.type : "ca"}
                    </div>
                  </div>
                );
              })
            : ""}
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
