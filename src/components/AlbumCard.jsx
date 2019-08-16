import React from 'react';

import GUIDELINE,
  {
    Card,
  } from '../guideline';

import { Button } from 'antd';
import '../css/button.css';

const AlbumCard = ({title}) => {
  return (
    <Card>
      <h3>{ title }</h3>
      <Button
        type="primary"
        size="large">
        Add
      </Button>
    </Card>
  );
};

export default AlbumCard;
