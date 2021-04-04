import React from "react";
import { TextField, ThemeProvider, createMuiTheme } from "@material-ui/core";
import GetStoreFilters from './hooks/GetStoreFilters';
import GetDistanceFilter from "./hooks/GetDistanceFilter";

export class FilterPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      isPanelOpen: true,
      fav_stores: [],
      excluded_stores: [],
      postal_code: '',
    }
  }

  // Opens/closes filter panel
  toggle = () => {
    this.setState ({
      isPanelOpen: !this.state.isPanelOpen
    });
  }

  // Parses and saves store info from filter
  saveStoreInfo = (val) => {
    this.setState ({
      fav_stores: val.favStores,
      excluded_stores: val.excludedStores
    }, this.sendData);
  }

  // Updates entered postal code
  setPostal = (event) => {
    this.setState ({
      postal_code: event.target.value
    }, this.sendData);
  }

  // Send data back to parent (NewListPage.js)
  sendData = () => {
    this.props.filterCallback(this.state);
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
            <GetStoreFilters storeCallback={this.saveStoreInfo}/>
            <form id="postal" noValidate autoComplete="off">
              <TextField label="Postal Code" onChange={this.setPostal}/>
            </form>
            <br></br>
            <GetDistanceFilter distanceCallback={this.saveDistanceInfo}/>
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
