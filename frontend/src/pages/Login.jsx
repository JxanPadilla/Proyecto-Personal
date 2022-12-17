import { Link, useNavigate } from 'react-router-dom'

import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';
import imgLogin from '../assets/imagen-login.png'
import logo from '../assets/logo.png'
import tienda from '../assets/tienda.png'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const handleSudmit = async (e) => {
        e.preventDefault();
        console.log("Validacion");
        if ([email, password].includes('')) {
            setAlerta({ msg: "Todos los Campos son Obligatorios", error: true });
            return;
        };
        // Auntenticar al usuario
        try {
            const { data } = await clienteAxios.post('usuarios/login', {
                email,
                password
            });
            localStorage.setItem('token', data.token);
            console.log(data);
            // Validar la redireccion
            setAuth(data);
            navigate('/perfil');
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }
    const { msg } = alerta;
    return (
        <div className='flex w-full'>
            <div className='flex flex-col justify-center items-center lg:w-2/4 mr-10 md:flex-row '>
                {/* <img src={tienda} alt="imagen login" className='relative w-0 md:w-1/2 lg:w-0 sm:w-0' /> */}
                <div>
                    <img src={logo} alt="imagen login" className='mb-9' />
                    <h1 className='font-bold text-5xl uppercase text-center md:w-2/3 mx-auto'>Ingresa para realizar tu <span className='text-blue-400'>compra</span></h1>
                    <form
                        className='p-4 mx-auto w-96 sm:px-9 mt-8 shadow-md'
                        onSubmit={handleSudmit}
                    >
                        {msg && <Alerta
                            alerta={alerta}
                        />
                        }
                        <div className='mb-5'>
                            <label htmlFor="email" className='font-medium'>Email</label>
                            <input
                                type="email"
                                id="email"
                                className='block placeholder-slate-400 p-2 w-full bg-slate-100 rounded-md'
                                placeholder='ej: correo@correo.com'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='mb-5'>
                            <label htmlFor="password" className='font-medium'>Password</label>
                            <input
                                type="password"
                                id="password"
                                className='block placeholder-slate-400 p-2 w-full bg-slate-100 rounded-md'
                                placeholder='*********'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Ingresar"
                            className='uppercase bg-blue-400 text-white p-2 rounded-md w-full hover:bg-blue-600'
                        />
                        <div className='flex justify-between px-4 mt-5 text-slate-500 '>
                            <Link to="/registro" className=' hover:text-blue-400' >No tengo cuenta.</Link>
                            <Link to="/olvide-password" className='hover:text-blue-400  cursor-pointer' >Olvide mi password.</Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className='h-full w-0 bg-sky-500 lg:w-full'>
                <img src={tienda} alt="imagen login" className='h-full w-screen' />
            </div>
        </div>
    )
}
export default Login