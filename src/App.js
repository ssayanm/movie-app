import React from "react";
import Search from "./components/Search";

const api = {
  key: `${process.env.REACT_APP_MOVIE_API_KEY}`,
  base: "http://www.omdbapi.com/?apikey",
};

function App() {
  const apiurl = `${api.base}=${api.key}`;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search />
      </main>
    </div>
  );
}

export default App;
