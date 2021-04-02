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

    // TESTING OPTIMIZE ENDPOINT *************************************
    let item_1 = {name:"eggs",brands:["Selection"]};
    let item_2 = {name:"ground beef",brands:["Average Farms"]};
    let params = JSON.stringify({filters:{excluded_stores:["Walmart"]}, list_items:[item_1,item_2]});

    fetch("/optimize-list/" + new URLSearchParams({shopping_list: params}), {
      method: "GET", 
    }).then(res => {
      console.log("Request complete! response:", res);
    });

    return (
      <ThemeProvider theme={theme}>
        <div className="filterPanel">
          {this.state.isPanelOpen ?
          <div>
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
          </div>
          :
          <>
            <br></br>
            <i class="fa fa-chevron-right fa-lg" color="default" onClick={this.toggle}></i>
          </>
          }
        </div>
      </ThemeProvider>
    );
  }
}
