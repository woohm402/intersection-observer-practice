import { useEffect, useState } from "react";
import axios from "axios";
import { List, ListItem } from "./App.style";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [page, setPage] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodo = async (p: number) => {
    try {
      const promises = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(async (num) => {
        const response = await axios.get<Todo>(
          `https://jsonplaceholder.typicode.com/todos/${p * 10 + num}`
        );
        return response.data;
      });
      const newTodos = await Promise.all(promises);
      setTodos([...todos, ...newTodos]);
    } catch (err) {}
  };

  useEffect(() => {
    fetchTodo(page);
  }, [page]);

  return (
    <div className="App">
      <List>
        {todos.map((item) => (
          <ListItem key={item.id}>
            <h2>{item.id}</h2>
            <h3>{item.title}</h3>
            <p>{item.completed ? "done" : "not yet"}</p>
          </ListItem>
        ))}
      </List>
      <button onClick={() => setPage((p) => p + 1)}>[debug] next page</button>
    </div>
  );
}

export default App;
