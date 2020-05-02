import axios from 'axios';

const RequestMethod = {
  Get: 'GET',
  Post: 'POST',
  Put: 'PUT',
  Delete: 'DELETE',
  Options: 'OPTIONS',
  Head: 'HEAD',
  Patch: 'PATCH',
};

export async function get(endpoint, params, requestConfig) {
  const paramsConfig = params ? { params } : undefined;

  return _request(
    {
      url: endpoint,
      method: RequestMethod.Get,
    },
    {
      ...paramsConfig,
      ...requestConfig,
    }
  );
}

export async function post(endpoint, data) {
  const config = data ? { data } : undefined;

  return _request(
    {
      url: endpoint,
      method: RequestMethod.Post,
    },
    config
  );
}

export async function patch(endpoint, data) {
  const config = data ? { data } : undefined;

  return _request(
    {
      url: endpoint,
      method: RequestMethod.Patch,
    },
    config
  );
}

export async function del(endpoint) {
  return _request({
    url: endpoint,
    method: RequestMethod.Delete,
  });
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
        ...config?.headers,
      },
    };
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

function _delay(duration = 250) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
