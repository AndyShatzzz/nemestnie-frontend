import { Box, Button, Modal, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { patchQuestion } from '../api/patchQuestionApi';

export const EditQuestion = ({
  testId,
  questionId,
  setIsEditorOpen,
  isEditorOpen,
  question,
  answers,
  correctAnswer
}) => {
  const form = useForm();
  const { register, formState, handleSubmit, setValue } = form;
  const { isSubmitting, isDirty } = formState;

  const setInputText = () => {
    setValue('question', question);
    setValue('answer1', answers[0]);
    setValue('answer2', answers[1]);
    setValue('answer3', answers[2]);
    setValue('answer4', answers[3]);
    setValue('correctAnswer', correctAnswer);
  };

  useEffect(() => {
    setInputText();
  }, []);

  async function onSubmit(data) {
    try {
      patchQuestion({
        _id: testId,
        questions: {
          question: data.question,
          answers: [data.answer1, data.answer2, data.answer3, data.answer4],
          correctAnswer: data.correctAnswer,
          _id: questionId
        }
      });
      setIsEditorOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Modal
      open={isEditorOpen}
      onClose={() => setIsEditorOpen(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        component="form"
        bgcolor="background.paper"
        sx={{ width: '600px', mt: '80px', mr: 'auto', ml: 'auto' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Button onClick={() => setIsEditorOpen(false)}>Закрыть</Button>
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
          Редактировать вопрос
        </Button>
      </Box>
    </Modal>
  );
};
