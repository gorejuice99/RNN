import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    let apiKey = '';
    let url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
      apiKey;
    if (authMode === 'signup') {
      url =
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
        apiKey;
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(parsedRes => {
        dispatch(uiStopLoading());
        if (!parsedRes.idToken) {
          alert('Authentication failed, please try again');
        } else {
          dispatch(authSetToken(parsedRes.idToken));
          startMainTabs();
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(uiStopLoading());
        alert('Something went wrong!');
      });
  };
};

export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    token: token
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    const promise = new Promise((resolve, reject) => {
      if (!token) {
        reject();
      } else {
        resolve(token);
      }
    });

    return promise;
  };
};
