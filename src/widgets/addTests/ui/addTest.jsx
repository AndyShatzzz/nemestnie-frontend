import React from 'react';
import { Header } from '../../header';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { postNewTestApi } from '../api/postNewTestApi';

export const AddTest = () => {
  const form = useForm();
  const { register, formState, handleSubmit } = form;
  const { isSubmitting, isDirty } = formState;

  async function onSubmit(data) {
    console.log(data);
    try {
      await postNewTestApi({
        job: data.job,
        nameTest: data.nameTest
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ mt: '80px', textAlign: 'center' }}
        >
          Создание тестов
        </Typography>
        <Box
          component="form"
          sx={{ width: '600px', mr: 'auto', ml: 'auto', mt: 3 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Профессия тестируемого"
            fullWidth
            {...register('job')}
          />
          <TextField
            label="Название теста"
            fullWidth
            sx={{ mt: 2 }}
            {...register('nameTest')}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            fullWidth
            disabled={isSubmitting || !isDirty}
          >
            Создать тест
          </Button>
        </Box>
      </Box>
    </>
  );
};
