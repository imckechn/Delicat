import React from "react";
import { Grid, Collapse, TextField, ThemeProvider, createMuiTheme} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { IndexNavbar } from "./IndexNavbar";
import { ListItem } from "./ListItem";
import { FilterPanel } from "./FilterPanel";
import { Container, Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export class NewListPage extends React.Component {
  constructor() {
    super();
    this.state = {
      numItems: 1,
      loggedIn: true,
      saved: false,
      editTitle: false,
      listName: "New List",
    }
  }

  addListItem = () => {
    this.setState({ numItems: this.state.numItems + 1 })
  }

  toggleEditTitle = () => {
    this.setState({ editTitle: !this.state.editTitle })
  }

  handleChange = (val) => {
    this.setState({listName: val.target.value});
  }

  render() {
    let itemInputs = [];
    for (let i = 0; i < this.state.numItems; i++) {
      itemInputs.push(<ListItem id={"item" + i}/>);
    }
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
        <Collapse in={this.state.saved}>
        <Alert action={<Button className="btn-link" color="success"><i class="fa fa-times" onClick={() => {this.setState({ saved: false})}}></i></Button>}>
          Successfully Saved List!
        </Alert>
      </Collapse>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Container>
              <FilterPanel />
            </Container>
          </Grid>
          <Grid item xs={6}>
            {this.state.loggedIn ?
            <>
            <h2>{this.state.listName}<Button className="btn-link" color="success" onClick={this.toggleEditTitle}>Edit</Button></h2>
            <Modal isOpen={this.state.editTitle} toggle={this.toggleEditTitle}>
              <ModalBody>
                <h3><b>New List Title</b></h3>
                <ThemeProvider theme={theme}>
                  <TextField
                    id="newTitle"
                    placeholder="Ex. Weekly Essentials"
                    onChange={this.handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </ThemeProvider>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={this.toggleEditTitle}>Save</Button>
              </ModalFooter>
            </Modal>
            </>
            :
            <h2>{this.state.listName}</h2>
            }
            <div>
              {itemInputs}
            </div>
            <div className="center add-space">
              <Button className="btn-icon" color="success" onClick={this.addListItem}>
                +
              </Button>
            </div>
          </Grid>
        </Grid>
        {this.state.loggedIn ?
        <div className="fixed-bottom"> 
          <Container className="center white-bg add-padding">
            <Button className="footer-button-space" color="success" onClick={() => {this.setState({ saved: true})}}>Save List</Button>
            <Button color="success" href="/flyer">Generate Flyer</Button>
          </Container>
        </div>
        :
        <div className="fixed-bottom"> 
          <Container className="center white-bg add-padding">
            <Button className="btn" color="success" href="/flyer">Generate Flyer</Button>
          </Container>
        </div>
        }
      </>
    );
  }
}