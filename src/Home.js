import React from 'react';

import './Home.css';
import TopBar from './TopBar.js';
import DataTable from './DataTable.js';
import ContactForm from './ContactForm.js';
import ContactData from './ContactData.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddBtnClick = this.handleAddBtnClick.bind(this);
    this.handleDataBtnClick = this.handleDataBtnClick.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      showForm: false,
      showData: false,
      error: null,
      isLoaded: false,
      contactsList: [],
      contactSelected: undefined,
    };
  }

  componentDidMount() {
    fetch("https://contact-book-api-heroku.herokuapp.com/contacts",{
      headers: {"Authorization": "Bearer "+ localStorage.getItem('token')}
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            contactsList: result
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  create(contact) {
    fetch("https://contact-book-api-heroku.herokuapp.com/contacts", {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json",
        "Authorization": "Bearer "+ localStorage.getItem('token')
      },
      "body": JSON.stringify({
        name: contact.name,
        phone: contact.phone,
        email: contact.email
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        this.setState({
          contactsList: this.state.contactsList.concat(response)
        })
        this.handleDataBtnClick(true, response);
      })
      .catch(err => {
        console.log(err);
      });

  }

  update(contact, oldContact) {
    fetch("https://contact-book-api-heroku.herokuapp.com/contacts", {
      "method": "PUT",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json",
        "Authorization": "Bearer "+ localStorage.getItem('token')
      },
      "body": JSON.stringify(contact)
    })
      .then(response => response.json())
      .then(response => {
        var array = this.state.contactsList.slice();
        var index = array.indexOf(oldContact);
        if (index !== -1) {
          array[index] = response;
          this.setState({ contactsList: array })
          this.handleDataBtnClick(true, response);
        }

      })

  }

  delete(contact) {

    fetch(`https://contact-book-api-heroku.herokuapp.com/${contact.id}`, {
       "method": "DELETE" ,
       "headers": {
          "Authorization": "Bearer "+ localStorage.getItem('token')
       }
     })
      .then(() => {
        var array = this.state.contactsList.slice();
        var index = array.indexOf(contact);
        if (index !== -1) {
          array.splice(index, 1);
          this.setState({ contactsList: array });
          this.handleAddBtnClick(null);
        }
      })
      .catch(err => { console.log(err); })
  }


  handleAddBtnClick(value, e) {
    if (value === null) {
      this.setState({ showForm: value, showData: value, contactSelected: value })
    } else if (e.target.id === 'addForm') {
      this.setState({ contactSelected: { name: '', phone: '', email: '' }, showData: !value, showForm: value })
    } else {
      this.setState({ showForm: value, showData: !value });
    }

  }

  handleDataBtnClick(value, contact) {
    this.setState({ showData: value, showForm: !value, contactSelected: contact });
  }

  render() {
    const { error,
      isLoaded,
      contactsList,
      showForm,
      showData,
      contactSelected } = this.state;
    let element, dataTable;

    if (error) {
      dataTable = /*<div>Erro: {error.message}</div>*/<div>Erro ao obter dados</div>
    } else if (!isLoaded) {
      dataTable = <div>Carregando...</div>
    } else {
      dataTable = <DataTable handleClick={this.handleDataBtnClick}
        contactSelected={contactSelected}
        contacts={contactsList} />
    }

    if (showForm) {
      element = <ContactForm createContact={this.create} updateContact={this.update} contact={contactSelected} handleClick={this.handleAddBtnClick} />
    } else if (showData) {
      element = <ContactData handleClick={this.handleAddBtnClick} deleteContact={this.delete} contact={contactSelected} />
    }
    return (
      <Container fluid id="main">
        <Row>
          <Col md={7} className="contact-data">
            <TopBar list = {contactsList} handleDataClick={this.handleDataBtnClick} handleClick={this.handleAddBtnClick} />
            {dataTable}
          </Col>
          <Col md={5} className="contact-data bd-left">
            {element}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Home;
