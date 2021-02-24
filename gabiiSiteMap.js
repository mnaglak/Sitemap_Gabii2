
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
		
		map.createPane('areas');
		map.getPane('areas').style.zIndex=405;
		
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
		
		
		var webAddress = "https://doi.org/10.3998/gabii.1.";
//Specialized Function to allow for popup box containing attributes of Gabii .geojson
			function popUp(f,l){
				var out = [];
				if (f.properties){
					
					var layerType = "";
					if (f.properties.DESCRIPTIO=="TOP") {
					layerType = "Cut";}
					else if (f.properties.DESCRIPTIO=="RD") {
					layerType = "Road"; }
					else if (f.properties.DESCRIPTIO=="FL") {
					layerType = "Floor"; }
					else if (f.properties.DESCRIPTIO=="WL") {
					layerType = "Wall"; }
					else if (f.properties.DESCRIPTIO=="WM") {
					layerType = "Water Feature"; }
					else if (f.properties.DESCRIPTIO=="FEAT") {
					layerType = "Feature"; }
					else if (f.properties.DESCRIPTIO=="TH") {
					layerType = "Threshhold"; }
					else if (f.properties.DESCRIPTIO=="FD") {
					layerType = "Foundation"; }
					else if (f.properties.DESCRIPTIO=="GV") {
					layerType = "Tomb Feature"; }
					else if (f.properties.DESCRIPTIO=="GL") {
					layerType = "Grave Lining"; }
					else if (f.properties.DESCRIPTIO=="N-S TOMB") {
					layerType = "Tomb Feature"; }
					else if (f.properties.DESCRIPTIO=="E-W TOMB") {
					layerType = "Tomb Feature"; }
					else if (f.properties.DESCRIPTIO=="FP") {
					layerType = "Floor Preparation"; }
					else if (f.properties.DESCRIPTIO=="PV") {
					layerType = "Pavement"; }
					else if (f.properties.DESCRIPTIO=="OT") {
					layerType = "Other"; }
					else if (f.properties.DESCRIPTIO=="INT") {
					layerType = "Feature"; }
					else if (f.properties.DESCRIPTIO=="DEP") {
					layerType = "Deposit"; }
					else if (f.properties.DESCRIPTIO=="FILL") {
					layerType = "Fill of Cut"; }
					else if (f.properties.DESCRIPTIO=="BOT") {
					layerType = "Cut"; }
					else if (f.properties.DESCRIPTIO=="STEP") {
					layerType = "Stairs"; }
					else if (f.properties.DESCRIPTIO=="deposit") {
					layerType = "Deposit"; }
					else if (f.properties.DESCRIPTIO=="WF") {
					layerType = "Wall Facing"; }
					else if (f.properties.DESCRIPTIO=="AR") {
					layerType = "Feature"; }
					else if (f.properties.SU == 622) {
					layerType = "Quarry"; }
					
					var areaLetter = "";
					if (f.properties.SU < 1000) {
					areaLetter= "A";}
					else if (f.properties.SU < 2000) {
					areaLetter= "B";}
					else if (f.properties.SU < 3000) {
					areaLetter= "C";}
					else if (f.properties.SU < 4000) {
					areaLetter= "D";}
					else if (f.properties.SU < 5000) {
					areaLetter= "E";}
					else if (f.properties.SU < 6000) {
					areaLetter= "F";}
					else if (f.properties.SU < 7000) {
					areaLetter= "G";}
					else if (f.properties.SU < 8000) {
					areaLetter= "H";}
					else if (f.properties.SU < 9000) {
					areaLetter= "I";}
					else if (f.properties.SU < 10000) {
					areaLetter= "J";}
					
					out.push("Area: " + areaLetter);
					out.push("SU: " +f.properties.SU);
					out.push("Type: " + layerType);
					out.push("Total Area (m): " + f.properties.SHAPE_Area);
					out.push("Total Perimeter (m): " +f.properties.SHAPE_Leng);
					out.push("Tomb Number (if available): " +f.properties.tomb_ID);
					out.push("Notes: " +f.properties.notes);
					out.push('<a href="'+ webAddress + f.properties.SU + '" target="_blank">Link to Database</a>'); } //allows for link to external URL via attribute in .geoJson table
					} //allows for link to external URL via attribute in .geoJson table
					
					l.bindPopup(out.join("<br />"));
				};
			
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
			
				
//Import of locally hosted geoJSON files with popUp box showing attributes and designated line style, uses AJAX plug in 
		var wholeSite = new L.GeoJSON.AJAX("gabiiSiteMap.geojson", 
			{style: swapStyle,
			onEachFeature:popUp}).addTo(map);     



	wholeSite.on('click', function (e) {
			e.layer.setStyle({fillColor: '#ff0000', color: '#ff0000'});
	
		});

	
		wholeSite.on('popupclose', function(e){
			wholeSite.setStyle(swapStyle);
		});
		
		var areaStyle = {
			color: "#000000",
			 
			 
			weight: 1};
		
		
		var areas = new L.GeoJSON.AJAX("AreaShapesLeaflet.geojson", 
		{ fill: false, pane: 'areas', style: areaStyle}).addTo(map);
		
		areas.bindTooltip( function (layer) {
			return layer.feature.properties.Area_Name; 
		}, {interactive: true}).addTo(map); 

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
					case 'TOP': return {color: "#000000",fill: false, dashArray: '2,5', weight: 2};
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
			"2009 Aerial Imagery" : airPhoto2009,
			"2010 Aerial Imagery" : airPhoto2010,
			"2011 Aerial Imagery" : airPhoto2011,
			"2012 Aerial Imagery" : airPhoto2012,
			"2014 Aerial Imagery" : airPhoto2014,
			"2015 Aerial Imagery" : airPhoto2015,
			"2016 Aerial Imagery" : airPhoto2016,
			"2017 Aerial Imagery" : airPhoto2017,
			"2018 Aerial Imagery" : airPhoto2018,
			"2019 Aerial Imagery" : airPhoto2019
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