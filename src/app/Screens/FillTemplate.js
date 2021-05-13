import React, {useState, useEffect} from 'react';
import axios from 'axios';
import lodashClonedeep from 'lodash.clonedeep';

import EditorConvertToHTML from './EditorConvertToHTML';

import filltemplatesService from '../api/fillTemplates';

const FillTemplate = ({templates, getTemplates}) => {

    const [selectedTemplate, setSelectedTemplate] = useState(templates.length>0?templates[0]:undefined);
    const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
    const changeSelectedTemplate = (e) => {
        setSelectedTemplate(templates[e.target.value]);
        setSelectedTemplateIndex(e.target.value);
        setTemplateObject(undefined);
    };
    useEffect(() => {
        if(selectedTemplate !== undefined) {
            initTemplateObject();
        }
    }, [selectedTemplate]);
    const initTemplateObject = () => {
        let clone = {};
        for (let index = 0; index < selectedTemplate.fields.length; index++) {
            if(selectedTemplate.fields[index].object.localeCompare('text') === 0 || selectedTemplate.fields[index].object.localeCompare('description') === 0) {
                clone[selectedTemplate.fields[index].name] = '';
            } else if(selectedTemplate.fields[index].object.localeCompare('number') === 0 || selectedTemplate.fields[index].object.localeCompare('decimal') === 0 ) {
                clone[selectedTemplate.fields[index].name] = 0;
            } else if(selectedTemplate.fields[index].object.localeCompare('phone_number') === 0) {
                clone[selectedTemplate.fields[index].name] = {phone: 0, message: ''};
            } else if(selectedTemplate.fields[index].object.localeCompare('photo') === 0) {
                clone[selectedTemplate.fields[index].name] = {file: '', img: ''};
            } else if(selectedTemplate.fields[index].object.localeCompare('gallery') === 0) {
                clone[selectedTemplate.fields[index].name] = {files: [], imgs: []};
            } else if(selectedTemplate.fields[index].object.localeCompare('list_gallery') === 0) {
                clone[selectedTemplate.fields[index].name] = [];
            }
        }
        setTemplateObject(clone);
    };
    useEffect(() => {
        setSelectedTemplate(templates[0]);
    }, [templates]);
    const [templateObject, setTemplateObject] = useState();

    const onChangeTemplateField = (e, templateField) => {
        let clone = lodashClonedeep(templateObject);
        if(templateField.type.localeCompare('string') === 0 && templateField.object.localeCompare('description') !== 0) {
            clone[templateField.name] = e.target.value;
        } else if(templateField.type.localeCompare('string') === 0 && templateField.object.localeCompare('description') === 0) {
            clone[templateField.name] = e;
        } else if(templateField.type.localeCompare('int') === 0 || templateField.type.localeCompare('decimal') === 0) {
            clone[templateField.name] = parseInt(e.target.value);
        }
        setTemplateObject(clone);
    };

    const onChangeTemplateFieldPhoneNumberNumber = (e, templateField) => {
        let clone = lodashClonedeep(templateObject);
        clone[templateField.name].phone = e.target.value;
        setTemplateObject(clone);
    };

    const onChangeTemplateFieldPhoneNumberMessage = (e, templateField) => {
        let clone = lodashClonedeep(templateObject);
        clone[templateField.name].message = e.target.value;
        setTemplateObject(clone);
    };

    const onlyNumbersKeyPress = (e) => {
        if ( !e.metaKey || // cmd/ctrl
            e.which !== 37 || e.which !== 38 || e.which !== 39 || e.which !== 40 || // arrow keys
            e.which !== 8 || // delete key
            !/[0-9]/.test(String.fromCharCode(e.which)) )
            e.preventDefault();
    };

    const onChangePhoto = (e, templateField) => {
        var files = e.target.files;
        var filesArr = Array.prototype.slice.call(files);
        let clone = lodashClonedeep(templateObject);
        clone[templateField.name].file = filesArr[0];
        clone[templateField.name].img = URL.createObjectURL(filesArr[0]);
        setTemplateObject(clone);
    }

    const uploadPhoto = (templateField) => {
        let formData = new FormData();
        formData.append('pic', templateObject[templateField.name], 'pic');
        axios.post('http://localhost:8000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    const onChangeGallery = (e, templateField) => {
        var files = e.target.files;
        var filesArr = Array.prototype.slice.call(files);
        let clone = lodashClonedeep(templateObject);
        clone[templateField.name].files = [];
        clone[templateField.name].imgs = [];
        for (let index = 0; index < filesArr.length; index++) {
            clone[templateField.name].files.push(filesArr[index]);
            clone[templateField.name].imgs.push( URL.createObjectURL(filesArr[index]) );
        }
        setTemplateObject(clone);
    }

    const uploadGallery = (templateField) => {
        let formData = new FormData();
        for (let index = 0; index < templateObject[templateField.name].length; index++) {
            formData.append('pic', templateObject[templateField.name][index], 'pic');
        }
        axios.post('http://localhost:8000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    const onChangeListGalleryPhoto = (e, templateField) => {
        var files = e.target.files;
        var filesArr = Array.prototype.slice.call(files);
        setNewListTilePic( URL.createObjectURL(filesArr[0]) );
        setNewListTileFile(filesArr[0]);
    }

    const uploadListGallery = (templateField) => {
        let formData = new FormData();
        for (let index = 0; index < templateObject[templateField.name].img.length; index++) {
            formData.append('pic', templateObject[templateField.name].img[index], 'pic');
        }
        axios.post('http://localhost:8000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    const [newListTileName, setNewListTileName] = useState('');
    const [newListTileFile, setNewListTileFile] = useState();
    const [newListTilePic, setNewListTilePic] = useState();
    const onChangeNewListTileName = (e) => {
        setNewListTileName(e.target.value);
    };

    const addNewListTile = (templateField) => {
        let tile = {
            name: newListTileName,
            img: newListTilePic,
            file: newListTileFile
        }
        let clone = lodashClonedeep(templateObject);
        clone[templateField.name].push(tile);
        setTemplateObject(clone);
        setNewListTileName('');
        setNewListTileFile();
        setNewListTilePic();
    };

    const deleteNewListTile = (templateField, index) => {
        let tile = {
            name: newListTileName,
            img: newListTilePic,
            file: newListTileFile
        }
        let clone = lodashClonedeep(templateObject);
        clone[templateField.name].splice(index, 1);
        setTemplateObject(clone);
    };

    const saveTemplate = async () => {
        for (let index = 0; index < selectedTemplate.fields.length; index++) {
            if(selectedTemplate.fields[index].object.localeCompare('phone_number') === 0) {
                templateObject[selectedTemplate.fields[index].name] = 'NUMBER='+templateObject[selectedTemplate.fields[index].name].phone+';MESSAGE='+templateObject[selectedTemplate.fields[index].name].message;
            } else if(selectedTemplate.fields[index].object.localeCompare('photo') === 0) {
                let formData = new FormData();
                formData.append('pic', templateObject[selectedTemplate.fields[index].name].file, 'pic');
                const photoUrl = await axios.post('http://localhost:8000/upload-photo', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                templateObject[selectedTemplate.fields[index].name] = process.env.REACT_APP_API_URL+'/'+photoUrl.data.filename;
            } else if(selectedTemplate.fields[index].object.localeCompare('gallery') === 0) {
                let formData = new FormData();
                for (let i = 0; i < templateObject[selectedTemplate.fields[index].name].files.length; i++) {
                    formData.append('pic', templateObject[selectedTemplate.fields[index].name].files[i], 'pic');
                }
                const photoUrl = await axios.post('http://localhost:8000/upload-gallery', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                let galleryURLs = '';
                for (let index = 0; index < photoUrl.data.length; index++) {
                    galleryURLs += process.env.REACT_APP_API_URL+'/'+photoUrl.data[index].filename;
                    if(index < photoUrl.data.length-1)
                        galleryURLs += ';'
                }
                templateObject[selectedTemplate.fields[index].name] = galleryURLs;
            } else if(selectedTemplate.fields[index].object.localeCompare('list_gallery') === 0) {
                let formData = new FormData();
                for (let i = 0; i < templateObject[selectedTemplate.fields[index].name].length; i++) {
                    formData.append('pic', templateObject[selectedTemplate.fields[index].name][i].file, 'pic');
                }
                const photoUrl = await axios.post('http://localhost:8000/upload-gallery', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                let galleryURLs = '';
                for (let i = 0; i < photoUrl.data.length; i++) {
                    galleryURLs += 'NOMBRE=';
                    galleryURLs += templateObject[selectedTemplate.fields[index].name][i].name;
                    galleryURLs += '|URL='
                    galleryURLs += process.env.REACT_APP_API_URL+'/'+photoUrl.data[i].filename;
                    if(i < photoUrl.data.length-1)
                        galleryURLs += ';'
                }
                templateObject[selectedTemplate.fields[index].name] = galleryURLs;
            }
            
        }
        let template = {
            template: selectedTemplate,
            templateObject: templateObject
        }
        console.log("templateObject", templateObject)
        await filltemplatesService.post('/', template, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            // handle success
            console.log(response);
            alert('creado');
            setSelectedTemplate(templates[0]);
            setSelectedTemplateIndex(0);
            initTemplateObject();
            getTemplates();
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            initTemplateObject();
            setSelectedTemplate(templates[0]);
            setSelectedTemplateIndex(0);
        })
    };

    return (
        <div className="dashboard-body" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: '70%', backgroundColor: '#F0F3F8', maxHeight: '90%', overflowY: 'auto'}}>
                <br/><br/>
                <div className="form-group">
                    <label className="label-form">Seleccionar Plantilla:</label>
                    <select value={selectedTemplateIndex} onChange={changeSelectedTemplate}>
                        {
                            templates.map((template, index) => {
                                return <option value={index} key={template.ID}>{template.name}</option>;
                            })
                        }
                    </select>
                </div>
                <br/>
                <hr/>
                {
                    selectedTemplate !== undefined && templateObject !== undefined
                    ?   <div>
                            <div className="form-group">
                                <div className="col-50">Plantilla Seleccionada: {selectedTemplate.name}</div>
                            </div>
                            <hr/>
                            {
                                selectedTemplate.fields.map((templateField, index) => {
                                    if(templateField.object.localeCompare('text') === 0) {
                                        return <div className="form-group" key={templateField.ID}>
                                                    <label className="label-form">{templateField.name}</label>
                                                    <div className="form-group">
                                                        <input type="text" className="input-form" value={templateObject[templateField.name]} onChange={(e) => onChangeTemplateField(e, templateField)}/>
                                                    </div>
                                                </div>
                                    } else if(templateField.object.localeCompare('description') === 0) {
                                        return <div className="form-group" key={templateField.ID}>
                                                    <label className="label-form">{templateField.name}</label>
                                                    <div className="form-group">
                                                        <EditorConvertToHTML
                                                            style={{with: '90%'}}
                                                            getHTML={(e) => onChangeTemplateField(e, templateField)}
                                                            templateField={templateField}
                                                        />
                                                    </div>
                                                </div>
                                    } else if(templateField.object.localeCompare('number') === 0) {
                                        return <div className="form-group" key={templateField.ID}>
                                                    <label className="label-form">{templateField.name}</label>
                                                    <div className="form-group">
                                                        <input type="number" step="1" className="input-form" value={templateObject[templateField.name]} onChange={(e) => onChangeTemplateField(e, templateField)}/>
                                                    </div>
                                                </div>
                                    } else if(templateField.object.localeCompare('decimal') === 0) {
                                        return <div className="form-group" key={templateField.ID}>
                                                    <label className="label-form">{templateField.name}</label>
                                                    <div className="form-group">
                                                        <input type="number" step="0.01" className="input-form" value={templateObject[templateField.name]} onChange={(e) => onChangeTemplateField(e, templateField)}/>
                                                    </div>
                                                </div>
                                    } else if(templateField.object.localeCompare('phone_number') === 0) {
                                        return <div className="form-group" key={templateField.ID}>
                                                    <label className="label-form">{templateField.name}</label>
                                                    <div className="form-group">
                                                        <label >Número de Telefono: </label> <input type="number" step="1" className="input-form" value={templateObject[templateField.name].phone} onChange={(e) => onChangeTemplateFieldPhoneNumberNumber(e, templateField)}/>
                                                        <label >Mensaje: </label>
                                                        <textarea className="input-form" value={templateObject[templateField.name].message} onChange={(e) => onChangeTemplateFieldPhoneNumberMessage(e, templateField)}/>
                                                    </div>
                                                </div>
                                    } else if(templateField.object.localeCompare('photo') === 0) {
                                        return <div className="form-group" key={templateField.ID}>
                                                    <label className="label-form">{templateField.name}</label>
                                                    <div className="form-group">
                                                        <input type="file" name="photo" className="input-form" onChange={(e) => onChangePhoto(e, templateField)} accept=".png, .jpg, .jpeg"/>
                                                        {
                                                            templateObject[templateField.name] !== undefined && templateObject[templateField.name].img !== undefined
                                                            ?   <img src={templateObject[templateField.name].img}  style={{height: '100%', width: '100%', objectFit: 'cover'}}/>
                                                            :   null
                                                        }
                                                    </div>
                                                </div>
                                    } else if(templateField.object.localeCompare('gallery') === 0) {
                                        return <div className="form-group" key={templateField.ID}>
                                                    <label className="label-form">{templateField.name}</label>
                                                    <div className="form-group">
                                                        <input type="file" name="gallery" className="input-form" onChange={(e) => onChangeGallery(e, templateField)} accept=".png, .jpg, .jpeg" multiple/>
                                                        {
                                                            templateObject[templateField.name] !== undefined && templateObject[templateField.name].imgs !== undefined
                                                            ?   <div style={{width: '100%', height: '100%', overflowX: 'auto', whiteSpace: 'nowrap'}}>
                                                                    {
                                                                        templateObject[templateField.name].imgs.map((img, index) => {
                                                                            return  <div className="padding-inside-box" style={{display: 'inline-block', width: '33%', height: '100%', border: '1px solid black'}} key={index}>
                                                                                        <img className="on-hover" src={img} style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '100%', height: '100%', objectFit: 'cover'}}/>
                                                                                    </div>
                                                                        })
                                                                    }
                                                                </div>
                                                            :   null
                                                        }
                                                    </div>
                                                </div>
                                    } else if(templateField.object.localeCompare('list_gallery') === 0) {
                                        return <div className="form-group" key={templateField.ID}>
                                                    <label className="label-form">{templateField.name}</label>
                                                    <div className="form-group">
                                                        {
                                                            templateObject[templateField.name].map((tile, index) => {
                                                                return <div style={{height: '100%', width: '100%'}} key={index}>
                                                                    <div className="col-50">
                                                                        <label className="label-form">Nombre:</label>
                                                                        <label className="label-form">{tile.name}</label>
                                                                    </div>
                                                                    <div className="col-50">
                                                                        <img src={tile.img}  style={{height: '100%', width: '100%'}}/>
                                                                    </div>
                                                                    <div className="flex-justify-align">
                                                                        <button onClick={() => deleteNewListTile(templateField, index)}>ELIMINAR</button>
                                                                    </div>
                                                                </div>
                                                            })
                                                        }
                                                        <div className="col-50">
                                                            <label className="label-form">Nombre:</label>
                                                            <input type="text" className="input-form" value={newListTileName} onChange={(e) => onChangeNewListTileName(e, templateField)}/>
                                                            <input type="file" name="list_gallery" className="input-form" onChange={(e) => onChangeListGalleryPhoto(e, templateField)} accept=".png, .jpg, .jpeg"/>
                                                        </div>
                                                        <div className="col-50">
                                                            {
                                                                newListTilePic !== undefined
                                                                ?   <img src={newListTilePic}  style={{height: '100%', width: '100%', objectFit: 'cover'}}/>
                                                                :   null
                                                            }
                                                        </div>
                                                        <div className="flex-justify-align">
                                                            <button onClick={() => addNewListTile(templateField) }>CREAR OBJETO DE LISTA</button>
                                                        </div>
                                                    </div>
                                                </div>
                                    }
                                })
                            }
                        </div>
                    :   null
                }
                <br/>
                <div className="flex-justify-align">
                    <button onClick={saveTemplate}>GUARDAR</button>
                </div>
                <br/>
            </div>
        </div>
    );
}

export default FillTemplate;