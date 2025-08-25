import "./Category.css";

const CategoryCard = ({ user, expensesByCategory, onRemoveCategory }) => {
  const categories = ["Food", "Shopping", "Travels"];

  if (!user) {
    return null;
  }

  const categoriesWithData = categories.filter(
    (cat) => expensesByCategory[cat] && expensesByCategory[cat].length > 0
  );

  if (categoriesWithData.length === 0) {
    return <p>No transactions available for {user.email}</p>;
  }

  return (
    <div className="category-container">
      <h2> Expense Categories</h2>
      {categoriesWithData.map((cat) => (
        <div key={cat} className="category-card">
          <h3>{cat}</h3>
          <ul>
            {expensesByCategory[cat].map((exp, idx) => (
              <li key={idx}>
                {exp.text} - ₹{exp.amount}{" "}
                <span className="date">({exp.date})</span>
              </li>
            ))}
          </ul>
          <button
            className="remove-btn"
            onClick={() => onRemoveCategory(cat)}
          >
            Remove {cat}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CategoryCard;
