import React from "react";
import { IndexNavbar } from "./IndexNavbar";
import { FlyerItem } from "./FlyerItem";
import { PDF } from "./PDF";
import { Container, Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { Grid, createMuiTheme, TextField, ThemeProvider, Collapse } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { jsPDF } from "jspdf";
import * as html2canvas from "html2canvas";

export class FlyerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flyerItem: this.props.location.state.flyer_data, // Store the passed data sent from NewListPage.js (Func: sendListData();)
      emailModal: false,
      email: '', //Obtain this automatically when logged in
      sentEmail: false,
      declineEmail: false,
      pdfPreviewModal: false,
    }
  }

  // Toggles state of email modal
  toggleEmail = () => {
    this.setState({emailModal: !this.state.emailModal});
  }

  // Closes email modal and passes email to /email endpoint
  sendEmail = async () => {
    this.toggleEmail();

    let body_string = "";
    this.state.flyerItem.forEach(item => {
      body_string = body_string + item.full_name + "\n\t" + item.brand + " - " + item.store + "\n\t$"+ item.price + "\n\n";
    });

    console.log("Sending to " + this.state.email); //Replace this with sending the email to the /email endpoint
    let args = {
      email_address: this.state.email, 
      flyer_pdf: undefined, // Put PDF attachment here
      body: body_string,
      subject: "Delicat Flyer"
    };
    
    fetch('/email', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({sentEmail: true});
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
      this.setState({declineEmail: true});
    });
  }

  // Sets the email state
  handleEmail = (val) => {
    this.setState({
      email: val.target.value,
    });
  }

  // Toggles state of pdf modal
  togglePDF = () => {
    this.setState({pdfPreviewModal: !this.state.pdfPreviewModal});
  }

  // Take nested react components and converts them into an image then saves the image as a pdf
  convertToPDF = () => {
    const input = document.getElementById('flyerContainer');
    console.log(input);
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save("flyer.pdf");
      });
    this.togglePDF(); // Close modal when finished
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          light: '#6bd098',
          main: '#6bd098',
          dark: '#28a745',
          contrastText: '#fff',
        },
      },
    });
    return (
      <>
        <IndexNavbar />
        <div className="below-nav"></div>
        <Collapse in={this.state.sentEmail}>
          <Alert action={<Button className="btn-link" color="success"><i className="fa fa-times" onClick={() => {this.setState({sentEmail: false})}}></i></Button>}>
            Successfully Email List!
          </Alert>
        </Collapse>
        <Collapse in={this.state.declineEmail}>
          <Alert severity="warning" action={<Button className="btn-link" color="danger"><i className="fa fa-times" onClick={() => {this.setState({declineEmail: false})}}></i></Button>}>
            Invalid Email
          </Alert>
        </Collapse>
        <h2 className="center add-padding">Flyer</h2>
        <Container className="grey-bg">
          <Grid container spacing={3} >
            {this.state.flyerItem != null && this.state.flyerItem.map((item, index) => (
              <FlyerItem key={"item"+index}item={item} />
            ))}
          </Grid>
        </Container>
        <Modal isOpen={this.state.emailModal} toggle={this.toggleEmail}>
          <ModalBody>
            <h3><b>Enter in your email so we can send you your list!</b></h3>
            <ThemeProvider theme={theme}>
              <TextField
                label="Email"
                type="email"
                value={this.state.email}
                placeholder="example@delicat.com"
                onChange={this.handleEmail}
                fullWidth
                margin="normal"
              />
            </ThemeProvider>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.sendEmail}>Confirm Email</Button>
            <Button color="default" outline onClick={this.toggleEmail}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.pdfPreviewModal} toggle={this.togglePDF}>
          <ModalBody>
            <h3><b>PDF Preview</b></h3>
            <Container id="flyerContainer">
              <PDF list={this.state.flyerItem} />
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.convertToPDF}>Download</Button>
            <Button color="default" outline onClick={this.togglePDF}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <div className="fixed-bottom"> 
          <Container className="center white-bg add-padding">
            <Button className="footer-button-space" color="success" onClick={this.toggleEmail}>Email Flyer</Button>
            <Button color="success" onClick={this.togglePDF}>Save as PDF</Button>
          </Container>
        </div>
      </>
    );
  }
}
