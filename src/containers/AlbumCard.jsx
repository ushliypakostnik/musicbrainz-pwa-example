import React from 'react';
import styled from 'styled-components';

import GUIDELINE,
  {
    Card,
  } from '../guideline';

import { Button } from 'antd';
import '../css/button.css';

const AlbumTitle = styled.span`
  font-family: ${GUIDELINE.fontfamily_sans};
  font-size:  ${GUIDELINE.fontsize_normal}px;
  font-weight: ${GUIDELINE.fontweight_sans_bold};
  line-height:  ${GUIDELINE.lineheight_normal}px;
  letter-spacing: ${GUIDELINE.letterspacing_normal};
  white-space: nowrap;
`

const AlbumCard = props => {
  return (
    <Card>
      <AlbumTitle>{ props.artist } - { props.title }</AlbumTitle>
      <Button
        type="primary"
        size="large">
        Add
      </Button>
    </Card>
  );
};

export default AlbumCard;
