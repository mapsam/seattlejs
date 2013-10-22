function init() {
	fetchGroupInfo();
}

function fetchGroupInfo() {
	$.getJSON('https://api.meetup.com/2/events?&sign=true&group_urlname=seattlejs&page=20&key=7348046594b204e2a41367d266f697b&callback=?', function(data) { 
		console.log(data);
		$.getJSON('')
		run(data);
	});
}

function run(data) {
	var group = data.results[0];

	// group name
	// $('#group-name').text(group.urlname);

	// group description
	// $('#group-desc').html('We are ' + group.who);

	// get number of events
	var events = data.results.length;
	for (x=0; x<events; x++) {
		var e = data.results[x],
			id = e.id,
			name = e.name,
			desc = e.description,
			date = Date(e.time);
			venue = e.venue.name,
			address = e.venue.address_1 + ', ' + e.venue.city + ' ' + e.venue.state,
			lat = e.venue.lat,
			lon = e.venue.lon;
		var info = '<div class="event-info"> \
					<h1>' + name + '</h1><h2>' + date + '</h2> \
					</div>';
		
		var eventMap = '<div class="event-map" id="map' + id + '"></div>';
		
		$('<div>', {
		    class: 'event',
		    html: info + eventMap
		}).appendTo('#events > .container');
		
		var map = L.map('map' + id).setView([lat,lon], 13);
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: ''
		}).addTo(map);
		map.scrollWheelZoom.disable();
		L.marker([lat,lon]).addTo(map)
			.bindPopup('<strong>'+venue+'</strong><br>' + address)
			.openPopup();

		
	}

	// group location
	$('#location').html();
}


window.onLoad = init();