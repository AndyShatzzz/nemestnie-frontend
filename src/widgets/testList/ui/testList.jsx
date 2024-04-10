import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getTests } from '../api/getTestListApi';
import { Header } from '../../header';
import { useForm } from 'react-hook-form';
import { putQuestion } from '../api/putQuestion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { EditQuestion } from '../../../features/editQuestion/ui/editQuestion';

export const TestList = () => {
  const [testsList, setTestsList] = useState([]);
  const [isAdderOpen, setIsAdderOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [testId, setTestId] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [expanded, setExpanded] = useState(false);

  const form = useForm();
  const { register, formState, handleSubmit } = form;
  const { isSubmitting, isDirty } = formState;

  async function getQuestionList() {
    try {
      const res = await getTests();
      setTestsList(res);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getQuestionList();
  }, []);

  const clickAddQuestion = _id => {
    setIsAdderOpen(true);
    setTestId(_id);
  };

  async function onSubmit(data) {
    console.log({
      question: data.question,
      answers: [data.answer1, data.answer2, data.answer3, data.answer4],
      correctAnswer: data.correctAnswer
    });
    console.log(testId);
    try {
      putQuestion({
        _id: testId,
        questions: {
          question: data.question,
          answers: [data.answer1, data.answer2, data.answer3, data.answer4],
          correctAnswer: data.correctAnswer
        }
      });
      setIsAdderOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const openEditForm = (questionId, testId, question, answers, correctAnswer) => {
    setIsEditorOpen(true);
    setQuestionId(questionId);
    setTestId(testId);
    setQuestion(question);
    setAnswers(answers);
    setCorrectAnswer(correctAnswer);
  };

  return (
    <>
      <Header />
      {!isAdderOpen && (
        <Box sx={{ mt: '80px' }}>
          {testsList &&
            testsList.map(item => (
              <Accordion
                key={item._id}
                expanded={expanded === item._id}
                onChange={handleChange(item._id || '')}
                sx={{ width: '100%' }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Grid container>
                    <Grid
                      item
                      sx={{ width: '33%', flexShrink: 0 }}
                    >
                      {item.nameTest}
                    </Grid>
                    <Grid
                      item
                      sx={{ width: '33%', flexShrink: 0, color: 'text.secondary' }}
                    >
                      {item.job}
                    </Grid>
                    <Grid
                      item
                      sx={{ width: '33%', flexShrink: 0, color: 'text.secondary' }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => clickAddQuestion(item._id)}
                      >
                        Добавить вопросы
                      </Button>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  {item.questions &&
                    item.questions.map((question, i) => (
                      <Grid
                        key={question._id}
                        container
                        sx={{ mt: 2 }}
                      >
                        <Grid
                          item
                          sx={{ mr: 1 }}
                        >
                          {i + 1}.
                        </Grid>
                        <Grid
                          item
                          sx={{ width: '63.5%', flexShrink: 0 }}
                        >
                          {question.question}
                        </Grid>
                        <Grid
                          item
                          sx={{ width: '30%', flexShrink: 0 }}
                        >
                          <Button
                            variant="contained"
                            onClick={() =>
                              openEditForm(
                                question._id,
                                item._id,
                                question.question,
                                question.answers,
                                question.correctAnswer
                              )
                            }
                          >
                            Редактировать вопрос
                          </Button>
                        </Grid>
                        {question.answers &&
                          question.answers.map((answer, index) => (
                            <Grid
                              container
                              key={answer._id}
                              sx={{ ml: 4 }}
                            >
                              <Grid
                                item
                                sx={{ mr: 2 }}
                              >
                                {index + 1}.
                              </Grid>
                              <Grid item>{answer}</Grid>
                            </Grid>
                          ))}
                        <Grid
                          item
                          sx={{ mt: 1 }}
                        >
                          Правильный ответ: {question.correctAnswer}
                        </Grid>
                      </Grid>
                    ))}
                </AccordionDetails>
              </Accordion>
            ))}
        </Box>
      )}
      {isAdderOpen && (
        <Box
          component="form"
          sx={{ width: '600px', mt: '80px', mr: 'auto', ml: 'auto' }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Button onClick={() => setIsAdderOpen(false)}>Закрыть</Button>
          <TextField
            label="Вопрос"
            fullWidth
            sx={{ mt: 2 }}
            {...register('question')}
          />
          <TextField
            label="Вариант ответа 1"
            fullWidth
            sx={{ mt: 2 }}
            {...register('answer1')}
          />
          <TextField
            label="Вариант ответа 2"
            fullWidth
            sx={{ mt: 2 }}
            {...register('answer2')}
          />
          <TextField
            label="Вариант ответа 3"
            fullWidth
            sx={{ mt: 2 }}
            {...register('answer3')}
          />
          <TextField
            label="Вариант ответа 4"
            fullWidth
            sx={{ mt: 2 }}
            {...register('answer4')}
          />
          <TextField
            label="Правильный ответ"
            fullWidth
            sx={{ mt: 2 }}
            {...register('correctAnswer')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            disabled={isSubmitting || !isDirty}
          >
            Добавить вопрос
          </Button>
        </Box>
      )}
      {isEditorOpen && (
        <EditQuestion
          testId={testId}
          questionId={questionId}
          setIsEditorOpen={setIsEditorOpen}
          isEditorOpen={isEditorOpen}
          question={question}
          answers={answers}
          correctAnswer={correctAnswer}
        />
      )}
    </>
  );
};
