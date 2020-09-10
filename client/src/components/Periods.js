import React from 'react';
import Period from './Period';

export default function Periods(props) {
  const { periods } = props;
  return (
    <div className="input-field col s12">
      <select class="browser-default">
        {periods.map((period) => {
          return <Period period={period} />;
        })}
      </select>
    </div>
  );
}
