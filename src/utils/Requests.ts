import axios from 'axios';
import md5 from 'md5';

const publickey = '9c6db5233b037b620b497f625c45416c';
const privateKey = '2948b94a50e1e550d83e763a85f80adb6a8a7638';

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