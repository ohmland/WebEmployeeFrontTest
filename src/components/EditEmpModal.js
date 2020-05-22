import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditEmpModal extends Component{
  constructor(props) {
    super(props);

    this.state = {
      deps: [],
      snackbaropen: false,
      snackbarmsg: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('https://localhost:44356/api/Department')
      .then(response => response.json())
      .then(data => {
        this.setState({
          deps: data
        })
      })
  }

  snackbarClose = (event) => {
    this.setState({
      snackbaropen: false
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    
    fetch('https://localhost:44356/api/Employee', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        employee_id: event.target.EmployeeID.value,
        employee_firstname: event.target.EmployeeFirstname.value,
        employee_lastname: event.target.EmployeeLastname.value,
        department_id: event.target.Department.value,
        phone: event.target.EmployeePhone.value,
        mail: event.target.EmployeeMail.value
      })
    })
      .then(res=> res.json())
      .then((result)=>
      {
        this.setState({
          snackbaropen: true,
          snackbarmsg: result
        });
      },
      (error)=>{
        this.setState({
          snackbaropen: true,
          snackbarmsg: 'failed'
        });
      })
      
  }

  render() {
   return(
    <div className="container">

    <Snackbar
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center'
      }}
      open={this.state.snackbaropen}
      autoHideDuration={3000}
      onClose={this.snackbarClose}

      message={<span id="message-id">{this.state.snackbarmsg}</span>}
      action={[
        <IconButton
          key="close"
          arial-label="Close"
          color="inherit"
          onClick={this.snackbarClose}
        >
          x
        </IconButton>
      ]}
    />

    <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Employee
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
          <Row>
            <Col sm={6}>
              <Form onSubmit={this.handleSubmit}>

                <Form.Group controlId="EmployeeID">
                  <Form.Label>Employee ID</Form.Label>
                  <Form.Control 
                    type="text"
                    name="EmployeeID"
                    required disabled 
                    defaultValue={this.props.empid}
                    placeholder="Employee ID"
                  />
                </Form.Group>
                
                <Form.Group controlId="EmployeeFirstname">
                  <Form.Label>Employee Firstname</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="EmployeeFirstname"
                    required 
                    defaultValue={this.props.empfirstname}
                    placeholder="Employee Firstname"
                  />
                </Form.Group>

                <Form.Group controlId="EmployeeLastname">
                  <Form.Label>Employee Lastname</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="EmployeeLastname"
                    required 
                    defaultValue={this.props.emplastname}
                    placeholder="Employee Lastname"
                  />
                </Form.Group>

                <Form.Group controlId="Department">
                  <Form.Label>Department</Form.Label>
                  <Form.Control as="select" defaultValue={this.props.depid}>
                    {this.state.deps.map(dep => 
                      <option key={dep.department_id} value={dep.department_id}>{dep.department_name}</option>  
                    )}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="EmployeePhone">
                  <Form.Label>Employee Phone</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="EmployeePhone"
                    required 
                    defaultValue={this.props.empphone}
                    placeholder="Employee Phone"
                  />
                </Form.Group>

                <Form.Group controlId="EmployeeMail">
                  <Form.Label>Employee Mail</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="EmployeeMail"
                    required 
                    defaultValue={this.props.empmail}
                    placeholder="Employee Mail"
                  />
                </Form.Group>

                <Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form.Group>

              </Form>
            </Col>
          </Row>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>

    </div>
    );
  }
}