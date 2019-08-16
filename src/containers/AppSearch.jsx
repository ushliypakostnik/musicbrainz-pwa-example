import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ALERTS } from '../store/constants';
import { fetchAlbumByTitle } from '../store/actions';

import {
  Container,
  PageHeader,
  PageContent
} from '../guideline';

import { Input } from 'antd';
import { Alert } from 'antd';
import { Spin } from 'antd';
import '../css/input.css';
import '../css/button.css';
import '../css/alert.css';
import '../css/spin.css';
import '../css/customization.css';

import AlbumCard from './AlbumCard';

const { Search } = Input;

class AppSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      once: false,
      results: [],
      isFetching: false,
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    results: nextProps.results,
    isFetching: nextProps.isFetching,
  });

  onClose = () => {
    this.setState({
      once: false,
    });
  };

  getArtistName = (album) => {
    return album['artist-credit'][0].name;
  };

  render() {
    const { once, results, isFetching } = this.state;

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
                this.props.fetchAlbumByTitle(title);
              }}
            />
          </Container>
        </PageHeader>
        <PageContent>
          <Container>
            {isFetching ?
              <Spin size="large" /> :
              results.length === 0 && once ?
                <Alert
                  description={ ALERTS.search1 }
                  type="error"
                  closable
                  onClose={ this.onClose }
                /> :
                results.map((album, index) => {
                  return (
                    <AlbumCard {...album}
                      key={ index }
                      artist={ this.getArtistName(album) }
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
  isFetching: state.rootReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAlbumByTitle: (title) => dispatch(fetchAlbumByTitle(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppSearch);
