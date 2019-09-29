import axios from 'axios';

export const bsApi = axios.create({
  baseURL: 'https://localhost:5001/'
});

/**
 * Base API Result interface
 */
export interface apiResult {
  /**
   * Indicate whether the API call was successfull or not
   */
  success: boolean;

  /**
   * An error message
   */
  errorMsg: string;
}

/**
 * Base API Result interface for method calls inserting or updating objects
 */
export interface apiCreateUpdateResult extends apiResult {
  /**
   * Identity value of the object created or updated
   */
  identity: number;
}

/**
 * Default (blank) API Result instance
 */
export const defaultApiResult = (): apiResult => ({
  success: false,
  errorMsg: ''
});

// export default axios.create({
//   baseURL: `https://localhost:5001/api`
// });

export function HandleApiRequestError(error: any) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
}
