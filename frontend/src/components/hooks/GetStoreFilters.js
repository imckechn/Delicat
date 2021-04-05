import React from "react";
import { Input, InputLabel, MenuItem, FormControl, Select, Chip } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    maxWidth: 300,
    minHeight: 30,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

export default function GetStoreFilters({storeCallback}) {
  const classes = useStyles();
  const [favStoreName, setFavStoreName] = React.useState([]);
  const [excludeStoreName, setExcludeStoreName] = React.useState([]);

  // Sets favourite store state and sends that information back to parent class (FilterPanel.js)
  const handleFavChange = (event) => {
    setFavStoreName(event.target.value);
    let favList = {"favStores": event.target.value, "excludedStores": excludeStoreName};
    storeCallback(favList);
  };

  // Sets excluded store state and sends that information back to parent class (FilterPanel.js)
  const handleExcludeChange = (event) => {
    setExcludeStoreName(event.target.value);
    let excludedList = {"favStores": favStoreName, "excludedStores": event.target.value};
    storeCallback(excludedList);
  };

  // Get list of stores from api
  const getStores = async () => {
    let stores = [];
    let response = await fetch('/stores', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    // Parses returned response into array of strings
    let parsed = JSON.parse(response);
    for (let i = 0; i < parsed.length; i++) {
      stores.push(parsed[i].store);
    }
    // Updates the list of all stores
    setStores(stores);
  }

  const [stores, setStores] = React.useState(getStores());
  
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>Favourite Stores</InputLabel>
        <Select
          multiple
          value={favStoreName}
          onChange={handleFavChange}
          input={<Input />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip}/>
              ))}
            </div>
          )}>
          {stores.length > 0 && stores.map((stores) => (
            <MenuItem key={stores} value={stores}>
              {stores}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br></br>
      <FormControl className={classes.formControl}>
        <InputLabel>Excluded Stores</InputLabel>
        <Select
          multiple
          value={excludeStoreName}
          onChange={handleExcludeChange}
          input={<Input />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip}/>
              ))}
            </div>
          )}>
          {stores.length > 0 && stores.map((stores) => (
            <MenuItem key={stores} value={stores}>
              {stores}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
