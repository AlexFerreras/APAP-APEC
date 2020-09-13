import React from 'react';
import Container from '@material-ui/core/Container';
import Header from './layout/Header'
import Body from './layout/Body'

const styles = {
  paddingTop: 30
}

const App = () => {
  return (
    <div>
      <Header />
      <Container maxWidth="xl" style={styles}>
        <Body />
      </Container>
    </div>
  )
}

export default App;
