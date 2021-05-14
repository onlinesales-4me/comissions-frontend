import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    Link
} from "react-router-dom";
import ReactWhatsapp from 'react-whatsapp';
import publicIp from 'public-ip';
import HTMLReactParser from 'html-react-parser';

import Gallery from '../Components/Gallery';
import useWindowDimensions from '../Utils/useWindowDimensions';

import registriesService from '../api/registries';
import fillTemplates from '../api/fillTemplates';

const Home = ({loggedIn, templates, setSelectedTemplate, setSelectedProduct, getTemplates}) => {

    useEffect(() => {
        /* axios.post('http://localhost:8000/users/create', {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        }) */
        getTemplates();
    }, []);

    const { height, width } = useWindowDimensions();

    const [showGallery, setShowGallery] = useState(false);

    const deactivateProduct = async (template, templateObject) => {
        let templateContainer = {
            template: template,
            templateObject: templateObject
        }
        await fillTemplates.put('/', templateContainer)
        .then(function (response) {
            console.log("response.data", response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const saveRegistry = async (templateObject) => {
        let ip = await publicIp.v4();
        let description = 'IP: '+ip+' presiono contactar para producto: '+templateObject.officialName;
        let registry = {
            ip: ip,
            description: description,
            date: new Date()
        };
        await registriesService.post('/', registry)
        .then(function (response) {
            console.log("response.data", response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const viewDetail = async (template, templateObject) => {
        setSelectedTemplate(template);
        setSelectedProduct(templateObject);
    }

    return (
        <div className="home-container">
            {
                templates.map((template, templateIndex) => {
                    return  <span style={{height: '100%'}} key={template.id}>
                        {
                            template.values.map((product, productIndex) => {
                                return  <div style={{height: '100%', width: '100%', display: 'inline-block'}} key={template.id+''+product.id}>
                                            <div style={{height: '100%', width: '3%', left: (width<=800?'-5%':width<=500?'-5%':'0%'), position: 'relative', display: 'inline-block', verticalAlign: 'top'}}>
                                                <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center'}}>
                                                    <p style={{transformOrigin: '0 0', transform: 'rotate(-90deg)', color: '#010033', fontSize: '1.3em', margin: '0'}}>{product.officialName}</p>
                                                </div>
                                            </div>
                                            <div style={{height: '100%', width: '70%', display: 'inline-block', verticalAlign: 'top'}}>
                                                <img onClick={() => setShowGallery(true)} src={product.officialCover} className="on-hover" style={{height: '100%', width: '100%', objectFit: 'cover'}}/>
                                            </div>
                                            <div style={{height: '100%', display: 'inline-block', verticalAlign: 'top', width: (width<=800?'60%':width<=500?'50%':'30%'), left: (width<=800?'-40%':width<=500?'-30%':'-7%'), position: 'relative'}}>
                                                <div className="flex-justify-align" style={{height: '100%', width: '100%'}}>
                                                    <div style={{height: '90%', width: '100%', backgroundColor: 'rgba(0,0,0,0.6)'}}>
                                                        {
                                                            loggedIn
                                                            ?   <div style={{width: '100%'}}>
                                                                    <div style={{float: 'right', paddingRight: '5%', paddingTop: '5%'}}>
                                                                        <button onClick={() => deactivateProduct(template, product)}>DESACTIVAR</button>
                                                                    </div>
                                                                </div>
                                                            :   null
                                                        }
                                                        <div style={{height: (loggedIn?'90%':'100%'), width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                            <div style={{maxHeight: '90%', width: '90%', overflowY: 'auto'}}>
                                                                {
                                                                    template.fields.map((productField, productFieldIndex) => {
                                                                        if(productField.showcover) {
                                                                            if(productField.object.localeCompare('text') === 0 || productField.object.localeCompare('number') === 0 || productField.object.localeCompare('decimal') === 0) {
                                                                                return  <div className="form-group" key={template.id+''+product.id+''+productField.id}>
                                                                                            <div className="col-50" style={{color: 'white'}}> <span style={{fontWeight: 'bold'}}> {productField.name}: </span> {product[productField.name.toLowerCase()]} </div>
                                                                                            <br/>
                                                                                        </div>
                                                                            } else if(productField.object.localeCompare('description') === 0) {
                                                                                return <div className="form-group" key={productField.id}>
                                                                                            <div className="flex-justify-align" style={{width: '100%', wordBreak: 'break-all'}}>
                                                                                                {HTMLReactParser(product[productField.name.toLowerCase()])}
                                                                                            </div>
                                                                                        </div>
                                                                            } else if(productField.object.localeCompare('phone_number') === 0) {
                                                                                return  <div style={{width: '100%', display: 'flex', justifyContent: 'center', margin: '3% 0'}} key={template.id+''+product.id+''+productField.id}>
                                                                                            <div className="on-hover flex-justify-align" onClick={() => saveRegistry(product)} style={{height: '4em', width: '90%'}}>
                                                                                                <ReactWhatsapp number={product[productField.name.toLowerCase()].phone} message={product[productField.name.toLowerCase()].message} style={{height: '100%', width: '100%', border: '2px solid black'}}>
                                                                                                    CONTACTANOS
                                                                                                </ReactWhatsapp>
                                                                                            </div>
                                                                                            <br/>
                                                                                        </div>
                                                                            } else {
                                                                                return null;
                                                                            }
                                                                        }
                                                                    })
                                                                }
                                                                <br/>
                                                                <div className="flex-justify-align">
                                                                    <div className="on-hover flex-justify-align" onClick={() => viewDetail(template, product)} style={{height: '4em', width: '90%', marginTop: '1%', border: '2px solid black', backgroundColor: 'white'}}>
                                                                        <Link to="/view">
                                                                            <p style={{color: 'black'}}>VER MÁS DETALLES</p>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                                <br/><br/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>;
                            })
                        }
                    </span>
                })
            }
            <Gallery showGallery={showGallery} setShowGallery={setShowGallery}/>
        </div>
    );
}

export default Home;