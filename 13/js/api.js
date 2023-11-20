const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const serverRoute = {
  GET: '/data',
  POST: '/',
};

const httpMetod = {
  GET: 'GET',
  POST: 'POST',
};

const request = async (url, method = httpMetod.GET, body = null) => {
  const response = await fetch(url, {method, body});
  return response.json();
};

const loadPictures = async () => request(SERVER_URL + serverRoute.GET);

const sendPicture = async (pictoreData) => request(SERVER_URL + serverRoute.POST, httpMetod.POST, pictoreData);

export {loadPictures, sendPicture};
