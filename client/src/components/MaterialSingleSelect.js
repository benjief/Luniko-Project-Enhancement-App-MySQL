import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function MaterialSingleSelect(
    {
        label = "",
        placeholder = "",
        defaultValue = "",
        singleSelectOptions = [],
        selectedValue = "" }
) {

    const handleOnChange = (object) => {
        if (object) {
            selectedValue(object.value);
        }
    }

    return (
        <Autocomplete
            // Override of option equality is needed for MUI to properly compare options and values
            isOptionEqualToValue={(option, value) => option.id === value.id}
            disablePortal
            // id="combo-box-demo"
            options={singleSelectOptions}
            sx={{ width: "100%", marginBottom: "10px" }}
            defaultValue={defaultValue}
            onChange={(event, object) => handleOnChange(object)}
            renderInput={(params) =>
                <TextField
                    {...params}
                    label={label}
                    placeholder={placeholder} />}
        />
    );
}