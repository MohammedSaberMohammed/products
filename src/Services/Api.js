/* eslint-disable import/no-anonymous-default-export */
import apisauce from 'apisauce';
import { ApiConfigs } from '../Configs';
import HttpMiddleware from './HttpMiddleware';

const Seconds = n => n * 1000; // convert seconds to milliseconds

const configs = {
  headers: { 'Content-Type': 'application/json' },

  timeout: Seconds(30),
};

const Ibtkar = apisauce.create({ ...configs, baseURL: ApiConfigs.baseURL.test });

new HttpMiddleware(Ibtkar);

export default {
  products: {
    list: () => Ibtkar.get('products'),
  }
};
