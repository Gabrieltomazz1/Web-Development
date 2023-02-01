import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';



let AddContact = () => {

    let navigate = useNavigate();

    let [state, setstate] = useState({
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
        groups: [

        ],
        errorMessage: ''
    });

    let updateInput = (event) => {
        setstate({
            ...state,
            contact: {
                ...state.contact,
                [event.target.name]: event.target.value
            }
        });
    };

    useEffect(() => {
        async function fetchData() {
            try {
                setstate({ ...state, loading: true });
                let response = await ContactService.getGroups();

                setstate({
                    ...state,
                    loading: false,
                    groups: response.data
                });
            } catch (error) {

            }
        }
        fetchData();
    }, []);

    let submitForm = async (event) => {
        event.preventDefault();
        try {
            let response = await ContactService.createContact(state.contact);
            if (response) {
                navigate('/contacts/list', { replace: true });
            }
        } catch (error) {
            setstate({ ...state, errorMessage: error.message });
            navigate('/contacts/add', { replace: false });

        }
    };

    let { loading, contact, groups, errorMessage } = state;

    return (
        <React.Fragment>
            <section className="add-contact p-3  ">
                <div className="container d-flex flex-column align-items-center justify-content-center">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success">Criar Contataco</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 w-100">
                            <form onSubmit={submitForm}>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name="name"
                                        value={contact.name}
                                        onChange={updateInput}
                                        type="text" className="form-control " placeholder="Nome">
                                    </input>
                                </div>
                                <div className="mb-2">
                                    <input
                                        // required={true}
                                        name="photo"
                                        value={contact.photo}
                                        onChange={updateInput}
                                        type="text" className="form-control " placeholder="photo" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name="mobile"
                                        value={contact.mobile}
                                        onChange={updateInput}
                                        type="number" className="form-control" placeholder='Numero do telefone' />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name="email"
                                        value={contact.email}
                                        onChange={updateInput}
                                        type="email" className="form-control" placeholder='Email' />
                                </div>
                                <div className="mb-2">
                                    <input
                                        // required={true}
                                        name="company"
                                        value={contact.company}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder='Nome da empresa' />
                                </div>
                                <div className="mb-2">
                                    <input
                                        // required={true}
                                        name="title"
                                        value={contact.title}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder='Formação' />
                                </div>
                                <div className="mb-2">
                                    <select
                                        required={true}
                                        name="groupId"
                                        value={contact.groupId}
                                        onChange={updateInput}
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
                                    <input type="submit" className="btn btn-success" value="Criar novo contato" />
                                    <Link to={'/contacts/list'} className="btn btn-dark ms-2">Cancelar</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};

export default AddContact

