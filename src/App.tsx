import { useEffect, useRef, useState } from "react";
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
  const [fetching, setFetching] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const listRef = useRef<HTMLLIElement>(null);

  const fetchTodo = async (p: number) => {
    try {
      setFetching(true);
      const promises = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(async (num) => {
        const response = await axios.get<Todo>(
          `https://jsonplaceholder.typicode.com/todos/${p * 10 + num}`
        );
        return response.data;
      });
      const newTodos = await Promise.all(promises);
      setTodos([...todos, ...newTodos]);
    } catch (err) {
    } finally {
      setFetching(false);
    }
    return null;
  };

  useEffect(() => {
    fetchTodo(0);
  }, []);

  useEffect(() => {
    if (listRef.current) {
      ((target) => {
        const observer = new IntersectionObserver(async ([entry]) => {
          if (entry.isIntersecting && !fetching) {
            await fetchTodo(page + 1);
            setPage((p) => p + 1);
          }
        });

        observer.observe(target);
        return () => observer.unobserve(target);
      })(listRef.current);
    }
  }, [listRef.current]);

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
        {!fetching && todos.length && <li ref={listRef}>Loading...</li>}
      </List>
      <button onClick={() => setPage((p) => p + 1)}>[debug] next page</button>
    </div>
  );
}

export default App;
