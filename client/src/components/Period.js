import React from 'react';
export default function Period({ selected, period }) {
  return <option defaultValue={selected}>{period}</option>;
}
