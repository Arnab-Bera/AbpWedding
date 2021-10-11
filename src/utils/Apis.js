import {Platform} from 'react-native';

const devUrl = 'https://sof.abpweddings.com/mats/activity/read/';
const liveUrl = 'https://sof.abpweddings.com/mats/activity/read/';

const baseUrl = devUrl;

/* api call for raw data */
var callApis = function (apiName, myData) {
  var apiUrl = baseUrl + apiName;
  console.log('apiUrl:: ', apiUrl);
  console.log('myData:: ', myData);
  return new Promise(function (onSuccess, onFail) {
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: myData,
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('responseJson:: ', JSON.stringify(responseJson));
        onSuccess(responseJson);
      })
      .catch(error => {
        console.log(error);
        onFail(error);
      });
  });
};

var callApi = function (apiName) {
  var apiUrl = baseUrl + apiName;
  console.log('yes');

  console.log('apiUrl:: ', apiUrl);
  // console.log('myData:: ', myData);
  return new Promise(function (onSuccess, onFail) {
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization:
          global.loginUserTokenType + ' ' + global.loginUserAccessToken,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('responseJson:: ', JSON.stringify(responseJson));
        onSuccess(responseJson);
      })
      .catch(error => {
        console.log(error);
        onFail(error);
      });
  });
};

var callGetApis = function (apiName, token) {
  var apiUrl = baseUrl + apiName;
  console.log('apiUrl:: ', apiUrl);
  return new Promise(function (onSuccess, onFail) {
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('responseJson:: ', JSON.stringify(responseJson));
        onSuccess(responseJson);
      })
      .catch(error => {
        console.log('error::', error);
        onFail(error);
      });
  });
};

export const Apis = {
  callApi,
  callApis,
  callGetApis,
};
