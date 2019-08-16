import React from 'react';

import GUIDELINE,
  {
    Card,
  } from '../guideline';

import { Button } from 'antd';
import '../css/button.css';

const AlbumCard = props => {
  return (
    <Card>
      <h3>{ props.id }</h3>
      <Button
        type="primary"
        size="large">
        Add
      </Button>
    </Card>
  );
};

export default AlbumCard;
