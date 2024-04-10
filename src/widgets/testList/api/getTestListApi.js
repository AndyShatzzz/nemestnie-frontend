import { BASE_URL } from '../../../shared/api/BASE_URL';

export const getTests = () => {
  return fetch(`${BASE_URL}/questions`, {
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
