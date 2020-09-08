import React from 'react';
import Button from './components/Button';
import InputSearch from './components/InputSearch';

export default function App() {
  return (
    <div>
      <h1>Desafio Final do Bootcamp Full Stack</h1>
      <Button value="<" />
      {/* <DatePicker /> */}
      <Button value=">" />
      <Button value="+ New Transaction" />
      <InputSearch text="" />
    </div>
  );
}
