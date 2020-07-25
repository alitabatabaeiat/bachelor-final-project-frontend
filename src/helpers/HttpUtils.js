import axios from 'axios';

const RequestMethod = {
  Get: 'GET',
  Post: 'POST',
  Put: 'PUT',
  Delete: 'DELETE',
  Options: 'OPTIONS',
  Head: 'HEAD',
  Patch: 'PATCH'
};

export async function get(endpoint, token, params, requestConfig) {
  const paramsConfig = params ? { params } : undefined;
  console.log(params);
  console.log(paramsConfig);

  return _request(
    {
      url: endpoint,
      method: RequestMethod.Get
    },
    {
      ...paramsConfig,
      ...requestConfig,
      headers: {
        token
      }
    }
  );
}

export async function post(endpoint, token, data) {
  const config = data ? { data } : {};
  config.headers = { token };

  return _request(
    {
      url: endpoint,
      method: RequestMethod.Post
    },
    config
  );
}

export async function patch(endpoint, token, data) {
  const config = data ? { data } : {};
  config.headers = { token };

  return _request(
    {
      url: endpoint,
      method: RequestMethod.Patch
    },
    config
  );
}

export async function del(endpoint, token) {
  const config = token ? { headers: { token } } : undefined;

  return _request(
    {
      url: endpoint,
      method: RequestMethod.Delete
    },
    config
  );
}

async function _request(restRequest, config) {
  if (!restRequest.url) {
    console.error(`Received ${restRequest.url} which is invalid for a endpoint url`);
  }

  try {
    const axiosRequestConfig = {
      ...config,
      method: restRequest.method,
      url: restRequest.url,
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers
      }
    };
    console.log(axiosRequestConfig);
    const [axiosResponse] = await Promise.all([axios(axiosRequestConfig), _delay()]);

    const { data } = axiosResponse;

    return data;
  } catch (error) {
    if (error.response) {
      const { data } = error.response;

      return data;
    } else if (error.request) {
      const { statusText } = error.request;

      return statusText;
    }

    return error.message;
  }
}

function _delay(duration = 2500) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
