import React, {useState, useEffect} from "react";
import Modal from 'react-modal';
import MenuLogado from "../../../../components/usuarioLogado/MenuLog";
import Footer from '../../../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEdit, faUser } from '@fortawesome/free-solid-svg-icons';
import { hotjar } from 'react-hotjar';
import MaskedInput from 'react-input-mask';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useNavigate } from "react-router-dom";

import '../../../../styleGlobal.css';
import './index.css';

export default function MinhasInformacoes(){
    useEffect(() => {
        hotjar.initialize(3738750, 6);
    }, []);
    
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [client, setClient] = useState({
        nome: "Felipe Souza",
        email: "felipe@gmail.com",
        telefone: "(11) 99999-9999",
        idade: 18,
        senha: "1234"
    });
    
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [senha, setSenha] = useState(client.senha);
    

    const toggleSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };

    const openModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const validationSchema = Yup.object({
        nome: Yup.string().min(2, "O nome deve ter pelo menos 2 caracteres").required("Campo obrigatório"),
        email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
        telefone: Yup.string().required("Campo obrigatório"),
        idade: Yup.number().min(18, "A idade deve ser igual ou maior que 18").required("Campo obrigatório"),
    });

    const formik = useFormik({
        initialValues: {
            nome: client.nome,
            email: client.email,
            telefone: client.telefone,
            idade: client.idade,
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log('Formulário enviado com os valores:', values);
            closeModal();
        },
    });
    
    return(
        <div className="container perfil-container">
            <MenuLogado /> 
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                id="modal-info"
                contentLabel="Detalhes da Tatuagem"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    },
                    content: {
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        border: "none",
                        backgroundColor: "transparent",
                        height: '100%'
                    },
                }}
            >
                
                <form className="form modal-form" onSubmit={formik.handleSubmit}>
                    <FontAwesomeIcon icon={faUser} id="person-icon" alt="Icon de usuário"/>
                    <h4>Atualizar informações</h4>
                    <div className="container-form-group info-container">
                        <div className="form-group info-perfil">
                            <label htmlFor="nome">Nome:</label>
                            <input
                            className="input"
                            type="text"
                            id="nome"
                            name="nome"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.nome}
                            />
                            {formik.touched.nome && formik.errors.nome ? (
                                <div className="avisoForm">{formik.errors.nome}</div>
                            ) : null}
                        </div>
                        <div className="form-group info-perfil">
                            <label htmlFor="email">Email:</label>
                            <input
                                className="input"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="E-mail"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="avisoForm">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="form-group info-perfil">
                            <label htmlFor="telefone">Telefone:</label>
                            <MaskedInput
                                className="input"
                                type="tel"
                                id="telefone"
                                name="telefone"
                                placeholder="Telefone"
                                mask="(99) 99999-9999"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.telefone}
                            />
                            {formik.touched.telefone && formik.errors.telefone ? (
                                <div className="avisoForm">{formik.errors.telefone}</div>
                            ) : null}
                        </div>
                        <div className="form-group info-perfil">
                            <label htmlFor="idade">Idade:</label>
                            <input
                                className="input"
                                type="number"
                                id="idade"
                                name="idade"
                                placeholder="Idade"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.idade}
                            />
                            {formik.touched.idade && formik.errors.idade ? (
                                <div className="avisoForm">{formik.errors.idade}</div>
                            ) : null}
                        </div>
                    </div>

                    <div className="flex">
                        <button type="submit" className="btn btn-salvar">Salvar</button>
                        <button className="btn btn-cancelar" onClick={closeModal}>Cancelar</button>
                    </div>
                </form>

            </Modal>

            <div className="header-image perfil-tittle">
                <h1>Minhas informaç<span className="span-color">ões</span></h1>
            </div>

            <section className="form-container">
                <form class="form form-info">
                    <FontAwesomeIcon icon={faUser} id="person-icon" alt="Icon de usuário"/>
                    <h4>Informações</h4>
                    <div class="container-form-group info-container">
                        <div class="form-group info-perfil">
                            <label for="nome">Nome:</label>
                            <input className="input" type="text" id="nome" value={client.nome} readonly />
                        </div>
                        <div class="form-group info-perfil">
                            <label for="email">Email:</label>
                            <input className="input" type="text" id="email" value={client.email} readonly />
                        </div>
                        <div class="form-group info-perfil">
                            <label for="telefone">Telefone:</label>
                            <input className="input" type="text" id="telefone" value={client.telefone} readonly />
                        </div>
                        <div class="form-group info-perfil">
                            <label for="idade">Idade:</label>
                            <input className="input" type="text" id="idade" value={client.idade + " anos"} readonly />
                        </div>
                        <div class="form-group info-perfil">
                            <label for="telefone">Senha:</label>
                            <div className="input-senha">
                                
                                <input
                                    type={mostrarSenha ? 'text' : 'password'}
                                    id="senha"
                                    value={senha}
                                    readonly
                                />
                                <FontAwesomeIcon
                                    icon={mostrarSenha ? faEyeSlash : faEye}
                                    className="toggle-password"
                                    onClick={toggleSenha}
                                />
                            </div>
                        </div>
                    </div>
                    <button onClick={(e) => openModal(e)} className="btn btn-editar">
                        <FontAwesomeIcon className="editIcon" icon={faEdit } />
                        Editar info
                    </button>
                </form>
            </section>
            <Footer/>
        </div>
    );
}