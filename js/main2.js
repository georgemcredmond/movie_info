/* SCript for file for Movie App Project
	filename: main.js author: Sabs
	Date: 10/23/19 */


$(document).ready(function() {
	$('#searchForm').on('submit', (e) => {
		var searchText = $('#searchText').val();
		getMovies(searchText);
		e.preventDefault();
	});
 });

//Function retrieves all date for movie titles based on the search text

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
		}); // End of each loop

		$('#movies').html(output);
	})
}