import React from 'react';
import './App.css';
import ReactCardPagination from './react-card-pagination/ReactCardPagination';
import SampleCardOne from './sampleCards/SampleCardOne';

const App = (): JSX.Element => {
  const titleOne = 'Cards';
  const titleTwo = 'Pagination';
  return (
    <div className="App">
      <h1>{titleOne}</h1>
      <SampleCardOne />
      <h1>{titleTwo}</h1>
      <ReactCardPagination>
        <SampleCardOne />
        <SampleCardOne />
        <SampleCardOne />
        <SampleCardOne />
        <SampleCardOne />
      </ReactCardPagination>
    </div>
  );
};

export default App;
