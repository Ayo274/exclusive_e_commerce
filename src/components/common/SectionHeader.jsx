import React from "react";
import useCountdown from "../../hooks/useCountdown";

const SectionHeader = ({ title, subtitle, showTimer, endTime }) => {
  const [days, hours, minutes, seconds] = useCountdown(endTime || new Date());

  return (
    <div className="flex flex-col md:flex-row justify-between items-end mb-10 w-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-5 h-10 bg-primaryRed rounded-sm"></div>
          <span className="text-primaryRed font-semibold">{subtitle}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
          {title}
        </h2>
      </div>

      {showTimer && (
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex flex-col items-center">
            <span className="text-xs font-medium">Days</span>
            <span className="text-2xl font-bold">{days}</span>
          </div>
          <span className="text-primaryRed text-2xl font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-xs font-medium">Hours</span>
            <span className="text-2xl font-bold">{hours}</span>
          </div>
          <span className="text-primaryRed text-2xl font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-xs font-medium">Minutes</span>
            <span className="text-2xl font-bold">{minutes}</span>
          </div>
          <span className="text-primaryRed text-2xl font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-xs font-medium">Seconds</span>
            <span className="text-2xl font-bold">{seconds}</span>
          </div>
        </div>
      )}

      {!showTimer && (
        <div className="flex gap-2 mt-4 md:mt-0">
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            &larr;
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
