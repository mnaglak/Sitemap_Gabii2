
//Define map start up options, here defined to center on Gabii
		var mapOptions = {
			center: [41.8875, 12.72], //set center
			zoom: 18 , //set initial zoom
			maxZoom : 24,  //set max zoom
			measureControl: true //for measuring purposes
			}
		
//Creates Map according to map options 
		var map = new L.map('map', mapOptions); 
		
		map.createPane('2009');
		map.getPane('2009').style.zIndex=220;
		
		map.createPane('2010');
		map.getPane('2010').style.zIndex=218;
		
		map.createPane('2011');
		map.getPane('2011').style.zIndex=216;
		
		map.createPane('2012');
		map.getPane('2012').style.zIndex=214;
		
		map.createPane('2014');
		map.getPane('2014').style.zIndex=212;
		
		map.createPane('2015');
		map.getPane('2015').style.zIndex=210;
		
		map.createPane('2016');
		map.getPane('2016').style.zIndex=209;
		
		map.createPane('2017');
		map.getPane('2017').style.zIndex=208;
		
		map.createPane('2018');
		map.getPane('2018').style.zIndex=206;
		
		map.createPane('2019');
		map.getPane('2019').style.zIndex=202;
		
//Examples of an externally called tiled basemap
		var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
			}).addTo(map);
			
		
//Example of a localled called tiled basemap created from a .geotiff  using gdal2tiles (workflow available) 
			
			


			var airPhoto2019 = L.tileLayer('./2019/{z}/{x}/{y}.png', {tms: true, opacity: 1, attribution: "", minZoom: 18, maxZoom: 24, pane: '2019'}).addTo(map);
			var airPhoto2018Drone = L.tileLayer('./2018Drone/{z}/{x}/{y}.png', {tms: true, opacity: 1, attribution: "", minZoom: 18, maxZoom: 24, pane: '2018'});
			var airPhoto2018Copter = L.tileLayer('./2018Copter/{z}/{x}/{y}.png', {tms: true, opacity: 1, attribution: "", minZoom: 18, maxZoom: 24, pane: '2018'}).addTo(map);
			var airPhoto2018 = L.layerGroup([airPhoto2018Copter, airPhoto2018Drone]).addTo(map);
			var airPhoto2017 = L.tileLayer('./2017/{z}/{x}/{y}.png', {tms: true, opacity: 1, attribution: "", minZoom: 18, maxZoom: 24, pane: '2017'}).addTo(map);
			var airPhoto2016 = L.tileLayer('./2016/{z}/{x}/{y}.png', {tms: true, opacity: 1, attribution: "", minZoom: 18, maxZoom: 24, pane: '2016'}).addTo(map);
			var airPhoto2015 = L.tileLayer('./2015/{z}/{x}/{y}.png', {tms: true, opacity: 1, attribution: "", minZoom: 18, maxZoom: 24, pane: '2015'}).addTo(map);
			var airPhoto2014F = L.tileLayer('./2014F/{z}/{x}/{y}.png', {tms: true, opacity: 1, attribution: "", minZoom: 18, maxZoom: 24, pane: '2014'});
			var airPhoto2014D = L.tileLayer('./2014D/{z}/{x}/{y}.png', {tms: true, opacity: 1, attribution: "", minZoom: 18, maxZoom: 24, pane: '2014'});
			var airPhoto2014 = L.layerGroup([airPhoto2014D, airPhoto2014F]).addTo(map);
			var airPhoto2012F = L.tileLayer('./2012F/{z}/{x}/{y}.png', {tms: true, opacity: 1, attribution: "", minZoom: 18, maxZoom: 24, pane: '2012'});
			var airPhoto2012D = L.tileLayer('./2012D/{z}/{x}/{y}.png', {tms: true, opacity: 1, attribution: "", minZoom: 18, maxZoom: 24, pane: '2012'});
			var airPhoto2012 = L.layerGroup([airPhoto2012D, airPhoto2012F]).addTo(map);
			var airPhoto2011 = L.tileLayer('./2011_2/{z}/{x}/{y}.png', {tms: true, opacity: 1, attribution: "", minZoom: 18, maxZoom: 24, pane: '2011'}).addTo(map);
			var airPhoto2010 = L.tileLayer('./2010/{z}/{x}/{y}.png', {tms: true, opacity: 1, attribution: "", minZoom: 18, maxZoom: 24, pane: '2010'}).addTo(map);
			var airPhoto2009 = L.tileLayer('./2009/{z}/{x}/{y}.png', {tms: true, opacity: 1, attribution: "", minZoom: 18, maxZoom: 24, pane: '2009'}).addTo(map);

//Lets you see lat/long in the console window. Useful for placing non-georeferenced maps in the correct location or for placing markers
			map.on('click', function(e){
			var coord = e.latlng;
			var lat = coord.lat;
			var lng = coord.lng;
			console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
			});
		
		
		var webAddress = "https://gabii.cast.uark.edu/data/browse/stratigraphic_units/"
//Specialized Function to allow for popup box containing attributes of Gabii .geojson
			function popUp(f,l){
				var out = [];
				if (f.properties){
					out.push("SU: " +f.properties.SU);
					out.push("Type: " + f.properties.DESCRIPTIO);
					out.push("Total Area (m): " + f.properties.SHAPE_Area);
					out.push("Total Perimeter (m): " +f.properties.SHAPE_Leng);
					out.push("Tomb Number (if available): " +f.properties.tomb_ID);
					out.push("Notes: " +f.properties.notes);
					out.push('<a href="'+ webAddress + f.properties.SU + '" target="_blank">Link to Database</a>'); } //allows for link to external URL via attribute in .geoJson table
					l.bindPopup(out.join("<br />"));
				}
			
			/* generalized function popup box for any .geojson
					function popUp(f,l){
						var out = [];
				if (f.properties){
					for(key in f.properties){
						if (key == "Database_Link") {
						out.push('<a href="'+ f.properties[key] + '" target="_blank">Link to Database</a>'); } //allows for link to external URL via attribute in .geoJson table
						else {
						out.push(key+": "+f.properties[key]);
						}
					}
					l.bindPopup(out.join("<br />"));
					}
				}
			*/	
			
