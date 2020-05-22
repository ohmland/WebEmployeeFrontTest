import React,{Component} from 'react';

import {Table, Button, ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';

export class Employee extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emps:[], 
      addModalShow: false,
      editModalShow: false
    }
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    fetch('https://localhost:44356/api/Employee')
      .then(response=> response.json())
      .then(data=> {
          this.setState({emps:data});
        }
      );
  }

  componentDidUpdate() {
    this.refreshList();
  }

  deleteEmp(empid) {
    if (window.confirm('Are you sure?')) {
      fetch('https://localhost:44356/api/Employee/'+empid, {
          method: 'DELETE',
          header: {'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
    }
  }

  render() {
    const {
      emps, 
      empid, 
      empfirstname, 
      emplastname,
      depid,
      empphone,
      empmail
    } = this.state;

    let addModalClose = () => this.setState({
      addModalShow: false
    });

    let editModalClose = () => this.setState({
      editModalShow: false
    });

    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Firstname</th>
              <th>Employee Lastname</th>
              <th>Department ID</th>
              <th>Phone</th>
              <th>Mail</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {emps.map(emp=>
              <tr key={emp.employee_id}>
                <td>{emp.employee_id}</td>
                <td>{emp.employee_firstname}</td>
                <td>{emp.employee_lastname}</td>
                <td>{emp.department_id}</td>
                <td>{emp.phone}</td>
                <td>{emp.mail}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2" 
                      variant="info"
                      onClick={()=>
                        this.setState({
                          editModalShow: true,
                          empid: emp.employee_id,
                          empfirstname: emp.employee_firstname,
                          emplastname: emp.employee_lastname,
                          depid: emp.department_id,
                          empphone: emp.phone,
                          empmail: emp.mail
                        })
                      }

                    >
                      Edit
                    </Button>

                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={()=> this.deleteEmp(emp.employee_id)}
                    >
                      Delete
                    </Button>

                    <EditEmpModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      empid={empid}
                      empfirstname={empfirstname}
                      emplastname={emplastname}
                      depid={depid}
                      empphone={empphone}
                      empmail={empmail}
                    />

                  </ButtonToolbar>
                </td>
              </tr>
              )}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({
                addModalShow: true
              })}
          >Add Employee
          </Button>
          <AddEmpModal
            show={this.state.addModalShow}
            onHide={addModalClose}
          />
        </ButtonToolbar>
      </div>

    )
  }
}