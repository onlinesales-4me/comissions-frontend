import React, {useState, useEffect} from 'react';
import {
    BrowserRouter as Router
} from "react-router-dom";
import Cookies from 'universal-cookie';

import NavBar from './NavBar';
import Body from './Body';

import templatesService from '../api/templates';

const Layout = () => {
    const cookies = new Cookies();

    const [loggedIn, setLoggedIn] = useState(false);
    const [templatesOriginal, setTemplatesOriginal] = useState([]);
    const [templatesFilter, setTemplatesFilter] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState();
    const [selectedProduct, setSelectedProduct] = useState();

    useEffect(() => {
        getTemplates();
    }, []);

    const getTemplates = async () => {
        try {
            console.log('CALLED')
            await templatesService.get('/')
            .then(function (response) {
                console.log('templates', response.data.templates);
                setTemplatesOriginal(response.data.templates);
                setTemplatesFilter(response.data.templates);
            })
            .catch(function (error) {
                console.log(error);
            })
        } catch(err) {
            console.log('err', err)
        }
    }

    const logoff = async () => {
        setLoggedIn(false);
        cookies.remove("jwt");
    }

    return (
        <Router>
            <div className="dashboard-main-wrapper">
                <NavBar loggedIn={loggedIn}
                        templates={templatesOriginal}
                        setTemplates={setTemplatesFilter}
                        logoff={logoff}
                />
                <div className="dashboard-body">
                    <Body userIsAdmin={true} templates={templatesFilter}
                            loggedIn={loggedIn}
                            selectedTemplate={selectedTemplate}
                            setSelectedTemplate={setSelectedTemplate}
                            selectedProduct={selectedProduct}
                            setSelectedProduct={setSelectedProduct}
                            getTemplates={getTemplates}
                            setLoggedIn={setLoggedIn}
                    />
                </div>
            </div>
        </Router>
    );
}

export default Layout;
