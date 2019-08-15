import React, { Component, Fragment } from 'react';
import { Route, Switch, Link, Redirect } from "react-router-dom";
import styled from 'styled-components';

import { PAGES } from '../store/constants';

import GUIDELINE,
  {
    GlobalStyle,
    Container,
  } from '../guideline';

import Search from './Search';
import Collection from './Collection';

const AppWrapper = styled.div`
  min-height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const AppHeader = styled.div`
  position: relative;
  background-color: ${GUIDELINE.color_dark};
  display: flex;
  align-items: flex-start;
  box-shadow: ${GUIDELINE.shadow_offset_x} ${GUIDELINE.shadow_offset_y} ${GUIDELINE.shadow_size} ${GUIDELINE.shadow_spread} ${GUIDELINE.color_shadow};
`

const AppPage = styled.div`
  flex-grow: 1;
`

const Menu = styled.ul`
  display: flex;
  flex-direction: row;
  align-self: stretch;
`

const MenuItem = styled.li`
  align-self: center;

  &:not(:last-child) {
    margin-right: calc(${GUIDELINE.gutter}px * 4);
  }

  @media (max-width: ${GUIDELINE.breackpoint_xs_max}) {
    &:not(:last-child) {
      margin-right: calc(${GUIDELINE.gutter}px * 2);
    }
  }

  ${Link} {
    text-transform: uppercase;
    font-size: ${GUIDELINE.fontsize_large}px;

    @media (max-width: ${GUIDELINE.breackpoint_xs_max}) {
      font-size: ${GUIDELINE.fontsize_small}px;
    }
  }
`

const Index = () => {
  return <Redirect to={ PAGES[0].path } />
}

class App extends Component {
  render() {
    return (
      <Fragment>
        <GlobalStyle />
        <AppWrapper>
          <AppHeader>
            <Container>
              <Menu>
                {PAGES.map((page, index) => {
                  return (
                    <MenuItem key={index} >
                      <Link
                        to={page.path}
                        aria-label={page.aria}
                      >{page.title}
                      </Link>
                    </MenuItem>
                  );
                })}
              </Menu>
            </Container>
          </AppHeader>
          <AppPage>
            <Route
              exact
              path='/'
              component={ Index }
            />
            <Switch>
              <Route
                path={ PAGES[0].path }
                component={ Search }
              />
              <Route
                path={ PAGES[1].path }
                component={ Collection }
              />
            </Switch>
          </AppPage>
        </AppWrapper>
      </Fragment>
    );
  }
}

export default App;
