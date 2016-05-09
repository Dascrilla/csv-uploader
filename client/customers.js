Template.main.customers = function(){
	Customers.find(); 
}

Template.main.helpers({
	customer: function(){
		return Customers.find();
		} 
}); 
	
	// Uploads Customer List
Template.upload.events({
	"change #files": function (e) {
		var files = e.target.files || e.dataTransfer.files;
		for (var i = 0, file; file = files[i]; i++) {
			if (file.type.indexOf("text") == 0) {
				var reader = new FileReader();
				reader.onloadend = function (e) {
					var text = e.target.result;
					console.log(text)
					var all = $.csv.toObjects(text);
					console.log(all)
					_.each(all, function (entry) {
						Customers.insert(entry);
					});
				}
				reader.readAsText(file);
			}
		}
	}, 
	// Clears Customer Database
	'click .clear': function (e) {
			e.preventDefault(); 
			Meteor.call('customersRemove'); 
	}

})

// Using a template's rendered callback
Meteor.startup(function(){
		Mapbox.load();
});

Template.main.rendered = function () {

var thisRegion = '94611'

		this.autorun(function () {
				if (Mapbox.loaded()) {
						L.mapbox.accessToken = 'pk.eyJ1IjoiYWxleG5ldHNjaCIsImEiOiJsX0V6Wl9NIn0.i14NX5hv3bkVIi075nOM2g';
						var geocoder = L.mapbox.geocoder('mapbox.places'),
						map = L.mapbox.map('map', 'alexnetsch.j786e624');
						geocoder.query(thisRegion, showMap);

function showMap(err, data) {
	// The geocoder can return an area, like a city, or a
	// point, like an address. Here we handle both cases,
	// by fitting the map bounds to an area or zooming to a point.
			if (data.lbounds) {
				map.fitBounds(data.lbounds);
			} else if (data.latlng) {
				map.setView([data.latlng[0], data.latlng[1]], 14);
			}
		}

	/*customerAddressList = function (){
		Customers.find().forEach(function(obj){
				console.log(obj.Street +", "+
										obj.City +", "+
										obj.State+", "+
										obj.Zip)
		})
	}*/
		// Initializes Markers binds popup
			var addMarker;
			addMarker = function(geocoder, map, placeName, popupContent) {
			return geocoder.query(placeName, function(error, result) {
				var marker;
				marker = L.marker(result.latlng);
				//var popupContent
				return marker.bindPopup(popupContent).addTo(map);
			});
		};

			/*var addPopup;
			addPopover = function(geocoder, map, placeName) {
			return geocoder.query(placeName, function(error, result) {
					var popOver;
					popOver = L.mapbox.featureLayer({
		        type: 'FeatureCollection',
		        features: [{
		            type: 'Feature',
				        properties: {
		                'from': 'Duke Point',
		                'to': 'Tsawwassen',
		                'marker-color': '#548cba',
		                'marker-size': 'large',
		                'marker-symbol': 'ferry'
		            },
		            geometry: {
		                type: 'Point',
		                coordinates: result.latlng
		            }
		        }]
		    })
    return popOver.addTo(map);
			});
		};
*/


// Fetches DB as Array, Geocodes addresses and adds markers for each DB row in a for loop
var customerCursor = Customers.find();
var customers = customerCursor.fetch();
	for (var i=0; i<customers.length; i++) {
	 var thisAddress = customers[i].Street 
										customers[i].City +", "+
										customers[i].State+", "+
										customers[i].Zip;
  
  var popupContent = customers[i].Name + '<br \/>' +
  									thisAddress + '<br \/>' +
										'Employee Count: ' + customers[i].EE + '<br \/>' +
										'Industry: ' + customers[i].Industry + '<br \/>' +
										'Industry V2: ' + customers[i].IndustryV2;

	addMarker(geocoder, map, thisAddress, popupContent);

									}

}}
)};


