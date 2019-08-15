import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fetchAlbumByTitle } from '../store/actions';

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

class AppSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    results: nextProps.results,
  });

  render() {
    return (
      <Fragment>
        <PageHeader>
          <Container>
            <Search
              placeholder="Search album on Musicbrainz"
              enterButton="Search"
              size="large"
              onSearch={title => this.props.fetchAlbumByTitle(title)}
            />
          </Container>
        </PageHeader>
        <PageContent>
        </PageContent>
      </Fragment>
    );
  }
}

AppSearch.propTypes = {
  results: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  results: state.rootReducer.results,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAlbumByTitle: (title) => dispatch(fetchAlbumByTitle(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppSearch);
