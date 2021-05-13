import React, {useState, useEffect} from 'react';

const ListGalleryContainer = ({list}) => {

    const [activeItem, setActiveItem] = useState({text: '', index: 0, url: ''});

    const selectItem = (index) => {
        setActiveItem({text: list[index].text, url: list[index].url, index: index});
    };

    return (
        <div style={{height: '100%', width: '100%'}}>
            <div style={{display: 'inline-block', width: '50%', height: '100%', verticalAlign: 'top'}}>
                {
                    list.map((item, index) => {
                        return <div className="on-hover" onClick={() => selectItem(index)} style={{display: 'inline-block', height: '2em', width: '50%'}} key={index}>
                                    <p style={{textDecoration: (index===activeItem.index?'underline':'none'), color: '#010033'}}>{item.text}</p>
                                </div>
                    })
                }
            </div>
            <div style={{display: 'inline-block', width: '50%', height: '100%', verticalAlign: 'top'}}>
                <div className="flex-justify-align" style={{width: '100%', height: '100%'}}>
                    <img className="on-hover" src={activeItem.url} style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '100%', height: 'auto'}}/>
                </div>
            </div>
        </div>
    );
}

export default ListGalleryContainer;