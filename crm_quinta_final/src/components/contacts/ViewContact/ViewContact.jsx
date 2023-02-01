import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

const ViewContact = () => {

    let { contactId } = useParams();

    let [state, setState] = useState({
        loading: false,
        contact: {},
        errorMessage: '',
        group: {}
    });

    useEffect(() => {
        async function fetchData() {
            try {
                setState({ ...state, loading: true });
                let response = await ContactService.getContact(contactId);
                let groupResponse = await ContactService.getGroup(response.data);
                setState({
                    ...state,
                    loading: false,
                    contact: response.data,
                    group: groupResponse.data
                });
            } catch (error) {
                setState({
                    ...state,
                    loading: false,
                    errorMessage: error.message
                });
            }
        }
        fetchData();
    }, [contactId]);

    let { loading, contact, errorMessage, group } = state;

    return (
        <React.Fragment>
            <section className="view-contact-intro w-auto  ">
                <div className="container d-flex flex-column justify-content-center align-items-center">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-warning fw-bold p-1">Visualizar Contato</p>
                            <p className="fst-italic">Este é o perfil de {contact.name}, grupo {group.name}</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner /> : <React.Fragment>
                    {
                        Object.keys(contact).length > 0 && Object.keys(group).length > 0 &&
                        <section className="view-contact ">
                            <div className="container  d-flex flex-column justify-content-center align-items-center ">
                                <div className="row d-flex flex-column">
                                    <div className="col-md-4 ">
                                        <img src={contact.photo} alt="" className='img-fluid contact-img' />
                                    </div>
                                    <div className="col-md-8">
                                        <ul className="list-group">
                                            <li className="list-group-item list-group-item-action">
                                                Name: <span className="fw-bold">{contact.name}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Telefone: <span className="fw-bold">{contact.mobile}</span>
                                            </li><li className="list-group-item list-group-item-action">
                                                Email: <span className="fw-bold">{contact.email}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Empresa: <span className="fw-bold">{contact.company}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Titulo: <span className="fw-bold">{contact.title}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Grupo: <span className="fw-bold">{group.name}</span>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="col">
                                        <Link to={'/contacts/list'} className="btn btn-warning" >Voltar</Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    }
                </React.Fragment>
            }

        </React.Fragment>
    )
};

export default ViewContact