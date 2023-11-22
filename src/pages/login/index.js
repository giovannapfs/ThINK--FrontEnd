import React, {useState, useEffect, useHistory} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import MenuLogado from "../../components/usuarioLogado/MenuLog";
import Footer from "../../components/Footer";
import { hotjar } from 'react-hotjar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import '../../styleGlobal.css';
import './index.css';

export default function Login(){
    useEffect(() => {
        hotjar.initialize(3738750, 6);
      }, []);

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
            navigate('/dashboard');
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
                <form class="form login" onSubmit={handleLogin}>
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