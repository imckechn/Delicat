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
    this.test = "boo";
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
  // Sends data to backend and gets a response.
  // NOTE: this method is aysnc
  toJson = async () => {
    // Convert from frontend filters to backend filters
    let filters = {
        "favourite_stores": this.state.filters["fav_stores"],
        "excluded_stores": this.state.filters["excluded_stores"],
        //"distance_km": this.state.filters["distance"],  // Uncomment this if you want to set distance: the backend won't do anything with it, but it won't break
        //"location": this.state.filters["location"],     // Uncomment this if you want to set location: the backend won't do anything with it, but it won't break
        "items_per_store": 1,   // Change the value here if you want more items for regular stores
        "items_fav_store": 3    // Change the value here if you want more items for favourite stores
    }

    // Convert from frontend list_items to backend list_items
    let list_items =[]
    this.state.list_items.forEach(item => {
      list_items.push({
        name: item["commonName"],
        amount: item["amount"],
        brands: item["brand"]? [item["brand"]] : [],  // Note: brand is treated as brands[] (an array) on the backend.
                                                      // so you can add more than one brand.
        tags: item["tags"]
      });
    });

    let args = {shopping_list: {filters:filters, list_items: list_items}};

    // Endpoint to get the flyer: puts everything into <<flyer_response>>
    // NOTE: this is inherently asynchronous, so you will have to await it
    // if you want to be sure the promise is resolved. We await it here
    // (and thus make this method async ^^^) for demonstration purposes.
    let flyer_response = await fetch('/optimize-list', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    // Log the response, for demo purposes.
    console.log(flyer_response);
    // The response is an array of objects, each of the form:
    /* 
      {
        "common_name": "eggs",
        "brand": "Selection",
        "full_name": "Selection Large White Eggs",
        "price": 3.09,
        "store": "Metro",
        "tags": "[]",
        "location": "",
        "amount": 1.0
      }
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
