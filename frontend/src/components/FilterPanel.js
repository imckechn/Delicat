import React from "react";
import { TextField, ThemeProvider, createMuiTheme } from "@material-ui/core";
import GetStoreFilters from './hooks/GetStoreFilters';
import GetDistanceFilter from "./hooks/GetDistanceFilter";

export class FilterPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      isPanelOpen: true,
    }
  }

  toggle = () => {
    this.setState ({
      isPanelOpen: !this.state.isPanelOpen
    });
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

    fetch('/test-url-please-work').then(res => res.json()).then(data => {
      console.log(data);
    });

    return (
      <ThemeProvider theme={theme}>
        {this.state.isPanelOpen ?
        <>
          <br></br>
          <i class="fa fa-chevron-left fa-lg" color="default" onClick={this.toggle} ></i>
          <br></br>
          <h3>Filters</h3>
          <GetStoreFilters/>
          <form id="postal" noValidate autoComplete="off">
            <TextField  label="Postal Code" />
          </form>
          <br></br>
          <GetDistanceFilter/>
        </>
        :
        <>
          <br></br>
          <i class="fa fa-chevron-right fa-lg" color="default" onClick={this.toggle}></i>
        </>
        }
      </ThemeProvider>
    );
  }
}