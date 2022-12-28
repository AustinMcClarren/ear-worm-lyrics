//search button toggle
const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const expand = () => {
  searchBtn.classList.toggle("close");
  input.classList.toggle("square");
};

searchBtn.addEventListener("click", expand);

	

// SPOTIFY API
const APIController = (function() {
    
    const clientId = '326ae2d52ffa48f78a2daeac73145274';
    const clientSecret = '3daad4f29c82407b95aaafff5f3b0565';

    // FETCH TOKEN
    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }
 
    // FETCH TRACK
    const _getTrack = async (token, trackEndPoint) => {

        const result = await fetch(`${trackEndPoint}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
    
        const data = await result.json();
        return data;
    }

    // FETCH TRACKS
    const _getTracks = async (token, tracksEndPoint) => {

        const limit = 20;

        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.items;
    }

    // CURRENTLY WORKING ON FETCH ARTIST
    const _getArtist = async () => {

        const result = await fetch('https://api.spotify.com/v1/artists', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
    
        const data = await result.json();
        return data;
    }    


    return {
        getToken() {
            return _getToken();
        },
        getTracks(token, tracksEndPoint) {
            return _getTracks(token, tracksEndPoint);
        },
        getTrack(token, trackEndPoint) {
            return _getTrack(token, trackEndPoint);
        },
        _getArtist() {
            return _getArtist();            
        }
    }

})();