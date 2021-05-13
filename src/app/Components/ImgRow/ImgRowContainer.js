import React from 'react';

const ImgRowContainer = ({images}) => {

    return (
        <div style={{display: 'inline-block', width: '100%', height: '40%', overflowX: 'auto', whiteSpace: 'nowrap'}}>
            {
                images.map((image, index) => {
                    return  <div className="padding-inside-box" style={{display: 'inline-block', width: '33%', height: '100%', border: '1px solid black'}}>
                                <img className="on-hover" src={image} style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '100%', height: '100%', objectFit: 'cover'}}/>
                            </div>
                })
            }
        </div>
    );
}

export default ImgRowContainer;