import {
  SET_PLACES,
  REMOVE_PLACE,
  PLACE_ADDED,
  START_ADD_PLACE
} from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const startAddPlace = () => {
  return {
    type: START_ADD_PLACE
  };
};

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert('No valid token found');
      })
      .then(token => {
        authToken = token;
        return fetch(
          'https://us-central1-awesome-places-3080d.cloudfunctions.net/storeImage',
          {
            method: 'post',
            body: JSON.stringify({
              image: image.base64
            }),
            headers: {
              Authorization: 'Bearer ' + authToken
            }
          }
        );
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong, Please try again');
        dispatch(uiStopLoading());
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        console.log(parsedRes);

        const placeData = {
          name: placeName,
          location: location,
          image: parsedRes.imageUrl,
          imageName: parsedRes.imagePath
        };

        return fetch(
          'https://awesome-places-3080d.firebaseio.com/places.json?auth=' +
            authToken,
          {
            method: 'post',
            body: JSON.stringify(placeData)
          }
        );
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        dispatch(uiStopLoading());
        dispatch(placeAdded());
      })
      .catch(error => {
        dispatch(uiStopLoading());
        alert('Something went wrong, Please try again');
        console.log(error);
      });
  };
};

export const getPlaces = () => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => {
        alert('No Token Found');
      })
      .then(token => {
        fetch(
          'https://awesome-places-3080d.firebaseio.com/places.json?auth=' +
            token
        )
          .then(res => res.json())
          .then(parsedRes => {
            const places = [];
            for (let key in parsedRes) {
              places.push({
                ...parsedRes[key],
                key: key,
                image: {
                  uri: parsedRes[key].image
                }
              });
            }
            dispatch(setPlaces(places));
          })
          .catch(error => {
            console.log(error);
            alert('Something Went wrong');
          });
      });
  };
};

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  };
};

export const deletePlace = key => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => {
        alert('No Token Found');
      })
      .then(token => {
        dispatch(removePlace(key));

        return fetch(
          'https://awesome-places-3080d.firebaseio.com/places/' +
            key +
            '.json?auth=' +
            token,
          {
            method: 'DELETE'
          }
        );
      })
      .then(res => res.json())
      .then(parsedRes => {
        alert('Removed!');
      })
      .catch(error => {
        console.log(error);
        alert('Something Went wrong');
      });
  };
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key: key
  };
};

export const placeAdded = () => {
  return {
    type: PLACE_ADDED
  };
};
