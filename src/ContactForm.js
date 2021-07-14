import React from 'react';

import './ContactForm.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.contact ? this.props.contact :{name : '',phone : '',email: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.props.contact.name) {
      this.props.updateContact(this.state, this.props.contact);
    }else {
      this.props.createContact(this.state);
    }

  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name] : value
    });
  }

  fetchData(contact) {
    this.setState({
      name : contact.name,
      phone : contact.phone,
      email : contact.email
    });
  }

  componentDidUpdate(prevProps) {
    if(this.props.contact !== prevProps.contact) {
      this.fetchData(this.props.contact);
    }
  }

  render() {
    return(
      <div id="create_contact_container">
          <p id="p_title">{(this.props.contact.name) ? "Editar contato":"Novo contato"}</p>
          <form autoComplete="off" onSubmit={this.handleSubmit}>
             <div id="create_contact">
                   <div className="form_create_container">
                      <label htmlFor="contact_name">
                            <p>Nome</p>
                            <input type="text" name="name" required
                            onChange={this.handleChange} value ={this.state.name} />
                      </label>
                   </div>
                   <div className="form_create_container">
                      <label htmlFor="contact_phone">
                            <p>Telefone celular</p>
                            <input name="phone"
                            onChange={this.handleChange} value ={this.state.phone}/>
                      </label>
                   </div>
                   <div className="form_create_container">
                      <label htmlFor="contact_email">
                            <p>Email pessoal</p>
                            <input name="email"
                            onChange={this.handleChange} value ={this.state.email}/>
                      </label>
                   </div>
                  </div>
                  <div id="buttom_container">
                     <Row style={{marginLeft: '0px', marginRight: '0px'}}>
                         <Col md={6} style={{padding: '0px'}}>
                            <button type="submit" id="btn_save">
                               Salvar
                            </button>
                         </Col>
                         <Col md={6} style={{padding: '0px'}}>
                            <button  onClick={(e)=>this.props.handleClick(null,e)} type="button" id="btn_cancel">
                               Cancelar
                              </button>
                         </Col>
                     </Row>
                   </div>
          </form>
       </div>
    );
  }

}
export default ContactForm;
