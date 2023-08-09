import React from "react";
import { useState, useEffect } from "react";
import "./App.scss";
import { SideBarMenu } from "./components/SideBarMenu";
import { MenuBar } from "./components/MenuBar";
import { CardPokemonItemView } from "./components/CardPokemonItemView";
import { v4 as uuidv4 } from "uuid";
import { getAllPokemon } from "./api";
import { searchPokemon } from "./api";
import { Route, Routes, useNavigate, useLocation  } from "react-router-dom";
import { Pokemon } from "./components/Pokemon";
import loadingIcon from 'react-useanimations/lib/loading'
import UseAnimations from "react-useanimations";


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const count = 8;
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const getPokemon = async () => {
    try {
      const data = await getAllPokemon(count, 1);

      setPokemons(data.results);
      setLoading(false);
    } catch (error) {}
  };
  window.onpopstate = function(event) {
    setLoading(true);
    getPokemon();
  }
  const buscarPokemon = async (nombre) => {
    try {
      const data = await searchPokemon(nombre.toLowerCase());
      if (data) {
        setPokemons([data]);

        setLoading(false);
      }
    } catch (error) {}
  };

  
  useEffect(() => {
    let nombre = location.pathname.split("/pokemon/")[1];
    if (nombre) {
      buscarPokemon(nombre);
      navigate("/pokemon/" + nombre);
    } else {
      getPokemon();
    }
  }, []);

  const onSubmitInput = (nombre) => {
    setLoading(true)
    buscarPokemon(nombre);
    navigate("/pokemon/" + nombre);

  };

  return (
    <div className="App">
      <SideBarMenu />
      <div className="rightContent">
        <MenuBar onSubmit={onSubmitInput} />

        <Routes>
          <Route
            path="/"
            element={
              <div className="container container-cards">
                {!loading
                  ? pokemons.map((pokemon) => {
                      return (
                        <CardPokemonItemView
                          key={uuidv4()}
                          pokemon={pokemon}
                          onLoading={setLoading}
                          buscarPokemon={buscarPokemon}
                        />
                      );
                    })
                  : " ooooo"}
              </div>
            }
          />
          <Route
            path="/pokemon/:id"
            element={
              !loading ? (
                <Pokemon pokemonData={pokemons} onLoading={setLoading} />
              ) : (
                <UseAnimations animation={loadingIcon}/>
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
