import React, {useState, useHistory} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Menu from "../../components/visitante/MenuVisitante";
import MenuLogado from "../../components/usuarioLogado/MenuLog";
import Footer from "../../components/Footer";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import '../../styleGlobal.css';
import './index.css';

export default function Login(){
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [error, setError] = useState();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();

        if(email === "joao@gmail.com"){
            navigate('/');
            setIsUserLoggedIn(true);
        }else if(email === "maria@gmail.com"){
            navigate('/dashboard/administradores');
            setIsUserLoggedIn(true);
        }
    }

    return (
        <div>
           <MenuLogado /> 
            <div className="login-tittle">
                <h1>Lo<span className="span-color">gin</span></h1>
            </div>

            <section className="form-conteiner">
                <form class="form" onSubmit={handleLogin}>
                <FontAwesomeIcon icon={faUser} id="person-icon" />
                    <h4>Login</h4>

                    <div className="conteiner-form-group">
                        <div class="form-group">

                            <input 
                                className="input" 
                                type="email" 
                                id="login" 
                                name="email" 
                                placeholder="E-mail" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                        </div>

                        <div class="form-group">
                            <input 
                                className="input" 
                                type="password" 
                                id="senha" 
                                name="senha" 
                                placeholder="Senha" 
                                required 
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                />
                        </div>
                        <p> <Link to="/signup"><strong>Esqueceu a senha?</strong></Link> </p>

                    </div>

                    <button type="submit" class="btn-entrar">Entrar</button>
                    {error && <p className="error-message">{error}</p>}
                    
                    <p> Não possui conta? <Link to="/signup"><strong>Cadastrar-se</strong></Link> </p>

                </form>
            </section>
            <Footer/>
        </div>
    );
}