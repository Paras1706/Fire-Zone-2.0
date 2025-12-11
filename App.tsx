import React, { useState } from 'react';
import { TournamentProvider } from './context/TournamentContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { MatchInfo } from './pages/MatchInfo';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setPage={setCurrentPage} />;
      case 'register':
        return <Register setPage={setCurrentPage} />;
      case 'match':
        return <MatchInfo />;
      case 'contact':
        return <Contact />;
      case 'admin':
        return <Admin />;
      default:
        return <Home setPage={setCurrentPage} />;
    }
  };

  return (
    <TournamentProvider>
      <Layout currentPage={currentPage} setPage={setCurrentPage}>
        {renderPage()}
      </Layout>
    </TournamentProvider>
  );
};

export default App;
