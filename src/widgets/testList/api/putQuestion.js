import { BASE_URL } from '../../../shared/api/BASE_URL';

export const putQuestion = ({ questions, _id }) => {
  return fetch(`${BASE_URL}/questions/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      questions: questions
    })
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`);
    } else {
      return res.json();
    }
  });
};
