import React from "react";
import { IndexNavbar } from "./IndexNavbar";
import { FlyerItem } from "./FlyerItem";
import { Container } from "reactstrap";
import { Grid } from "@material-ui/core";

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

  render() {
    console.log(this.props.name)
    return (
      <>
        <IndexNavbar />
        <div className="below-nav"></div>
        <Container>
        <h2>Flyer</h2>
        <Grid container spacing={3}>
          {this.state.flyerItem.map((item, index) => (
            <FlyerItem key={`${index}-${item}`} item={item} />
          ))}
        </Grid>
        </Container>
      </>
    );
  }
}
