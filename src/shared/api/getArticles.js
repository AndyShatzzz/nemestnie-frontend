import { BASE_URL } from './BASE_URL';

export const getArticles = () => {
  return fetch(`${BASE_URL}/articles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`);
    } else {
      return res.json();
    }
  });
};
