import React from "react";
import { useState } from "react";
import '../scss/layout/MenuBar.scss';
import {BsSearch} from "react-icons/bs";
import {FiAlertCircle} from "react-icons/fi";

import PropTypes from 'prop-types';

export const MenuBar = ({onSubmit}) => {
  const [search, setSearch] = useState('');
  const {alert, setAlert} = useState(false);
  const handleChange = (e) => {

    setSearch(e.target.value);
    if(e.target.value == ""){
      console.log("aaa")
      setAlert(true)
    }
  }
  const enviarSearch = () => {
    
    onSubmit(search);
    
  }
  return (
    <div className="menuBar">
      <div className="menuBar__logo">
        <input type="text" placeholder="Buscar pokemon" className="menuBar__input" onChange={handleChange}/>
        {
          alert ? <FiAlertCircle className="menuBar__icon"/> : null
        }
        <BsSearch className="icon-searchHeader" onClick={enviarSearch}/>
      </div>
    </div>
  );
};
