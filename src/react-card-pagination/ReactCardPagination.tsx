import React, { useState, useRef } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

import './reactCardPagination.scss';
import { ReactCardPaginationType } from './ReactCardPagination.type';

const ReactCardPagination = ({
  children,
}: ReactCardPaginationType): JSX.Element => {
  console.log(children);

  const myRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(0);
  const [currentChildren, setCurrentChildren] = useState(children);

  const rotateRight = () => {
    if (myRef.current) {
      const numberOfCards = Math.floor(myRef.current.offsetWidth / 470);
      const newChildren = [
        ...currentChildren.slice(numberOfCards),
        ...currentChildren.slice(0, numberOfCards),
      ];
      setCurrentChildren(newChildren);
    }
  };

  const rotateLeft = () => {
    if (myRef.current) {
      const numberOfCards = Math.floor(myRef.current.offsetWidth / 470);
      const newChildren = [
        ...currentChildren.slice(-numberOfCards),
        ...currentChildren.slice(0, -numberOfCards),
      ];
      setCurrentChildren(newChildren);
    }
  };

  const handleLeftClick = () => {
    rotateLeft();
    setStep((prev: number) => prev - 1);
  };
  const handleRightClick = () => {
    rotateRight();
    setStep((prev: number) => prev + 1);
  };

  return (
    <div className="outer-container">
      <button
        className="navigation-button"
        type="button"
        onClick={handleLeftClick}
      >
        <FaChevronLeft />
      </button>
      <div className="inner-container" ref={myRef}>
        {currentChildren}
      </div>
      <button
        className="navigation-button"
        type="button"
        onClick={handleRightClick}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ReactCardPagination;
