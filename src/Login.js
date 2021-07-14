import React from 'react';
import './Login.css';
import Auth from './Auth';
import {Redirect, withRouter} from 'react-router';
import { NavLink } from 'react-router-dom'


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';

import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username:'',password:'',errors:{},loading:false,response:null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        let err = {}
        if(this.props.location.state)this.props.location.state.created = undefined
        if(this.state.username && this.state.password) {
            this.setState({loading: true})
            Auth.authenticate(this.state.username, this.state.password)
            .then(res => res.json())
            .then(res => {
                this.setState({loading:false})
                if(res.status) {
                    this.setState({response: res.status})
                }else {
                localStorage.setItem('token',res.token)
                Auth.isAuthenticated = true
                this.props.history.push('/')
                }
    
            }).finally(() => {})
        }else {
            if(!this.state.username) {
                err["name"] = 'insira um usuário'
            }
            if(!this.state.password) {
                err["password"] = 'insira uma senha'
            }

            this.setState({errors: err})
        }


        
        //alert(`Usuario: ${this.state.username} Senha: ${this.state.password}`);
        
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name] : value
        })
    }
    render() {
        if(localStorage.getItem('token'))return(<Redirect to="/"/>);
        return(
            <div id="login">
                <Container fluid>
                    <Row>
                        <Col md={8}>
                            <div className="contact-icon-container">
                            <PermContactCalendarIcon style={{fontSize: 200, color: '#929090'}} />
                            <div className="contact-title">Contatos</div>
                            </div>

                        </Col>
                        <Col md={4} style={{borderLeft:'1px solid #929090',height:'100vh'}}>
                            <div className="login-form-container">
                                <form onSubmit={this.handleSubmit}>
                                <h1>Login</h1>
                                {this.state.loading &&
                                    <span>Carregando...</span>
                                }
                                {this.state.response &&
                                    <span style={{color : 'red'}}>{this.state.response}</span>
                                }
                                {this.props.location.state &&
                                    <span>{this.props.location.state.created}</span>
                                }

                                <div className="input-container">
                                {this.state.errors.name &&
                                    <span style={{color:"red"}}>{this.state.errors["name"]}</span>
                                }
                                    <input name="username" style={{borderColor: this.state.errors.name ? 'red': ''}} value={this.state.username} onChange={this.handleChange} placeholder="Usuário"/>
                                </div>
                                <div className="input-container">
                                {this.state.errors.password &&
                                    <span style={{color:"red"}}>{this.state.errors["password"]}</span>
                                }
                                    <input name="password" type="password" style={{borderColor: this.state.errors.password ? 'red': ''}} value={this.state.password} onChange={this.handleChange} placeholder="Senha"/>
                                </div>
                                <div className="input-container">
                                    <Button type="submit" variant="outline-secondary">Entrar</Button>{' '}
                                </div>
                                </form>
                                <div style={{textAlign:'center', marginTop: '4em'}}><NavLink style={{ textDecoration: 'none' }} exact to='/signup'>Criar conta</NavLink></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    };
}

export default withRouter(Login);