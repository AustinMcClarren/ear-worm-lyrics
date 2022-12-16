
//make a fetch for music match api
//make a fetch for ticketmaster api
//


let music = {
	ApiKey: "",
	fetchMusic: function () {
		fetch(
			""
		)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				// console.log(data);
				(data);
				(data);
			});
	},
};
$('.search-button').click(function(){
  $(this).parent().toggleClass('open');
});


