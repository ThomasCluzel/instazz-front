// Overriding of axios to request our API more easily

import axios from 'axios';

export default axios.create({
  baseURL: 'http://' + process.env.REACT_APP_API_URL + '/api/v1/'
});
