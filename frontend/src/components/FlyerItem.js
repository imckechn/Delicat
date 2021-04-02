import React from "react";
import { Paper, Grid } from "@material-ui/core";

// Individual flyer item card layout
export class FlyerItem extends React.Component {
  render() {
    return (
      <>
        <Grid item xs={4}>
          <Paper className="flyer-paper add-padding">
            <h6>{this.props.item.fullName}</h6>
            <p>{this.props.item.brand}</p>
            <p>{this.props.item.store}</p>
            <p>Address</p>
            <b>${this.props.item.price}</b>
          </Paper>
        </Grid>
      </>
    );
  }
}
