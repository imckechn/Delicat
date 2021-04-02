import React from "react";
import { Paper, Grid } from "@material-ui/core";

export class FlyerItem extends React.Component {
  render() {
    return (
      <>
        <Grid item xs>
          <Paper className="flyer-paper">
            <h6>{this.props.item.fullName}</h6>
            <p>{this.props.item.brand}</p>
            <p>{this.props.item.store}</p>
            <p>Address</p>
            <p>${this.props.item.price}</p>
          </Paper>
        </Grid>
      </>
    );
  }
}
