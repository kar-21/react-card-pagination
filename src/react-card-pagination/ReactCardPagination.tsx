import React from 'react';
import './reactCardPagination.scss';
import { ReactCardPaginationType } from './ReactCardPagination.type';

const ReactCardPagination = ({
  children,
}: ReactCardPaginationType): JSX.Element => (
  <div className="outer-container">
    <div className="inner-container">{children}</div>
  </div>
);

export default ReactCardPagination;
