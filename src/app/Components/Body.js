import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";

import Home from '../Screens/Home';
import TemplatesContainer from './TemplatesContainer';
import Registry from '../Screens/Registry';
import FillTemplate from '../Screens/FillTemplate';
import ViewTemplate from '../Screens/ViewTemplate';
import Login from '../Screens/Login';
import ListGalleryContainer from './ListGallery/ListGalleryContainer';
import GalleryContainer from './Gallery/GalleryContainer';

const Body = ({loggedIn, templates, selectedTemplate, selectedProduct, setSelectedTemplate, setSelectedProduct, getTemplates, setLoggedIn}) => {

    return (
        <Switch>
            <Route exact path="/">
                <Home loggedIn={loggedIn} templates={templates}
                    setSelectedTemplate={setSelectedTemplate}
                    setSelectedProduct={setSelectedProduct}
                    getTemplates={getTemplates}
                />
            </Route>
            <Route path="/history">
                <Registry/>
            </Route>
            <Route path="/templates">
                <TemplatesContainer templates={templates}
                                    getTemplates={getTemplates}
                />
            </Route>
            <Route path="/add">
                <FillTemplate templates={templates} getTemplates={getTemplates}/>
            </Route>
            <Route path="/view">
                <ViewTemplate selectedTemplate={selectedTemplate}
                                selectedProduct={selectedProduct}
                />
            </Route>
            <Route path="/login">
                <Login setLoggedIn={setLoggedIn}/>
            </Route>
            <Route path="*">
                <Home loggedIn={loggedIn} templates={templates}
                    setSelectedTemplate={setSelectedTemplate}
                    setSelectedProduct={setSelectedProduct}
                    getTemplates={getTemplates}
                />
            </Route>
        </Switch>
    );
}

export default Body;