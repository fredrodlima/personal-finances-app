import React from 'react';

export default function InputSearch({ text }) {
  const handleSearchChange = (event) => {
    const newText = event.target.value;
    return;
    //   if (newText != '') return;
    //   else {
    //     this.props.onSearchChange(newText);
    //   }
  };

  return (
    <div className="row">
      <input
        id="filter"
        placeholder="Filter"
        type="text"
        value={text}
        onChange={handleSearchChange}
      />
    </div>
  );
}
