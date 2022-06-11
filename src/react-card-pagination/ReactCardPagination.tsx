import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { FaChevronRight, FaChevronLeft, FaCircle } from 'react-icons/fa';

import './reactCardPagination.scss';
import { ReactCardPaginationType } from './ReactCardPagination.type';

const ReactCardPagination = ({
  children,
  cardWidth,
  isLoopPagination = true,
  hidePageIndicatorDots = false,
}: ReactCardPaginationType): JSX.Element => {
  const myRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(0);
  const [numberOfCardsPerPage, setNumberOfCardsPerPage] = useState<number>();
  const [numberOfPage, setNumberOfPage] = useState<number>(0);
  const [currentChildren, setCurrentChildren] = useState(children);
  const [leftChildren, setLeftChildren] = useState<React.ReactNode[]>([]);

  const dotRangeArray = Array.from(Array(numberOfPage).keys());

  const calculatePages = () => {
    if (myRef.current) {
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
      if (isLoopPagination && step === numberOfPage - 1) {
        const newCurrentChildren = children;
        const newLeftChildren: React.ReactNode[] = [];
        setCurrentChildren(newCurrentChildren);
        setLeftChildren(newLeftChildren);
      } else if (step !== numberOfPage - 1) {
        const newCurrentChildren = currentChildren.slice(numberOfCardsPerPage);
        const newLeftChildren = [
          ...leftChildren,
          ...currentChildren.slice(0, numberOfCardsPerPage),
        ];
        setCurrentChildren(newCurrentChildren);
        setLeftChildren(newLeftChildren);
      }
    }
  };

  const rotateLeft = () => {
    if (numberOfCardsPerPage) {
      if (isLoopPagination && step === 0) {
        const sliceLength =
          children.length % numberOfCardsPerPage
            ? Math.floor(children.length / numberOfCardsPerPage) *
              numberOfCardsPerPage
            : (Math.floor(children.length / numberOfCardsPerPage) - 1) *
              numberOfCardsPerPage;
        const newCurrentChildren = children.slice(sliceLength, children.length);
        const newLeftChildren = children.slice(0, sliceLength);
        setCurrentChildren(newCurrentChildren);
        setLeftChildren(newLeftChildren);
      } else if (step !== 0) {
        const slicedLeft = leftChildren?.slice(-numberOfCardsPerPage);
        const newCurrentChildren = [...slicedLeft, ...currentChildren];
        const newLeftChildren = leftChildren?.slice(0, -numberOfCardsPerPage);
        setCurrentChildren(newCurrentChildren);
        setLeftChildren(newLeftChildren);
      }
    }
  };

  const handleLeftClick = () => {
    rotateLeft();
    setStep((prev: number) => {
      if (isLoopPagination && prev - 1 < 0) {
        return prev + numberOfPage - 1;
      }
      if (prev - 1 >= 0) {
        return prev - 1;
      }
      return prev;
    });
  };
  const handleRightClick = () => {
    rotateRight();
    setStep((prev: number) => {
      if (isLoopPagination && prev + 1 >= numberOfPage) {
        return prev + 1 - numberOfPage;
      }
      if (prev + 1 < numberOfPage) {
        return prev + 1;
      }
      return prev;
    });
  };

  return (
    <div className="pagination">
      <div className="outer-container">
        <button
          disabled={isLoopPagination ? false : step === 0}
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
          disabled={isLoopPagination ? false : step === numberOfPage - 1}
          className="navigation-button"
          type="button"
          onClick={handleRightClick}
        >
          <FaChevronRight />
        </button>
      </div>
      {!hidePageIndicatorDots && (
        <div className="dots-container">
          {numberOfCardsPerPage && numberOfPage
            ? dotRangeArray.map((index) => (
                <FaCircle
                  key={`dot-${index}`}
                  className={`dots ${step === index ? 'selected' : null}`}
                />
              ))
            : null}
        </div>
      )}
    </div>
  );
};

export default ReactCardPagination;
