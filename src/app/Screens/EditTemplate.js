import React, {useState, useEffect} from 'react';
import Swal from "sweetalert2";

import templatesService from '../api/templates';

const EditTemplate = ({setCurrentPage, selectedTemplate, getTemplates}) => {

    const [templateObject, setTemplateObject] = useState(selectedTemplate);
    const changeTemplateFieldName = (e, index) => {
        console.log(e.target.value)
        let clone = JSON.parse(JSON.stringify(templateObject));
        clone.fields[index].name = e.target.value;
        setTemplateObject(clone);
    };

    useEffect(() => {
        for (let index = 0; index < selectedTemplate.fields.length; index++) {
            selectedTemplate.fields[index].existed = true;
        }
    }, [selectedTemplate]);

    const changeTemplateFieldObject = (e, index) => {
        let clone = JSON.parse(JSON.stringify(templateObject));
        clone.fields[index].object = e.target.value;
        if(clone.fields[index].object.localeCompare('text') === 0) {
            clone.fields[index].type = 'string';
        } else if(clone.fields[index].object.localeCompare('description') === 0) {
            clone.fields[index].type = 'string';
        } else if(clone.fields[index].object.localeCompare('number') === 0) {
            clone.fields[index].type = 'int';
        } else if(clone.fields[index].object.localeCompare('phone_number') === 0) {
            clone.fields[index].type = 'int';
        } else if(clone.fields[index].object.localeCompare('decimal') === 0) {
            clone.fields[index].type = 'decimal';
        } else if(clone.fields[index].object.localeCompare('photo') === 0) {
            clone.fields[index].type = 'string';
        } else if(clone.fields[index].object.localeCompare('gallery') === 0) {
            clone.fields[index].type = 'string';
        } else if(clone.fields[index].object.localeCompare('list_gallery') === 0) {
            clone.fields[index].type = 'string';
        }
        setTemplateObject(clone);
    };

    const changeTemplateFieldIsObjectTitle = (e, index) => {
        let clone = JSON.parse(JSON.stringify(templateObject));
        clone.fields[index].isObjectTitle = e;
        setTemplateObject(clone);
    };

    const [templateFieldNameNew, setTemplateFieldNameNew] = useState('');
    const changeTemplateFieldNameNew = (e) => {
        setTemplateFieldNameNew(e.target.value);
    };
    const [templateFieldObjectNew, setTemplateFieldObjectNew] = useState('text');
    const changeTemplateFieldObjectNew = (e) => {
        setTemplateFieldObjectNew(e.target.value);
    };
    const [templateFieldIsObjectTitleNew, setTemplateFieldIsObjectTitleNew] = useState(true);
    const changeTemplateFieldIsObjectTitleNew = (e) => {
        setTemplateFieldIsObjectTitleNew(e);
    };
    const [templateFieldOrderPresentationNew, setTemplateFieldOrderPresentationNew] = useState(1);

    const insertTemplateFieldNew = () => {
        let type = 'string';
        if(templateFieldObjectNew.localeCompare('text') === 0) {
            type = 'string';
        } else if(templateFieldObjectNew.localeCompare('description') === 0) {
            type = 'string';
        } else if(templateFieldObjectNew.localeCompare('number') === 0) {
            type = 'int';
        } else if(templateFieldObjectNew.localeCompare('phone_number') === 0) {
            type = 'int';
        } else if(templateFieldObjectNew.localeCompare('decimal') === 0) {
            type = 'decimal';
        } else if(templateFieldObjectNew.localeCompare('photo') === 0) {
            type = 'string';
        } else if(templateFieldObjectNew.localeCompare('gallery') === 0) {
            type = 'string';
        } else if(templateFieldObjectNew.localeCompare('list_gallery') === 0) {
            type = 'string';
        }
        let templateField = {
            name: templateFieldNameNew,
            type: type,
            object: templateFieldObjectNew,
            orderPresentation: templateFieldOrderPresentationNew,
            showCover: true,
            searchable: true,
            isObjectTitle: templateFieldIsObjectTitleNew
        };
        let originalArray = JSON.parse(JSON.stringify(templateObject));
        let nameFieldAlreadyExists = false;
        for (let index = 0; index < originalArray.fields.length; index++) {
            const element = originalArray.fields[index];
            if(element.isObjectTitle && templateFieldIsObjectTitleNew) {
                nameFieldAlreadyExists = true;
                break;
            }
        }
        if(!nameFieldAlreadyExists) {
            originalArray.fields.push(templateField);
            setTemplateObject(originalArray);
            //setTemplateFieldIsObjectTitle(true);
            setTemplateFieldOrderPresentationNew(templateFieldOrderPresentationNew+1);
        } else {
            alert('campo nombre ya existe');
        }
    };

    const deleteTemplateField = (index) => {
        let originalArray = JSON.parse(JSON.stringify(templateObject));
        originalArray.fields.splice(index, 1);
        for (let i = index; i < originalArray.fields.length; i++) {
            originalArray.fields[i].order = originalArray.fields[i].order-1;
        }
        setTemplateObject(originalArray);
        setTemplateFieldOrderPresentationNew(templateFieldOrderPresentationNew-1);
    };

    const saveTemplate = async () => {
        let nameFieldCounter = 0;
        for (let index = 0; index < templateObject.fields.length; index++) {
            const element = templateObject.fields[index];
            if(element.isObjectTitle) {
                nameFieldCounter++;
            }
        }
        if(nameFieldCounter <= 1) {
            let templates = {
                oldTemplate: selectedTemplate,
                newTemplate: templateObject
            }
            await templatesService.put('/', templates, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                // handle success
                Swal.fire({
                    title: `Éxito`,
                    text: 'Plantilla editada',
                    type: "success",
                    confirmButtonColor: "#D9272E",
                    imageHeight: 200,
                });
                getTemplates();
            })
            .catch(function (error) {
                // handle error
                Swal.fire({
                    title: `Error`,
                    text: 'error',
                    type: "error",
                    confirmButtonColor: "#D9272E",
                    imageHeight: 200,
                });
            })
        } else {
            alert('solo puede existir un campo nombre');
        }
        console.log("templateObject", templateObject)
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
                    <div className="col-50" style={{fontWeight: 'bold', fontSize: '2em'}}>{selectedTemplate.name}</div>
                </div>
                <br/>
                <hr/>
                {
                    selectedTemplate.ID !== undefined
                    ?   <div>
                            {
                                selectedTemplate.fields.map((templateField, index) => {
                                    return <div key={templateField.ID}>
                                                <div className="form-group">
                                                    <label className="label-form">Nombre del campo de la Plantilla:</label>
                                                    <input type="text" className="input-form" defaultValue={templateField.name} onChange={(e) => changeTemplateFieldName(e, index)}/>
                                                </div>
                                                <br/>
                                                <div className="form-group">
                                                    <label className="label-form">Tipo del campo de la Plantilla:</label>
                                                    <select defaultValue={templateField.object} onChange={(e) => changeTemplateFieldObject(e, index)}>
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
                                                <div className="form-group">
                                                    <label className="label-form">El campo es el nombre del objeto de la plantilla:</label>
                                                    <input type="radio" defaultValue="true" name={"radio"+index} defaultChecked={templateField.isObjectTitle} onClick={() => changeTemplateFieldIsObjectTitle(true, index)}/> SI
                                                    <input type="radio" defaultValue="false" name={"radio"+index} defaultChecked={!templateField.isObjectTitle} onClick={() => changeTemplateFieldIsObjectTitle(false, index)}/> NO
                                                </div>
                                                <br/>
                                                <div className="flex-justify-align">
                                                    <button onClick={() => deleteTemplateField(index)}>BORRAR</button>
                                                </div>
                                                <br/>
                                                <hr/>
                                            </div>
                                })
                            }
                        </div>
                    :   null
                }
                <hr/>
                <div className="form-group">
                    <label className="label-form">Nombre del nuevo campo de la Plantilla:</label>
                    <input type="text" className="input-form" value={templateFieldNameNew} onChange={changeTemplateFieldName}/>
                </div>
                <br/>
                <div className="form-group">
                    <label className="label-form">Tipo del nuevo campo de la Plantilla:</label>
                    <select value={templateFieldObjectNew} onChange={changeTemplateFieldObjectNew}>
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
                    //templateFieldNameExists
                    true
                    ?   <div className="form-group">
                            <label className="label-form">El campo es el nombre del objeto de la plantilla:</label>
                            <input type="radio" value="true" name="radio" defaultChecked onClick={() => changeTemplateFieldIsObjectTitle(true)}/> SI
                            <input type="radio" value="false" name="radio" onClick={() => changeTemplateFieldIsObjectTitle(false)}/> NO
                        </div>
                    :   null
                }
                <br/>
                <div className="flex-justify-align">
                    <button onClick={insertTemplateFieldNew}>CREAR VARIABLE DE PLANTILLA</button>
                </div>
                <hr/>
                <div className="flex-justify-align">
                    <button onClick={saveTemplate}>EDITAR PLANTILLA</button>
                </div>
                <br/>
                <br/>
            </div>
        </div>
    );
}

export default EditTemplate;