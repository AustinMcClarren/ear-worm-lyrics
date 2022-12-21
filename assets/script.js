//search button toggle
$('.search-button').click(function(){
  $(this).parent().toggleClass('open');
});


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e60a7d9611msh902330463102e34p11a394jsn1e2b6388637f',
		'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
	}
};

fetch('https://genius-song-lyrics1.p.rapidapi.com/search?q=Alan%20Walker&per_page=10&page=1', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));