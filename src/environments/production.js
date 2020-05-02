import environment from './base';

/*
 * base.ts is the default environment for production.
 * You shouldn't have override anything.
 */

const baseApi = 'http://127.0.0.1:5000/api/v1';
const env = environment(baseApi);

const productionEnv = {
  ...env,
};

export default productionEnv;
