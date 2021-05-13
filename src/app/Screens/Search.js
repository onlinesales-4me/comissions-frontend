import React, {useState, useEffect} from 'react';
import Modal from '../Utils/Modal/Modal';

const SearchInput = ({templates, setTemplates, showSearchModal, onCloseSearchModal}) => {

    const [templateFields, setTemplateFields] = useState([]);

    useEffect(() => {
        prepareFields(templates);
    }, [templates]);

    const prepareFields = (templates) => {
        let newFieldsArray = [];
        for (let i = 0; i < templates.length; i++) {
            for (let j = 0; j < templates[i].fields.length; j++) {
                if(templates[i].fields[j].object.localeCompare('photo') !== 0 && templates[i].fields[j].object.localeCompare('gallery') !== 0 && templates[i].fields[j].object.localeCompare('list_gallery') !== 0 && templates[i].fields[j].object.localeCompare('phone_number') !== 0) {
                    if(templates[i].fields[j].type.localeCompare('string') === 0) {
                        templates[i].fields[j].searchValue = '';
                    } else if(templates[i].fields[j].type.localeCompare('int') === 0 || templates[i].fields[j].type.localeCompare('decimal') === 0) {
                        templates[i].fields[j].min = 0;
                        templates[i].fields[j].max = 0;
                    }
                    newFieldsArray.push(templates[i].fields[j]);
                }
            }
        }
        setTemplateFields(newFieldsArray);
    };

    const onChangeTemplateField = (e, index) => {
        let clone = [...templateFields];
        clone[index].searchValue = e.target.value;
        setTemplateFields(clone);
    };

    const onChangeTemplateFieldMin = (e, index) => {
        let clone = [...templateFields];
        clone[index].min = e.target.value;
        setTemplateFields(clone);
    };

    const onChangeTemplateFieldMax = (e, index) => {
        let clone = [...templateFields];
        clone[index].max = e.target.value;
        setTemplateFields(clone);
    };

    const search = () => {
        let clone = [...templates];
        for (let x = 0; x < templateFields.length; x++) {
            if (templateFields[x].type.localeCompare('string') === 0 && templateFields[x].searchValue.length > 0) {
                for (let i = clone.length-1; i >= 0; i--) {
                    templateFieldsFor:
                    for (let j = 0; j < clone[i].values.length; j++) {
                        if(!clone[i].values[j][templateFields[x].name.toLowerCase()].toLowerCase().includes(templateFields[x].searchValue.toLowerCase()) ) {
                            clone.splice(i, 1);
                            break templateFieldsFor;
                        }
                    }
                }
            } else if ( (templateFields[x].type.localeCompare('int') === 0 || templateFields[x].type.localeCompare('decimal') === 0) && (templateFields[x].min !== templateFields[x].max || (templateFields[x].min === templateFields[x].max &&  0 !== templateFields[x].max)) ) {
                for (let i = clone.length-1; i >= 0; i--) {
                    templateFieldsFor:
                    for (let j = 0; j < clone[i].values.length; j++) {
                        if(clone[i].values[j][templateFields[x].name.toLowerCase()] < templateFields[x].min || clone[i].values[j][templateFields[x].name.toLowerCase()] > templateFields[x].max) {
                            clone.splice(i, 1);
                            break templateFieldsFor;
                        }
                    }
                }
            }
        }
        setTemplates(clone);
    };

    return (
        <Modal show={showSearchModal} onClose={onCloseSearchModal}>
            <div className="padding-inside-box" style={{height: '100%', width: '100%', padding: '0 5%'}}>
                {
                    templateFields.map((templateField, index) => {
                        if(templateField.type.localeCompare('string') === 0) {
                            return <div className="form-group" key={templateField.ID}>
                                        <label style={{display: 'inline-block', width: '20%'}}>{templateField.name}</label>
                                        <input type="text" value={templateField.searchValue} onChange={(e) => onChangeTemplateField(e, index)} style={{display: 'inline-block', width: '75%'}}/>
                                        <br/><br/>
                                    </div>
                        } else if(templateField.type.localeCompare('int') === 0) {
                            return <div className="form-group" key={templateField.ID}>
                                        <label style={{display: 'inline-block', width: '20%'}}>{templateField.name}</label>
                                        <label style={{display: 'inline-block', width: '10%'}}>Mínimo</label>
                                        <input type="number" step="1" placeholder="minimo" value={templateField.min} onChange={(e) => onChangeTemplateFieldMin(e, index)} style={{display: 'inline-block', width: '25%'}}/>
                                        <label style={{display: 'inline-block', width: '10%'}}>Máximo</label>
                                        <input type="number" step="1" placeholder="minimo" value={templateField.max} onChange={(e) => onChangeTemplateFieldMax(e, index)} style={{display: 'inline-block', width: '25%'}}/>
                                        <br/><br/>
                                    </div>
                        } else if(templateField.type.localeCompare('decimal') === 0) {
                            return <div className="form-group" key={templateField.ID}>
                                        <label style={{display: 'inline-block', width: '20%'}}>{templateField.name}</label>
                                        <label style={{display: 'inline-block', width: '10%'}}>Mínimo</label>
                                        <input type="number" step="0.01" value={templateField.min} onChange={(e) => onChangeTemplateFieldMin(e, index)} style={{display: 'inline-block', width: '25%'}}/>
                                        <label style={{display: 'inline-block', width: '10%'}}>Máximo</label>
                                        <input type="number" step="0.01" value={templateField.max} onChange={(e) => onChangeTemplateFieldMax(e, index)} style={{display: 'inline-block', width: '25%'}}/>
                                    </div>
                        } else {
                            return null;
                        }
                    })
                }
                <br/>
                <div className="flex-justify-align">
                    <button onClick={search}>Buscar</button>
                    <button onClick={() => setTemplates(templates)}>Refrescar</button>
                </div>
            </div>
        </Modal>
    );
}

export default SearchInput;