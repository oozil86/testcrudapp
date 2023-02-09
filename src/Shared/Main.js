import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Employees from "../Employee/Employees";
import EmployeeEdit from "../Employee/EmployeeEdit";
import BootStarpEmployeeEdit from "../Employee/BootStarpEmployeeEdit";

class Main extends Component {
  constructor(props) {
    super(props);
    console.log("Main_constructor");
  }

  componentDidMount() {
    // console.log(this.props);
    console.log("Main_componentDidMount");
  }

  render() {
    console.log("Main_render");
    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/Employee/AddByBootStarp"
            exact
            component={BootStarpEmployeeEdit}
          />
          <Route
            path="/Employee/EditByBootStarp/:id"
            exact
            component={BootStarpEmployeeEdit}
          />
          <Route path="/Employee/Add" exact component={EmployeeEdit} />
          <Route path="/Employee/Edit/:id" exact component={EmployeeEdit} />
          <Route path="/" exact component={Employees} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Main;
