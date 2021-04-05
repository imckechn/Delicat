import React from "react";
import TextField from '@material-ui/core/TextField';
import { FormControl, InputLabel, Select, ThemeProvider, createMuiTheme, Grid} from '@material-ui/core/';

// Individual list item form details
export class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemID: this.props.itemID,
      commonName: '',
      tags: [],
      amount: '',
      brand: '',
    }
  }

  // Handles the state changes of each input options
  handleInputChange = (event) => {
    // Parses the tags separated by commas into an array
    if ([event.target.name] === "tags") {
      let removeSpace = event.target.value.replace(/\s+/g, '');
      let tagsArray = removeSpace.split(',');
      this.setState({
        tags: tagsArray
      }, this.toParent);
    } else {
      this.setState({
        [event.target.name]: event.target.value
      }, this.toParent);
    }
  }

  // Sends data back to parent (NewListPage.js)
  toParent = () => {
    this.props.onListItemCallback(this.state)
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
        <div className="groceryItem">
          <div className="groceryInputbox">
            <TextField
              name="commonName"
              onChange={this.handleInputChange}
              label="Enter Grocery Item"
              fullWidth
              margin="normal"
              placeholder="Ex. Eggs"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </div>
          <div className="groceryInputbox">
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  name="tags"
                  onChange={this.handleInputChange}
                  label="Enter Tags Separated by a Comma"
                  placeholder="Ex. Organic"
                  variant="outlined"
                  fullWidth
                  className="groceryItemTags"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl variant="outlined" className="groceryItemTags">
                  <InputLabel>Amount</InputLabel>
                  <Select
                    name="amount"
                    onChange={this.handleInputChange}
                    native
                    label="Amount"
                    fullWidth
                  >
                    <option aria-label="None" value="" />
                    <option value="6">6 - Half a dozen</option>
                    <option value="12">12 - Dozen</option>
                    <option value="18">18 - Dozen and a Half</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl variant="outlined" className="groceryItemTags">
                  <InputLabel>Brands</InputLabel>
                  <Select
                    name="brand"
                    onChange={this.handleInputChange}
                    native
                    label="Brands"
                    fullWidth
                  >
                    <option aria-label="None" value="" />
                    <option value="NoName">NoName</option>
                    <option value="President's Choice">President's Choice</option>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}
