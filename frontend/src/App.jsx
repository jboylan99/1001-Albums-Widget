import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const[jsonData, setJsonArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/project/jasons-attempt")
    .then((res) => {
      if (!res.ok) throw new Error("Project not found.");
      return res.json();
    })
    .then((payload) => {
      setJsonArray([payload]);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading albums...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;


  const getTopAlbums = () => {
    console.log("jsonData in getTopAlbums:", jsonData);
    const history = jsonData[0]?.history;
    if (!history.length) return [];

    const sorted = [...history]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10);

      
  // Get the 5th highest rating (could be a tie)
  const top5 = sorted.slice(0, 10);
  const minTopRating = top5[top5.length - 1].rating;

  // Get all albums with rating >= minTopRating
  const tiedAlbums = sorted.filter(album => album.rating >= minTopRating);

  // If more than 5 tied, randomly pick 5
  if (tiedAlbums.length > 10) {
    const shuffled = tiedAlbums.sort(() => 0.5 - Math.random()); // shuffle
    return shuffled.slice(0, 10);
  }

  return top5;
  };

  return (
    <div className="app">
      <h1>🎵 1001 Albums Widget</h1>
      <div className="album-list">
        {jsonData.map((data, i) => (
          <ul key={i} className="album-item">
            <strong>{data.currentAlbum.artist}</strong> — {data.currentAlbum.name}
          </ul>
        ))}
      </div>
      <div className="top-albums">
        {getTopAlbums().map((item, i) => (
          <li key={i} className="top-5-album">
            Album: {item.album.artist} - {item.album.name}: {item.rating}/5
          </li>
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
