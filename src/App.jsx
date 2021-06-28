// React
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Material UI Components
import { Container } from '@material-ui/core';

// React Components
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home.jsx';
import Auth from './components/Auth/Auth.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;