/* Sript file for Movie App project
   filename: main.js author: George
   Date: 10/23/19 */
   
$(document).ready(function() {
	$('#searchForm').on('submit', (e) => {
		var searchText = $('#searchText').val();
		getMovies(searchText);
		e.preventDefault();
	});
});

// Function retrieves all data for movie titles based on the search text.
function getMovies(searchText) {
	axios.get('http://www.omdbapi.com?s='+searchText+'&apikey=thewdb').then(function(response) {
		console.log(response); // this can go away later
		var movies = response.data.Search;
		var output = "";
		
		$.each(movies, (index, movie) => {
			output += `
				<div class="col-md-3">
					<div class="well text-center">
						<img src="${movie.Poster}" />
						<h6>${movie.Title}</h6>
						<a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
					</div>
				</div>
			`;
		}); // end of each loop
		
		$('#movies').html(output);
	})
}

// this function is fired when the user clicks any movies' details button passing along the imdbID value
function movieSelected(id) {
	sessionStorage.setItem("movieId", id);
	window.location = "movie.html";
	return false;
}

// takes individual movie data and adds it to the movies.html page

function getMovie() {
	var movieId = sessionStorage.getItem("movieId");
	axios.get('http://www.omdbapi.com?i='+movieId+'&apikey=thewdb').then(function(response) {
		var movie = response.data;
		
		var output = `
			<div class="row">
				<div class="col-md-4">
					<img src="${movie.Poster}" class="thumbnail"/>
				</div>
				<div class="col-md-8">
					<h2>${movie.Title}</h2>
					<ul class="list-group">
						<li class="list-group-item"><strong>Genre:</strong>${movie.Genre}</li>
						<li class="list-group-item"><strong>Released:</strong>${movie.Released}</li>
						<li class="list-group-item"><strong>Rated:</strong>${movie.Rated}</li>
						<li class="list-group-item"><strong>IMDB Rating:</strong>${movie.imdbRated}</li>
						<li class="list-group-item"><strong>Director:</strong>${movie.Director}</li>
						<li class="list-group-item"><strong>Actors:</strong>${movie.Actors}</li>
						<li class="list-group-item"><strong>Writer:</strong>${movie.Writer}</li>
					</ul>
				</div>
			</div>
			
			<div class="row">
				<div class="well">
					<h3>Plot</h3>
					${movie.Plot}
					<hr/>
					<a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View on IMDB</a>
					<a href="index.html" class="btn btn-default">Back to Search</a>
				</div>
			</div>
		`;// end of the HTML output
		
		$('#movie').html(output);
	});
	
}









