import React from "react";
import TextField from '@material-ui/core/TextField';
import { FormControl, InputLabel, Select, ThemeProvider, createMuiTheme, Grid} from '@material-ui/core/';

export class ListItem extends React.Component {
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
                    native
                    label="Amount"
                    fullWidth
                    inputProps={{
                      name: 'amount',
                      id: 'outlined-age-native-simple',
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option>6 - Half a dozen</option>
                    <option>12 - Dozen</option>
                    <option>18 - Dozen and a Half</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl variant="outlined" className="groceryItemTags">
                  <InputLabel>Brands</InputLabel>
                  <Select
                    native
                    label="Brands"
                    fullWidth
                    inputProps={{
                      name: 'brands',
                      id: 'outlined-age-native-simple',
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option>NoName</option>
                    <option>President's Choice</option>
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
