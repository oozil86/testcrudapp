import * as React from "react";
import TextField from "@mui/material/TextField";

function EmployeeInput(props) {
  //console.log("EmployeeInput");
  //console.log(props);

  return (
    <React.Fragment>
      <div>
        <TextField
          id={props.Id}
          label={props.FormData.config.elementConfig.Address}
          multiline
          maxRows={4}
          value={props.FormData.config.value}
          placeholder={props.FormData.config.elementConfig.placeholder}
          onChange={props.changed}
        />
      </div>
    </React.Fragment>
  );
}

export default EmployeeInput;
