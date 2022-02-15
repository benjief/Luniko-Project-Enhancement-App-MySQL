import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MaterialTextField({
  className = "",
  label = "",
  helperText = "",
  characterLimit = 500,
  placeholder = "",
  defaultValue = "",
  inputValue = ""
}) {
  const [inputLength, setInputLength] = React.useState(defaultValue.length);

  const handleOnChange = (value) => {
    if (value) {
      inputValue(value);
      setInputLength(value.length);
    } else {
      inputValue("");
      setInputLength(value.length);
    }
  }

  return (
    <Box
      className={className}
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off">
      <div className="material-text-field">
        <TextField
          label={label}
          defaultValue={defaultValue}
          type="text"
          onChange={(event) => handleOnChange(event.target.value)}
          multiline
          inputProps={{
            maxLength: characterLimit
          }}
          helperText={helperText !== ""
            ? [helperText, ". Limit: ", inputLength, "/", characterLimit]
            : ["Limit: ", inputLength, "/", characterLimit]} />
      </div>
    </Box>
  );
}
