import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Snackbar from "@material-ui/core/Snackbar";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

class Connect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudo: "",
      password: "",
      errorAlert: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e){
    axios.post('api/v1/connect', this.state.pseudo).then(
      res => { 
        console.log(this.state.pseudo + " is connected.");
        return (
            <Redirect to='api/v1/posts'/>
        );
      },
      err => { 
        console.log("Error: " + err);
        this.setState({errorAlert: true});
        e.preventDefault();
      }
    );

  }

  render() {
    return (
      <div>
        <Snackbar open={this.state.errorAlert}>
          <Alert severity="error">
            <p>Wrong pseudo or password</p>
          </Alert>
        </Snackbar>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <TextField name="pseudo" required id="standard-required" label="Pseudo" defaultValue={this.state.pseudo} onChange={this.handleInputChange} />
          <br/>
          <TextField name="password" type="password" required id="standard-required" label="Password" onChange={this.handleInputChange} />
          <br/><br/>
          <Button type="submit" variant="contained" color="primary">
            Sign in
          </Button>
        </form>
      </div>
    );
  }
}

export default Connect;