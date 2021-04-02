import React from "react";
import { TextField, ThemeProvider, createMuiTheme } from "@material-ui/core";
import GetStoreFilters from './hooks/GetStoreFilters';
import GetDistanceFilter from "./hooks/GetDistanceFilter";
import { param } from "jquery";

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

    return (
      <ThemeProvider theme={theme}>
        <div className="filterPanel">
          {this.state.isPanelOpen ?
          <div>
            <br></br>
            <i className="fa fa-chevron-left fa-lg" color="default" onClick={this.toggle} ></i>
            <br></br>
            <h3>Filters</h3>
            <GetStoreFilters/>
            <form id="postal" noValidate autoComplete="off">
              <TextField  label="Postal Code" />
            </form>
            <br></br>
            <GetDistanceFilter/>
          </div>
          :
          <>
            <br></br>
            <i className="fa fa-chevron-right fa-lg" color="default" onClick={this.toggle}></i>
          </>
          }
        </div>
      </ThemeProvider>
    );
  }
}
