import React from 'react';

export default function Button({ value, onButtonClick }) {
  const handleButtonClick = (event) => {
    onButtonClick(event.target.value);
  };

  return (
    <div className="arrow">
      <input
        type="button"
        className="waves-effect waves-light btn"
        value={value}
        onClick={handleButtonClick}
      />
    </div>
  );
}
