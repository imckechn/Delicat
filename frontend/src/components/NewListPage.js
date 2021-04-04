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
      loggedIn: false,
      saved: false,
      editTitle: false,
      listName: "New List",
      list_items: [],
      filters: [],
    }
  }

  // Keeps track of how many list items to display
  addListItem = () => {
    this.setState({ numItems: this.state.numItems + 1 })
  }

  // Toggles ability to edit title
  toggleEditTitle = () => {
    this.setState({ editTitle: !this.state.editTitle })
  }

  // Updates name of list
  handleChange = (val) => {
    this.setState({listName: val.target.value});
  }

  // Packaging up list data provided by user
  sendListItemInfo = async (val) => {
    if (this.state.list_items.length < val.itemID - 1) {
      // Add it to array
      this.setState( currentState => ( {
        list_items: [ ...currentState.list_items, val ]
      }));
    } else {
      // Copy state
      let list_items = [...this.state.list_items];
      // Update state
      let item = {
        ...list_items[val.itemID],
        commonName: val.commonName,
        tags: val.tags,
        amount: val.amount,
        brand: val.brand
    }
    list_items[val.itemID] = item;
    this.setState({list_items});
    }
  }

  // Packageing up filter data provided by user
  sendFilterInfo = async (val) => {
    this.setState({filters: val});
  }

  // Converting data provided by user into JSON string
  // TO DO
  // Send data to backend
  toJson = () => {
    let data = {"filters":this.state.filters, "list_items": this.state.list_items};
    let test = JSON.stringify(data);
    console.log(test); //Remove this later
    /*
    //copied from endpoint_sample.js for easy access
    fetch('/optimize-list', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    */
  }

  render() {
    let itemInputs = [];
    for (let i = 0; i < this.state.numItems; i++) {
      itemInputs.push(<ListItem key={"item" + i} onListItemCallback={this.sendListItemInfo} itemID={i}/>);
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
        <Alert action={<Button className="btn-link" color="success"><i className="fa fa-times" onClick={() => {this.setState({ saved: false})}}></i></Button>}>
          Successfully Saved List!
        </Alert>
      </Collapse>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Container>
              <FilterPanel filterCallback={this.sendFilterInfo}/>
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
            <Button color="success" onClick={() => {console.log("clicked")}}>Generate Flyer</Button>
          </Container>
        </div>
        :
        <div className="fixed-bottom"> 
          <Container className="center white-bg add-padding">
            <Button className="btn" color="success" onClick={this.toJson}>Generate Flyer</Button>
          </Container>
        </div>
        }
      </>
    );
  }
}
