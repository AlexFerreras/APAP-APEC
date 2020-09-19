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
  paddingTop: 30
}

const App = () => {
  return (
    <div>
      <Header />
      <Container maxWidth="xl" style={styles}>
        <Router>
          <Switch>
            <Route path="/upload">
              <Upload />
            </Route>
            <Route path="/">
              <Download />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  )
}

export default App;
