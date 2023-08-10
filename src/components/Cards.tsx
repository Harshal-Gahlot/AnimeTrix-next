"use client"
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface Anime {
  image: string;
  id: number;
  title: {
    userPreferred?: string;
    english?: string;
    romaji?: string;
    native?: string;
  };
}

interface CardsProps {
  props: Anime[];
}

const Cards: React.FC<CardsProps> = ({ props }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollStartX, setScrollStartX] = useState(0);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      // Check if the mouse is over the carousel container
      if (containerRef.current?.contains(event.target as Node)) {
        event?.preventDefault(); // Prevent page scrolling
        containerRef.current!.scrollLeft += event.deltaY;
      }
    };

    containerRef?.current!?.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      containerRef?.current!?.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStartX(event.clientX);
    setScrollStartX(containerRef.current!.scrollLeft);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const dx = event.clientX - dragStartX;
    containerRef.current!.scrollLeft = scrollStartX - dx;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  return (
    <div
      className='flex gap-3 overflow-x-auto duration-200 mt-9 lg:grid lg:grid-flow-col-dense'
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {props?.map((anime) => {
        return (
          <div
            key={`${anime.id + 1}`}
            className='flex flex-col  lg:m-3 m-1  duration-200 rounded-lg cursor-grab'
            onMouseDown={handleMouseDown}
          >
            <Image
              src={anime?.image}
              className='rounded-lg h-full w-full duration-200 hover:scale-105'
              alt={`an image of ${
                anime?.title?.userPreferred ||
                anime?.title?.english ||
                anime?.title?.romaji ||
                anime.title?.native
              }`}
              height={200}
              width={600}
            />
            <span className='truncate w-32 lg:w-44 p-2 text-sm md:text-xl lg:text-lg pb-5 capitalize'>
              {anime?.title?.userPreferred ||
                anime?.title?.english ||
                anime?.title?.romaji ||
                anime?.title?.native}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
