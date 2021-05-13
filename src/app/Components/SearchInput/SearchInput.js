import React, {useState, useEffect} from 'react';
import glass from './magnifying_glass.png';

const SearchInput = () => {

    const [templateName, setTemplateName] = useState('');

    const onKeyUp = (e) => {
    };

    return (
        <div className="padding-inside-box" style={{height: '100%', width: '100%', borderRadius: '40px', backgroundColor: 'white', padding: '0 5%'}}>
            <div style={{display: 'inline-block', width: '80%', height: '100%', verticalAlign: 'top'}}>
                <div className="flex-justify-align" style={{width: '100%', height: '100%'}}>
                    <input type="text" style={{width: '100%', height: '70%', border: 'none', outline: 'none', fontSize: '1.5em'}}/>
                </div>
            </div>
            <div style={{display: 'inline-block', width: '20%', height: '100%', verticalAlign: 'top'}}>
                <div className="flex-justify-align" style={{width: '100%', height: '100%'}}>
                    <img className="on-hover" src={glass} style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', width: 'auto', height: '65%'}}/>
                </div>
            </div>
        </div>
    );
}

export default SearchInput;