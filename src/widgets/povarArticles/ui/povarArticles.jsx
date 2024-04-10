import React, { useEffect, useState } from 'react';
import styles from './povarArticles.module.scss';
import { Header } from '../../header';
import { Box, Grid, IconButton, Modal, Typography } from '@mui/material';
import { getArticles } from '../../../shared/api/getArticles';
import ReactHtmlParser from 'html-react-parser';
import CloseIcon from '@mui/icons-material/Close';

export const PovarArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalArticle, setModalArticle] = useState({});
  console.log(modalArticle);

  async function getArticlesEffect() {
    try {
      const res = await getArticles();
      console.log(res);

      const result = res?.filter(item => item.job === 'Повар');
      setArticles(result);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getArticlesEffect();
  }, []);

  console.log(articles);

  const handleClick = article => {
    setIsModalOpen(true);
    setModalArticle(article);
  };
  return (
    <>
      <Header />
      <Grid
        container
        sx={{ mt: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid
          xs={5}
          className={styles.gridItem}
        >
          <Typography variant="h5">Новому повару</Typography>
          {articles &&
            articles.map(
              item =>
                item.topic === 'Новому повару' && (
                  <Typography
                    className={styles.oneArticle}
                    key={item._id}
                    variant="body1"
                    onClick={() => handleClick(item)}
                  >
                    {item.nameArticle}
                  </Typography>
                )
            )}
        </Grid>
        <Grid
          xs={5}
          className={styles.gridItem}
        >
          <Typography variant="h5">Все о работе</Typography>
          {articles &&
            articles.map(
              item =>
                item.topic === 'Все о работе' && (
                  <Typography
                    className={styles.oneArticle}
                    key={item._id}
                    variant="body1"
                    onClick={() => handleClick(item)}
                  >
                    {item.nameArticle}
                  </Typography>
                )
            )}
        </Grid>
        <Grid
          xs={5}
          className={styles.gridItem}
        >
          <Typography variant="h5">Временные нормативы по приготовлению блюд</Typography>
          {articles &&
            articles.map(
              item =>
                item.topic === 'Временные нормативы по приготовлению блюд' && (
                  <Typography
                    className={styles.oneArticle}
                    key={item._id}
                    variant="body1"
                    onClick={() => handleClick(item)}
                  >
                    {item.nameArticle}
                  </Typography>
                )
            )}
        </Grid>
      </Grid>
      {modalArticle && (
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
          sx={{ overflow: 'scroll', mt: '80px' }}
        >
          <Box
            component="form"
            bgcolor="background.paper"
            sx={{
              width: '900px',
              mr: 'auto',
              ml: 'auto',
              position: 'relative'
            }}
          >
            <IconButton
              className={styles.buttonClose}
              aria-label="buttonClose"
              size="large"
              onClick={() => setIsModalOpen(false)}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h4">{modalArticle.nameArticle}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              {ReactHtmlParser(modalArticle.contentArticle || '')}
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};
