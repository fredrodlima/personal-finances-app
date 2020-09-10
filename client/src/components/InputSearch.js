import React from 'react';

export default function InputSearch(props) {
  const { textSearch, onSearchChange } = props;
  const handleSearchChange = (event) => {
    const newText = event.target.value;
    onSearchChange(newText);
  };

  return (
    <div className="row">
      <input
        id="filter"
        placeholder="Filter"
        type="text"
        value={textSearch}
        onChange={handleSearchChange}
      />
    </div>
  );
}
