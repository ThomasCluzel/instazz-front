import React from 'react';
import axios from 'axios';

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
      res => { this.divSubmitResult.innerHTML = "<p>Following post has been created: " + res.data + "</p>";
               this.divSubmitResult.style["background-color"] = "#01DF3A";
               this.divSubmitResult.style["color"] = "#FFFFFF";
            },
      err => { this.divSubmitResult.innerHTML = "<p>Error: Couldn't create post: " + err.data + "</p>";
               this.divSubmitResult.style["background-color"] = "#FF0000"; 
               this.divSubmitResult.style["color"] = "#FFFFFF";
      } 
    );
  }

  divSubmitResult = "";

  render() {
    return (
      <div>
        <div ref={c => (this.divSubmitResult = c)}></div>
        <form onSubmit={() => this.handleSubmit()}>
          <label>
            Description:
            <input
              name="description"
              type="text"
              value={this.state.description}
              onChange={this.handleInputChange} />
          </label>
          <input
              name="author"
              type="hidden"
              value={this.state.author}
        />
          <br/>
          <input type="submit" value="Post"/>
        </form>
      </div>
    );
  }
}

export default CreatePost;