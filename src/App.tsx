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
      <SampleCardOne number={0} />
      <h1>{titleTwo}</h1>
      <ReactCardPagination cardWidth={470} isLoopPagination={false}>
        <SampleCardOne number={1} />
        <SampleCardOne number={2} />
        <SampleCardOne number={3} />
        <SampleCardOne number={4} />
        <SampleCardOne number={5} />
      </ReactCardPagination>
    </div>
  );
};

export default App;
