const Genre = require("./Genre");
const Movie = require("./Movie");

Movie.belongsToMany(Genre,{through:'MoviesGenres'})
Genre.belongsToMany(Movie,{through:'MoviesGenres'})

const Actor = require("./Actor");

Movie.belongsToMany(Actor,{through:'MoviesActors'})
Actor.belongsToMany(Movie,{through:'MoviesActors'})

const Director = require("./Director");

Movie.belongsToMany(Director,{through:'MoviesDirectors'})
Director.belongsToMany(Movie,{through:'MoviesDirectors'})
