const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const ServerRoute = {
  GET: '/data',
  POST: '/',
};

const HttpMetod = {
  GET: 'GET',
  POST: 'POST',
};

const request = async (url, method = HttpMetod.GET, body = null) => {
  const response = await fetch(url, {method, body});
  return response.json();
};

const loadPictures = async () => request(SERVER_URL + ServerRoute.GET);

const sendPicture = async (pictoreData) => request(SERVER_URL + ServerRoute.POST, HttpMetod.POST, pictoreData);

export {loadPictures, sendPicture};
