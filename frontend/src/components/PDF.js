import React from "react";
import { Card } from '@material-ui/core';

export class PDF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="pdf-format">
          {this.props.list.map((item, index) => (
              <Card key={"pdfItem"+index}>
                <b>{index+1}. {item.fullName}</b>
                <br></br>
                {item.brand} - {item.store}
                <br></br>
                Address
                <br></br>
                <b>${item.price}</b>
              </Card>
          ))}     
      </div>
    );
  }
}