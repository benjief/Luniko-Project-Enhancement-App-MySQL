import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function MaterialSingleSelect({
    placeholder = "",
    singleSelectOptions = [],
    selectedValue = "" }) {

    const handleOnChange = (object) => {
        if (object) {
            selectedValue(object.value);
        }
    }

    return (
        <Autocomplete
            isOptionEqualToValue={(option, value) => option.id === value.id}
            disablePortal
            // id="combo-box-demo"
            options={singleSelectOptions}
            sx={{ width: "100%", marginBottom: "10px" }}
            onChange={(event, object) => handleOnChange(object)}
            renderInput={(params) =>
                <TextField
                    {...params}
                    placeholder={placeholder} />}
        />
    );
}