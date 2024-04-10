import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import styles from './toggleDrawer.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import QuizIcon from '@mui/icons-material/Quiz';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';

export const ToggleDrawer = ({ isDrawerOpen, setIsDrawerOpen }) => {
  return (
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
    >
      <Box className={styles.container}>
        <List>
          <Link
            className={styles.link}
            to={'/articles'}
          >
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText color="inherit">Добавление статьи</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            className={styles.link}
            to={'/articles-list'}
          >
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText color="inherit">Список статей</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            className={styles.link}
            to={'/test-list'}
          >
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText color="inherit">Список тестов</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            className={styles.link}
            to={'/add-test'}
          >
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <QuizIcon />
                </ListItemIcon>
                <ListItemText color="inherit">Добавить тесты</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>

          <Divider />
        </List>
      </Box>
    </Drawer>
  );
};
