import React from "react";

const CategoryButton = ({ categories, selectedCategoryId, onSelectCategory }) => {
  return (
    <select
      value={selectedCategoryId || ""}
      onChange={(e) => onSelectCategory(e.target.value)}
      className="btn-category"
    >
      <option value="">Seleccionar categoría</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategoryButton;
