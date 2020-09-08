import React from 'react';

export default function Button({ value }) {
  return (
    <div className="arrow">
      <input
        type="button"
        className="waves-effect waves-light btn"
        value={value}
      />
    </div>
  );
}
