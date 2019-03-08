import './Nav.css'
import React from 'react';
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home mr-2"></i> Início
            </Link>
            <Link to="/listaonu">
                <i className="fa fa-list mr-2"></i> Lista de ONUs
            </Link>
            <Link to="/users">
                <i className="fa fa-key mr-2"></i> Alterar SSID e senha
            </Link>
            <Link to="/canal">
                <i className="fa fa-wifi mr-2"></i> Alterar Canal
            </Link>
            <Link to="/ppoe">
                <i className="fa fa-user mr-2"></i> Configuração PPoE
            </Link>
            <Link to="/onoff">
                <i className="fa fa-power-off mr-2"></i> Habilita/Desabilita ONU
            </Link>
        </nav>
    </aside>