// Overriding of axios to request our API more easily

import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api/v1/'
});
