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

// Sets the default zip region
		var defaultRegion = '9410'

// Init Mapbox and geocoder	
		this.autorun(function () {
				if (Mapbox.loaded()) {
						L.mapbox.accessToken = 'pk.eyJ1IjoiYWxleG5ldHNjaCIsImEiOiJsX0V6Wl9NIn0.i14NX5hv3bkVIi075nOM2g';
						var geocoder = L.mapbox.geocoder('mapbox.places')
						map = L.mapbox.map('map', 'alexnetsch.j786e624').addControl(L.mapbox.geocoderControl('mapbox.places', {
        autocomplete: true
    }));;
						geocoder.query(defaultRegion, showMap);

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
		// Init markers binds popups
			var addMarker;
			addMarker = function(geocoder, map, placeName, popupContent) {
			return geocoder.query(placeName, function(error, result) {
				var marker;
				marker = L.marker(result.latlng);
				//var popupContent
				return marker.bindPopup(popupContent).addTo(map);
			});
		};
// Fetches DB as Array, callsback geocoding function w/ addresses and iterates through db adding markers/popups for each row
var customerCursor = Customers.find();
var customers = customerCursor.fetch();
	for (var i=0; i<customers.length; i++) {
	 var thisAddress = customers[i].Street +", "+
										customers[i].City +", "+
										customers[i].State+", "+
										customers[i].Zip;
  
  var popupContent = customers[i].Name + '<br \/>' +
  									thisAddress + '<br \/>' +
										'EE Count: ' + customers[i].EE + '<br \/>' +
										'Industry: ' + customers[i].Industry + '<br \/>' +
										'Industry V2: ' + customers[i].IndustryV2 + '<br \/>' +
										'SFDC Link: https://na23.salesforce.com/' + customers[i].SFDC

	addMarker(geocoder, map, thisAddress, popupContent);

									}
}}
)};

	/*customerAddressList = function (){
		Customers.find().forEach(function(obj){
				console.log(obj.Street +", "+
										obj.City +", "+
										obj.State+", "+
										obj.Zip)
		})
	}*/