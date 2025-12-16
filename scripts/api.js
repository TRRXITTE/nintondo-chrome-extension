import axios from 'axios';

import { NINTONDO_BASE_URL } from './helpers/constants';

export const mydoge = axios.create({
  baseURL: NINTONDO_BASE_URL,
});
