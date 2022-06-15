import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { FaChevronRight, FaChevronLeft, FaCircle } from 'react-icons/fa';

import './reactCardPagination.scss';

interface ReactCardPaginationType {
  children: React.ReactNode[];
  cardWidth: number;
  isLoopPagination?: boolean;
  hidePageIndicatorDots?: boolean;
}

const ReactCardPagination = ({
  children,
  cardWidth,
  isLoopPagination,
  hidePageIndicatorDots,
}: ReactCardPaginationType): JSX.Element => {
  const myRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(0);
  const [numberOfCardsPerPage, setNumberOfCardsPerPage] = useState<number>(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentChildren, setCurrentChildren] = useState(children);
  const [leftChildren, setLeftChildren] = useState<React.ReactNode[]>([]);

  const dotRangeArray = Array.from(Array(numberOfPages).keys());

  const calculatePages = () => {
    if (children && myRef?.current) {
      const cardPerPage = Math.floor(myRef.current.offsetWidth / cardWidth);
      setNumberOfCardsPerPage(cardPerPage);
      const pages = Math.ceil(children.length / cardPerPage);
      setNumberOfPages(pages);
    }
  };

  useEffect(() => {
    calculatePages();
  }, [myRef?.current]);

  useLayoutEffect(() => {
      window.addEventListener('resize', calculatePages);
      return () => window.removeEventListener('resize', calculatePages);
  }, []);

  const shiftLeft = () => {
    if (numberOfCardsPerPage) {
      if (isLoopPagination && step === numberOfPages - 1) {
        const newCurrentChildren = children;
        const newLeftChildren: React.ReactNode[] = [];
        setCurrentChildren(newCurrentChildren);
        setLeftChildren(newLeftChildren);
      } else if (step !== numberOfPages - 1) {
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

  const shiftRight = () => {
    if (numberOfCardsPerPage && children) {
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

  const handlePreviousClick = () => {
    shiftRight();
    setStep((prev: number) => {
      if (isLoopPagination && prev - 1 < 0) {
        return prev + numberOfPages - 1;
      }
      if (prev - 1 >= 0) {
        return prev - 1;
      }
      return prev;
    });
  };

  const handleNextClick = () => {
    shiftLeft();
    setStep((prev: number) => {
      if (isLoopPagination && prev + 1 >= numberOfPages) {
        return prev + 1 - numberOfPages;
      }
      if (prev + 1 < numberOfPages) {
        return prev + 1;
      }
      return prev;
    });
  };

  return (
    <div className="pagination">
      {step}
      <div className="outer-container">
        <button
          disabled={isLoopPagination ? false : step === 0}
          className="navigation-button"
          type="button"
          onClick={handlePreviousClick}
        >
          <FaChevronLeft />
        </button>
        <div className="inner-container" ref={myRef}>
          {currentChildren}
        </div>
        <button
          disabled={isLoopPagination ? false : step === numberOfPages - 1}
          className="navigation-button"
          type="button"
          onClick={handleNextClick}
        >
          <FaChevronRight />
        </button>
      </div>
      {!hidePageIndicatorDots && (
        <div className="dots-container">
          {numberOfCardsPerPage && numberOfPages
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

ReactCardPagination.defaultProps = {
  isLoopPagination: true,
  hidePageIndicatorDots: false,
};

export default ReactCardPagination;
