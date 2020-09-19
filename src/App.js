import React from 'react';
import Container from '@material-ui/core/Container';
import Header from './layout/Header'
import Download from './layout/Download'
import Upload from './layout/Upload'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const styles = {
  paddingTop: 0
}

const App = () => {
  return (
    <div>
      <Header />
      <Container maxWidth="xl" style={styles}>
        <Router>
          <Switch>
            <Route path="/upload">
              <h1> TSS </h1>
              <Upload />
            </Route>
            <Route path="/">
              <h1> Ferreteria </h1>
              <Download />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  )
}

export default App;
