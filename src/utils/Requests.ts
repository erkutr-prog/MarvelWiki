import axios from 'axios';
import md5 from 'md5';

const publickey = '';
const privateKey = '';

const ts = new Date().getTime();

const hash = md5(`${ts}${privateKey}${publickey}`);

const api = axios.create({
  baseURL: 'http://gateway.marvel.com/v1/public/',
  params: {
    ts,
    apikey: publickey,
    hash,
  },
});

export default api;
