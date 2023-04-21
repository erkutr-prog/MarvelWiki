import React from 'react';
import axios from 'axios';
import md5 from 'md5';
import { PUBLIC_KEY, PRIVATE_KEY } from '@env'

const publickey = PUBLIC_KEY;
const privateKey = PRIVATE_KEY;

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
