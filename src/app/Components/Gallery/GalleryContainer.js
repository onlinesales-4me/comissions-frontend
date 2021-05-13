import React, {useState, useEffect, useRef} from 'react';

const GalleryContainer = ({images}) => {

    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const myRefs = useRef(new Array());

    const imageSelect = (index) => {
        myRefs.current[index].scrollIntoView();
        setActiveImageIndex(index);
    };

    const next = () => {
        let index = activeImageIndex+1;
        if(index >= images.length)
            index = 0;
        myRefs.current[index].scrollIntoView();
        setActiveImageIndex(index);
    };

    const prev = () => {
        let index = activeImageIndex-1;
        if(index < 0)
            index = images.length-1;
        myRefs.current[index].scrollIntoView();
        setActiveImageIndex(index);
    };

    return (
        <div style={{height: '100%', width: '100%'}}>
            <div style={{display: 'inline-block', width: '100%', height: '60%'}}>
                <div style={{display: 'inline-block', width: '10%', height: '100%', verticalAlign: 'top'}}>
                    <div onClick={prev} className="flex-justify-align on-hover" style={{width: '100%', height: '100%', backgroundColor: '#9e9e9e'}}>
                        <p style={{fontSize: '2em'}}>{'<'}</p>
                    </div>
                </div>
                <div style={{display: 'inline-block', width: '80%', height: '100%', verticalAlign: 'top'}}>
                    <img src={images[activeImageIndex]} style={{height: '100%', width: '100%', objectFit: 'cover'}}/>
                </div>
                <div style={{display: 'inline-block', width: '10%', height: '100%', verticalAlign: 'top'}}>
                    <div onClick={next} className="flex-justify-align on-hover" style={{width: '100%', height: '100%', backgroundColor: '#9e9e9e'}}>
                        <p style={{fontSize: '2em'}}>{'>'}</p>
                    </div>
                </div>
            </div>
            <div style={{display: 'inline-block', width: '100%', height: '40%', overflowX: 'auto', whiteSpace: 'nowrap'}}>
                {
                    images.map((image, index) => {
                        return  <div ref={(img) => myRefs.current.push(img)} onClick={() => imageSelect(index)} className="padding-inside-box" style={{display: 'inline-block', width: '33%', height: '100%', border: (index===activeImageIndex?'5px solid #eeeeee':'1px solid black')}} key={index}>
                                    <img className="on-hover" src={images[index]} style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '100%', height: '100%', objectFit: 'cover'}}/>
                                </div>
                    })
                }
            </div>
        </div>
    );
}

export default GalleryContainer;