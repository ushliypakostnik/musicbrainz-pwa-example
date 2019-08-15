import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import GUIDELINE, { GlobalStyle } from '../guideline';

const AppWrapper = styled.div`

`

const AppHeader = styled.div`
  background-color: ${GUIDELINE.color_light};
  height: 100px;
`

const AppBody = styled.div`
  background-color: ${GUIDELINE.color_white};
`

class App extends Component {
  render() {
    return (
      <Fragment>
        <GlobalStyle />
        <AppWrapper>
          <AppHeader>
          </AppHeader>
          <AppBody>
          </AppBody>
        </AppWrapper>
      </Fragment>
    );
  }
}

export default App;
