export const handleResponse = async (response: Response) => {
  try {
    const data = await response.json();
    if (response.status === 200 || response.status === 201) {
      return { data, statusCode: response.status };
    }
    return { statusCode: response.status, errorMessage: data?.message };
  } catch (err) {
    return { statusCode: response.status, errorMessage: err };
  }
};

export const GET_CALL_Token = async (FetchUrl: string, token: string) => {
  try {
    const response = await fetch(`${FetchUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(handleResponse);
    return response;
  } catch (err) {
    return { statusCode: 0, errorMessage: 'Something went wrong!' };
  }
};

export const POST_CALL_Token = async (PostUrl: string, body: any, token: string) => {
  try {
    const response = await fetch(`${PostUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }).then(handleResponse);
    return response;
  } catch (err) {
    return { statusCode: 0, errorMessage: 'Something went wrong!' };
  }
};

export const GET_CALL = async (FetchUrl: string) => {
  try {
    const response = await fetch(`${FetchUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(handleResponse);
    return response;
  } catch (err) {
    return {
      statusCode: 0,
      errorMessage: 'Something went wrong!',
    };
  }
};

export const POST_CALL = async (PostUrl: string, body: any) => {
  try {
    const response = await fetch(`${PostUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(handleResponse);
    return response;
  } catch (err) {
    console.log('E_R_R_O_R', err);
    return {
      statusCode: 0,
      errorMessage: 'Something went wrong!',
    };
  }
};
