import React from "react"
import { useState } from "react";
import {AiOutlineMenu} from "react-icons/ai";
import logoPokemon from '../images/logoPokedex.webp';
import {SideBarMenuItemView} from "./SideBarMenuItemView";
import {v4 as uuidv4} from 'uuid';
import {tipos} from '../images/index';


import '../scss/layout/SideBarMenu.scss';



export const SideBarMenu = () => {
    const [isOpen, setIsOpen] = useState(true);
    const handleClick= () => {
        setIsOpen(!isOpen);
    }
    const items = tipos.map((tipo)=>{
        return {
            tipo:tipo,
            icon: tipo.charAt(0).toUpperCase() + tipo.slice(1)

        }
    })
    return(
        <div className={`sideBarMenu ${isOpen ? '' : 'collapsed'}`}>
            <div className="sideBarMenu__header container">
                <div className={`sideBarMenu__Logo ${isOpen? '' : 'd-n'}`}>

                    <img src={logoPokemon} alt="logo" />
                </div>
                <div className="sideBarMenu__hamburguer">
                    <AiOutlineMenu onClick={handleClick} className='sideBarMenu__hamburguer__button'/>
                </div>

            </div>
            <div className={`sideBarMenu__content container ${isOpen ? '' : 'collapsed'}`}>
            {items.map(item => <SideBarMenuItemView key={uuidv4()} item={item} isOpen={isOpen} />)}

                </div>

        </div>
    );

}