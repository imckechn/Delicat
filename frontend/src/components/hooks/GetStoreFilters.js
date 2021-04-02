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

export default function GetStoreFilters() {
  const classes = useStyles();
  const stores = ["Walmart", "Zehrs"];
  const [favStoreName, setFavStoreName] = React.useState([]);
  const [excludeStoreName, setExcludeStoreName] = React.useState([]);

  const handleFavChange = (event) => {
    setFavStoreName(event.target.value);
  };

  const handleExcludeChange = (event) => {
    setExcludeStoreName(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>Favourite Stores</InputLabel>
        <Select
          multiple
          value={favStoreName}
          onChange={handleFavChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip}/>
              ))}
            </div>
          )}>
          {stores.map((stores) => (
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
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip}/>
              ))}
            </div>
          )}>
          {stores.map((stores) => (
            <MenuItem key={stores} value={stores}>
              {stores}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
