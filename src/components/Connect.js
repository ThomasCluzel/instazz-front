import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Connect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudo: ""
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
    axios.post('api/v1/connect', this.state).then(
      res => { console.log(this.state.pseudo + " is connected.");
              return <Redirect to='api/v1/posts'/>;
            },
      err => { this.divSubmitResult.innerHTML = "<p>Error: Couldn't connect: " + err.data + "</p>";
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
            Pseudo:
            <input
              name="pseudo"
              type="text"
              value={this.state.pseudo}
              onChange={this.handleInputChange} />
          </label>
          <br/>
          <input type="submit" value="Connect"/>
        </form>
      </div>
    );
  }
}

export default Connect;