import React, { Component } from 'react';
import Main from '../templates/Main'
import axios from 'axios'
import api from '../users/api.js'
import { Modal } from 'react-bootstrap'

const headerProps = {
    icon: 'key',
    title: 'Gerenciamento de ONUs',
    subtitle: 'Altera SSID e senha. Cadastro de ONUs: Inclui, Lista, Altera e Exclui.'
}

/* 
const baseUrl = '192.168.8.87:8080/TesteWebservice/anm/192.168.8.87/onu'
*/

const baseUrl = 'http://localhost:3001/onu'
const initialState = {
    user: { id: '', mac: '', number: '' , olt: '',pon: '4', slot: '4'},
    list: [],
    meumac: '',
    meussid: '',
    show: false
}

export default class UserCrud extends Component {
    
    state = {...initialState}

    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
       

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow() {
        this.setState({ show: true });
    }
    

    trocarSSID = async () => {
        var valormac = document.getElementById('mac').value
        var valorssid = document.getElementById('ssid').value
        var valorsenha = document.getElementById('senha').value
        console.log(valormac);
        console.log(valorssid);
        console.log(valorsenha);
        if(valorssid==""){
            console.log("ssid vazio")
            var resposta = await api.get('/roteador/trocarsenha/' + valormac + '/' + valorsenha)
            console.log(resposta)
        }else if(valorsenha==""){
            console.log("senha vazia")
            var resposta = await api.get('/roteador/trocarssid/' + valormac + '/' + valorssid)
            console.log(resposta)
        }else{
            console.log("Passou direto")
        }
        this.handleShow()
        //axios.get(`http://192.168.2.2:8080/TesteWebservice/roteador/trocarsenha/${user.mac}/${senha}`)
    }
    
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
            <div className="form">
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
                <th>Alterar SSID e senha</th>
                <hr/>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>SSID*</label>
                            <input type="text" 
                                className="form-control" 
                                id="ssid"
                                onChange={(meussid) => this.setState(meussid)}
                                placeholder="Digite o novo SSID..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Senha*</label>
                            <input type="text" 
                                className="form-control" 
                                id="senha"
                                placeholder="Digite a nova senha..." />
                        </div>
                    </div>
                </div>
                <label className="col-14 d-flex justify-content-end">* 
                <span className="text-danger"> Campos obrigatórios</span></label>
                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick= {() => this.trocarSSID()}>
                            Aplicar alteração
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                        <button className="btn btn-secondary ml-2" onClick={this.handleShow}>
                            Launch demo modal
                        </button>
                    </div>
                </div>
            </div>
        )
    } 

    renderPopup(){
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Alteração de SSID e senha</Modal.Title>
                </Modal.Header>
                <Modal.Body>Requisição enviada com sucesso</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary ml-2" onClick={this.handleClose}>
                        Sair
                    </button>
                    <button className="btn btn-primary ml-2" onClick={this.handleClose}>
                        OK
                    </button>
                </Modal.Footer>
            </Modal>
        )
    }

    render() {
        return(
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
                {this.renderPopup()}
            </Main>
        )
    }  
}