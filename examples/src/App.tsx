import React from 'react';
import SampleCardOne from './sampleCards/SampleCardOne';
import { ReactCardPagination } from 'react-card-pagination';
import './App.scss';

function App() {
  const titleOne = 'Cards';
  const titleTwo = 'Pagination';

  return (
    <div className="App">
      <h1>{titleOne}</h1>
      <SampleCardOne number={0} />
      <h1>{titleTwo}</h1>
      <ReactCardPagination
        cardWidth={470}
        children={[
          <SampleCardOne number={1} key="1" />,
          <SampleCardOne number={2} key="2" />,
          <SampleCardOne number={3} key="3" />,
          <SampleCardOne number={4} key="4" />,
          <SampleCardOne number={5} key="5" />,
        ]}
      />
    </div>
  );
}

export default App;
