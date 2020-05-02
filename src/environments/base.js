/*
 * Base is the default environment for production.
 * Add everything here and override value in other files if needed.
 * https://blog.usejournal.com/my-awesome-custom-react-environment-variables-setup-8ebb0797d8ac
 */
export default function baseEnv(baseApi) {
  return {
    route: {
      baseRoute: '/'
    },
    api: {
      apartments: (role) => ({
        getAll: `${baseApi}/${role}/apartments`
      })
    },
    isProduction: true,
    isDevelopment: false,
    isTesting: false
  };
}
