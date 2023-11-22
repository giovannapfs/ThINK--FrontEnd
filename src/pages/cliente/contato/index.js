import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import MenuLogado from "../../../components/usuarioLogado/MenuLog";
import Footer from '../../../components/Footer';
import { hotjar } from "react-hotjar";
import MaskedInput from 'react-input-mask';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

    const validationSchema = Yup.object({
        nome: Yup.string().min(2, "O nome deve ter pelo menos 2 caracteres").required("Campo obrigatório"),
        email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
        telefone: Yup.string().required("Campo obrigatório"),
        assunto: Yup.string().min(10, "O assunto deve ter no mínimo 10 caracteres").required("Campo obrigatório"),
        mensagem: Yup.string().min(100, "A mensagem deve ter no mínimo 100 caracteres").required("Campo obrigatório"),
    });

    const formik = useFormik({
        initialValues: {
            nome: "",
            email: "",
            telefone: "",
            assunto: "",
            mensagem: "",
        },
        validationSchema: validationSchema,
    });

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
                        <input
                                className="input"
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nome}
                            />
                            {formik.touched.nome && formik.errors.nome ? (
                                <div className="avisoForm">{formik.errors.nome}</div>
                            ) : null}                        </div>
                        <div class="form-group">
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
                            ) : null}                        </div>
                        <div class="form-group">
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
                        <div class="form-group">
                        <input 
                            className="input" 
                            type="text" 
                            id="assunto" 
                            name="assunto" 
                            placeholder="Assunto" 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.assunto} />
                            {formik.touched.assunto && formik.errors.assunto ? (
                                <div className="avisoForm">{formik.errors.assunto}</div>
                            ) : null}   
                        </div>
                        <div class="form-group col-full">
                        <textarea 
                        className="input" 
                        id="mensagem" 
                        name="mensagem" 
                        placeholder="Mensagem" 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.mensagem}
                        ></textarea>
                        {formik.touched.mensagem && formik.errors.mensagem ? (
                                <div className="avisoForm">{formik.errors.mensagem}</div>
                            ) : null}   
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-cadastrar">Enviar</button>
                </form>
            </section>
           
            <Footer/>
        </div>
    );
}
