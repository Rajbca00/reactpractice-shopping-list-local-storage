import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [newItem, setNewItem] = useState("");

  const handleAddItem = (e) => {
    e.preventDefault();
    setShoppingList([...shoppingList, newItem]);
    setNewItem("");
  };

  useEffect(() => {
    if (shoppingList.length === 0) {
      const list = localStorage.getItem("shoppingList");
      list != null && setShoppingList(list.split(","));
    } else {
      const list = shoppingList.join(",")
      localStorage.setItem("shoppingList",list)
    }
  }, [shoppingList]);

  const handleRemoveItem = (itemToDelete) => {
    setShoppingList(shoppingList.filter((item) => item !== itemToDelete));
  };

  return (
    <div className="App">
      <h1>Shopping list</h1>
      <div>
        <form onSubmit={handleAddItem}>
          <input
            name="newItem"
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button type="submit">Add item</button>
        </form>
      </div>
      <ul>
        {shoppingList.map((item, idx) => (
          <li key={idx}>
            {item}
            <button onClick={() => handleRemoveItem(item)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
