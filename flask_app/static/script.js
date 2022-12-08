// Test Script Connection
console.log("Script attached good to go") 

// Search Music
function submitMusicForm(event) { 
    event.preventDefault();

    var music_search_form = document.getElementById('music_search_form');
    var music_search_results = document.querySelector('#music_search_results');
    var music_search_category = document.getElementById('music_search_category').value;
    
    clearDiv(music_search_results); 
    
    var form = new FormData(music_search_form);

    searchSpotify(form)
        .then( data => {
            for (row in data) {
                var newElement = document.createElement("div");
                if (music_search_category === "album") {
                    newElement.innerHTML = 
                        `<a href="/music/view/${ data[row]['album_id']}">
                            <div class="card-image">
                                <figure class="image">
                                    <img src="${ data[row]['album_img'] }" alt="Album Cover">
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content has-text-centered">
                                        <p class="title is-4">${ data[row]['album_name'] }</p>
                                        <p class="subtitle is-6">${ data[row]['artist_name'] }</p>
                                    </div>
                                </div>
                            </div>
                        </a>`
                }
                if (music_search_category === "track") {
                    newElement.innerHTML = 
                        `<a href="/music/view/${ data[row]['album_id'] }">
                            <div class="card-image">
                                <figure class="image">
                                    <img src="${ data[row]['album_img'] }" alt="Album Cover">
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content has-text-centered">
                                        <p class="title is-4">${ data[row]['track_name'] }</p>
                                        <p class="subtitle is-6">${ data[row]['album_name'] }</p>
                                        <p class="subtitle is-6">${ data[row]['artist_name'] }</p>
                                    </div>
                                </div>
                            </div>
                        </a>`
                }
                if (music_search_category === "artist") {
                    newElement.innerHTML = 
                        `<a href="#">
                            <div class="card-image">
                                <figure class="image">
                                    <img src="${ data[row]['artist_img'] }" alt="Artist Headshot">
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content has-text-centered">
                                        <p class="title is-4">${ data[row]['artist_name'] }</p>
                                    </div>
                                </div>
                            </div>
                        </a>`
                }
                newElement.setAttribute("class","column is-one-quarter card");
                music_search_results.appendChild(newElement);
            }})
        .catch( err => console.log(err) )
}

// Search Users
function submitUserForm(event) { 
    event.preventDefault();
    var user_search_form = document.getElementById("user_search_form");
    var user_search_results = document.getElementById("user_search_results");
    var user_search_category = document.getElementById("user_search_category").value;

    clearDiv(user_search_results);

    var form = new FormData(user_search_form);

    searchUsers(form)
        .then( data => {
            for (row in data) {
                var newElement = document.createElement("div");
                newElement.innerHTML = `
                    <a href="/users/view/${ data[row]['id'] }">
                        <div class="card-image">
                            <figure class="image">
                                <img src="" alt="User Avatar">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content has-text-centered">
                                    <h1>${ data[row]['username']}</h1>
                                    <p>${ data[row]['first_name'] } ${ data[row]['last_name'] }</p>
                                    <p>User since: ${ data[row]['created_at'] }</p>
                                </div>
                            </div>
                        </div>
                    </a>
                `;
                newElement.setAttribute("class","column is-one-quarter card");
                user_search_results.appendChild(newElement);
            }
        })
        .catch( err => console.log(err))
}

// Search Reviews
function submitReviewSearchForm(event) {
    event.preventDefault();
    var review_search_form = document.getElementById("review_search_form");
    var review_search_results = document.getElementById("review_search_results");
    
    clearDiv(review_search_results);

    var form = new FormData(review_search_form);

    searchReviews(form)
        .then( data => {
            for (row in data) {
                var newElement = document.createElement("div");
                newElement.innerHTML = `
                `;
                newElement.setAttribute();
                review_search_results.appendChild(newElement);
            }
        })
        .catch( err => console.log(err))
}

// Clear html element
function clearDiv(element) { // Clear Element
    while(element.firstElementChild) {
        element.firstElementChild.remove();
    }
}

// Spotify API Call
async function searchSpotify(form_data) { 
    let response = await fetch("http://127.0.0.1:5000/music/search", { method: 'POST', body: form_data});
    let data = await response.json();
    return data;
}

// User DB API Call
async function searchUsers(form_data) {
    let response = await fetch("http://127.0.0.1:5000/users/search", { method: 'POST', body: form_data});
    let data = await response.json();
    return data;
}

// Review DB API Call
async function searchReviews(form_data) {
    let response = await fetch("http://127.0.0.1:5000/reviews/search", { method: 'POST', body: form_data});
    let data = await response.json();
    return data;
}