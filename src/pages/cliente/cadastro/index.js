import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import MenuLogado from "../../../components/usuarioLogado/MenuLog";
import Footer from '../../../components/Footer';
import { hotjar } from "react-hotjar";
import MaskedInput from 'react-input-mask';
import logo from "../../../assets/icones/logo-removebg-preview 1.png"

import Modal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import '../../../styleGlobal.css';
import './index.css'

export default function Cadastro(){
    useEffect(() => {
        hotjar.initialize(3738750, 6);
    }, []);

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const closeModal = () => {
       
        setIsModalOpen(false);
    };
    

    //validação de campos de senha
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const validatePassword = (password) => {
        const minLength = 6;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
    
        let error = '';
    
        if (password.length < minLength) {
            error = `A senha deve ter pelo menos ${minLength} caracteres.`;
        } else if (!hasUppercase) {
            error = 'A senha deve conter pelo menos uma letra maiúscula.';
        } else if (!hasLowercase) {
            error = 'A senha deve conter pelo menos uma letra minúscula.';
        } else if (!hasNumber) {
            error = 'A senha deve conter pelo menos um número.';
        }

        setErrorMessage(error);
        setIsPasswordValid(!error);
    };

    const [idade, setIdade] = useState('');


    return (
        <div className="container container-cadastro">
            <MenuLogado /> 
            <div className="header-image cadastro-tittle">
                <h1>Cadas<span className="span-color">tro</span></h1>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                id="modal-cadastro"
                contentLabel="Autenticação de dois fatores"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    },
                    content: {
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        backgroundColor: '#000',
                        height: '80%'
                    },
                }}
            >
                <form>
                    <img src={logo} className="logoModal"/>
                    <h2>Autenticação de dois fatores</h2>
                    <div className="token">
                        <div className="tokenInside">
                            <input type="text" maxLength={1} minLength={1} style={{textAlign: 'center', fontSize: '20px', textTransform: 'uppercase'}}></input>
                            <input type="text" maxLength={1} minLength={1} style={{textAlign: 'center', fontSize: '20px', textTransform: 'uppercase'}}></input>
                            <input type="text" maxLength={1} minLength={1} style={{textAlign: 'center', fontSize: '20px', textTransform: 'uppercase'}}></input>
                        </div>
                        <div className="tokenInside">
                            <input type="text" maxLength={1} minLength={1} style={{textAlign: 'center', fontSize: '20px', textTransform: 'uppercase'}}></input>
                            <input type="text" maxLength={1} minLength={1} style={{textAlign: 'center', fontSize: '20px', textTransform: 'uppercase'}}></input>
                            <input type="text" maxLength={1} minLength={1} style={{textAlign: 'center', fontSize: '20px', textTransform: 'uppercase'}}></input>
                        </div>
                    </div>
                    <p>Uma mensagem com um código de verificação foi enviada para seu e-mail. Insira o código para continuar.</p>
                    <div className="reenvio">
                        <h4>Não recebeu um código de verificação?</h4>
                        <h4 id="reenvio2" >Enviar novamente</h4>
                    </div>
                </form>

            </Modal>
            <section className="form-container">
                <form class="form cadastro">
                <FontAwesomeIcon icon={faUser} id="person-icon" />
                    <h4>Cadastro</h4>
                    <div className="container-form-group">
                        <div class="form-group">
                        
                            <input className="input" type="text" id="nome" name="nome" placeholder="Nome" required />
                        </div>
                        <div class="form-group">
                            
                            <input className="input" type="email" id="email" name="email" placeholder="E-mail" required />
                        </div>
                        <div class="form-group">
                            <MaskedInput
                            className="input"
                            type="tel"
                            id="telefone"
                            name="telefone"
                            placeholder="Telefone"
                            mask="(99) 99999-9999"
                            maskChar="_"
                            required
                            />
                        </div>
                        <div class="form-group">
                            <MaskedInput
                            className="input" 
                            type="text" 
                            id="idade" 
                            name="idade" 
                            placeholder="Idade" 
                            mask="99"
                            maskChar="_"
                            required 
                            />
                        </div>
                        <div class="form-group">
                        <input
                            className="input"
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <p className="avisoForm" style={{ color: 'red' }}>{errorMessage}</p>
                        </div>
                        <p>Já possui conta? Faça <Link to="/signin"><strong>Login</strong></Link></p>
                    </div>
                    
                    <button type="submit" className="btn btn-cadastrar" onClick={(e) => openModal(e)}>Cadastrar</button>
                </form>
            </section>
            <Footer/>
        </div>
        );
}
