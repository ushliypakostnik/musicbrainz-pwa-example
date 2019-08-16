import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { removeAlbum } from '../store/actions';

import {
  Container,
  PageHeader,
  PageContent
} from '../guideline';

import { Input, Button, Table, Pagination } from 'antd';
import '../css/input.css';
import '../css/button.css';
import '../css/table.css';
import '../css/pagination.css';
import '../css/customization.css';

class AppCollection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collection: [],
      collectionId: [],
      isFetching: false,
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    collection: nextProps.collection,
    collectionId: nextProps.collectionId,
    isFetching: nextProps.isFetching,
  });

  removeAlbum = (album) => {
    console.log('Remove album: ', album);
  };

  render() {
    const { collection } = this.state;

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
              this.removeAlbum(record);
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
              this.removeAlbum(record);
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
                size="large"
                placeholder="Album ID"
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
        </PageContent>
      </Fragment>
    );
  }
}

AppCollection.propTypes = {
  collection: PropTypes.array.isRequired,
  collectionId: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  collection: state.rootReducer.collection,
  collectionId: state.rootReducer.collectionId,
  isFetching: state.rootReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  // fetchAlbumById: (id) => dispatch(fetchAlbumByid(id)),
  removeAlbum: (album) => dispatch(removeAlbum(album)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppCollection);
