import React, {useState} from 'react';
import Swal from "sweetalert2";

import templatesService from '../api/templates';

const Template = ({setCurrentPage, getTemplates}) => {

    const [templateName, setTemplateName] = useState('');
    const changeTemplateName = (e) => {
        setTemplateName(e.target.value);
    };
    const [templateFieldName, setTemplateFieldName] = useState('');
    const changeTemplateFieldName = (e) => {
        setTemplateFieldName(e.target.value);
    };
    const [templateFieldNameExists, setTemplateFieldNameExists] = useState(false);
    const [templateFieldObject, setTemplateFieldObject] = useState('text');
    const changeTemplateFieldObject = (e) => {
        setTemplateFieldObject(e.target.value);
    };
    const [templateFieldIsObjectTitle, setTemplateFieldIsObjectTitle] = useState(true);
    const changeTemplateFieldIsObjectTitle = (e) => {
        setTemplateFieldIsObjectTitle(e);
    };
    const [templateFieldOrderPresentation, setTemplateFieldOrderPresentation] = useState(1);
    const [templateFields, setTemplateFields] = useState([]);

    const insertTemplateField = () => {
        if( isValidVarName(templateFieldName) ) {
            let type = 'string';
            if(templateFieldObject.localeCompare('text') === 0) {
                type = 'string';
            } else if(templateFieldObject.localeCompare('description') === 0) {
                type = 'string';
            } else if(templateFieldObject.localeCompare('number') === 0) {
                type = 'int';
            } else if(templateFieldObject.localeCompare('phone_number') === 0) {
                type = 'string';
            } else if(templateFieldObject.localeCompare('decimal') === 0) {
                type = 'decimal';
            } else if(templateFieldObject.localeCompare('photo') === 0) {
                type = 'string';
            } else if(templateFieldObject.localeCompare('gallery') === 0) {
                type = 'string';
            } else if(templateFieldObject.localeCompare('list_gallery') === 0) {
                type = 'string';
            }
            let templateField = {
                name: templateFieldName,
                type: type,
                object: templateFieldObject,
                orderPresentation: templateFieldOrderPresentation,
                showCover: true,
                searchable: true,
                isObjectTitle: templateFieldIsObjectTitle,
            };
            let originalArray = [...templateFields];
            let nameFieldAlreadyExists = false;
            for (let index = 0; index < originalArray.length; index++) {
                const element = originalArray[index];
                if(element.isObjectTitle && templateFieldIsObjectTitle) {
                    nameFieldAlreadyExists = true;
                    break;
                }
            }
            if(!nameFieldAlreadyExists) {
                originalArray.push(templateField);
                setTemplateFields(originalArray);
                //setTemplateFieldIsObjectTitle(true);
                setTemplateFieldOrderPresentation(templateFieldOrderPresentation+1);
                if(templateFieldIsObjectTitle) {
                    setTemplateFieldNameExists(true);
                    setTemplateFieldIsObjectTitle(false);
                }
            } else {
                alert('campo nombre ya existe')
            }
        } else {
            alert('el nombre de los campos no pueden llevar espacios y deben empezar con letras')
        }
    };

    const isValidVarName = ( name ) => {
        try {
            Function('var ' + name);
        } catch( e ) {
            return false;
        }
        return true;
    }

    const deleteTemplateField = (index) => {
        let originalArray = [...templateFields];
        originalArray.splice(index, 1);
        for (let i = index; i < originalArray.length; i++) {
            originalArray[i].orderPresentation = originalArray[i].orderPresentation-1;
        }
        let templateFieldIsObjectTitleExists = false;
        for (let index = 0; index < originalArray.length; index++) {
            if (originalArray[index].isObjectTitle) {
                templateFieldIsObjectTitleExists = true;
            }
        }
        setTemplateFields(originalArray);
        setTemplateFieldOrderPresentation(templateFieldOrderPresentation-1);
        setTemplateFieldNameExists(templateFieldIsObjectTitleExists);
        if(!templateFieldIsObjectTitleExists) {
            setTemplateFieldIsObjectTitle(true);
        }
    };

    const sortTemplateFields = () => {
        let unsortedArray = [...templateFields];
        unsortedArray.sort((a, b) => {return a.order-b.order});
        setTemplateFields(unsortedArray);
    };

    const saveTemplate = async () => {
        let template = {
            name: templateName,
            fields: templateFields
        }
        await templatesService.post('/', template, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            // handle success
            console.log(response);
            Swal.fire({
                title: `Éxito`,
                text: 'Plantilla creada',
                type: "success",
                confirmButtonColor: "#D9272E",
                imageHeight: 200,
            });
            getTemplates();
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            Swal.fire({
                title: `Error`,
                text: 'error',
                type: "error",
                confirmButtonColor: "#D9272E",
                imageHeight: 200,
            });
        })
    };

    return (
        <div className="dashboard-body" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: '70%', backgroundColor: '#F0F3F8', maxHeight: '90%', overflowY: 'auto'}}>
                <br/><br/>
                <div className="form-group" style={{paddingLeft: '5%'}}>
                    <button onClick={() => setCurrentPage('selectTemplate')}>ATRAS</button>
                </div>
                <br/>
                <div className="form-group">
                    <label className="label-form">Nombre de la Plantilla:</label>
                    <input type="text" className="input-form" value={templateName} onChange={changeTemplateName}/>
                </div>
                <br/>
                <hr/>
                <div className="form-group">
                    <label className="label-form">Nombre del nuevo campo de la Plantilla:</label>
                    <input type="text" className="input-form" value={templateFieldName} onChange={changeTemplateFieldName}/>
                </div>
                <br/>
                <div className="form-group">
                    <label className="label-form">Tipo del nuevo campo de la Plantilla:</label>
                    <select value={templateFieldObject} onChange={changeTemplateFieldObject}>
                        <option value="text">Texto</option>
                        <option value="description">Descripción</option>
                        <option value="number">Número Entero</option>
                        <option value="decimal">Número Decimal</option>
                        <option value="phone_number">Número Telefónico</option>
                        <option value="photo">Imagén</option>
                        <option value="gallery">Galería</option>
                        <option value="list_gallery">Lista Galería</option>
                    </select>
                </div>
                <br/>
                {
                    !templateFieldNameExists && templateFieldObject.localeCompare('text') === 0
                     ?   <div className="form-group">
                            <label className="label-form">El campo es el nombre del objeto de la plantilla:</label>
                            <input type="radio" value="true" name="radio" defaultChecked onClick={() => changeTemplateFieldIsObjectTitle(true)}/> SI
                            <input type="radio" value="false" name="radio" onClick={() => changeTemplateFieldIsObjectTitle(false)}/> NO
                        </div>
                    :   null
                }
                <br/>
                <div className="flex-justify-align">
                    <button onClick={insertTemplateField}>CREAR VARIABLE DE PLANTILLA</button>
                </div>
                <hr/>
                {
                    templateFields.map((templateField, index) => {
                        return <div className="form-group" key={index}>
                                    <div className="col-50">{index+1}) Nombre: {templateField.name}</div>
                                    <div className="col-50">Tipo: {templateField.object}</div>
                                    <div className="flex-justify-align">
                                        <button onClick={() => deleteTemplateField(index)}>BORRAR</button>
                                    </div>
                                </div>
                    })
                }
                <hr/>
                <div className="flex-justify-align">
                    <button onClick={saveTemplate}>CREAR PLANTILLA</button>
                </div>
            </div>
        </div>
    );
}

export default Template;