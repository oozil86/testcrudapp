import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

class BootStarpEmployeeEdit extends Component {
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
    console.log("BootStarpEmployeeEdit_constructor");
  }

  componentDidUpdate() {
    console.log("BootStarpEmployeeEdit_componentDidUpdate");
  }

  componentDidMount() {
    console.log(this.props);
    console.log("BootStarpEmployeeEdit_componentDidMount");
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

  render() {
    console.log("BootStarpEmployeeEdit_render");

    const formArrElements = [];
    for (var element in this.state.FormData) {
      formArrElements.push({
        id: element,
        config: this.state.FormData[element],
      });
    }
    return (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default BootStarpEmployeeEdit;
