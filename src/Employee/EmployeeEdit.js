import React, { Component } from "react";
import axios from "axios";
import EmployeeInput from "../Shared/Input/EmployeeInput";
import Paper from "@mui/material/Paper/Paper";
import Box from "@mui/material/Box";
import EmployeeButton from "../Shared/Button/EmployeeButton";

class EmployeeEdit extends Component {
  state = {
    Employees: [],
    FormData: {
      Name: {
        elementConfig: {
          Address: "Name",
          placeholder: "Enter The Name",
        },
        value: "",
      },
      Salary: {
        elementConfig: {
          Address: "Salary",
          placeholder: "Enter The Salary",
        },
        value: "",
      },
      Age: {
        elementConfig: {
          Address: "Age",
          placeholder: "Enter The Age",
        },
        value: "",
      },
    },
    SubmitBtn: "Add Employee",
  };

  constructor(props) {
    super(props);
    console.log("EmployeeEdit_constructor");
  }
  componentDidUpdate() {
    console.log("EmployeeEdit_componentDidUpdate");
  }

  componentDidMount() {
    //console.log(this.props);
    console.log("EmployeeEdit_componentDidMount");
    if (
      this.props.match.params.id !== undefined &&
      this.props.match.params.id !== null
    ) {
      this.setState({ SubmitBtn: "Edit Employee" });
      let id = this.props.match.params.id;
      axios
        .get("https://localhost:7270/api/Employee/GetEmployee?Id=" + id)
        .then((res) => {
          const UpdatedForm = { ...this.state.FormData };
          UpdatedForm["Name"].value = res.data[0].name;
          UpdatedForm["Salary"].value = res.data[0].salary;
          UpdatedForm["Age"].value = res.data[0].age;
          this.setState({ FormData: UpdatedForm });
        });
    }
  }

  AddEmployee = () => {
    if (
      this.props.match.params.id !== undefined &&
      this.props.match.params.id !== null
    ) {
      let Employee = {
        id: this.props.match.params.id,
        name: this.state.FormData.Name.value,
        age: this.state.FormData.Age.value,
        salary: this.state.FormData.Salary.value,
      };
      axios
        .put("https://localhost:7270/api/Employee/UpdateEmployee", Employee)
        .then((res) => {
          this.props.history.push({ pathname: "/" });
        });
    } else {
      let Employee = {
        id: 0,
        name: this.state.FormData.Name.value,
        age: this.state.FormData.Age.value,
        salary: this.state.FormData.Salary.value,
      };
      axios
        .post("https://localhost:7270/api/Employee/AddEmployee", Employee)
        .then((res) => {
          this.props.history.push({ pathname: "/" });
        });
    }
  };

  InputChanged = (event, Id) => {
    const UpdatedForm = { ...this.state.FormData };
    const UpdatedElement = { ...UpdatedForm[Id] };
    UpdatedElement.value = event.target.value;
    UpdatedForm[Id] = UpdatedElement;
    this.setState({ FormData: UpdatedForm });
  };

  static getDerivedStateFromProps(props, state) {
    console.log("EmployeeEdit_getDerivedStateFromProps");
    console.log(props);
    console.log(state);
  }

  render() {
    console.log("EmployeeEdit_render");

    const formArrElements = [];

    for (var element in this.state.FormData) {
      formArrElements.push({
        id: element,
        config: this.state.FormData[element],
      });
    }
    return (
      <form>
        <div className="row clearfix">
          <div className="col-sm-12">
            <div className="heading">
              <div className="title-style2">
                <h2>Employee Form</h2>
              </div>
            </div>
          </div>
        </div>
        <Box
          component={Paper}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          {formArrElements.map((formelement) => (
            <EmployeeInput
              FormData={formelement}
              Id={formelement.id}
              key={formelement.id}
              changed={(event) => this.InputChanged(event, formelement.id)}
            />
          ))}
          <EmployeeButton
            text={this.state.SubmitBtn}
            clicked={() => this.AddEmployee()}
          />
        </Box>
      </form>
    );
  }
}

export default EmployeeEdit;
