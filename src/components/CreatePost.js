import React, { useState } from 'react';
import { Snackbar, TextField, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import API from "../API"
import theme from '../styles/theme';

/**
 * TODO:
 * - Documentation
 * - Remove old version
 * - Style CSS (like other forms)
 * - Test if it works
 */

/**
 * TODO
 * 
 * @param {} props is { stateUser: [ user, setUser ] } 
 */
const CreatePost = (props) => {
    // style
    //TODO

    // state
    const [ description, setDescription ] = useState("");
    const [ successAlert, setSuccessAlert ] = useState(false);
    const [ errorAlert, setErrorAlert ] = useState(false);
    const [ image, setImage ] = useState(null);
    const [ imageURL, setImageURL ] = useState(null);
    const [ errMsg, setErrMsg ] = useState("");
    const user = props.stateUser[0];

    // functions
    const sendPost = (e) => {
        e.preventDefault();

        const req = new FormData();
        req.append("description", description);
        req.append("author", user._id);
        req.append("imageData", image);

        API.post('posts', req).then(
            res => {
                setSuccessAlert(true);
            },
            err => { 
                console.error("" + err);
                setErrMsg(""+err);
                setErrorAlert(true);
            }
        );
    }
    const uploadImage = (e) => {
        setImage(e.target.files[0]);
        setImageURL(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div>
            <Snackbar open={errorAlert} autoHideDuration={6000} onClose={() => setErrorAlert(false)}>
                <Alert severity="error">
                    <p>{errMsg}</p>
                </Alert>
            </Snackbar>
            <Snackbar open={successAlert} autoHideDuration={3000} onClose={() => setSuccessAlert(false)}>
                <Alert severity="success">
                    <p>Posted!</p>
                </Alert>
            </Snackbar>

            <form onSubmit={sendPost}>
                <input type="file" onChange={uploadImage} />
                <img src={imageURL} alt="" />
                <br />
                <TextField name="description" required label="Description"
                    variant={theme.props.variant} multiline rows="5"
                    defaultValue={description} onChange={(e) => setDescription(e.target.value)} />
                <br />
                <Button type="submit" variant={theme.props.variant} color="primary">
                    Post
                </Button>
            </form>
        </div>
    );
};

/*
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
*/

export default CreatePost;
