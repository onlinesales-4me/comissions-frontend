import React, {useState} from 'react';
import {
    Link
} from "react-router-dom";

import useWindowDimensions from '../Utils/useWindowDimensions';
import Search from '../Screens/Search';

const NavBar = ({loggedIn, goHome, logoff, templates, setTemplates}) => {

    const [showNavMenu, setShowNavMenu] = useState(false);
    const { height, width } = useWindowDimensions();

    const [showSearchModal, setShowSearchModal] = useState(false);

    return (
        <nav className="navbar padding-inside-box">
            <Link to="/">
                <div className="navbar-logo-container">
                    <div className="navbar-logo on-hover" onClick={goHome}>
                        <p style={{color: '#010033', fontSize: '1.3em'}}>LOGO</p>
                    </div>
                </div>
            </Link>
            {
                loggedIn
                ?   <div className="navbar-menu-button on-hover" style={{display: (width<1330?'none':'')}} onClick={logoff}>
                        <p className="left" style={{color: '#010033', fontSize: '1.3em', margin: '0'}}>CERRAR SESIÓN</p>
                    </div>
                :   null
            }
            {
                loggedIn
                ?   <Link to="/add">
                        <div className="navbar-menu-button on-hover" style={{display: (width<1330?'none':'')}}>
                            <p className="left" style={{color: '#010033', fontSize: '1.3em', margin: '0'}}>AGREGAR PRODUCTO</p>
                        </div>
                    </Link>
                :   null
            }
            {
                loggedIn
                ?   <Link to="/history">
                        <div className="navbar-menu-button on-hover" style={{display: (width<1330?'none':'')}}>
                            <p className="left" style={{color: '#010033', fontSize: '1.3em', margin: '0'}}>HISTORIAL</p>
                        </div>
                    </Link>
                :   null
            }
            {
                loggedIn
                ?   <Link to="/templates">
                        <div className="navbar-menu-button on-hover" style={{display: (width<1330?'none':'')}}>
                            <p className="left" style={{color: '#010033', fontSize: '1.3em', margin: '0'}}>PLANTILLAS</p>
                        </div>
                    </Link>
                :   null
            }
            {
                loggedIn
                ?   <div className="navbar-menu-button on-hover" style={{display: (width<1330?'':'none')}} onClick={() => setShowNavMenu(!showNavMenu)}>
                        <div className="navbar-hamburger-icon-container-container">
                            <div className="navbar-hamburger-icon-container">
                                <div className="navbar-hamburger-icon-tile"></div>
                            </div>
                            <div className="navbar-hamburger-icon-container">
                                <div className="navbar-hamburger-icon-tile"></div>
                            </div>
                            <div className="navbar-hamburger-icon-container">
                                <div className="navbar-hamburger-icon-tile"></div>
                            </div>
                        </div>
                    </div>
                :   null
            }
            <div className="navbar-menu-button on-hover" onClick={() => setShowSearchModal(true)}>
                <p className="left" style={{color: '#010033', fontSize: '1.3em', margin: '0'}}>BUSCAR</p>
            </div>
            { showNavMenu &&    <div className="navbar-menu" style={{width: (width<900?'50%':'')}}>
                                    <Link to="/templates"><p className="on-hover navbar-menu-tile" onClick={() => setShowNavMenu(false)}>PLANTILLAS</p></Link>
                                    <Link to="/history"><p className="on-hover navbar-menu-tile" onClick={() => setShowNavMenu(false)}>HISTORIAL</p></Link>
                                    <Link to="/add"><p className="on-hover navbar-menu-tile" onClick={() => setShowNavMenu(false)}>AGREGAR PRODUCTO</p></Link>
                                    <p className="on-hover navbar-menu-tile" onClick={() => {logoff(); setShowNavMenu(false);}}>CERRAR SESIÓN</p>
                                </div>
            }
            <Search
                templates={templates}
                setTemplates={setTemplates}
                showSearchModal={showSearchModal}
                onCloseSearchModal={setShowSearchModal}
            />
        </nav>
    );
}

export default NavBar;