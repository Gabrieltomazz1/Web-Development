import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';
const EditContact = () => {

    let navigate = useNavigate();

    let { contactId } = useParams();

    let [state, setState] = useState({
        loading: false,
        contact: {
            name: '',
            photo: '',
            mobile: '',
            email: '',
            company: '',
            title: '',
            groupId: ''
        },
        groups: [],
        errorMessage: ''
    });


    useEffect(() => {
        async function fetchData() {
            try {
                setState({ ...state, loading: false });
                let response = await ContactService.getContact(contactId);
                let groupResponse = await ContactService.getGroups();
                setState({
                    ...state,
                    loading: false,
                    contact: response.data,
                    groups: groupResponse.data
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


    let updateInpute = (event) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [event.target.name]: event.target.value
            }
        });
    };

    let submitForm = (event) => {
        async function fetchData() {
            event.preventDefault();
            try {
                let response = await ContactService.updateContact(state.contact, contactId);
                if (response) {
                    navigate('/contacts/list', { replace: true });
                }
            } catch (error) {
                setState({ ...state, errorMessage: error.message });
                navigate(`/contacts/edit/${contactId}`, { replace: false });
            }
        }
        fetchData();
    };

    let { loading, contact, groups, errorMessage } = state;

    return (
        <React.Fragment>
            {loading ? <Spinner /> : <React.Fragment>
                <section className="add-contact p-3">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <p className="h3 text-primary">Editar Contataco</p>
                                <p className="fst-italic">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque, ipsa alias! Repellat libero dignissimos ab architecto illum. Magnam minus, voluptates nihil ad exercitationem, id perspiciatis quidem soluta nemo magni quia?</p>

                            </div>
                        </div>
                        <div className="row align-items-center  ">
                            <div className="col-md-4">
                                <form onSubmit={submitForm}>
                                    <div className="mb-2">
                                        <input
                                            required="true"
                                            name="name"
                                            value={contact.name}
                                            onChange={updateInpute}
                                            type="text" className="form-control" placeholder='Nome' />
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            required="true"
                                            name="photo"
                                            value={contact.photo}
                                            onChange={updateInpute}
                                            type="text" className="form-control" placeholder='Link da imagem' />
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            required="true"
                                            name="mobile"
                                            value={contact.mobile}
                                            onChange={updateInpute}
                                            type="number" className="form-control" placeholder='Numero do telefone' />
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            required="true"
                                            name="email"
                                            value={contact.email}
                                            onChange={updateInpute}
                                            type="email" className="form-control" placeholder='Email' />
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            required="true"
                                            name="company"
                                            value={contact.company}
                                            onChange={updateInpute}
                                            type="text" className="form-control" placeholder='Nome da empresa' />
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            required="true"
                                            name='title'
                                            value={contact.title}
                                            onChange={updateInpute}
                                            type="text" className="form-control" placeholder='Title' />
                                    </div>
                                    <div className="mb-2">
                                        <select
                                            required="true"
                                            name="groupId"
                                            value={contact.groupId}
                                            onChange={updateInpute}
                                            className='form-control'>
                                            <option value="">Selecione um grupo</option>
                                            {
                                                groups.length > 0 &&
                                                groups.map(group => {
                                                    return (
                                                        <option key={group.id} value={group.id}>{group.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <input type="submit" className="btn btn-primary" value="Editar contato" />
                                        <Link to={'/contacts/list'} className="btn btn-dark ms-2">Cancelar</Link>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-6">
                                <img src={contact.photo} alt="" className='img-fluid contact-img' />
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>}

        </React.Fragment>
    )
};

export default EditContact;