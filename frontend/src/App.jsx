import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const[albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/project/jasons-attempt")
    .then((res) => {
      if (!res.ok) throw new Error("Project not found.");
      return res.json();
    })
    .then((data) => {
      setAlbums([data]);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading albums...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;


  return (
    <div className="app">
      <h1>🎵 1001 Albums Widget</h1>
      <div className="album-list">
        {albums.map((album, i) => (
          <ul key={i} className="album-item">
            <strong>{album.name}</strong> — {album.artist}
          </ul>
        ))}
      </div>
    </div>
  );


   return (
     <>
       <div>
        <h1>🎵 1001 Albums Widget</h1>
         <a href="https://vite.dev" target="_blank">
           <img src={viteLogo} className="logo" alt="Vite logo" />
         </a>
         <a href="https://react.dev" target="_blank">
           <img src={reactLogo} className="logo react" alt="React logo" />
         </a>
       </div>
       <h1>Vite + React</h1>
       <div className="card">
         <button onClick={() => setCount((count) => count + 1)}>
           count is {count}
         </button>
         <p>
           Edit <code>src/App.jsx</code> and save to test HMR
         </p>
       </div>
       <p className="read-the-docs">
         Click on the Vite and React logos to learn more
       </p>
     </> 
   )



}

export default App
