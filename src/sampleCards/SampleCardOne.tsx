import React from 'react';
import './sampleCardOne.scss';
import logoSvg from '../logo.svg';
import { SampleCardOneType } from './SampleCardOne.type';

const SampleCardOne = ({number}: SampleCardOneType): JSX.Element => (
  <div className="card-container">
    <h2>Card Header {number}</h2>
    <img src={logoSvg} alt="" />
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book.
    </p>
  </div>
);

export default SampleCardOne;
