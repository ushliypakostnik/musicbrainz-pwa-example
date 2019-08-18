import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { ALERTS } from '../store/constants';
import { removeAlbum } from '../store/actions';

import {
  Container,
  PageHeader,
  PageContent,
  AlertWrapper
} from '../guideline';

import { Input, Button, Spin, Alert, Table, Pagination } from 'antd';
import '../../node_modules/antd/lib/input/style/index.css';
import '../../node_modules/antd/lib/button/style/index.css';
import '../../node_modules/antd/lib/alert/style/index.css';
import '../../node_modules/antd/lib/spin/style/index.css';
import '../../node_modules/antd/lib/table/style/index.css';
import '../../node_modules/antd/lib/pagination/style/index.css';
import '../css/customization.css';

class AppCollection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collectionId: [],
      collection: [],
      isFetching: false,
      alert: [],
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    collectionId: nextProps.collectionId,
    collection: nextProps.collection,
    isFetching: nextProps.isFetching,
  });

  onAlertClose = () => {
    this.setState({
      alert: [],
    });
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

  render() {
    const { collection, isFetching, alert } = this.state;

    const columnsDesktop = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
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
        title: 'Format',
        dataIndex: 'format',
        key: 'format',
      },
      {
        title: 'Action',
        key: 'action',
        render: (record) => (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              this.removeAlbum(record.id);
            }}
          >Delete</a>
        ),
      },
    ];

    const columnsMobile = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
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
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              this.removeAlbum(record.id);
            }}
          >Delete</a>
        ),
      },
    ];

    const dataDesktop = collection.map((album, index) => {
      return {
        key: album.key,
        id: album.id,
        name: album.name,
        artist: album.artist,
        date: album.date,
        country: album.country,
        format: album.format,
      };
    });
    const dataMobile = collection.map((album, index) => {
      return {
        key: album.key,
        id: album.id,
        name: album.name,
        artist: album.artist,
      };
    });

    const paginationDesktop = { defaultPageSize: 20 };
    const paginationMobile = { defaultPageSize: 20, simple: true };

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
};

const mapStateToProps = (state) => ({
  collectionId: state.rootReducer.collection.collectionId,
  collection: state.rootReducer.collection.collection,
  isFetching: state.rootReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  // fetchAlbumById: (id) => dispatch(fetchAlbumByid(id)),
  removeAlbum: (albumId) => dispatch(removeAlbum(albumId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppCollection);
