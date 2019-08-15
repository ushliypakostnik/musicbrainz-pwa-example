import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fetchAlbum } from '../store/actions';

import GUIDELINE,
  {
    Container,
    PageHeader,
    PageContent
  } from '../guideline';

import { Input } from 'antd';
import '../css/input.css';
import '../css/button.css';

const { Search } = Input;

class App extends Component {
  render() {
    return (
      <Fragment>
        <PageHeader>
          <Container>
            <Search
              placeholder="Search album on Musicbrainz"
              enterButton="Search"
              size="large"
              onSearch={title => {
                console.log('Search for album: ', title);
                this.props.fetchAlbum(title);
              }}
            />
          </Container>
        </PageHeader>
        <PageContent>
        </PageContent>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAlbum: (title) => dispatch(fetchAlbum(title)),
});

export default connect(null, mapDispatchToProps)(App);
