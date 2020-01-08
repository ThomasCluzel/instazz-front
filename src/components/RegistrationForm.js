// Component to register a new user

import React from 'react';
import API from '../API';
// TODO: import style and add className="RegistrationFrom" to the global div
// Add some text to display if the creation succeeded or failed

const RegistrationForm = () => (
    <div>
        <form onSubmit={ () => {
            API.post('users', { name: this.refs.name, pseudo: this.refs.pseudo })
            .then(
                ok => {}, // TODO: display a message with the Snackbar of Material UI
                err => {} // TODO: display an error
            )
        }}>
            Name: <input type="text" placeholder="John Smith" name="name" ref="name" /> <br />
            Pseudo: <input type="text" placeholder="xXDarkRaptorKillerXx" name="pseudo" ref="pseudo" /> <br />
            Password: <input type="password" name="password" ref="password" /> <br />
            <input type="submit" value="Register" />
        </form>
    </div>
);

export default RegistrationForm;
