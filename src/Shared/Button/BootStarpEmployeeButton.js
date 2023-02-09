import * as React from "react";
import Button from "react-bootstrap/Button";

function BootStarpEmployeeButton(props) {
  //console.log("BootStarpEmployeeButton");
  // console.log(props);

  return (
    <React.Fragment>
      <Button onClick={props.clicked} variant="primary" type="submit">
        {props.text}
      </Button>
    </React.Fragment>
  );
}

export default BootStarpEmployeeButton;
