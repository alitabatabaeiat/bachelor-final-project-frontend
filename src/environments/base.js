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
    api: (role) => ({
      apartments: (apartmentId = '') => ({
        getAll: `${baseApi}/${role}/apartments`,
        delete: `${baseApi}/${role}/apartments/${apartmentId}`,
        expenses: (expensesId = '') => ({
          getAll: `${baseApi}/${role}/apartments/${apartmentId}/expenses`,
          create: `${baseApi}/${role}/apartments/${apartmentId}/expenses`,
          delete: `${baseApi}/${role}/apartments/${apartmentId}/expenses/${expensesId}`,
          getAllOptions: `${baseApi}/${role}/apartments/${apartmentId}/expenses/options`,
        })
      }),
      expenseTypes: () => ({
        getAll: `${baseApi}/${role}/expenseTypes`,
        create: `${baseApi}/${role}/expenseTypes`,
      }),
      units: () => ({
        getAll: `${baseApi}/${role}/units`
      })
    }),
    isProduction: true,
    isDevelopment: false,
    isTesting: false
  };
}
