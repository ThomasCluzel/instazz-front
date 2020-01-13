// Component to register a new user

import React from 'react';
// TODO: import style and add className="RegistrationFrom" to the global div

const api_url = "localhost:5000/api/v1/";

const RegistrationForm = () => (
    <div>
        <form action={api_url + "users"} method="post">
            Name: <input type="text" name="name" /> <br />
            Pseudo: <input type="text" name="pseudo" /> <br />
            Password: <input type="password" name="password" /> <br />
            <input type="submit" value="Register" />
        </form>
    </div>
);

export default RegistrationForm;
