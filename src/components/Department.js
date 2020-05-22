import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';
import {EditDepModal} from './EditDepModal';

export class Department extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deps:[], 
      addModalShow: false,
      editModalShow: false
    }
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    fetch('https://localhost:44356/api/Department')
      .then(response=> response.json())
      .then(data=> {
          this.setState({deps:data});
        }
      );
  }

  componentDidUpdate() {
    this.refreshList();
  }

  deleteDep(depid) {
    if (window.confirm('Are you sure?')) {
      fetch('https://localhost:44356/api/Department/'+depid, {
          method: 'DELETE',
          header: {'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
    }
  }

  render() {
    const {deps, depid, groupname, depname} = this.state;
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
              <th>Department ID</th>
              <th>Department Name</th>
              <th>Group</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {deps.map(dep=>
              <tr key={dep.department_id}>
                <td>{dep.department_id}</td>
                <td>{dep.department_name}</td>
                <td>{dep.group_name}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2" 
                      variant="info"
                      onClick={()=>
                        this.setState({
                          editModalShow: true,
                          depid: dep.department_id,
                          depname: dep.department_name,
                          groupname: dep.group_name
                        })
                      }

                    >
                      Edit
                    </Button>

                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={()=> this.deleteDep(dep.department_id)}
                    >
                      Delete
                    </Button>

                    <EditDepModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      depid={depid}
                      depname={depname}
                      groupname={groupname}
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
          >Add Department
          </Button>
          <AddDepModal
            show={this.state.addModalShow}
            onHide={addModalClose}
          />
        </ButtonToolbar>
      </div>
    )
  }
}