import React from 'react';
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import API from "../API"

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      author: (props.user ? props.user : ""),
      successAlert: false,
      errorAlert: false,
      image: "",
      imageURL: "",
      errMsg: ""
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
    let req = new FormData();
    req.append("description", this.state.description);
    req.append("author", this.state.author)
    req.append("imageData", this.state.image);

    API.post('posts', req).then(
      res => { 
        this.setState({successAlert: true});
      },
      err => { 
        console.error("Error: " + err);
        this.setState({errMsg: ""+err});
        this.setState({errorAlert: true});
      }
    );
    e.preventDefault();
  }

  uploadImage(e){
    this.setState({
      imageURL: URL.createObjectURL(e.target.files[0]),
      image: e.target.files[0]
    });
  }

  render() {
    return (
      <div>
        <h2>Write a post :</h2>
        <Snackbar open={this.state.errorAlert}>
          <Alert severity="error">
            <p>Error while posting your post : {this.state.errMsg}</p>
          </Alert>
        </Snackbar>
        <Snackbar open={this.state.successAlert}>
          <Alert severity="success">
            <p>Your post has been posted !</p>
          </Alert>
        </Snackbar>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="file" onChange={(e) => this.uploadImage(e)}/>
          <img src={this.state.imageURL} alt=""/>
          <br/>
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