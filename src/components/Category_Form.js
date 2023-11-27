import React, { useState } from 'react';

const Category_Form = ({ onSubmit }) => {
  const [category, setCategory] = useState('');

const input_change = (e) => {
    setCategory(e.target.value);
  };

  const form_submit = (e) => {
    e.preventDefault();
    onSubmit(category);
    setCategory('');
  };

  return (
    <form onSubmit={form_submit}>
      <h3>Add Category</h3>
      <label>Category:</label>
      <input
        type="text"
        name="category"
        value={category}
        onChange={input_change}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default Category_Form;
