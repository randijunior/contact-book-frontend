import React from 'react';
import './SignUp.css';
import {/*Redirect,*/ withRouter} from 'react-router';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import Button from 'react-bootstrap/Button';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state ={username:'', password:'',confirm:'',errors:{},loading:false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){
         event.preventDefault();
        let err = {}
        if(this.state.password !== '' && this.state.confirm !== '' && this.state.username !== '' && this.state.confirm === this.state.password && !(/^\d+$/.test(this.state.username))) {
            this.setState({errors: {}})
            this.setState({loading:true})
            fetch("https://contact-book-api-heroku.herokuapp.com/register",{
                "method": "post",
                "headers": {"content-type": "application/json","accept": "application/json"},
                "body": JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })
            .then(res => res.json())
            .then(res => {
                this.setState({loading:false})
                if(res.status) {
                    err["status"] = res.status
                    this.setState({errors: err })
                }else {
                    this.props.history.push({pathname:'/login',state: {created: 'Conta criada com sucesso!'}})
                }
            })
            .catch(err => console.log(err))

            //console.log(`Usuario: ${this.state.username} Senha: ${this.state.password} Confirm: ${this.state.confirm}`);
        }

        if((/^\d+$/.test(this.state.username))) {
            err["name"] = 'nome de usuario invalido'
        }

        if(!this.state.username) {
            err["name"] = 'insira um nome'
        }

        if(!this.state.password) {
            err["password"] = 'insira uma senha'
        }

        if(this.state.confirm !== this.state.password) {
            err["confirm"] = 'senhas não conferem'
        }

        this.setState({errors : err})

       
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
        return (
            <div id="signup">
                <Container fluid="md">
                    <Row>
                        <Col>
                            <div className="ceate-account">
                                <div className="form-container">
                                    <form onSubmit={this.handleSubmit}>
                                        <h1>Criar Conta</h1>
                                        {this.state.loading &&
                                            <span style={{color:"#929090"}}>Carregando...</span>
                                        }
                                        {this.state.errors.status &&
                                            <span style={{color:"red"}}>{this.state.errors["status"]}</span>
                                        }
                                        <div className="input-container">
                                        {this.state.errors.name &&
                                            <span style={{color:"red"}}>{this.state.errors["name"]}</span>
                                        }
                                        <input name="username" style={{borderColor: this.state.errors.name ? 'red': ''}} value={this.state.username} onChange={this.handleChange} autoComplete="off" placeholder="Usuário" />
                                        </div>
                                        <div className="input-container">
                                        {this.state.errors.password &&
                                            <span style={{color:"red"}}>{this.state.errors["password"]}</span>
                                        }
                                            <input style={{borderColor: this.state.errors.password ? 'red': ''}} type="password" value={this.state.password} onChange={this.handleChange} name="password" placeholder="Senha" />
                                        </div>
                                        <div className="input-container">
                                        {this.state.errors.confirm &&
                                            <span style={{color:"red"}}>{this.state.errors["confirm"]}</span>
                                        }                                        
                                            <input style={{borderColor: this.state.errors.confirm ? 'red': ''}} type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} placeholder="Confirmar senha" />
                                        </div>
                                        <div className="button-container">
                                            <Button type="submit" variant="outline-secondary">Criar</Button>{' '}
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </Col>
                    </Row>

                </Container>
            </div>
        )
    }
}

export default withRouter(SignUp);