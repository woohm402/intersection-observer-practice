import { useEffect, useState } from "react";
import axios from "axios";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [page, setPage] = useState(1);
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodo = async (p: number) => {
    try {
      const { data } = await axios.get<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${p}`
      );
      setTodos([...todos, data]);
    } catch (err) {}
  };

  useEffect(() => {
    fetchTodo(page);
  }, [page]);

  return (
    <div className="App">
      <ul>
        {todos.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.completed ? "done" : "not yet"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
