function init() {
	console.log('waka');
	fetchGroupInfo();
}

function fetchGroupInfo() {
	$.getJSON('http://https://api.meetup.com/2/groups?&sign=true&group_urlname=seattlejs&page=20&key=6d2d7971732c6e3c2a57342c6543443a&callback=?', function(data) { 
		console.log(data);
		run(data);
	});
}

function run(data) {
	var group = data.results[0];
	$('#group-name').text(group.urlname);
	$('#group-desc').html(group.description);
}


window.onLoad = init();