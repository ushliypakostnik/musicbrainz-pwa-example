import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  DEFAULT_PAGE_SIZE,
  ALERTS,
} from '../store/constants';

import {
  fetchAlbumById,
  removeAlbum,
  errorClearing,
} from '../store/actions';

import {
  Container,
  PageHeader,
  PageContent,
  AlertWrapper
} from '../guideline';

import { Input, Button, Spin, Alert, Table, Pagination } from 'antd'; // eslint-disable-line no-unused-vars
import '../../node_modules/antd/lib/input/style/index.css';
import '../../node_modules/antd/lib/button/style/index.css';
import '../../node_modules/antd/lib/alert/style/index.css';
import '../../node_modules/antd/lib/spin/style/index.css';
import '../../node_modules/antd/lib/table/style/index.css';
import '../../node_modules/antd/lib/pagination/style/index.css';
import '../customization.css';

class AppCollection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collectionId: [],
      collection: [],
      isFetching: false,
      alert: [],
      error: [],
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    collectionId: nextProps.collectionId,
    collection: nextProps.collection,
    isFetching: nextProps.isFetching,
    error: nextProps.error,
  });

  onAlertClose = () => {
    this.props.errorClearing();
    this.setState({
      alert: [],
    });
  };

  addAlbumById = () => {
    const albumId = this.albumIdInput.state.value;
    const alert = this.state.alert;
    if (this.state.collectionId.indexOf(albumId) === -1) {
      this.props.fetchAlbumById(albumId);
    } else {
      alert.push(ALERTS.collectionAddInfoAlready);
      this.setState({
        alert: alert,
      });
    }
  };

  removeAlbum = (albumId) => {
    this.props.removeAlbum(albumId);
    this.setState({
      collection: this.state.collection,
    });
  };

  removeAlbumById = () => {
    const albumId = this.albumIdInput.state.value;
    const alert = this.state.alert;
    if (this.state.collectionId.indexOf(albumId) !== -1) {
      this.removeAlbum(albumId);
      alert.push(ALERTS.collectionRemoveSuccess);
    } else {
      alert.push(ALERTS.collectionRemoveError);
    }
    this.setState({
      alert: alert,
    });
  };

  getArtistName = (album) => {
    if (album['artist-credit']) return album['artist-credit'][0].name;
    return album.title;
  };

  render() {
    const { collection, isFetching, alert, error } = this.state;

    if (error.length !== 0) alert.push(ALERTS.collectionAddErrorInvalid);

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
            aria-label="Delete album"
            onClick={(e) => {
              e.preventDefault();
              this.removeAlbum(record.id);
            }}
          >Delete</Button>
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
            aria-label="Delete album"
            onClick={(e) => {
              e.preventDefault();
              this.removeAlbum(record.id);
            }}
          >Delete</Button>
        ),
      },
    ];

    const dataDesktop = collection.map((album, index) => {
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
    const dataMobile = collection.map((album, index) => {
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
            <div className="collection-form">
              <Input
                type="text"
                ref={element => this.albumIdInput = element}
                size="large"
                placeholder="Album ID"
              />
              <Button
                type="primary"
                size="large"
                onClick={(e) => {
                  e.preventDefault();
                  this.addAlbumById();
                }}
              >
                Add
              </Button>
              <Button
                type="danger"
                size="large"
                onClick={(e) => {
                  e.preventDefault();
                  this.removeAlbumById();
                }}
              >
                Delete
              </Button>
            </div>
          </Container>
        </PageHeader>
        <PageContent>
          {isFetching ?
            <Spin size="large" /> :
            alert.length !== 0 ?
              <AlertWrapper>
                <Alert
                  type={ alert[0].type }
                  description={ alert[0].message }
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

AppCollection.propTypes = {
  collectionId: PropTypes.array.isRequired,
  collection: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  collectionId: state.rootReducer.collection.collectionId,
  collection: state.rootReducer.collection.collection,
  isFetching: state.rootReducer.isFetching,
  error: state.rootReducer.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAlbumById: (albumId) => dispatch(fetchAlbumById(albumId)),
  removeAlbum: (albumId) => dispatch(removeAlbum(albumId)),
  errorClearing: () => dispatch(errorClearing()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppCollection);
