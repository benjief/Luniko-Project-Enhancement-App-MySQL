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
  inputValue = "",
  multiline = false,
  type = "text",
  required = false,
  showCharCounter = false
}) {
  const [errorEnabled, setErrorEnabled] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [displayedHelperText, setDisplayedHelperText] = React.useState(helperText);
  const [inputLength, setInputLength] = React.useState(defaultValue.length);

  const handleOnChange = (value) => {
    if (value) {
      if (type === "email") {
        checkEmailValidity(value);
      } else if (type === "password") {
        checkPasswordValidity(value);
      }
      handleValidValue(value);
    } else {
      inputValue("");
      setInputLength(value.length);
      if (required) {
        setErrorEnabled(true);
        setErrorMsg("Required Field");
        setDisplayedHelperText(errorMsg);
      }
    }
  }

  const checkEmailValidity = (email) => {

  }

  const checkPasswordValidity = (password) => {

  }

  const handleValidValue = (value) => {
    inputValue(value);
    setInputLength(value.length);
    setErrorEnabled(false);
    setErrorMsg("");
    setDisplayedHelperText(helperText);
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
          type={type}
          onChange={(event) => handleOnChange(event.target.value)}
          multiline={multiline}
          error={errorEnabled}
          inputProps={{
            maxLength: characterLimit
          }}
          helperText={showCharCounter ? displayedHelperText !== ""
            ? [displayedHelperText, ". Limit: ", inputLength, "/", characterLimit] : ["Limit: ", inputLength, "/", characterLimit]
            : displayedHelperText} />
      </div>
    </Box>
  );
}
