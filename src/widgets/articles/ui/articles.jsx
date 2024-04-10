import React, { useEffect } from 'react';
import styles from './articles.module.scss';
import { useForm } from 'react-hook-form';
import { postArticle } from '../api/postArticles';
import { getArticles } from '../api/getArticles';
import ReactHtmlParser from 'html-react-parser';
import { Header } from '../../header';
import { Box, Button, IconButton, Stack, TextField } from '@mui/material';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatTextdirectionLToRIcon from '@mui/icons-material/FormatTextdirectionLToR';

export const Articles = () => {
  // const [articles, setArticles] = useState([]);
  const form = useForm();
  const { register, formState, handleSubmit, getValues, setValue, watch } = form;
  const { isSubmitting, isDirty } = formState;

  useEffect(() => {
    getArticlesEffect();
  }, []);

  async function onSubmit(data) {
    console.log(data);
    try {
      await postArticle({
        job: data.job,
        topic: data.topic,
        nameArticle: data.nameArticle,
        contentArticle: data.textArticle
      });
      getArticlesEffect();
    } catch (err) {
      console.log(err);
    }
  }

  async function getArticlesEffect() {
    try {
      const res = await getArticles();
      console.log(res);
      // setArticles(res);
    } catch (err) {
      console.log(err);
    }
  }

  const makeParagraph = () => {
    const currentValue = getValues('textArticle');
    const selectedText = window.getSelection().toString();
    const modifiedText = currentValue.replace(selectedText, `<p>${selectedText}</p>`);
    setValue('textArticle', modifiedText);
  };

  const makeBold = () => {
    const currentValue = getValues('textArticle');
    const selectedText = window.getSelection().toString();
    const modifiedText = currentValue.replace(selectedText, `<b>${selectedText}</b>`);
    setValue('textArticle', modifiedText);
  };

  const makeItalic = () => {
    const currentValue = getValues('textArticle');
    const selectedText = window.getSelection().toString();
    const modifiedText = currentValue.replace(selectedText, `<i>${selectedText}</i>`);
    setValue('textArticle', modifiedText);
  };

  const makeUnderlined = () => {
    const currentValue = getValues('textArticle');
    const selectedText = window.getSelection().toString();
    const modifiedText = currentValue.replace(selectedText, `<u>${selectedText}</u>`);
    setValue('textArticle', modifiedText);
  };

  const makeImage = () => {
    const currentValue = getValues('textArticle');
    const selectedText = window.getSelection().toString();
    const modifiedText = currentValue.replace(selectedText, `<img src="${selectedText}" alt="Картинка" />`);
    setValue('textArticle', modifiedText);
  };

  const makeUnorderedList = () => {
    const currentValue = getValues('textArticle');
    const selectedText = window.getSelection().toString();
    const lines = selectedText.split('\n');
    const listItems = lines
      .map(
        line => `
        <li>
    ${line}
    </li>`
      )
      .join('');
    const modifiedText = currentValue.replace(
      selectedText,
      `
      <ul>
    ${listItems}
    </ul>`
    );
    setValue('textArticle', modifiedText);
  };

  const makeOrderedList = () => {
    const currentValue = getValues('textArticle');
    const selectedText = window.getSelection().toString();
    const lines = selectedText.split('\n');
    const listItems = lines.map(line => `<li>${line}</li>`).join('');
    const modifiedText = currentValue.replace(selectedText, `<ol>${listItems}</ol>`);
    setValue('textArticle', modifiedText);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Box
          component="form"
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            id="job"
            label="Профессия"
            className={styles.jobInput}
            {...register('job')}
          />
          <TextField
            id="topic"
            label="Подраздел"
            className={styles.jobInput}
            {...register('topic')}
          />
          <TextField
            label="Название статьи"
            className={styles.nameArticleInput}
            {...register('nameArticle')}
          />
          <Box className={styles.regContainer}>
            <Stack
              className={styles.stickyContainer}
              direction="row"
              spacing={1}
              bgcolor="#d4d4d4"
            >
              <IconButton
                aria-label="makeItalic"
                onClick={makeParagraph}
              >
                <FormatTextdirectionLToRIcon />
              </IconButton>
              <IconButton
                aria-label="makeItalic"
                onClick={makeItalic}
              >
                <FormatItalicIcon />
              </IconButton>
              <IconButton
                aria-label="makeBold"
                onClick={makeBold}
              >
                <FormatBoldIcon />
              </IconButton>
              <IconButton
                aria-label="makeImage"
                onClick={makeUnderlined}
              >
                <FormatUnderlinedIcon />
              </IconButton>
              <IconButton
                aria-label="makeUnorderedList"
                onClick={makeUnorderedList}
              >
                <FormatListBulletedIcon />
              </IconButton>
              <IconButton
                aria-label="makeOrderedList"
                onClick={makeOrderedList}
              >
                <FormatListNumberedIcon />
              </IconButton>
              <IconButton
                aria-label="makeImage"
                onClick={makeImage}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </Stack>
            <TextField
              label="Текст статьи"
              className={styles.textArticleInput}
              multiline
              {...register('textArticle')}
              inputProps={{
                style: {
                  height: '400px'
                }
              }}
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            disabled={isSubmitting && !isDirty}
          >
            Отправить
          </Button>
        </Box>

        <section className={styles.articleWrapper}>
          <h2>{watch('job')}</h2>
          <h3>{watch('topic')}</h3>
          <p>{watch('nameArticle')}</p>
          <div className={styles.articleWrapper}>{ReactHtmlParser(watch('textArticle') || '')}</div>
        </section>

        {/* <section>
          {articles &&
            articles.map(item => (
              <div key={item._id}>
                <h2>{item.job}</h2>
                <h3>{item.topic}</h3>
                <p>{item.nameArticle}</p>
                <div>{ReactHtmlParser(item.contentArticle)}</div>
              </div>
            ))}
        </section> */}
      </div>
    </>
  );
};
