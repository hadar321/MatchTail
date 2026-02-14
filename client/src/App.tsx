import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/")
      .then(res => res.text())
      .then(data => console.log(data));
  }, []);

  return <h1>Match Tail App 🐶</h1>;
}

export default App;
