import React from "react";
import { Grid } from "@material-ui/core";
import { IndexNavbar } from "./IndexNavbar";
import { ListItem } from "./ListItem";
import { FilterPanel } from "./FilterPanel";
import { Container } from "reactstrap";

export class NewListPage extends React.Component {
  render() {
    return (
      <>
        <IndexNavbar />
        <h1>New List</h1>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Container>
              <FilterPanel />
            </Container>
          </Grid>
          <Grid item xs={6}>
            <h2>New List</h2>
            <ListItem />
          </Grid>

        </Grid>
      </>
    );
  }
}