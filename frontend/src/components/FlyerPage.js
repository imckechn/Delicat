import React from "react";
import { IndexNavbar } from "./IndexNavbar";
import { FlyerItem } from "./FlyerItem";
import { Container, Button } from "reactstrap";
import { Grid } from "@material-ui/core";
import { jsPDF } from "jspdf";
import * as html2canvas from "html2canvas";

export class FlyerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flyerItem: [{
        "commonName": "eggs",
        "brand": "PC Organics",
        "fullName": "PC Organics Free-Range Brown Eggs",
        "price": "6.79",
        "store": "Zehrs",
        "tags": []
      },
      {
        "commonName": "eggs",
        "brand": "No Name",
        "fullName": "No Name Grade A Large Eggs",
        "price": "3.09",
        "store": "Zehrs",
        "tags": []
      }],
    }
  }

  // Take nested react components and converts them into an image then saves the image as a pdf
  // TO DO
  // Fix the whack formatting of the downloaded pdf.
  convertToPDF() {
    const input = document.getElementById('flyerContainer');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save("flyer.pdf");
      });
  }

  render() {
    return (
      <>
        <IndexNavbar />
        <div className="below-nav"></div>
        <h2 className="center add-padding">Flyer</h2>
        <Container id="flyerContainer" className="grey-bg">
          <Grid container spacing={3} >
            {this.state.flyerItem.map((item, index) => (
              <FlyerItem key={"item"+index}item={item} />
            ))}
          </Grid>
        </Container>
        <div className="fixed-bottom"> 
          <Container className="center white-bg add-padding">
            <Button className="footer-button-space" color="success">Email Flyer</Button>
            <Button color="success" onClick={this.convertToPDF}>Save as PDF</Button>
          </Container>
        </div>
      </>
    );
  }
}
