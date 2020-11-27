import React, { useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import Results from "./components/Results";
import Popup from "./components/Popup";

const api = {
  key: `${process.env.REACT_APP_MOVIE_API_KEY}`,
  base: "http://www.omdbapi.com/?apikey",
};

function App() {
  const [state, setState] = useState({
    s: "", //search query -- value which is typed in the box
    results: [], //results
    selected: {}, //for popup once a result is clicked
  });

  const apiurl = `${api.base}=${api.key}`;

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;

        setState((prevState) => {
          return { ...prevState, results: results };
        });
      });
    }
  };

  const handleInput = (e) => {
    let s = e.target.value;

    setState((prevState) => {
      return { ...prevState, s: s };
    });
  };

  const openPopup = (id) => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };

  const closePopup = () => {
    setState((prevState) => {
      return { ...prevState, selected: {} };
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        <Results results={state.results} openPopup={openPopup} />
        {typeof state.selected.Title != "undefined" ? (
          <Popup selected={state.selected} closePopup={closePopup} />
        ) : (
          false
        )}
      </main>
    </div>
  );
}

export default App;