//Random Style definitions for individual .geoJson layers
		var myStyle0a = {
				"color": "#ff1500",
				"weight": 2,
				"opacity": 0.5};
		var myStyle0b = {
				"color": "#7a7676", //grey
				"weight": 2,
				"opacity": 0.5};
		var myStyle1 = {
				"color": "#f2f55d", //yellow
				"weight": 2,
				"opacity": 0.5};
		var myStyle2 = {
				"color": "#ff00fa",
				"weight": 2,
				"opacity": 0.5};
		var myStyle3 = {
				"color": "#ff7b00",
				"weight": 2,
				"opacity": 0.5};
		var myStyle4a = {
				"color": "#ff00d4",
				"weight": 2,
				"opacity": 0.5};
		var myStyle4b = {
				"color": "#ccff00",
				"weight": 2,
				"opacity": 0.5};
		var myStyle4c = {
				"color": "#00ffe9",
				"weight": 2,
				"opacity": 0.5}; 
				
//Import of locally hosted geoJSON files with popUp box showing attributes and designated line style, uses AJAX plug in 
		var wholeSite = new L.GeoJSON.AJAX("polyShift_final.geojson", 
			{style: swapStyle,
			onEachFeature:popUp}).addTo(map);     

		function swapStyle(feature) {
				switch (feature.properties.DESCRIPTIO) {
					case 'WL': return {color: "#000000", fillColor: "#dbdbdb", weight: 1}; //grey
					case 'FEAT': return {color: "#000000", fillColor: "#dbdbdb", weight: 1}; //grey
					case 'TH': return {color: "#000000", fillColor: "#dbdbdb", weight: 1}; //grey
					case 'STEP': return {color: "#000000", fillColor: "#dbdbdb", weight: 1}; //grey

					case 'FD': return {color: "#000000", fillColor: "#dbdbdb", weight: 1}; //grey
					case 'GV': return {color: "#000000", fillColor: "#ffa500", weight: 1};
					case 'GL': return {color: "#000000", fillColor: "#ffa500", weight: 1};
					case 'N-S TOMB': return {color: "#000000", fillColor: "#ffa500", weight: 1};
					case 'E-W TOMB': return {color: "#000000", fillColor: "#ffa500", weight: 1};
					case 'deposit': return {color: "#000000", weight: 1};
					case 'WF': return {color: "#000000", fillColor: "#ffffff", weight: 1};
					
					
					case 'FL': return {color: "#000000", fillColor: "#faff00", weight: 1}; //yellow
					case 'FP': return {color: "#000000", fillColor: "#faff00", weight: 1}; //yellow		
					case 'PV': return {color: "#000000", fillColor: "#faff00", weight: 1}; //yellow
					case 'RD': return {color: "#000000", fillColor: "#964b00", weight: 1}; //brown
					case 'WM': return {color: "#000000", fillColor: "#0000ff", weight: 1}; //blue
					case 'CS': return {color: "#000000", fillColor: "#0000ff", weight: 1}; //blue
					case 'TOP': return {color: "#000000", dashArray: '2,5', weight: 1};
					case 'OT': return {color: "#000000", weight: 1};
					case 'INT': return {color: "#000000", fillColor: "#171a1c", weight: 1}; //dark grey
					case 'AR': return {color: "#000000", fillColor: "#171a1c", weight: 1}; //dark grey
					
					default: return {color: "#000000"};
				}
		}
		     
		
		//Creation of Layering box for turning on and off basemaps, .geoJSON layers, and other underlays
		var baseLayers = {
			"Satellite Imagery" : Esri_WorldImagery,
			};
			
		var overlayMaps = {
			"Stratigraphic Units" : wholeSite,
			"2009" : airPhoto2009,
			"2010" : airPhoto2010,
			"2011" : airPhoto2011,
			"2012" : airPhoto2012,
			"2014" : airPhoto2014,
			"2015" : airPhoto2015,
			"2016" : airPhoto2016,
			"2017" : airPhoto2017,
			"2018" : airPhoto2018,
			"2019" : airPhoto2019
			};
			L.control.layers(baseLayers, overlayMaps).addTo(map);
		
				
//Creation of pan/scale function like Fulcrum images have. Uses PanControl plugin  
		L.control.pan().addTo(map);
		L.control.scale().addTo(map);
		L.control.ruler().addTo(map);

//create the search control, note that the text within the search box can be edited directly in the .js for the plugin
	var searchControl = new L.Control.Search({
		layer: wholeSite,
		propertyName: 'SU',
		marker: false,
		moveToLocation: function(latlng, title, map) {
			//map.fitBounds( latlng.layer.getBounds() );
			//var zoom = map.getBoundsZoom(latlng.layer.getBounds());
			var zoom = 22;
			map.setView(latlng, zoom); // access the zoom
		}
	});
	
	searchControl.on('search:locationfound', function(e) {
		
		//console.log('search:locationfound', );

		//map.removeLayer(this._markerSearch)

		e.layer.setStyle({fillColor: '#3f0', color: '#0f0'});
		if(e.layer._popup)
			e.layer.openPopup();

	}).on('search:collapsed', function(e) {

		wholeSite.eachLayer(function(layer) {	//restore feature color
			wholeSite.resetStyle(layer);
		});	
	});
	
	map.addControl( searchControl );  //inizialize search control 