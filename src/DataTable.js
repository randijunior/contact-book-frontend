import './DataTable.css';

import React from 'react';

class DataTable extends React.Component {
  render() {
    return(
      <div id="main-tb">
        <table className="data-tb">
          <thead>
          <tr>
            <th scope="col" className="width-50">Nome</th>
            <th scope="col" className="width-50">Email</th>
          </tr>
          </thead>
          <tbody>
          {this.props.contacts.map((contact) => (
            <tr key={contact.id} className={this.props.contactSelected === contact ? 'hover_tb active': 'hover_tb' } onClick={()=> this.props.handleClick(true, contact)}>
              <td className="width-50">
                <div className="contact_circle_letter">
                  <span id="ct_letter">{contact.name.charAt(0)}</span>
                </div>
                <div className="contact_name top-16 mleft-10">{contact.name}</div>
              </td>
              <td className="width-50">
                {contact.email}
              </td>
            </tr>
          ))}

          </tbody>
        </table>
      </div>
    );
  }

}

export default DataTable;
