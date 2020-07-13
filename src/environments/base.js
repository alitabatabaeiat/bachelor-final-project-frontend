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
        expenses: (expenseId = '') => ({
          getAll: `${baseApi}/${role}/apartments/${apartmentId}/expenses`,
          create: `${baseApi}/${role}/apartments/${apartmentId}/expenses`,
          calculate: `${baseApi}/${role}/apartments/${apartmentId}/expenses/calculate`,
          delete: `${baseApi}/${role}/apartments/${apartmentId}/expenses/${expenseId}`,
          getAllOptions: `${baseApi}/${role}/apartments/${apartmentId}/expenses/options`,
        }),
        charges: (chargeId = '') => ({
          getAll: `${baseApi}/${role}/apartments/${apartmentId}/charges`,
          create: `${baseApi}/${role}/apartments/${apartmentId}/charges`
        })
      }),
      expenseTypes: () => ({
        getAll: `${baseApi}/${role}/expenseTypes`,
        create: `${baseApi}/${role}/expenseTypes`,
      }),
      units: (unitId = '') => ({
        getAll: `${baseApi}/${role}/units`,
        create: `${baseApi}/${role}/units`,
        update: `${baseApi}/${role}/units/${unitId}`,
        delete: `${baseApi}/${role}/units/${unitId}`,
      })
    }),
    isProduction: true,
    isDevelopment: false,
    isTesting: false
  };
}
