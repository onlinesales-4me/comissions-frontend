import React, {useState, useEffect} from 'react';

const SelectTemplate = ({setCurrentPage, setSelectedTemplate, templates}) => {

    const selectTemplate = (template) => {
        setSelectedTemplate(template);
        setCurrentPage('editTemplate');
    };

    return (
        <div className="dashboard-body" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: '70%', backgroundColor: '#F0F3F8', maxHeight: '90%', overflowY: 'auto'}}>
                <br/><br/>
                <div className="flex-justify-align">
                    <button onClick={() => setCurrentPage('createTemplate') }>CREAR PLANTILLA</button>
                </div>
                <br/>
                <hr/>
                <div className="flex-justify-align">
                    <label className="label-form">Plantillas a Editar:</label>
                </div>
                <br/>
                
                {
                    templates.map((template, index) => {
                        return <div className="form-group" key={template.ID}>
                                    <div className="col-50">{index+1}) Plantilla: {template.name}</div>
                                    <div className="col-50" onClick={() => selectTemplate(template)}> <button>Editar</button> </div>
                                    <hr/>
                                </div>
                    })
                }
                <br/>
            </div>
        </div>
    );
}

export default SelectTemplate;