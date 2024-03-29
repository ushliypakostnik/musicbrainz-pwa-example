import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  DEFAULT_PAGE_SIZE,
  ALERTS,
} from '../store/constants';

import {
  fetchAlbumByTitle,
  addAlbum,
  removeAlbum,
} from '../store/actions';

import {
  Container,
  PageHeader,
  PageContent,
  AlertWrapper
} from '../guideline';

import { Input, Button, Alert, Spin, Table, Pagination } from 'antd'; // eslint-disable-line no-unused-vars
import '../../node_modules/antd/lib/input/style/index.css';
import '../../node_modules/antd/lib/button/style/index.css';
import '../../node_modules/antd/lib/alert/style/index.css';
import '../../node_modules/antd/lib/spin/style/index.css';
import '../../node_modules/antd/lib/table/style/index.css';
import '../../node_modules/antd/lib/pagination/style/index.css';
import '../customization.css';

const { Search } = Input;

class AppSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      once: false,
      results: [],
      collectionId: [],
      isFetching: false,
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    results: nextProps.results,
    collectionId: nextProps.collectionId,
    isFetching: nextProps.isFetching,
  });

  onAlertClose = () => {
    this.setState({
      once: false,
    });
  };

  getArtistName = (album) => {
    return album['artist-credit'][0].name;
  };

  isAlbumAdded = (album) => {
    if (this.state.collectionId.indexOf(album.id) !== -1) return true;
    return false;
  };

  addAlbum = (album) => {
    this.props.addAlbum(album);
    this.setState({
      results: this.state.results,
    });
  };

  removeAlbum = (albumId) => {
    this.props.removeAlbum(albumId);
    this.setState({
      collection: this.state.collection,
    });
  };

  render() {
    const { once, results, isFetching } = this.state;

    const columnsDesktop = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Artist',
        dataIndex: 'artist',
        key: 'artist',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Action',
        key: 'action',
        render: (record) => (
          <Button
            type="link"
            aria-label="Add album"
            onClick={(e) => {
              e.preventDefault();
              !this.isAlbumAdded(record) ? this.addAlbum(record) : this.removeAlbum(record.id);
            }}
          >{ !this.isAlbumAdded(record) ? 'Add' : 'Delete' }</Button>
        ),
      },
    ];

    const columnsMobile = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Artist',
        dataIndex: 'artist',
        key: 'artist',
      },
      {
        title: 'Action',
        key: 'action',
        render: (record) => (
          <Button
            type="link"
            aria-label="Add album"
            onClick={(e) => {
              e.preventDefault();
              !this.isAlbumAdded(record) ? this.addAlbum(record) : this.removeAlbum(record.id);
            }}
          >{ !this.isAlbumAdded(record) ? 'Add' : 'Delete' }</Button>
        ),
      },
    ];

    const dataDesktop = results.map((album, index) => {
      return {
        key: album.id,
        id: album.id,
        title: album.title,
        artist: this.getArtistName(album),
        date: album.date,
        country: album.country,
        status: album.status,
      };
    });
    const dataMobile = results.map((album, index) => {
      return {
        key: album.id,
        id: album.id,
        title: album.title,
        artist: this.getArtistName(album),
      };
    });

    const paginationDesktop = { defaultPageSize: DEFAULT_PAGE_SIZE };
    const paginationMobile = { defaultPageSize: DEFAULT_PAGE_SIZE, simple: true };

    return (
      <Fragment>
        <PageHeader>
          <Container>
            <Search
              type="text"
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
          {isFetching ?
            <Spin size="large" /> :
            results.length === 0 && once ?
              <AlertWrapper>
                <Alert
                  type={ ALERTS.searchError.type }
                  description={ ALERTS.searchError.message }
                  closable
                  onClose={ this.onAlertClose }
                />
              </AlertWrapper> :
              <Fragment>
                <Table
                  className="table--desktop"
                  columns={ columnsDesktop }
                  dataSource={ dataDesktop }
                  pagination={ paginationDesktop }
                />
                <Table
                  className="table--mobile"
                  columns={ columnsMobile }
                  dataSource={ dataMobile }
                  pagination={ paginationMobile }
                />
              </Fragment>
          }
        </PageContent>
      </Fragment>
    );
  }
}

AppSearch.propTypes = {
  results: PropTypes.array.isRequired,
  collectionId: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  results: state.rootReducer.results,
  collectionId: state.rootReducer.collection.collectionId,
  isFetching: state.rootReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAlbumByTitle: (title) => dispatch(fetchAlbumByTitle(title)),
  addAlbum: (album) => dispatch(addAlbum(album)),
  removeAlbum: (albumId) => dispatch(removeAlbum(albumId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppSearch);
