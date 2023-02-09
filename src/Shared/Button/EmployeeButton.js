import * as React from "react";
import Button from "@mui/material/Button";

function EmployeeButton(props) {
  //console.log("EmployeeButton");
  //console.log(props);

  return (
    <React.Fragment>
      <Button onClick={props.clicked} variant="contained">
        {props.text}
      </Button>
    </React.Fragment>
  );
}

export default EmployeeButton;
