import { BASE_URL } from '../../../shared/api/BASE_URL';

export const postArticle = ({ job, topic, nameArticle, contentArticle }) => {
  return fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      job: job,
      topic: topic,
      nameArticle: nameArticle,
      contentArticle: contentArticle
    })
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`);
    } else {
      return res.json();
    }
  });
};
