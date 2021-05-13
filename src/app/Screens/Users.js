import React, {useState, useEffect} from 'react';
import Swal from "sweetalert2";

import usersService from '../api/users';

const AddProduct = () => {

    const [users, setUsers] = useState([]);

    const [newName, setNewName] = useState('');
    const changeNewName = (e) => {
        setNewName(e.target.value);
    }
    const [newUserName, setNewUserName] = useState('');
    const changeNewUserName = (e) => {
        setNewUserName(e.target.value);
    }
    const [newPassword, setNewPassword] = useState('');
    const changeNewPassword = (e) => {
        setNewPassword(e.target.value);
    }

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async (index) => {
        await usersService.get('/')
        .then(function (response) {
            // handle success
            setUsers(response.data.users);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    const updateField = (e, index, field) => {
        let clone = [...users];
        clone[index][field] = e.target.value;
        setUsers(clone);
    }

    const editUser = async (index) => {
        await usersService.put('/', users[index], {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            // handle success
            Swal.fire({
                title: `Éxito`,
                text: 'Usuario modificado con exito',
                type: "success",
                confirmButtonColor: "#D9272E",
                imageHeight: 200,
            });
            getUsers();
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    const deactivateUser = async (index) => {
        await usersService.put('/deactivate', users[index], {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            // handle success
            Swal.fire({
                title: `Éxito`,
                text: 'Usuario desactivado con exito',
                type: "success",
                confirmButtonColor: "#D9272E",
                imageHeight: 200,
            });
            getUsers();
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    const saveUser = async (index) => {
        let user = {
            name: newName,
            username: newUserName,
            password: newPassword
        }
        await usersService.post('/', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            // handle success
            getUsers();
            setNewName('');
            setNewUserName('');
            setNewPassword('');
            Swal.fire({
                title: `Éxito`,
                text: 'Usuario creado con exito',
                type: "success",
                confirmButtonColor: "#D9272E",
                imageHeight: 200,
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    return (
        <div className="dashboard-body" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{minWidth: '70%', backgroundColor: '#F0F3F8'}}>
                <br/><br/>
                <div className="form-group">
                    <div className="col-50" style={{fontWeight: 'bold', fontSize: '2em'}}>Usuarios:</div>
                </div>
                <br/>
                <table style={{width: "100%"}}>
                    <tr>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Contraseña</th>
                        <th></th>
                        <th></th>
                    </tr>
                        {
                            registries.map((registry, index) => {
                                return  <tr>
                                            <td> <input defaultValue={registry.name} onChange={(e) => updateField(e, index, 'username')}/> </td>
                                            <td> <input defaultValue={registry.username} onChange={(e) => updateField(e, index, 'username')}/> </td>
                                            <td> <input onChange={(e) => updateField(e, index, 'password')}/> </td>
                                            <td> <button onClick={() => editUser(index)}>EDITAR</button> </td>
                                            <td> <button onClick={() => deactivateUser(index)}>DESACTIVAR</button> </td>
                                        </tr>
                            })
                        }
                        <tr>
                            <td> <input value={newName} onChange={changeNewName}/> </td>
                            <td> <input value={newUserName} onChange={changeNewUserName}/> </td>
                            <td> <input value={newPassword} onChange={changeNewPassword}/> </td>
                            <td> <button onClick={saveUser}>CREAR</button> </td>
                        </tr>
                </table> 
                <br/>
            </div>
        </div>
    );
}

export default AddProduct;