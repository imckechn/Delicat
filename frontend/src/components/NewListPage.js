import React from "react";
import { Grid, Collapse } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { IndexNavbar } from "./IndexNavbar";
import { ListItem } from "./ListItem";
import { FilterPanel } from "./FilterPanel";
import { Container, Button } from "reactstrap";

export class NewListPage extends React.Component {
  constructor() {
    super();
    this.state = {
      numItems: 1,
      loggedIn: true,
      saved: false,
    }
  }

  addListItem = () => {
    this.setState({ numItems: this.state.numItems + 1 })
  }

  render() {
    let itemInputs = [];
    for (let i = 0; i < this.state.numItems; i++) {
      itemInputs.push(<ListItem id={"item" + i}/>);
    }
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
            <h2>New List</h2>
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