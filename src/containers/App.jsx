import React, { Component, Fragment } from 'react';
import { Route, Switch, Link, Redirect } from "react-router-dom";
import styled from 'styled-components';

import { PAGES } from '../store/constants';

import GUIDELINE,
  {
    GlobalStyle,
    Container,
  } from '../guideline';

import AppSearch from './AppSearch';
import AppCollection from './AppCollection';

const AppWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: calc(${GUIDELINE.header_height}px + ${GUIDELINE.subheader_height}px + 1px);
`

const AppHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: ${GUIDELINE.header_height}px;
  background-color: ${GUIDELINE.color_white};
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid ${GUIDELINE.color_border};
  z-index: ${GUIDELINE.layout_front};
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

  @media (max-width: ${GUIDELINE.breackpoint_xs_max}px) {
    &:not(:last-child) {
      margin-right: calc(${GUIDELINE.gutter}px * 2);
    }
  }

  ${Link} {
    font-family: ${GUIDELINE.fontfamily_sans};
    font-size:  ${GUIDELINE.fontsize_large}px;
    font-weight: ${GUIDELINE.fontweight_sans_regular};
    line-height:  ${GUIDELINE.lineheight_normal}px;
    letter-spacing: ${GUIDELINE.letterspacing_normal};
    white-space: nowrap;
    text-transform: uppercase;

    @media (max-width: ${GUIDELINE.breackpoint_xs_max}px) {
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
                component={ AppSearch }
              />
              <Route
                path={ PAGES[1].path }
                component={ AppCollection }
              />
            </Switch>
          </AppPage>
        </AppWrapper>
      </Fragment>
    );
  }
}

export default App;
