import { Avatar, Box, Grid, Typography } from '@mui/material';
import styles from './articlesList.module.scss';
import React, { useEffect, useState } from 'react';
import { Header } from '../../header';
import barman from '../images/barman.jpeg';
import povar from '../images/povar.jpeg';
import dostahik from '../images/dostavhik.png';
import oficiant from '../images/oficiant.png';
import { getArticles } from '../api/getArticles';
import { Link } from 'react-router-dom';

export const ArticlesList = () => {
  const [articlesList, setArticlesList] = useState([]);

  async function getArtuclesList() {
    try {
      const res = await getArticles();
      setArticlesList(res);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getArtuclesList();
  }, []);

  console.log(articlesList);
  return (
    <>
      <Header />
      <Box sx={{ mt: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid
          container
          sx={{ width: '60%' }}
        >
          <Link
            className={styles.link}
            to="/articles-list/povar"
          >
            <Typography variant="h5">Повар</Typography>
            <Avatar
              className={styles.avatar}
              src={povar}
            />
          </Link>
          <Link
            className={styles.link}
            to="/articles-list/povar"
          >
            <Typography variant="h5">Курьер</Typography>
            <Avatar
              className={styles.avatar}
              src={dostahik}
            />
          </Link>
          <Link
            className={styles.link}
            to="/articles-list/povar"
          >
            <Typography variant="h5">Бармен</Typography>
            <Avatar
              className={styles.avatar}
              src={barman}
            />
          </Link>
          <Link
            className={styles.link}
            to="/articles-list/povar"
          >
            <Typography variant="h5">Официант</Typography>
            <Avatar
              className={styles.avatar}
              src={oficiant}
            />
          </Link>
        </Grid>
      </Box>
    </>
  );
};
