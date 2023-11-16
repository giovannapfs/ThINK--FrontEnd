import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import MenuLogado from "../../../components/usuarioLogado/MenuLog";
import Footer from '../../../components/Footer';
import { hotjar } from "react-hotjar";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import '../../../styleGlobal.css';
import './index.css'
import axios from "axios";

export default function Contato(){
    useEffect(() => {
        hotjar.initialize(3738750, 6);
      }, []);

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    return (
        <div className="container container-contato">
            <MenuLogado />  
            <div className="header-image contato-tittle">
                <h1>Cont<span className="span-color">ato</span></h1>
            </div>

            <section className="form-container">
                <form class="form contato">
                    <FontAwesomeIcon icon={faEnvelope} id="envelope" />
                    <h4>Contato</h4>
                    <div className="container-form-group">
                        <div class="form-group">
                        <input className="input" type="text" id="nome" name="nome" placeholder="Nome" required />
                        </div>
                        <div class="form-group">
                        <input className="input" type="email" id="email" name="email" placeholder="E-mail" required />
                        </div>
                        <div class="form-group">
                        <input className="input" type="tel" id="telefone" name="telefone" placeholder="Telefone" required />
                        </div>
                        <div class="form-group">
                        <input className="input" type="text" id="assunto" name="assunto" placeholder="Assunto" required />
                        </div>
                        <div class="form-group col-full">
                        <textarea className="input" id="mensagem" name="mensagem" placeholder="Mensagem" required></textarea>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-cadastrar">Enviar</button>
                </form>
            </section>
           
            <Footer/>
        </div>
    );
}
