import React, {useState, useEffect} from 'react';

import ReactWhatsapp from 'react-whatsapp';
import publicIp from 'public-ip';
import HTMLReactParser from 'html-react-parser';

import registriesService from '../api/registries';

import GalleryContainer from '../Components/Gallery/GalleryContainer';
import ListGalleryContainer from '../Components/ListGallery/ListGalleryContainer';

const ViewTemplate = ({selectedTemplate, selectedProduct}) => {

    const [template, setTemplate] = useState(selectedTemplate);
    const [templateObject, setTemplateObject] = useState(selectedProduct);

    useEffect(() => {
        if(template !== undefined && templateObject !== undefined) {
            for (let index = 0; index < template.fields.length; index++) {
                if (template.fields[index].object.localeCompare('gallery') === 0) {
                    //
                } else if (template.fields[index].object.localeCompare('list_gallery') === 0) {
                    //
                }
            }
        }
    }, [template, templateObject]);

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
        });
    }

    return (
        <div className="dashboard-body" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: '70%', backgroundColor: '#F0F3F8', maxHeight: '90%', overflowY: 'auto'}}>
                <br/><br/>
                <div className="form-group">
                    {
                        template !== undefined && template.fields.map((templateField, index) => {
                            if(templateField.isObjectTitle) {
                                return <div className="col-50" style={{fontWeight: 'bold', fontSize: '2em'}} key={templateField.ID}>{templateObject[templateField.name]}</div>;
                            }
                        })
                    }
                </div>
                <br/>
                <hr/>
                <div>
                    {
                        templateObject !== undefined && template.fields.map((templateField, index) => {
                            if(!templateField.isObjectTitle) {
                                if(templateField.object.localeCompare('text') === 0 || templateField.object.localeCompare('number') === 0 || templateField.object.localeCompare('decimal') === 0) {
                                    return <div className="form-group margin-view-template" key={templateField.ID}>
                                                <div className="col-50"> <span style={{fontWeight: 'bold'}}>{templateField.name}:</span> {templateObject[templateField.name]}</div>
                                            </div>
                                } else if(templateField.object.localeCompare('phone_number') === 0) {
                                    return <div className="form-group margin-view-template" key={templateField.ID}>
                                                <div className="col-50"> <span style={{fontWeight: 'bold'}}>{templateField.name}:</span> </div>
                                                <div className="on-hover flex-justify-align" onClick={() => saveRegistry(selectedProduct)} style={{height: '4em', width: '100%'}}>
                                                    <ReactWhatsapp number={templateObject[templateField.name].phone} message={templateObject[templateField.name].message} style={{height: '100%', width: '90%', border: '2px solid black'}}>
                                                        CONTACTANOS
                                                    </ReactWhatsapp>
                                                </div>
                                            </div>
                                } else if(templateField.object.localeCompare('description') === 0) {
                                    return <div className="form-group margin-view-template" key={templateField.ID}>
                                                <div className="col-50"> <span style={{fontWeight: 'bold'}}>{templateField.name}:</span> </div>
                                                <div className="flex-justify-align" style={{width: '100%'}}>
                                                    {HTMLReactParser(templateObject[templateField.name])}
                                                </div>
                                            </div>
                                } else if(templateField.object.localeCompare('photo') === 0) {
                                    return <div className="form-group margin-view-template" key={templateField.ID}>
                                                <div className="col-50"> <span style={{fontWeight: 'bold'}}>{templateField.name}:</span> </div>
                                                <div className="flex-justify-align" style={{width: '100%'}}>
                                                    <img src={templateObject[templateField.name]} style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '100%', height: '100%', objectFit: 'cover'}}/>
                                                </div>
                                            </div>
                                } else if(templateField.object.localeCompare('gallery') === 0) {
                                    return <div className="form-group margin-view-template" key={templateField.ID}>
                                                <div className="col-50"> <span style={{fontWeight: 'bold'}}>{templateField.name}:</span> </div>
                                                <div className="flex-justify-align" style={{width: '100%', height: '90vh'}}>
                                                    <GalleryContainer images={templateObject[templateField.name]}/>
                                                </div>
                                            </div>
                                } else if(templateField.object.localeCompare('list_gallery') === 0) {
                                    return <div className="form-group margin-view-template" key={templateField.ID}>
                                                <div className="col-50"> <span style={{fontWeight: 'bold'}}>{templateField.name}:</span> </div>
                                                <div className="flex-justify-align" style={{width: '100%'}}>
                                                    <ListGalleryContainer list={templateObject[templateField.name]}/>
                                                </div>
                                            </div>
                                }
                            }
                        })
                    }
                </div>
                <br/>
                <br/>
            </div>
        </div>
    );
}

export default ViewTemplate;