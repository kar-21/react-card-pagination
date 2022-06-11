import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { FaChevronRight, FaChevronLeft, FaCircle } from 'react-icons/fa';

import './reactCardPagination.scss';
import { ReactCardPaginationType } from './ReactCardPagination.type';

const ReactCardPagination = ({
  children,
  cardWidth,
  isLoopPagination = true,
}: ReactCardPaginationType): JSX.Element => {
  const myRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(0);
  const [numberOfCardsPerPage, setNumberOfCardsPerPage] = useState<number>();
  const [numberOfPage, setNumberOfPage] = useState<number>(0);
  const [currentChildren, setCurrentChildren] = useState(children);
  const [leftChildren, setLeftChildren] = useState<React.ReactNode[]>([]);

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
      let newCurrentChildren: React.ReactNode[];
      let newLeftChildren: React.ReactNode[];
      if (step === numberOfPage - 1) {
        newCurrentChildren = children;
        newLeftChildren = [];
      } else {
        newCurrentChildren = currentChildren.slice(numberOfCardsPerPage);
        newLeftChildren = [
          ...leftChildren,
          ...currentChildren.slice(0, numberOfCardsPerPage),
        ];
      }
      setCurrentChildren(newCurrentChildren);
      setLeftChildren(newLeftChildren);
    }
  };

  const rotateLeft = () => {
    if (numberOfCardsPerPage) {
      let newCurrentChildren: React.ReactNode[];
      let newLeftChildren: React.ReactNode[];
      if (step === 0) {
        const sliceLenght =
          children.length % numberOfCardsPerPage
            ? Math.floor(children.length / numberOfCardsPerPage) *
              numberOfCardsPerPage
            : (Math.floor(children.length / numberOfCardsPerPage) - 1) *
              numberOfCardsPerPage;
        newCurrentChildren = children.slice(sliceLenght, children.length);
        newLeftChildren = children.slice(0, sliceLenght);
      } else {
        const slicedLeft = leftChildren?.slice(-numberOfCardsPerPage);
        newCurrentChildren = [...slicedLeft, ...currentChildren];
        newLeftChildren = leftChildren?.slice(0, -numberOfCardsPerPage);
      }
      setCurrentChildren(newCurrentChildren);
      setLeftChildren(newLeftChildren);
    }
  };

  const handleLeftClick = () => {
    rotateLeft();
    setStep((prev: number) =>
      prev - 1 < 0 ? prev + numberOfPage - 1 : prev - 1,
    );
  };
  const handleRightClick = () => {
    rotateRight();
    setStep((prev: number) =>
      prev + 1 < numberOfPage ? prev + 1 : prev + 1 - numberOfPage,
    );
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
