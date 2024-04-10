import { BASE_URL } from '../../../shared/api/BASE_URL';

export const postNewTestApi = ({ job, nameTest }) => {
  return fetch(`${BASE_URL}/questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      job: job,
      nameTest: nameTest
    })
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`);
    } else {
      return res.json();
    }
  });
};
