import React from 'react';
import { Articles } from '../widgets/articles/ui/articles';
import { Route, Routes } from 'react-router-dom';
import { AddTest } from '../widgets/addTests';
import { Header } from '../widgets/header';
import { TestList } from '../widgets/testList/ui/testList';
import { ArticlesList } from '../widgets/articlesList';
import { PovarArticles } from '../widgets/povarArticles/ui/povarArticles';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Header />}
        />
        <Route
          path="/test-list"
          element={<TestList />}
        />
        <Route
          path="/articles-list"
          element={<ArticlesList />}
        />
        <Route
          path="/articles"
          element={<Articles />}
        />
        <Route
          path="/add-test"
          element={<AddTest />}
        />
        <Route
          path="/articles-list/povar"
          element={<PovarArticles />}
        />
      </Routes>
    </div>
  );
}

export default App;
