fetch('http://localhost:3000/films')
    .then(response => response.json())
    .then(movies => {
        renderMoviesList(movies);
        // Create a card for each movie and append to the container
        const filmsContainer = document.getElementById('films-container');
        movies.forEach(movie => {
            const card = document.createElement('div');
            card.classList.add('card');
            const img = document.createElement('img');
            img.src = movie.poster;
            img.alt = movie.title;


            const title = document.createElement('h2');
            title.textContent = movie.title;
            const runtime = document.createElement('p');
            const availableTickets = movie.capacity - movie.tickets_sold;
            runtime.textContent = `${movie.runtime} min`;
            const showtime = document.createElement('p');
            showtime.textContent = `Time: ${movie.showtime}  |  ${availableTickets} tickets available`;

            //   tickets.textContent = `${availableTickets} tickets available`;
            const buyButton = document.createElement('button');
            buyButton.textContent = 'Buy Ticket';
            buyButton.addEventListener('click', () => {
                buyTicket(movie.id);
            });
            const cardContentDiv = document.createElement('div');
            cardContentDiv.classList.add('card-content')
            cardContentDiv.appendChild(title);
            cardContentDiv.appendChild(runtime);
            cardContentDiv.appendChild(showtime);
            cardContentDiv.appendChild(buyButton);

            card.appendChild(img);
            card.appendChild(cardContentDiv);

            filmsContainer.appendChild(card);
        });
    });

// Render the list of movies in the new container
function renderMoviesList(movies) {
    const movieListContainer = document.getElementById("movie-list");
    const movieList = document.createElement('ul');
    movieList.classList.add('movie-list');

    movies.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.classList.add('movie-item');
        listItem.textContent = movie.title;
        listItem.addEventListener('click', () => {
            showMovieDetails(movie);
        });
        movieList.appendChild(listItem);
    });

    movieListContainer.appendChild(movieList);
}


function showMovieDetails(movie) {
    const filmsContainer = document.getElementById('films-container');
    filmsContainer.innerHTML=" ";
    const card = document.createElement('div');
    card.classList.add('card-detail');
    const img = document.createElement('img');
    img.src = movie.poster;
    img.alt = movie.title;

    const title = document.createElement('h2');
    title.textContent = movie.title;
    const runtime = document.createElement('p');
    const availableTickets = movie.capacity - movie.tickets_sold;
    runtime.textContent = `${movie.runtime} min`;
    const showtime = document.createElement('p');
    showtime.textContent = `Time: ${movie.showtime}  |  ${availableTickets} tickets available`;

    //   tickets.textContent = `${availableTickets} tickets available`;
    // const buyButton = document.createElement('button');
    // buyButton.textContent = 'Buy Ticket';
    // buyButton.addEventListener('click', () => {
    //     buyTicket(movie.id);
    // });
    const cardContentDiv = document.createElement('div');
    cardContentDiv.classList.add('card-content')
    cardContentDiv.appendChild(title);
    cardContentDiv.appendChild(runtime);
    cardContentDiv.appendChild(showtime);
    // cardContentDiv.appendChild(buyButton);

    card.appendChild(img);
    card.appendChild(cardContentDiv);

    filmsContainer.appendChild(card);

}

function buyTicket(movieId) {
    const url = `http://localhost:3000/films/${movieId}`
    fetch(url, {

    })
        .then(response => response.json())
        .then(result => {
            // Update the ticket count on the page
            // const tickets = document.querySelector(`[data-movie-id="${movieId}"] .tickets`);
            // const availableTickets = result.capacity - result.tickets_sold;
            console.log(result)
            result.tickets_sold++;
            console.log(result)
            //tickets.textContent = `${availableTickets} tickets available`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(result)
            }).then(c => c.json).catch(e => console.log(e))

        })
        .catch(error => {
            console.error('Error buying ticket:', error);
        });
}




































