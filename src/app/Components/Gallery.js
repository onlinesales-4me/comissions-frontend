import React, {useState} from 'react';

const Gallery = ({images, showGallery, setShowGallery}) => {

    /* const [productImages, setProductImages] = useState([
        logo1, logo2, logo3, logo4
    ]); */

    const [index, setIndex] = useState(0);
    const changeIndexLeft = () => {
        if(index === 0)
            setIndex(images.length-1);
        else
            setIndex(index-1);
    }
    const changeIndexRight = () => {
        if(index === images.length-1)
            setIndex(0);
        else
            setIndex(index+1);
    }

    if(showGallery) {
        return (
            <div onClick={() => setShowGallery(false)} style={{height: '100vh', width: '100vw', backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0}}>
                <div style={{display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top'}}>
                    <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', verticalAlign: 'top'}}>
                        <div className="on-hover" style={{backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid black', fontSize: '3em', fontWeight: 'bold', color: 'white'}} onClick={(e) => {e.stopPropagation(); changeIndexLeft();}}>{'<'}</div>
                    </div>
                </div>
                {/* <div style={{display: 'inline-block', height: '100%', width: '80%'}}>
                    <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src={productImages[index]} style={{width: '100%', height: 'auto'}} onClick={(e) => {e.stopPropagation()}}/>
                    </div>
                </div> */}
                <div style={{display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top'}}>
                    <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div className="on-hover" style={{backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid black', fontSize: '3em', fontWeight: 'bold', color: 'white'}} onClick={(e) => {e.stopPropagation(); changeIndexRight();}}>{'>'}</div>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default Gallery;