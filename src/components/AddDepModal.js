import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class AddDepModal extends Component{
  constructor(props) {
    super(props);

    this.state = {
      snackbaropen: false,
      snackbarmsg: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  snackbarClose = (event) => {
    this.setState({
      snackbaropen: false
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    
    fetch('https://localhost:44356/api/Department', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        department_id: null,
        group_name: event.target.GroupName.value,
        department_name: event.target.DepartmentName.value
      })
    })
      .then(res=> res.json())
      .then((result)=>
      {
        //alert(result);
        this.setState({
          snackbaropen: true,
          snackbarmsg: result
        });
      },
      (error)=>{
        //alert('Failed');
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
          Add Department
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
          <Row>
            <Col sm={6}>
              <Form onSubmit={this.handleSubmit}>

                <Form.Group controlId="GroupName">
                  <Form.Label>Group Name</Form.Label>
                  <Form.Control type="text" name="GroupName"
                    required placeholder="Group Name"
                  />
                </Form.Group>

                <Form.Group controlId="DepartmentName">
                  <Form.Label>Department Name</Form.Label>
                  <Form.Control type="text" name="DepartmentName"
                    required placeholder="Department Name"
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