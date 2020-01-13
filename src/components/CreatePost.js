import React from 'react';
import axios from 'axios';
import Alert from "@material-ui/core/Alert"

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      author: (props.user ? props.user : "")
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

  handleSubmit(){
    axios.post('api/v1/posts', this.state).then(
      res => { 
        return (
          <Alert severity="success">
            <p>Your post has been created: {res.data}</p>
          </Alert>
        );
      },
      err => { 
        return(
          <Alert severity="success">
            <p>Error: your post couldn't be created: {err.data}</p>
          </Alert>
        );
      } 
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={() => this.handleSubmit()}>
          <label>
            Description:
            <input
              name="description"
              type="text"
              value={this.state.description}
              onChange={this.handleInputChange} />
          </label>
          <br/>
          <input type="submit" value="Post"/>
        </form>
      </div>
    );
  }
}

export default CreatePost;