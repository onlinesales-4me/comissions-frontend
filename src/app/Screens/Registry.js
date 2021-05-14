import React, {useState, useEffect} from 'react';
import registriesService from '../api/registries';

const AddProduct = ({router}) => {

    const [registries, setRegistries] = useState([]);

    useEffect( async () => {
        await registriesService.get('http://localhost:8000/registries')
        .then(function (response) {
            // handle success
            setRegistries(response.data.registries);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }, []);

    const formatDate = (date) => {
        return date.split('-')[2].split('T')[0]+'/'+date.split('-')[1]+'/'+date.split('-')[0]+' '+date.split('-')[2].split('T')[1].split(':')[0]+':'+date.split('-')[2].split('T')[1].split(':')[1]+':'+date.split('-')[2].split('T')[1].split(':')[2].split('.')[0];
    }

    return (
        <div className="dashboard-body" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{minWidth: '70%', backgroundColor: '#F0F3F8'}}>
                <br/><br/>
                <div className="form-group">
                    <div className="col-50" style={{fontWeight: 'bold', fontSize: '2em'}}>Registros:</div>
                </div>
                <br/>
                <table style={{width: "100%"}}>
                    <tr>
                        <th>Dirección IP</th>
                        <th>Descripción</th>
                        <th>Fecha</th>
                    </tr>
                        {
                            registries.map((registry, index) => {
                                return  <tr>
                                            <td>{registry.ip}</td>
                                            <td>{registry.description}</td>
                                            <td>{formatDate(registry.date)}</td>
                                        </tr>
                            })
                        }
                </table> 
                <br/>
            </div>
        </div>
    );
}

export default AddProduct;