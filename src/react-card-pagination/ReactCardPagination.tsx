import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { FaChevronRight, FaChevronLeft, FaCircle } from 'react-icons/fa';

import './reactCardPagination.scss';
import { ReactCardPaginationType } from './ReactCardPagination.type';

const ReactCardPagination = ({
  children,
  cardWidth,
}: ReactCardPaginationType): JSX.Element => {
  console.log(children);

  const myRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(0);
  const [numberOfCardsPerPage, setNumberOfCardsPerPage] = useState<number>();
  const [numberOfPage, setNumberOfPage] = useState<number>();
  const [currentChildren, setCurrentChildren] = useState(children);

  const calculatePages = () => {
    if (myRef.current) {
      console.log('>>>>', myRef.current.offsetWidth);
      const cardPerPage = Math.floor(myRef.current.offsetWidth / cardWidth);
      setNumberOfCardsPerPage(cardPerPage);
      const pages = Math.ceil(children.length / cardPerPage);
      setNumberOfPage(pages);
    }
  };

  useEffect(() => {
    calculatePages();
  }, [myRef.current]);

  useLayoutEffect(() => {
    window.addEventListener('resize', calculatePages);
    return () => window.removeEventListener('resize', calculatePages);
  }, []);

  const rotateRight = () => {
    if (numberOfCardsPerPage) {
      console.log('>>>>right', numberOfCardsPerPage);
      const newChildren = [
        ...currentChildren.slice(numberOfCardsPerPage),
        ...currentChildren.slice(0, numberOfCardsPerPage),
      ];
      setCurrentChildren(newChildren);
    }
  };

  const rotateLeft = () => {
    if (numberOfCardsPerPage) {
      console.log('>>>>right', numberOfCardsPerPage);
      const newChildren = [
        ...currentChildren.slice(-numberOfCardsPerPage),
        ...currentChildren.slice(0, -numberOfCardsPerPage),
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
    <div className="pagination">
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
      <div className="dots-container">
        {numberOfCardsPerPage && numberOfPage
          ? Array(numberOfPage)
              .fill(undefined)
              .map((value, i) => (
                <FaCircle
                  className={`dots ${step === i ? 'selected' : null}`}
                />
              ))
          : null}
      </div>
    </div>
  );
};

export default ReactCardPagination;
