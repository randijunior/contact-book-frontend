import './ContactData.css';

import React from 'react';


class ContactData extends React.Component {
  render() {
    let contact = this.props.contact;
    return(
      <div id="container-data">
      <div className="contact-container pd-2 bdb-1 bc-hx">
          <span className="img_container"  onClick={()=> this.props.deleteContact(contact)}>
              <img src="./icons/iconmonstr-trash-can-thin-16.png" alt="" />
          </span>
          <span id="circle_contact_name">
              <p id="data_letter_ct_details">{contact.name.charAt(0)}</p>
          </span>
          <span id="data_name" className="contact-name mgl-1v3">{contact.name}</span>
      </div>
      <div className="contact-data-container pd-1 mg-0v8 bdb-1 mnh-11">
          <div>
              <p className="fw-b disp-ib">Contato</p>
              <span id="change_contact"><img src="./icons/iconmonstr-pencil-5.svg" alt="" onClick={(e)=> this.props.handleClick(true,e)}/></span>
          </div>
          {contact.phone &&
            <div className="contact_phone">
                <p className="fs-13 c-g fw-b mgb-2">Telefone celular</p>
                <p className="fs-13 fw-b" id="data_phone">{contact.phone}</p>
            </div>
          }
          {contact.email &&
            <div>
                <p className="fs-13 c-g fw-b mgb-2" id="hasEmail">Email</p>
                <p className="fs-13 fw-b" id="data_email">{contact.email}</p>
            </div>
          }
      </div>
      </div>
    );
  }

}

export default ContactData;
