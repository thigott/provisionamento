import React, { Component } from 'react';
import Main from '../templates/Main'
import axios from 'axios'

const headerProps = {
    icon: 'user',
    title: 'Configuração PPoE',
    subtitle: 'Configurar usuário e senha PPoE. Lista e exclui ONUs.'
}

/*
const baseUrl = '192.168.8.87:8080/TesteWebservice/anm/192.168.8.87/onu'
const initialState = {
    user: {mac: '', number: '', olt: ''},
    list: []
}
*/

const baseUrl = 'http://localhost:3001/onu'
const initialState = {
    user: { id: '', mac: '', number: '' , olt: '',pon: '4', slot: '4'},
    list: [],
    usuarioPPOE: '',
    senhaPPOE: ''
}

export default class PPOE extends Component {
    
    state = {...initialState}

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    configPPOE(user, usuario, senha){
        axios.get(`http://192.168.2.126:8080/TesteWebservice/roteador/configppoe/${user.mac}/${usuario}/${senha}`)
            .then(function(response){
                console.log(response.data); // ex.: { user: 'Your User'}
                console.log(response.status); // ex.: 200
            });
    }

    /*trocassid(){
        axios.get('https://api.github.com/users/' + username)
            .then(function(response){
        console.log(response.data); // ex.: { user: 'Your User'}
        console.log(response.status); // ex.: 200
        }); 
    }*/

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post' //se number(id) for verdadeiro(alteração) então put, caso contrario insira com post.
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method]( url, user )
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }

    load(user) {
        this.setState ({ user })
    }

    remove(user){
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            //const list = this.state.list.filter(u => u !== user)
            this.setState({ list })
        })
    }

    getUpdatedList(user, add=true){
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        //list.unshift(user)
        return list
    }

    updateField(event){
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderTable(){
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>MAC Adress</th>
                        <th>OLT</th>
                        <th>Pon</th>
                        <th>Slot</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

/*
    renderRows(){
        return this.state.list.map( user => {
            return (
                <tr key={user.number}>
                    <td>{user.number}</td>
                    <td>{user.mac}</td>
                    <td>{user.olt}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    renderForm(){
        return (
            <div className='form'>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" 
                                className="form-control" 
                                name="mac"
                                value={this.state.user.mac}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" 
                                className="form-control" 
                                name="olt"
                                value={this.state.user.olt}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>

                    </div>
                </div>
            </div>
        )
    }
*/

renderRows(){
    return this.state.list.map( user => {
        return (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.mac}</td>
                <td>{user.olt}</td>
                <td>{user.pon}</td>
                <td>{user.slot}</td>
                <td>
                    <button className="btn btn-warning"
                        onClick={() => this.load(user)}>
                        <i className="fa fa-retweet"></i>
                    </button>
                    <button className="btn btn-danger ml-2"
                        onClick={() => this.remove(user)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })
}

renderForm(){
    return (
        <div className='form'>
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>MAC Adress*</label>
                        <input type="text" 
                            className="form-control" 
                            name="mac"
                            value={this.state.user.mac}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o MAC Adress..." />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>OLT</label>
                        <input type="text" 
                            className="form-control" 
                            name="olt"
                            value={this.state.user.olt}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o olt..." />
                    </div>
                </div>
            </div>
            <hr/>
            <th>Configurar usuário e senha PPoE</th>
            <hr/>
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Usuário*</label>
                        <input type="text" 
                            className="form-control" 
                            name="usuarioPPOE"
                            value={this.state.usuarioPPOE}
                            placeholder="Digite o usuário PPOE..." />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Senha*</label>
                        <input type="text" 
                            className="form-control" 
                            name="senhaPPOE"
                            placeholder="Digite a senha..." />
                    </div>
                </div>
            </div>
            <label className="col-14 d-flex justify-content-end">* <span className="text-danger"> Campos obrigatórios</span></label>
            <hr/>
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-primary"
                        onClick={e => this.configPPOE(e, this.state.user, this.state.usuarioPPOE, this.state.senhaPPOE)}
                        /*onClick={e => this.save(e)}*/>
                        Aplicar alteração
                    </button>
                    <button className="btn btn-secondary ml-2"
                        onClick={e => this.clear(e)}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}
    
    render() {
        return(
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
    
}