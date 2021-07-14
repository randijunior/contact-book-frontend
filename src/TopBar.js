import React from 'react';

import './TopBar.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchIcon from '@material-ui/icons/Search';
import ListGroup from 'react-bootstrap/ListGroup';

class ContactFoundedList extends React.Component {

    render() {

      return(
        <ListGroup id="list-contact" >
          {this.props.listFiltered.map((item) => (
              <ListGroup.Item key={item.id} onClick={()=>{this.props.handleClick(true,item)}} className="contact-founded" >
              <span id="circle">
                <p>{item.name.charAt(0)}</p>
              </span>
              <span className="contact-name positona top-16 mleft-10">{item.name}</span>
              </ListGroup.Item>

          ))}
        </ListGroup>

      );
    }
}

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleD.bind(this);
    this.state = {
      searchEvent: '',
    };
  }

  handleD(value, item) {
    this.setState({searchEvent: ''})
    this.props.handleDataClick(value,item);
  }

  handleChange(e) {
      this.setState({searchEvent : e.target.value});
  }


  render() {
    const {searchEvent } = this.state;
    let element, listFiltered;
    if(searchEvent) {
      listFiltered  = this.props.list.filter(item => {
        return item.name.toLowerCase().includes(searchEvent.toLowerCase())
    });
    if(typeof listFiltered !== undefined && listFiltered.length > 0) {
      element = <ContactFoundedList searchEv={searchEvent} handleClick={this.handleClick} listFiltered = {listFiltered} />
    }

    }
    return (
      <Container id="topbar-container">
        <Row>
          <Col md={6}>
            <form id="form-search">
              <input type="text" autoComplete="off" spellCheck="false"
                placeholder="Pesquisar" id="input-search" value={this.state.searchEvent} onChange={this.handleChange} />
                {element}
              <SearchIcon className="left-230 top-3 md-dark" />
            </form>
          </Col>
          <Col md={6} id="setting_container">
            <input type="image" src="./icons/iconmonstr-plus-thin-48 (1).png" id="addForm" alt="" className="img_topbar_container" onClick={(e) => this.props.handleClick(true, e)} />
            {/*<input type="image" src="./icons/iconmonstr-gear-thin-48 (1).png" alt="" className="img_topbar_container"/>*/}
          </Col>
        </Row>
      </Container>
    );
  }

}

export default TopBar;
