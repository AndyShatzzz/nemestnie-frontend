import { BASE_URL } from '../../../shared/api/BASE_URL';

export const patchQuestion = ({ _id, questions }) => {
  return fetch(`${BASE_URL}/questions/${_id}`, {
    method: 'PATCH',
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
