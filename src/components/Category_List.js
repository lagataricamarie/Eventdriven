import React, { useState } from 'react';

const Category_List = ({ categories, onDelete, onUpdate }) => {
  const [editCategory, setEditCategory] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

const edit_category = (category) => {
    setEditCategory(category);
    setNewCategoryName(category);
  };

  const update_category = () => {
    onUpdate(editCategory, newCategoryName);
    setEditCategory('');
    setNewCategoryName('');
  };

  return (
    <div>
      <h2>Category List</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category}>
              <td>{category}</td>
              <td>
                <button onClick={() => edit_category(category)}>Edit</button> 
                <button onClick={() => onDelete(category)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editCategory && (
        <div>
          <h3>Edit Category</h3>
          <form>
            <label>Category:</label>
            <input
              type="text"
              name="name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              required
            />

            <button type="button" onClick={update_category}>
              Update Category
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Category_List;