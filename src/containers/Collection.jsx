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

import { Input, Button } from 'antd';
import '../css/input.css';
import '../css/button.css';
import '../css/customization.css';

const { Search } = Input;

class App extends Component {
  render() {
    return (
      <Fragment>
        <PageHeader>
          <Container>
            <div className="collection-form">
              <Input
                size="large"
                placeholder="Track ID"
              />
              <Button
                type="primary"
                size="large">
                Add
              </Button>
              <Button
                type="danger"
                size="large">
                Delete
              </Button>
            </div>
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
