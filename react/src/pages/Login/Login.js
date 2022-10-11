import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';

import { Title } from "./Components/Title";
import { Label } from "./Components/Label";
import { Input } from "./Components/Input";


export const Login = () => {
    const [ user, setUser ] = useState('')
    
    const [ password, setPassword ] = useState('')
    const [ passwordError, setPasswordError] = useState(false)
    
    const [ isLogin, setIsLogin] = useState(false)
    const [ hasError, setHasError] = useState(false)

    function handleChange(name, value){
        if(name === 'usuario'){
            setUser(value)
        }else{
            if(value.length<1){
                setPasswordError(true)
            }else{
                setPasswordError(false)
                setPassword(value)
            }
        }
    }


    const Navigate = useNavigate();

    const ifMatch = async (param) => {
        try {

            if(param.user.length >0 && param.password.length >0){
                const response = await fetch(`http://localhost:4000/login/${param.user}`,{
                    method: 'GET',
                });
                const data = await response.json();
                if(param.password === data[0].clave){


                    const response = await fetch(`http://localhost:4000/userLevel/${param.user}`,{
                    method: 'GET',
                    });
                    const data = await response.json();
                    setIsLogin(true);
                    if(data[0].codigo === 1){
                        Navigate("/admin");
                    }else{


                        const response = await fetch(`http://localhost:4000/getId/${param.user}`,{
                        method: 'GET',
                        });
                        const data = await response.json();

                        Navigate(`/vendedor/${data[0].id}`);
                    }
                    
                    
                }else{
                    setIsLogin(false);
                    setHasError(true);
                }
    
            }else{
                console.log(param)
                setIsLogin(false);
                setHasError(true)
            }
        } catch (error) {
            console.log(error);
        }
       
    }


    function handleSubmit(){
        let account = { user, password }
        if(account){
            ifMatch(account);
        }
    }

    return (
        <div className= "login-container" >
            <Title text ="¡Bienvenido!"/>
            { hasError &&
                <label className="label-alert">
                    Su contraseña o usuario son incorrectos, o no existe en nuestra plataforma
                </label>
            }
            <Label text= "Usuario"/>
            <Input attribute={{
                id:'usuario',
                name:'usuario',
                type:'text',
                placeholder:'Ingrese usuario'
            }}
            handleChange={handleChange}
            />
            <Label text= "Contraseña"/>
            <Input attribute={{
                id:'contraseña',
                name:'contraseña',
                type:'password',
                placeholder:'Ingrese contraseña'
            }}
            handleChange={handleChange}
            param={passwordError}
            />

            {passwordError &&
                <label>
                    Contraseña invalida o incompleta
                </label> 
            }
        
            <button onClick={handleSubmit}>
                Ingresar
            </button>
        </div>
    )
}