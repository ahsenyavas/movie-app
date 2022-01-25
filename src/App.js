import { useEffect, useState } from "react";
import Movie from "./components/Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = async (API) => {
    const response = await fetch(API);
    const data = await response.json();
    console.log(data.results);
    setMovies(data.results);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);

      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <header>
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Eo_circle_deep-purple_film-camera.svg/1200px-Eo_circle_deep-purple_film-camera.svg.png"
            alt="logo"
          />
          <input
            type="search"
            placeholder="Search"
            className="search"
            value={searchTerm}
            onChange={handleOnChange}
          />
        </header>
      </form>

      <div className="movie-container">
        {movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}

export default App;
