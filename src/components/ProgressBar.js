import React, { useEffect, useState } from 'react';

const ProgressBar = ({ scrollPosition, verticalScrollPosition, maxScroll, page5Ref }) => {
  const [totalPercentage, setTotalPercentage] = useState(0);

  useEffect(() => {
    const updateProgressBar = () => {
      const horizontalScrollPercentage = (scrollPosition / maxScroll);
      let totalPercentage = horizontalScrollPercentage * 50; // 50% for horizontal scrolling

      if (scrollPosition >= maxScroll - 10 && page5Ref.current) {
        const maxVerticalScroll = page5Ref.current.scrollHeight - page5Ref.current.clientHeight;
        const verticalScrollPercentage = (verticalScrollPosition / maxVerticalScroll);
        totalPercentage += verticalScrollPercentage * 50; // Remaining 50% for vertical scrolling
      }

      setTotalPercentage(Math.min(100, totalPercentage));
    };

    updateProgressBar();
  }, [scrollPosition, verticalScrollPosition, maxScroll, page5Ref]);

  return (
    <div id="progress-bar-container" className="fixed top-0 left-15 h-full w-1 bg-gray-300 z-30 hidden lg:block">
      <div 
        id="progress-bar" 
        className="w-full bg-[#26d4b4] absolute top-0 left-0 transition-height duration-200 ease-out"
        style={{ height: `${totalPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;