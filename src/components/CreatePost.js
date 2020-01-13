import React from 'react';
import axios from 'axios';
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      author: (props.user ? props.user : ""),
      successAlert: false,
      errorAlert: false
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
    let req = {
      description: this.state.description,
      author: this.state.author
    };
    axios.post('api/v1/posts', req).then(
      res => { 
        this.setState({successAlert: true});
      },
      err => { 
        console.error("Error: " + err);
        this.setState({errorAlert: true});
      }
    );
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h2>Write a post :</h2>
        <Snackbar open={this.state.errorAlert}>
          <Alert severity="error">
            <p>Error while posting your post</p>
          </Alert>
        </Snackbar>
        <Snackbar open={this.state.successAlert}>
          <Alert severity="success">
            <p>Your post has been posted !</p>
          </Alert>
        </Snackbar>
        <form onSubmit={(e) => this.handleSubmit(e)}>
        <TextField multiline rows="5" name="description" required id="standard-required" label="Description" defaultValue={this.state.description} onChange={this.handleInputChange} />
        <br/> <br/>
        <Button type="submit" variant="contained" color="primary">
          Post
        </Button>
        </form>
      </div>
    );
  }
}

export default CreatePost;