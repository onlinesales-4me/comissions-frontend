import React, {useState, useEffect} from 'react';
import axios from 'axios';

import EditorConvertToHTML from './EditorConvertToHTML';

const AddProduct = ({router}) => {

    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    /* const [productImages, setProductImages] = useState([
        logo1, logo2, logo3, logo4
    ]); */

    const [pic, setPic] = useState();

    const changeProductName = (e) => {
        setProductName(e.target.value)
    };
    
    const changeProductDescription = (value) => {
        setProductDescription(value);
    };

    useEffect(() => {
        console.log("productDescription", productDescription);
    }, [productDescription]);

    const onChangeFile = (e) => {
        var files = e.target.files;
        console.log(files);
        var filesArr = Array.prototype.slice.call(files);
        console.log(filesArr);
        setPic(filesArr[0]);
    }

    const uploadPic = () => {
        let formData = new FormData();
        formData.append('pic', pic, 'pic');
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

    return (
        <div className="dashboard-body" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: '70%', backgroundColor: '#F0F3F8'}}>
                <br/><br/>
                <div className="form-group">
                    <label className="label-form">Nombre del Producto:</label>
                    <input type="text" className="input-form" value={productName} onChange={changeProductName} style={{height: '2em', fontSize: '1.5em'}}/>
                </div>
                <br/>
                <div className="form-group">
                    <label>Descripción:</label>
                    <EditorConvertToHTML
                        style={{with: '90%'}}
                        getHTML={changeProductDescription}
                    />
                </div>
                <br/>
                <div className="form-group">
                    <label>Imagenes:</label>
                    <input type="file" name="pic" className="input-form" onChange={onChangeFile}/>
                    {/* {
                        productImages.map((image, index) => {
                            return <img src={image} className="img-form"/>
                        })
                    } */}
                </div>
                <br/>
                <div className="flex-justify-align">
                    <button onClick={uploadPic}>UPLOAD PIC</button>
                </div>
                <br/>
                <form action="http://localhost:8000/upload" method="post" enctype="multipart/form-data">
                    <input type="file" accept="image/*" name="photo"/>
                    <input type="submit" value="upload"/>
                </form>
                <br/>
            </div>
        </div>
    );
}

export default AddProduct;