import { Component } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody/TableBody";
import TableCell from "@mui/material/TableCell/TableCell";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import Paper from "@mui/material/Paper/Paper";
import axios from "axios";
import EmployeeButton from "../Shared/Button/EmployeeButton";
import BootStarpEmployeeButton from "../Shared/Button/BootStarpEmployeeButton";
import EmployeeModal from "../Shared/Modal/EmployeeModal";

class Employees extends Component {
  state = {
    Employees: [],
  };

  constructor(props) {
    super(props);
    console.log("Employees_constructor");
    //this.GetInitialData();
  }

  componentDidMount() {
    //console.log(this.props);
    console.log("Employees_componentDidMount");
    this.GetInitialData();
  }

  componentDidUpdate() {
    console.log("Employees_componentDidUpdate");
  }

  GetInitialData() {
    axios
      .get("https://localhost:7270/api/Employee/GetEmployees")
      .then((res) => {
        this.setState({ Employees: res.data });
      });
  }

  AddEmployee = () => {
    this.props.history.push({ pathname: "/Employee/Add" });
  };

  AddBootStarpEmployee = () => {
    this.props.history.push({ pathname: "/Employee/AddByBootStarp" });
  };

  EditEmployee = (id) => {
    this.props.history.push({ pathname: "/Employee/Edit/" + id });
  };

  DeleteEmployee = (id) => {
    axios
      .delete("https://localhost:7270/api/Employee/DeleteEmployee?Id=" + id)
      .then((res) => {
        this.GetInitialData();
      });
  };

  render() {
    console.log("Employees_render");
    const BtnAdd = "Add Employee";
    const BtnDelete = "Delete Employee";
    const BtnEdit = "Edit Employee";
    return (
      <div>
        <div>
          <h1>Employee Table</h1>
        </div>
        <div>
          <EmployeeButton text={BtnAdd} clicked={() => this.AddEmployee()} />
          <BootStarpEmployeeButton
            text={BtnAdd}
            clicked={() => this.AddBootStarpEmployee()}
          />
          <EmployeeModal />
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Age</TableCell>
                  <TableCell align="right">Salary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.Employees.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.age}</TableCell>
                    <TableCell align="right">{row.salary}</TableCell>
                    <TableCell align="right">
                      <EmployeeButton
                        text={BtnDelete}
                        clicked={() => this.DeleteEmployee(row.id)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <EmployeeButton
                        text={BtnEdit}
                        clicked={() => this.EditEmployee(row.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default Employees;
