import React from 'react';
import Period from './Period';

export default function Periods({ selectedPeriod, periods, onPeriodChange }) {
  const handlePeriodChange = (event) => {
    onPeriodChange(event.target.value);
  };
  return (
    <div className="input-field col s12">
      <select className="browser-default" onChange={handlePeriodChange}>
        {periods.map((period) => {
          return (
            <Period
              key={period}
              period={period}
              selected={selectedPeriod === period}
            />
          );
        })}
      </select>
    </div>
  );
}
