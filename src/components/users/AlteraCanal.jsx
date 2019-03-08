import React, { Component } from 'react';
import Main from '../templates/Main'
import api from '../users/api.js'
import axios from 'axios'

const headerProps = {
    icon: 'wifi',
    title: 'Gerenciamento de ONUs',
    subtitle: 'Cadastro de ONUs: Inclui, Lista, Altera e Exclui.'
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
    novoCanal: ''
}

export default class AlteraCanal extends Component {
    
    state = {...initialState}

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    trocarCanal = async () => {
        //var valormac = document.getElementById('mac').value
        let canal = document.getElementById('canal')
        let valorcanal = canal.options[canal.selectedIndex].value;
        console.log(valorcanal)
        //var resposta = await api.get('/roteador/trocarsenha/' + valormac + '/' + valorcanal)
        //console.log(resposta)
        
    }

    /*trocarCanal(user,canal){
        let novoCanal = canal.options[canal.selectedIndex].value;
        api.get(`http://192.168.2.126:8080/TesteWebservice/roteador/trocarcanal/${user.mac}/${novoCanal}`)
            .then(function(response){
                console.log(response.data); // ex.: { user: 'Your User'}
                console.log(response.status); // ex.: 200
            });
    }*/

    teste = async () => {
        let resp = await api.get();
        //this.setState({list: resp.data})
        console.log(resp.data);
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
                            id="mac"
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
            <th>Alterar Canal</th>
            <hr/>
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Canal*</label>
                        <select type="text" 
                            className="form-control" 
                            id="canal">
                                <option value="" defaultValue > Selecione o novo canal... </option>
                                <option value="canal1"> Canal 1: 2.412 MHz </option>
                                <option value="canal2"> Canal 2: 2.417 MHz </option>
                                <option value="canal3"> Canal 3: 2.422 MHz </option>
                                <option value="canal4"> Canal 4: 2.427 MHz </option>
                                <option value="canal5"> Canal 5: 2.432 MHz </option>
                                <option value="canal6"> Canal 6: 2.437 MHz </option>
                                <option value="canal7"> Canal 7: 2.442 MHz </option>
                                <option value="canal8"> Canal 8: 2.447 MHz </option>
                                <option value="canal9"> Canal 9: 2.452 MHz </option>
                                <option value="canal10"> Canal 10: 2.457 MHz </option>
                                <option value="canal11"> Canal 11: 2.462 MHz </option>
                                <option value="canal12"> Canal 12: 2.467 MHz </option>
                                <option value="canal13"> Canal 13: 2.472 MHz </option>
                        </select>
                    </div>
                </div>
            </div>
            <label className="col-14 d-flex justify-content-end">* <span className="text-danger"> Campos obrigatórios</span></label>
            <hr/>
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-primary"
                        onClick={() => this.trocarCanal()}
                        /*onClick={e => this.save(e)}*/>
                        Aplicar alteração
                    </button>
                    <button className="btn btn-secondary ml-2"
                        onClick={e => this.clear(e)}>
                        Cancelar
                    </button>
                    <button className="btn btn-secondary ml-2"
                        onClick={() => this.teste()}>
                        Teste
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