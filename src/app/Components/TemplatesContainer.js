import React, {useState} from 'react';

import SelectTemplate from '../Screens/SelectTemplate';
import Template from '../Screens/Template';
import EditTemplate from '../Screens/EditTemplate';

const TemplatesContainer = ({templates, getTemplates}) => {

    const [currentPage, setCurrentPage] = useState('selectTemplate');
    const [selectedTemplate, setSelectedTemplate] = useState([]);

    if(currentPage.localeCompare('selectTemplate') === 0) {
        return (
            <SelectTemplate setCurrentPage={setCurrentPage} setSelectedTemplate={setSelectedTemplate}  templates={templates}/>
        );
    } else if(currentPage.localeCompare('createTemplate') === 0) {
        return (
            <Template setCurrentPage={setCurrentPage} getTemplates={getTemplates}/>
        );
    } else if(currentPage.localeCompare('editTemplate') === 0) {
        return (
            <EditTemplate setCurrentPage={setCurrentPage} selectedTemplate={selectedTemplate}/>
        );
    }
}

export default TemplatesContainer;