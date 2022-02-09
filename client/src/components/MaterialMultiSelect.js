import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function MaterialMultiSelect({
  label = "",
  placeholder = "",
  multiSelectOptions = [],
  selectedValues = []
}) {

  const handleOnChange = (object) => {
    if (object[0]) {
      let tempArray = [];
      for (let i = 0; i < object.length; i++) {
        tempArray.push(object[i].value);
      }
      selectedValues(tempArray);
    }
  }

  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      <Autocomplete
        // Override of option equality is needed for MUI to properly compare options and values
        isOptionEqualToValue={(option, value) => option.id === value.id}
        multiple
        // id="tags-outlined"
        options={multiSelectOptions}
        getOptionLabel={(option) => option.label}
        // defaultValue={[top100Films[13]]}
        filterSelectedOptions
        onChange={(event, object) => handleOnChange(object)}
        renderInput={(params) => (
          <TextField
            // color='warning'
            {...params}
            // label={label}
            placeholder={placeholder}
          />
        )}
      />
    </Stack>
  );
}