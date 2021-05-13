import React, {useState} from 'react';
import Cookies from 'universal-cookie';

import userService from '../api/users';

const Login = ({setLoggedIn}) => {

    const cookies = new Cookies();

    const [username, setUsername] = useState('');
    const changeUsername = (e) => {
        setUsername(e.target.value)
    };
    const [password, setPassword] = useState('');
    const changePassword = (e) => {
        setPassword(e.target.value)
    };

    const login = async () => {
        let user = {
            username: username,
            password: password
        }
        await userService.post('/login', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            // handle success
            console.log(response);
            cookies.set("jwt", response.data.accessToken, { maxAge: 60 * 30 });
            setLoggedIn(true);
            setTimeout(() => {
                cookies.remove("jwt");
                setLoggedIn(false);
            }, 1000 * 60 * 30);
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
                    <label className="label-form">Nombre de Usuario:</label>
                    <input type="text" className="input-form" value={username} onChange={changeUsername} style={{height: '2em', fontSize: '1.5em'}}/>
                </div>
                <div className="form-group">
                    <label className="label-form">Contraseña:</label>
                    <input type="password" className="input-form" value={password} onChange={changePassword} style={{height: '2em', fontSize: '1.5em'}}/>
                </div>
                <br/>
                <div className="flex-justify-align">
                    <button onClick={login}>INICIAR SESION</button>
                </div>
                <br/>
            </div>
        </div>
    );
}

export default Login;