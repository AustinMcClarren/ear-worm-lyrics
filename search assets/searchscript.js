//search button toggle
const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const expand = () => {
  searchBtn.classList.toggle("close");
  input.classList.toggle("square");
};

searchBtn.addEventListener("click", expand);

document.getElementById('search-input').addEventListener('submit', function(event) {
  event.preventDefault();
  window.location.href = 'ticketmaster.assets/ticketmaster.html';
});

const axios = require('axios');

const API_KEY = '1d6ef56b1aae26521d0028a33b0d847b';
const TRACK_NAME = 'track name';
const ARTIST_NAME = 'artist name';

async function getLyrics() {
  try {
    const response = await axios.get('https://api.musixmatch.com/ws/1.1/matcher.lyrics.get', {
      params: {
        apikey: API_KEY,
        q_track: TRACK_NAME,
        q_artist: ARTIST_NAME
      }
    });
    const lyrics = response.data.message.body.lyrics.lyrics_body;
    console.log(lyrics);
  } catch (error) {
    console.error(error);
  }
}

getLyrics();
	