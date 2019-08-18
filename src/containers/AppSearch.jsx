import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ALERTS } from '../store/constants';
import {
  fetchAlbumByTitle,
  addAlbum,
} from '../store/actions';

import {
  Container,
  PageHeader,
  PageContent,
  AlertWrapper
} from '../guideline';

import { Input, Alert, Spin, Table, Pagination } from 'antd';
import '../../node_modules/antd/lib/input/style/index.css';
import '../../node_modules/antd/lib/button/style/index.css';
import '../../node_modules/antd/lib/alert/style/index.css';
import '../../node_modules/antd/lib/spin/style/index.css';
import '../../node_modules/antd/lib/table/style/index.css';
import '../../node_modules/antd/lib/pagination/style/index.css';
import '../css/customization.css';

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

  getFormat = (album) => {
    return album['media'][0].format;
  };

  isAlbumAdded = (album) => {
    if (this.state.collectionId.indexOf(album.id) !== -1) return true;
    return false;
  };

  addAlbum = (album) => {
    if (!this.isAlbumAdded(album)) {
      this.props.addAlbum(album);
      this.setState({
        results: this.state.results,
      });
    }
  };

  render() {
    const { once, results, isFetching } = this.state;

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
              this.addAlbum(record);
            }}
          >{ !this.isAlbumAdded(record) && 'Add' }</a>
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
              this.addAlbum(record);
            }}
          >{ !this.isAlbumAdded(record) && 'Add' }</a>
        ),
      },
    ];

    const dataDesktop = results.map((album, index) => {
      return {
        key: album.id,
        id: album.id,
        name: album.title,
        artist: this.getArtistName(album),
        date: album.date,
        country: album.country,
        format: this.getFormat(album),
      };
    });
    const dataMobile = results.map((album, index) => {
      return {
        key: album.id,
        id: album.id,
        name: album.title,
        artist: this.getArtistName(album),
      };
    });

    const paginationDesktop = { defaultPageSize: 20 };
    const paginationMobile = { defaultPageSize: 20, simple: true };

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
});

export default connect(mapStateToProps, mapDispatchToProps)(AppSearch);
