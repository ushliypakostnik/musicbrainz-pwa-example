import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { ALERTS } from '../store/constants';
import { fetchAlbumByTitle } from '../store/actions';

import GUIDELINE,
  {
    Container,
    PageHeader,
    PageContent
  } from '../guideline';

import { Input } from 'antd';
import { Alert } from 'antd';
import '../css/input.css';
import '../css/button.css';
import '../css/alert.css';
import '../css/customization.css';

import AlbumCard from '../components/AlbumCard';

const { Search } = Input;

class AppSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      once: false,
      results: [],
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    results: nextProps.results,
  });

  onClose = () => {
    this.setState({
      once: false,
    });
  };

  render() {
    const { once, results } = this.state;

    return (
      <Fragment>
        <PageHeader>
          <Container>
            <Search
              placeholder="Search album on Musicbrainz"
              enterButton="Search"
              size="large"
              onSearch={title => {
                this.setState({
                  once: true,
                });
                this.props.fetchAlbumByTitle(title)
              }}
            />
          </Container>
        </PageHeader>
        <PageContent>
          <Container>
            {results.length === 0 && once ?
              <Alert
                description={ ALERTS.search1 }
                type="error"
                closable
                onClose={ this.onClose }
              /> :
              results.map((album, index) => {
                return (
                  <AlbumCard
                    key={ index }
                    title={ album.title }
                  />
                );
              })
            }
          </Container>
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
