import environment from './base';

const baseApi = 'http://127.0.0.1:5000/api/v1';
const env = environment(baseApi);

const developmentEnv = {
  ...env,
  api: {
    ...env.api,
  },
  isProduction: false,
  isDevelopment: true,
};

export default developmentEnv;
