// Overriding of axios to request our API more easily

import axios from 'axios';

export default axios.create({
  baseURL: 'localhost:5000/api/v1/'
});
