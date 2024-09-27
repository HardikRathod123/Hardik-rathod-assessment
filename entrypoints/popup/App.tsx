import { useState } from 'react';
import './App.css';
import "../../assets/main.css"

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>WXT + React</h1>
      <div className="bg-white card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and sav
        </p>
      </div>
      <p className="read-the-docs">

      </p>
    </>
  );
}

export default App;
