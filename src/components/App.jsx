import React from "react";
// import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../utils/api";
import MovieTabs from "./MovieTabs";
import Pagination from "./Pagination";
// UI = fn(state, props)

// App = new React.Component()

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      // movies: moviesData,
      movies: [],
      moviesWillWatch: [],
      sort_by: "revenue.desc",
      pages: null,
      currentPage: null
    };
  }

  componentDidMount() {
    console.log("didMount");
    this.getMovies();
    console.log("after then");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("didUpdate");
    console.log("prev", prevProps, prevState);
    console.log("this", this.props, this.state);
    if (prevState.sort_by !== this.state.sort_by) {
      console.log("call api");
      this.getMovies();
    }
  }
  getMovies = () => {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${
        this.state.sort_by
      }`
    )
      .then(response => {
        console.log("then");
        return response.json();
      })
      .then(data => {
        console.log("data", data);
        console.log("data pages", data.total_pages);
        this.setState({
          movies: data.results,
          pages: data.total_pages,
          currentPage: data.page
        });
      });
  };
  nextMovie = () => {
    const nextPage = this.state.currentPage + 1;
    if (nextPage <= this.state.pages) {
      fetch(
        `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${
          this.state.sort_by
        }&page=${nextPage}`
      )
        .then(response => {
          console.log("then");
          return response.json();
        })
        .then(data => {
          this.setState({
            movies: data.results,
            currentPage: data.page
          });
        });
    }
  };
  prevMovie = () => {
    const prevPage = this.state.currentPage - 1;
    if (prevPage > 0) {
      fetch(
        `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${
          this.state.sort_by
        }&page=${prevPage}`
      )
        .then(response => {
          console.log("then");
          return response.json();
        })
        .then(data => {
          this.setState({
            movies: data.results,
            currentPage: data.page
          });
        });
    }
  };
  deleteMovie = movie => {
    console.log(movie.id);
    const updateMovies = this.state.movies.filter(item => item.id !== movie.id);
    console.log(updateMovies);

    // this.state.movies = updateMovies;
    this.setState({
      movies: updateMovies
    });
  };
  addMovieToWillWatch = movie => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch];
    updateMoviesWillWatch.push(movie);

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  deleteMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
      item => item.id !== movie.id
    );

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  updateSortBy = value => {
    this.setState({
      sort_by: value
    });
  };

  render() {
    console.log("render", this.state.sort_by);
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <Pagination
              page={this.state.currentPage}
              pages={this.state.pages}
              nextMovie={this.nextMovie}
              prevMovie={this.prevMovie}
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-9">
            <div className="row mb-4">
              <div className="col-12">
                <MovieTabs
                  sort_by={this.state.sort_by}
                  updateSortBy={this.updateSortBy}
                />
              </div>
            </div>
            <div className="row">
              {this.state.movies.map(movie => {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      data={movie}
                      deleteMovie={this.deleteMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-3">
            <h4>Will Watch: {this.state.moviesWillWatch.length} movies</h4>
            <ul className="list-group">
              {this.state.moviesWillWatch.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
