import React from 'react';
export default function Period({ selected, period }) {
  return <option selected={selected}>{period}</option>;
}
