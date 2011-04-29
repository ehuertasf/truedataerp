/**
 * @author Bedwer
 */

	var puntos = [];
	var map;
	var color;
	var polygon;
	var marker;
	var polygon;

	function LimpiaMapa(){
		puntos=[];
		map.clearOverlays();
		document.getElementById('txtLatitud').value='';
		document.getElementById('txtLongitud').value=''
	}
		
	function centra_mata(puntos_array){
			var puntos2 = [],item=[];
	}
	
	/* area(
		puntos_array	->  array de puntos (Latitud,Longitud),
		color_linea		->  Texto con el color de linea Ejemplo: #FFFF00,
		ancho_linea		->  Numero entero indica el ancho de la linea Ejemplo: 2,
		opaco_linea		->  Numero Decimal del 0 al 1 indica la transparencia de la linea Ejemplo: 0.5,
		color_area		->  Texto con el color del area Ejemplo: #FFFF00,
		opaco_area		->  Numero Decimal del 0 al 1 indica la transparencia del area Ejemplo: 0.5,
		flag			->  0 Para pintar areas y centrarlas en base a los puntos �
							1 solo para centrar el mapa en base a los puntos pasados, utilizado para las zonas,
		nom_area		->	Nombre del area, utilizado para poner una etiqueda con dicho nombre,
		flag2			->  0 borrar area con click. Si flag es 0
							1 No borrar area con click. Si flag es 0
		
		*/
	
	function punto(lat,lon){
		/*
		var marker = new GMarker(new GLatLng(lat,lon),{draggable: true});
		map.addOverlay(marker);
		document.getElementById('txtLatitud').value=  lat;
		document.getElementById('txtLongitud').value=  lon;
		var autoZoom = map.getBoundsZoomLevel(new GLatLngBounds(new GLatLng(lat,lon), new GLatLng(lat,lon)));
       	map.setCenter(new GLatLng(lat, lon),autoZoom); 
		*/
		if (lat && lon){

				if (marker) map.removeOverlay(marker);
				var point=new GLatLng(lat,lon);
				marker = new GMarker(point, {draggable: true});
				lastPoint2 = marker.getLatLng();
					document.getElementById('txtLatitud').value=  lat;
					document.getElementById('txtLongitud').value=  lon;
					puntos.push(lat+','+lon);
				var lastPoint;
				var lastPoint2;
				var puntodragstart='';
			
				GEvent.addListener(marker, "dragstart", function() {
					var lastPoint2 = this.getLatLng();
					var latitud_g = lastPoint2.lat().toFixed(6);
					var longitud_g= lastPoint2.lng().toFixed(6);
					puntodragstart=latitud_g+','+longitud_g;
					map.closeInfoWindow();
				});
				
				GEvent.addListener(marker, "dragend", function() {
					//marker.openInfoWindowHtml("Just bouncing along...");
					lastPoint2 = this.getLatLng();
					latitud_g = lastPoint2.lat().toFixed(6);
					longitud_g= lastPoint2.lng().toFixed(6);
	
					indice=puntos.indexOf(puntodragstart);
					puntodragstart='';
					if (indice!=-1) puntos[indice]=latitud_g+','+longitud_g;
	
					document.getElementById('txtLatitud').value=  latitud_g;
					document.getElementById('txtLongitud').value=  longitud_g;
				
				});
				
				GEvent.addListener(marker, "dblclick", function() {
					lastPoint2 = this.getLatLng();
					latitud_g = lastPoint2.lat().toFixed(6);
					longitud_g= lastPoint2.lng().toFixed(6);
					indice=puntos.indexOf(latitud_g+','+longitud_g);
					if (indice!=-1) puntos.splice(indice,1);
					map.removeOverlay(this);
					document.getElementById('txtLatitud').value = '';
					document.getElementById('txtLongitud').value = '';
				
				});
			map.addOverlay(marker);
			var autoZoom = map.getBoundsZoomLevel(new GLatLngBounds(new GLatLng(lat,lon), new GLatLng(lat,lon)));
	       	map.setCenter(new GLatLng(lat, lon),autoZoom); 
			
			}
		
		
		
	}
	
	function area(puntos_array,color_linea,ancho_linea,opaco_linea,color_area,opaco_area,flag,nom_area,flag2){
			var puntos2 = [],item=[];
			var latitudes_array=[],longitudes_array=[];
			var objLatLong,objLatLongInicial;

			for (var i=0;i<puntos_array.length;i++){
				item=[];
				objLatLong = null;
				item=puntos_array[i].split(',');
				objLatLong = new GLatLng(item[0],item[1])
				puntos2.push(objLatLong);
				if (i==0) objLatLongInicial = objLatLong;
				
				latitudes_array.push(item[0]);
				longitudes_array.push(item[1]);
				
			}
			puntos2.push(objLatLongInicial);


			//alert ('Max='+Math.max.apply({},longitudes_array)+'-Min='+Math.min.apply({},longitudes_array));
			var maxlon,maxlat,minlon,minlat,Clat,Clon;
			maxlon=Math.max.apply({},longitudes_array);
			maxlat=Math.max.apply({},latitudes_array);
			minlon=Math.min.apply({},longitudes_array);
			minlat=Math.min.apply({},latitudes_array);
			Clat=(maxlat+minlat)/2;
			Clon=(maxlon+minlon)/2;
			/*
			var stuff = '<div style="padding: 0px 0px 8px 8px; background: url(../librerias/addons_map/point_bottom_left.png) no-repeat bottom left;"><div style="background-color: #99CCFF; padding: 2px;"><b> Shangri&nbsp;La <\/b><\/div><\/div>';
			var label = new ELabel(new GLatLng(Clat,Clon), stuff, null,null,60,true);
			GEvent.addListener(label, "click", function() { 
				autoZoom = map.getBoundsZoomLevel(new GLatLngBounds(new GLatLng(minlat,minlon), new GLatLng(maxlat,maxlon)));
	        	map.setCenter(new GLatLng(Clat, Clon),autoZoom);
			 });
			map.addOverlay(label); 
			*/
//			alert ('MinLat'+minlat+'MaxLat'+maxlat+'MinLon'+minlon+'MaxLon'+maxlon+'CenterLat'+Clat+'CenterLon'+Clon);

			if (flag!=1){
				var polygon = new GPolygon(puntos2, color_linea, ancho_linea, opaco_linea, color_area, opaco_area);
			  	map.addOverlay(polygon); 
				if (flag2!=1)  	GEvent.addListener(polygon, "click", function() { map.removeOverlay(this);map.removeOverlay(label); });				
				//var stuff = '<div style="padding: 0px 0px 8px 8px; background: url(../librerias/addons_map/point_bottom_left.png) no-repeat bottom left;"><div style="background-color: #99CCFF; padding: 2px;"><b>'+ nom_area +'<\/b><\/div><\/div>';
				var label = new ELabel(new GLatLng(Clat,Clon), nom_area,'style1');
				map.addOverlay(label); 

			}
			autoZoom = map.getBoundsZoomLevel(new GLatLngBounds(new GLatLng(minlat,minlon), new GLatLng(maxlat,maxlon)));
        	map.setCenter(new GLatLng(Clat, Clon),autoZoom); 
			
			
		}
		
	function initialize(modulo) {
		if (GBrowserIsCompatible()) {
	
		map = new GMap2(document.getElementById("map_canvas"));
		var center = new GLatLng(-8.537565, -71.850586);
		map.setCenter(center, 5);
		
		    map.addControl(new GLargeMapControl());
			//map.addControl(new GScaleControl());
			map.addControl(new GOverviewMapControl());
			
		    map.addControl(new GMenuMapTypeControl());
			map.enableScrollWheelZoom();

		if (modulo=='visor_ered') return;

		
		GEvent.addListener(map, "click", function(overlay,point){
			if (point){
				if (modulo=='mant_ered'){ //map.clearOverlays();
					if (marker) map.removeOverlay(marker);
					//if (polygon) map.removeOverlay(polygon);
					}
				marker = new GMarker(point, {draggable: true});
				lastPoint2 = marker.getLatLng();
					latitud_g = lastPoint2.lat().toFixed(6);
					longitud_g= lastPoint2.lng().toFixed(6);
					document.getElementById('txtLatitud').value=  latitud_g;
					document.getElementById('txtLongitud').value=  longitud_g;
					puntos.push(latitud_g+','+longitud_g);
				var lastPoint;
				var lastPoint2;
				var puntodragstart='';
			
				GEvent.addListener(marker, "dragstart", function() {
					var lastPoint2 = this.getLatLng();
					var latitud_g = lastPoint2.lat().toFixed(6);
					var longitud_g= lastPoint2.lng().toFixed(6);
					puntodragstart=latitud_g+','+longitud_g;
					map.closeInfoWindow();
				});
				
				GEvent.addListener(marker, "dragend", function() {
					//marker.openInfoWindowHtml("Just bouncing along...");
					lastPoint2 = this.getLatLng();
					latitud_g = lastPoint2.lat().toFixed(6);
					longitud_g= lastPoint2.lng().toFixed(6);
	
					indice=puntos.indexOf(puntodragstart);
					puntodragstart='';
					if (indice!=-1) puntos[indice]=latitud_g+','+longitud_g;
	
					document.getElementById('txtLatitud').value=  latitud_g;
					document.getElementById('txtLongitud').value=  longitud_g;
				
				});
				
				GEvent.addListener(marker, "dblclick", function() {
					lastPoint2 = this.getLatLng();
					latitud_g = lastPoint2.lat().toFixed(6);
					longitud_g= lastPoint2.lng().toFixed(6);
					indice=puntos.indexOf(latitud_g+','+longitud_g);
					if (indice!=-1) puntos.splice(indice,1);
					map.removeOverlay(this);
					document.getElementById('txtLatitud').value = '';
					document.getElementById('txtLongitud').value = '';
				
				});
			map.addOverlay(marker);
			}
		
		});
	
	}
	};
	
	function zona(){
		ds_Zona = new Ext.data.Store({
		        proxy: new Ext.data.HttpProxy({url: 'query_combos.php?n=7'}),
		        reader: new Ext.data.JsonReader({
		            root			: 'zona',
		            totalProperty	: 'totalCount',
		            id				: 'id_zona'
		        }, [	{name: 'id_zona', mapping: 'id_zona'},
						{name: 'desc_zona', mapping: 'desc_zona'},
						{name: 'puntos', mapping: 'puntos'}
		        ])
		});
		
		ds_Zona.on('beforeload', function() {
				ds_Zona.baseParams = {	query	: cboSearchZona.getValue()};
		});	
		
		TplZona = new Ext.XTemplate(
	        '<tpl for="."><div class="search-item">',
	            '<h3>{desc_zona}</h3>',
	        '</div></tpl>'
		);
		var swZona;
		cboSearchZona = new Ext.form.ComboBox({
				 	id				: 'IdcboSearchZona',
			        store			: ds_Zona,
					fieldLabel		: 'Zona',
			        loadingText		: 'Searching...',
			        anchor			: '99%',
			        pageSize		: 10,
			        tpl				: TplZona,
			        itemSelector	: 'div.search-item',
			        onSelect		: function(record){
										/*swAreaNodo=1;
										IdAreaNodo	=	record.data.id_area_nodo;
										NomAreaNodo	=	record.data.desc_area_nodo;
										*/
										swZona=1;
										cboSearchZona.setValue(record.data.desc_zona);
										cboSearchZona.collapse();
										cboSearchZona.addClass('ok');
										puntosZona = record.data.puntos.split('|');
										if (polygon) map.removeOverlay(polygon);
										area(puntosZona,'#FF0000', 5, 0.5, '#FFFF00', 0.5,1)
										
								      },
					forceSelection	: true,
					lazyRender 		: true,
			        selectOnFocus	: true,
					typeAhead		: true,
					hideTrigger		: true,
					typeAhead		: true
		});
			
			
			 cboSearchZona.on('blur',function(obj){
					newValue=obj.getValue();
					if (swZona==1){	obj.addClass('ok');	}
		
					if (newValue==oldValue && newValue!=''){
						obj.addClass('ok'); swZona=1;
					}
	
					if (obj.getValue()=='' || swZona!=1 ) {
						obj.setValue('');
						//IdAreaNodo	= '';
						//NomAreaNodo	= '';
						obj.removeClass('ok');
					}
					swZona=0;
				});
		
				cboSearchZona.on('focus',function(obj){
						obj.removeClass('ok');
						oldValue=obj.getValue();
			});
			
		frmZona = new Ext.FormPanel({
				id				: 'IdfrmZona',
				frame			: false,        
				//autoWidth		: true,
				width			: 300,
				autoHeight		: true,
				labelWidth		: 55,
				waitMsgTarget	: true,
				border			: false,
				style			: 'padding:0px 0px 0px 0px',
				items		: [{	layout		: 'column',
					                border		: false,
									height		: 23,
									labelAlign	: 'left',
					                items:[{	columnWidth	: .99,
								                layout		: 'form',
												border		: false,
								                defaults	: {height:18},
								                defaultType	: 'textfield',
								                items		: [cboSearchZona]
											}]	
			            		}]
			});
		return frmZona;
	}
	
	/* ********************************** */
	

	var iconModemUp = new GIcon(); 
    iconModemUp.image = 'modem_up.png';
    iconModemUp.shadow = 'modem_up_sombra.png';
    iconModemUp.iconSize = new GSize(20, 20);
    iconModemUp.shadowSize = new GSize(36, 20);
    iconModemUp.iconAnchor = new GPoint(6, 20);
    iconModemUp.infoWindowAnchor = new GPoint(5, 1);
	
	var iconModemDown = new GIcon(); 
    iconModemDown.image = 'modem_down.png';
    iconModemDown.shadow = 'modem_down_sombra.png';
    iconModemDown.iconSize = new GSize(20, 20);
    iconModemDown.shadowSize = new GSize(36, 20);
    iconModemDown.iconAnchor = new GPoint(6, 20);
    iconModemDown.infoWindowAnchor = new GPoint(5, 1);


    var iconTap2 = new GIcon(); 
    iconTap2.image = 'tap2.png';	
    iconTap2.shadow = 'tap2_sombra.png';
    iconTap2.iconSize = new GSize(20, 20);
    iconTap2.shadowSize = new GSize(36, 20);
    iconTap2.iconAnchor = new GPoint(6, 20);
    iconTap2.infoWindowAnchor = new GPoint(5, 1);
    
	var iconTap4 = new GIcon(); 
    iconTap4.image = 'tap4.png';	
    iconTap4.shadow = 'tap4_sombra.png';
    iconTap4.iconSize = new GSize(20, 20);
    iconTap4.shadowSize = new GSize(36, 20);
    iconTap4.iconAnchor = new GPoint(6, 20);
    iconTap4.infoWindowAnchor = new GPoint(5, 1);
	
	var iconTap8 = new GIcon(); 
    iconTap8.image = 'tap8.png';	
    iconTap8.shadow = 'tap8_sombra.png';
    iconTap8.iconSize = new GSize(20, 20);
    iconTap8.shadowSize = new GSize(36, 20);
    iconTap8.iconAnchor = new GPoint(6, 20);
    iconTap8.infoWindowAnchor = new GPoint(5, 1);
	
	
	var iconAmplificador2 = new GIcon(); 
    iconAmplificador2.image = 'amp2.png';
    iconAmplificador2.shadow = 'amp_sombra.png';
    iconAmplificador2.iconSize = new GSize(34, 20);
    iconAmplificador2.shadowSize = new GSize(52, 20);
    iconAmplificador2.iconAnchor = new GPoint(6, 20);
    iconAmplificador2.infoWindowAnchor = new GPoint(5, 1);
    
	var iconAmplificador3 = new GIcon(); 
    iconAmplificador3.image = 'amp3.png';
    iconAmplificador3.shadow = 'amp_sombra.png';
    iconAmplificador3.iconSize = new GSize(34, 20);
    iconAmplificador3.shadowSize = new GSize(52, 20);
    iconAmplificador3.iconAnchor = new GPoint(6, 20);
    iconAmplificador3.infoWindowAnchor = new GPoint(5, 1);
	
	var iconAmplificador4 = new GIcon(); 
    iconAmplificador4.image = 'amp4.png';
    iconAmplificador4.shadow = 'amp_sombra.png';
    iconAmplificador4.iconSize = new GSize(34, 20);
    iconAmplificador4.shadowSize = new GSize(52, 20);
    iconAmplificador4.iconAnchor = new GPoint(6, 20);
    iconAmplificador4.infoWindowAnchor = new GPoint(5, 1);	
	
	var iconAmplificador5 = new GIcon(); 
    iconAmplificador5.image = 'amp5.png';
    iconAmplificador5.shadow = 'amp_sombra.png';
    iconAmplificador5.iconSize = new GSize(34, 20);
    iconAmplificador5.shadowSize = new GSize(52, 20);
    iconAmplificador5.iconAnchor = new GPoint(6, 20);
    iconAmplificador5.infoWindowAnchor = new GPoint(5, 1);	
	
	
	
	
    var iconNodo = new GIcon(); 
    iconNodo.image = 'nodo1.png';
    iconNodo.shadow = 'nodo1_sombra.png';
    iconNodo.iconSize = new GSize(46, 32);
    iconNodo.shadowSize = new GSize(67, 32);
    iconNodo.iconAnchor = new GPoint(6, 20);
    iconNodo.infoWindowAnchor = new GPoint(5, 1);
    
    var iconHub	 = new GIcon(); 
    iconHub.image = 'hub1.png';
    iconHub.shadow = 'hub1_sombra.png';
    iconHub.iconSize = new GSize(20, 20);
    iconHub.shadowSize = new GSize(36, 20);
    iconHub.iconAnchor = new GPoint(6, 20);
    iconHub.infoWindowAnchor = new GPoint(5, 1);

	var iconCabecera	 = new GIcon(); 
    iconCabecera.image = 'cab1.png';
    iconCabecera.shadow = 'cab1_sombra.png';
    iconCabecera.iconSize = new GSize(32, 32);
    iconCabecera.shadowSize = new GSize(48, 32);
    iconCabecera.iconAnchor = new GPoint(6, 20);
    iconCabecera.infoWindowAnchor = new GPoint(5, 1);
		
	
	//var customIcons = [];
  /*  customIcons["1"] = iconModemUp;
    customIcons["2"] = iconTap;
    customIcons["3"] = iconAmplificador;
    customIcons["4"] = iconNodo;
    customIcons["5"] = iconHub;
	customIcons["6"] = iconCabecera;
*/
         
    function load(idNodo, idAmplif, idTap){
		
		if (GBrowserIsCompatible()) {
			//alert('TAP='+idTap);
	/*
			var Emap = new GMap2(document.getElementById("Emap"));//control map
			var map = new GMap2(document.getElementById("map"));
			map.addControl(new GSmallMapControl());
			map.addControl(new GMapTypeControl());

			new GKeyboardHandler(map);
			map.enableScrollWheelZoom();
			map.enableContinuousZoom();
			map.getContainer().style.overflow = "hidden";
			map.enableDoubleClickZoom();
		*/	
			LimpiaMapa();
			
			GDownloadUrl("php_genxml.php?idNodo=" + idNodo + "&idAmplif=" + idAmplif + "&idTap=" + idTap , function(data){
				//alert (data);
				var xml = GXml.parse(data);
				//alert(xml);
				var markers = xml.documentElement.getElementsByTagName("marker");
				
				if (typeof markers != "undefined") {
					//alert (markers.length);
					//alert ('long:'+markers.length);
					//map.enableGoogleBar();
/*					if (markers.length < 1) 
						map.setCenter(new GLatLng(-12.109075, -77.016274), 10);
					if (markers.length == 1) {
						var cant_averias = parseInt(markers[0].getAttribute("cant_averias"));
						map.setCenter(new GLatLng(-12.109075, -77.016274), 10);
					//var point = new GLatLng(-12.109075,-77.016274);
					//var marker = createMarker(point);
					//map.addOverlay(marker);
					//alert ('Nro. de averias:'+cant_averias);
					}
					if (markers.length > 1) {
					
						var punteroinicio = parseInt(markers[0].getAttribute("inicio"));
						var punterofinmdf = parseInt(markers[0].getAttribute("finmdf"));
						var cant_averias = parseInt(markers[0].getAttribute("cant_averias"));
						Ext.MessageBox.alert('', 'Nro. de Ordenes: ' + cant_averias);
						
						
						//CENTRA MAPA
						var lat_center = parseFloat(markers[0].getAttribute("lat_center"));
						var lon_center = parseFloat(markers[0].getAttribute("lon_center"));
						var min_lat = parseFloat(markers[0].getAttribute("min_lat"));
						var min_lon = parseFloat(markers[0].getAttribute("min_lon"));
						var max_lat = parseFloat(markers[0].getAttribute("max_lat"));
						var max_lon = parseFloat(markers[0].getAttribute("max_lon"));
						//			alert (min_lat+'#'+min_lon+'#'+max_lat+'#'+max_lon);
						autoZoom = map.getBoundsZoomLevel(new GLatLngBounds(new GLatLng(min_lat - 0.002000, min_lon - 0.002000), new GLatLng(max_lat + 0.002000, max_lon + 0.002000)));
						map.setCenter(new GLatLng(lat_center, lon_center), autoZoom);
						
						// PINTA MDF
						if (swmdf == true) {
							for (var y = 1; y <= punterofinmdf; y++) {
								var zonal = markers[y].getAttribute("zonal");
								var mdf = markers[y].getAttribute("mdf");
								var d_mdf = markers[y].getAttribute("d_mdf");
								var dir_mdf = markers[y].getAttribute("dir_mdf");
								var tecno = markers[y].getAttribute("tecno");
								//var lat = markers[y].getAttribute("lat");
								//var lon = markers[y].getAttribute("lon");
								var point = new GLatLng(parseFloat(markers[y].getAttribute("lat")), parseFloat(markers[y].getAttribute("lon")));
								var marker = createMarkermdf(point, zonal, mdf, d_mdf, dir_mdf, tecno);
								map.addOverlay(marker);
							}
						}
						
						// PINTA ARMARIOS
						if (swarmario == true) {
							for (var q = (punterofinmdf + 1); q <= punteroinicio; q++) {
								var armario = markers[q].getAttribute("armario");
								var mdf = markers[q].getAttribute("mdf");
								var point = new GLatLng(parseFloat(markers[q].getAttribute("lat")), parseFloat(markers[q].getAttribute("lon")));
								var marker = createMarkerarmario(point, armario, mdf);
								map.addOverlay(marker);
							}
						}
						
						//PINTA AVERIAS
						for (var i = (punteroinicio + 1); i < markers.length; i++) {
	*/					
	
						//CENTRA MAPA
						var lat_center = parseFloat(markers[0].getAttribute("lat_center"));
						var lon_center = parseFloat(markers[0].getAttribute("lon_center"));
						var min_lat = parseFloat(markers[0].getAttribute("min_lat"));
						var min_lon = parseFloat(markers[0].getAttribute("min_lon"));
						var max_lat = parseFloat(markers[0].getAttribute("max_lat"));
						var max_lon = parseFloat(markers[0].getAttribute("max_lon"));
						//autoZoom = map.getBoundsZoomLevel(new GLatLngBounds(new GLatLng(min_lat - 0.002000, min_lon - 0.002000), new GLatLng(max_lat + 0.002000, max_lon + 0.002000)));
						autoZoom = map.getBoundsZoomLevel(new GLatLngBounds(new GLatLng(min_lat, min_lon), new GLatLng(max_lat, max_lon )));
						map.setCenter(new GLatLng(lat_center, lon_center), autoZoom);
	

						var desc_area_nodo 		= markers[1].getAttribute("desc_area_nodo");
						var color_area			= markers[1].getAttribute("color_area");
						var transparencia_area 	= markers[1].getAttribute("transparencia_area");
						var color_linea 		= markers[1].getAttribute("color_linea");
						var transparencia_linea = markers[1].getAttribute("transparencia_linea");
						var ancho_linea 		= markers[1].getAttribute("ancho_linea");
						var puntos 				= markers[1].getAttribute("puntos");

						var puntosArea = puntos.split('|');
						if (polygon) map.removeOverlay(polygon);

						area(puntosArea,color_linea, ancho_linea, transparencia_linea, color_area, transparencia_area,0,desc_area_nodo,1);
								
						for (var i=2; i < markers.length; i++) {
							var tipo = markers[i].getAttribute("tipo");
							var id = markers[i].getAttribute("id");
							var nom = markers[i].getAttribute("nom");
							var point = new GLatLng(parseFloat(markers[i].getAttribute("latitud")), parseFloat(markers[i].getAttribute("longitud")));
							//alert('TIPO='+tipo);
					/*		switch (tipo){
								case "1": 
									var marker = createMarker(point,tipo,id_cable_modem, nom_cable_modem, num_mac, fec_instalacion);
									break;
								case "2": break;
							}	*/
							var marker = createMarker(point,tipo,id,nom);
							map.addOverlay(marker);
						}
					//}
				}
			});
			/*
			function EMove(){
				Emap.setCenter(map.getCenter(), map.getZoom() + 1);
			}
			
			GEvent.addListener(map, 'moveend', function(){
				Emap.setCenter(map.getCenter(), map.getZoom() + 1);
			});
			
			var geocoder = new GClientGeocoder();
			
			function showAddress(address){
				geocoder.getLatLng(address, function(point){
					if (!point) {
						alert(address + " not found");
					}
					else {
						map.panTo(point);
						map.setZoom(18);
					}
				})
			}
			*/
			
		}
	} 
	

    function load2(id_elementos){
		
		
		if (GBrowserIsCompatible()) {
			LimpiaMapa();
			
			GDownloadUrl("php_genxml2.php?id_elementos=" + id_elementos, function(data){
				//alert (data);
				var xml = GXml.parse(data);
				//alert(xml);
				var markers = xml.documentElement.getElementsByTagName("marker");
				
				if (typeof markers != "undefined") {

						//CENTRA MAPA
						var lat_center = parseFloat(markers[0].getAttribute("lat_center"));
						var lon_center = parseFloat(markers[0].getAttribute("lon_center"));
						var min_lat = parseFloat(markers[0].getAttribute("min_lat"));
						var min_lon = parseFloat(markers[0].getAttribute("min_lon"));
						var max_lat = parseFloat(markers[0].getAttribute("max_lat"));
						var max_lon = parseFloat(markers[0].getAttribute("max_lon"));
						var inicio = parseFloat(markers[0].getAttribute("inicio"));
						//autoZoom = map.getBoundsZoomLevel(new GLatLngBounds(new GLatLng(min_lat - 0.002000, min_lon - 0.002000), new GLatLng(max_lat + 0.002000, max_lon + 0.002000)));
						
	
						for (var i=1; i < inicio; i++) {
							
							var desc_area_nodo 		= markers[i].getAttribute("desc_area_nodo");
							var color_area			= markers[i].getAttribute("color_area");
							var transparencia_area 	= markers[i].getAttribute("transparencia_area");
							var color_linea 		= markers[i].getAttribute("color_linea");
							var transparencia_linea = markers[i].getAttribute("transparencia_linea");
							var ancho_linea 		= markers[i].getAttribute("ancho_linea");
							var puntos 				= markers[i].getAttribute("puntos");
	
							var puntosArea = puntos.split('|');
							//if (polygon) map.removeOverlay(polygon);
	
							area(puntosArea,color_linea, ancho_linea, transparencia_linea, color_area, transparencia_area,0,desc_area_nodo,1);
								
								
							
						}
	
						//map.setCenter(new GLatLng(lat_center, lon_center), autoZoom);
/*
						var desc_area_nodo 		= markers[1].getAttribute("desc_area_nodo");
						var color_area			= markers[1].getAttribute("color_area");
						var transparencia_area 	= markers[1].getAttribute("transparencia_area");
						var color_linea 		= markers[1].getAttribute("color_linea");
						var transparencia_linea = markers[1].getAttribute("transparencia_linea");
						var ancho_linea 		= markers[1].getAttribute("ancho_linea");
						var puntos 				= markers[1].getAttribute("puntos");

						var puntosArea = puntos.split('|');
						if (polygon) map.removeOverlay(polygon);

						area(puntosArea,color_linea, ancho_linea, transparencia_linea, color_area, transparencia_area,0,desc_area_nodo,1);
								*/
								//alert(markers.length);
						for (var i=inicio; i < markers.length; i++) {
							var tipo = markers[i].getAttribute("tipo");
							var id = markers[i].getAttribute("id");
							var nom = markers[i].getAttribute("nom");
							var puertos = markers[i].getAttribute("puertos");
							var point = new GLatLng(parseFloat(markers[i].getAttribute("latitud")), parseFloat(markers[i].getAttribute("longitud")));
							var marker = createMarker(point,tipo,id,nom,puertos);
							map.addOverlay(marker);
						}
						
					//}
					
					autoZoom = map.getBoundsZoomLevel(new GLatLngBounds(new GLatLng(min_lat, min_lon), new GLatLng(max_lat, max_lon )));
						map.setCenter(new GLatLng(lat_center, lon_center), autoZoom);
				}
			});
		}
	}


	
	function createMarker_OLD(point, nro_actuacion, cliente, telefono, descripcion, d_producto, tipo_1, tecnico, estado, negocio, mdf, zonal, eecc){
		var marker = new GMarker(point, customIcons[eecc]);
		var html = "<style type='text/css'><!--.Estilo2 {font-size: 11px; }.Estilo3 {font-size: 12px}--></style><table width='529' border='1' cellpadding='0' cellspacing='0' bordercolor='#3366CC'><tr><th colspan='6' bgcolor='#E5ECF9' scope='col'><span class='Estilo3'>Datos de Orden </span></th></tr><tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Nro Actuaci&oacute;n </div></th> <th colspan='2' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" + nro_actuacion + "</span></th><th width='120' bgcolor='#E5ECF9' scope='row'><span class='Estilo2'>Tel&eacute;fono</span></th><th colspan='2' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" + telefono + "</span></th></tr><tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Cliente</div></th><th colspan='5' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" + cliente + "</span></th></tr><tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Direcci&oacute;n</div></th><th colspan='5' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" + descripcion + "</span></th></tr><tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Producto</div></th>     <th colspan='5' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" + d_producto + "</span></th></tr><tr> <th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Tecnico</div></th><th colspan='5' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" + tecnico + "</span></th></tr><tr><th width='84' bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Estado</div></th><th width='128' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" + estado + "</span></th><th width='41' bgcolor='#E5ECF9' scope='row'><span class='Estilo2'>Negocio</span></th><th bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" + negocio + "</span></th><th width='48' bgcolor='#E5ECF9' scope='row'><span class='Estilo2'>Mdf</span></th><td width='94'><span class='Estilo3'>" + mdf + "</span></td></tr><tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >EECC</div></th><th bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" + eecc + "</span></th><th bgcolor='#E5ECF9' scope='row'><span class='Estilo2'>Zonal</span></th><th bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" + zonal + "</span></th><th bgcolor='#E5ECF9' scope='row'><span class='Estilo2'>Tipo</span></th><td><span class='Estilo3'>" + tipo_1 + "</span></td></tr></table>";
		var form = "<style type='text/css'><!--.Estilo2 {font-size: 11px; }.Estilo3 {font-size: 12px}--></style><form id='form1' name='form1' method='post' action=''><table width='200' border='1'><tr><th colspan='2' scope='col'>Registrar Evento </th></tr><tr><td>Tipo Acci&oacute;n </td><td><label><select name='select'><option value='0'>Elija...</option><option value='1'>Liquidar</option><option value='2'>Devolver</option><option value='3'>Otros</option></select></label></td></tr><tr><td colspan='2'>Observaciones</td></tr><tr><td colspan='2'><label><textarea name='textarea'></textarea></label></td></tr><tr><td colspan='2'><label><div align='center'><input type='submit' name='Submit' value='Grabar' /></div></label></td></tr></table></form>";
		
		GEvent.addListener(marker, 'click', function(){
			//marker.openInfoWindowHtml(html);
			
			var tab1 = new GInfoWindowTab("Informacion", '<div id="tab1" class="bubble">' + html + '</div>');
			//var tab2 = new GInfoWindowTab("Localizacion", '<div id="detailmap"></div>');
			var tab3 = new GInfoWindowTab("Eventos", '<div id="detailmap">' + form + '</div>');
			
			//var infoTabs = [tab1,tab2,tab3];
			var infoTabs = [tab1, tab3];
			marker.openInfoWindowTabsHtml(infoTabs);
			
		/*var dMapDiv = document.getElementById("detailmap");
		 var detailmap = new GMap2(dMapDiv);
		 detailmap.setCenter(point,11);
		 var CopyrightDiv = dMapDiv.firstChild.nextSibling;
		 var CopyrightImg = dMapDiv.firstChild.nextSibling.nextSibling;
		 CopyrightDiv.style.display = "none";
		 CopyrightImg.style.display = "none";
		 */
		});
		return marker;
	}

//	function createMarker(point, tipo,id_cable_modem, nom_cable_modem, num_mac, fec_instalacion) {
	function createMarker(point, tipo,id,nom,puertos) {
		
		var customIcons;
		switch(tipo){
			case '1':	//customIcons = iconModemUp;break;
					switch(puertos){
                                                        case '1':       customIcons = iconModemUp;break;
                                                        default :       customIcons = iconModemDown;break;
                                                }
                                                break;
			case '2':	switch(puertos){
							case '2':	customIcons = iconTap2;break;
							case '4':	customIcons = iconTap4;break;
							case '8':	customIcons = iconTap8;break;
						}
						break;
			case '3':	switch(puertos){
							case '2':	customIcons = iconAmplificador2;break;
							case '3':	customIcons = iconAmplificador3;break;
							case '4':	customIcons = iconAmplificador4;break;
							case '5':	customIcons = iconAmplificador5;break;
						}
						break;
			case '4':	customIcons = iconNodo;break;
			case '5':	customIcons = iconHub;break;
			case '6':	customIcons = iconCabecera;break;
		}
      	var marker = new GMarker(point, customIcons);
		
		var html;
//		var form = "<style type='text/css'><!--.Estilo2 {font-size: 11px; }.Estilo3 {font-size: 12px}--></style><form id='form1' name='form1' method='post' action=''><table width='200' border='1'><tr><th colspan='2' scope='col'>Registrar Evento </th></tr><tr><td>Tipo Acci&oacute;n </td><td><label><select name='select'><option value='0'>Elija...</option><option value='1'>Liquidar</option><option value='2'>Devolver</option><option value='3'>Otros</option></select></label></td></tr><tr><td colspan='2'>Observaciones</td></tr><tr><td colspan='2'><label><textarea name='textarea'></textarea></label></td></tr><tr><td colspan='2'><label><div align='center'><input type='submit' name='Submit' value='Grabar' /></div></label></td></tr></table></form>";		
		var ajax=nuevoAjax();
		ajax.open("POST", "query_procesos.php?", true);
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		ajax.onreadystatechange=function()
			{	//if (ajax.readyState==4)
				//{
					if(!ajax.responseText) html='-';
					else html= ajax.responseText;
				//}
			};
		ajax.send("n=21&ered="+tipo+"&query="+id);
			
			
					 GEvent.addListener(marker, 'click', function() {
					 	//alert ("<iframe src='http://69.12.176.45/truedataerp/gmaps/truedata/search.php?modem_id="+nom+"'></iframe>");
					 	var html_docsis = "<iframe src='http://10.200.0.2/truedataerp/gmaps/truedata/search.php?modem_id="+nom+"'></iframe>";
						var tab1 = new GInfoWindowTab("Informacion", '<div id="tab1" class="bubble">'+html+'</div>');
						//var tab2 = new GInfoWindowTab("Datos Docsis", '<div id="detailmap"></div>');
						var tab2 = new GInfoWindowTab("Datos Docsis", html_docsis);
						//var tab3 = new GInfoWindowTab("Otros", '<div id="detailmap">' + form + '</div>');
						var tab3 = new GInfoWindowTab("Otros", '<div id="detailmap"></div>');
						var infoTabs = [tab1,tab2,tab3];
					
						marker.openInfoWindowTabsHtml(infoTabs);
				      });

		 return marker;
		
		
		//var html=GeneraHtml(tipo,id_cable_modem);
//var form = "<style type='text/css'><!--.Estilo2 {font-size: 11px; }.Estilo3 {font-size: 12px}--></style><form id='form1' name='form1' method='post' action=''><table width='200' border='1'><tr><th colspan='2' scope='col'>Registrar Evento </th></tr><tr><td>Tipo Acci&oacute;n </td><td><label><select name='select'><option value='0'>Elija...</option><option value='1'>Liquidar</option><option value='2'>Devolver</option><option value='3'>Otros</option></select></label></td></tr><tr><td colspan='2'>Observaciones</td></tr><tr><td colspan='2'><label><textarea name='textarea'></textarea></label></td></tr><tr><td colspan='2'><label><div align='center'><input type='submit' name='Submit' value='Grabar' /></div></label></td></tr></table></form>";		
/*		var html ="<style type='text/css'><!--.Estilo2 {font-size: 11px; }.Estilo3 {font-size: 12px}--></style>"+
	   	"<table width='529' border='1' cellpadding='0' cellspacing='0' bordercolor='#3366CC'>"+
		"<tr><th colspan='6' bgcolor='#E5ECF9' scope='col'><span class='Estilo3'>DATOS</span></th></tr>"+
		"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Id Cable</div></th>"+
			"<th colspan='2' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>"+ id_cable_modem +"</span></th>"+
			"<th width='120' bgcolor='#E5ECF9' scope='row'><span class='Estilo2'>Nombre</span></th>"+
			"<th colspan='2' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" + nom_cable_modem  + "</span></th></tr>"+
		"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >MAC</div></th>"+
			"<th colspan='5' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>"+ num_mac +"</span></th></tr>"+
		"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Fecha Instalacion</div></th>"+
			"<th colspan='5' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" + fec_instalacion + "</span></th></tr></table>";
		var form = "<style type='text/css'><!--.Estilo2 {font-size: 11px; }.Estilo3 {font-size: 12px}--></style><form id='form1' name='form1' method='post' action=''><table width='200' border='1'><tr><th colspan='2' scope='col'>Registrar Evento </th></tr><tr><td>Tipo Acci&oacute;n </td><td><label><select name='select'><option value='0'>Elija...</option><option value='1'>Liquidar</option><option value='2'>Devolver</option><option value='3'>Otros</option></select></label></td></tr><tr><td colspan='2'>Observaciones</td></tr><tr><td colspan='2'><label><textarea name='textarea'></textarea></label></td></tr><tr><td colspan='2'><label><div align='center'><input type='submit' name='Submit' value='Grabar' /></div></label></td></tr></table></form>";
      GEvent.addListener(marker, 'click', function() {
		var tab1 = new GInfoWindowTab("Informacion", '<div id="tab1" class="bubble">'+html+'</div>');
		var tab2 = new GInfoWindowTab("Datos Docsis", '<div id="detailmap"></div>');
		var tab3 = new GInfoWindowTab("Eventos", '<div id="detailmap">' + form + '</div>');
		var infoTabs = [tab1,tab2,tab3];
	
		marker.openInfoWindowTabsHtml(infoTabs);
      });
*/	
  
 	
	  
    }
	
	
	function GeneraHtml(id_ered,id){
		var retorno=1;
		var ajax=nuevoAjax();
		ajax.open("POST", "query_procesos.php?", false);
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		ajax.onreadystatechange=function()
			{	if (ajax.readyState==4)
				{	if(!ajax.responseText) retorno=1;
					else retorno= ajax.responseText;
				}
			};
		ajax.send("n=21&ered="+id_ered+"&query="+id);
		return retorno;
	}
	
	
	
	function consulta_ered(marca,id_ered,id){
		var html ="<style type='text/css'><!--.Estilo2 {font-size: 11px; }.Estilo3 {font-size: 12px}--></style>"+
	   	"<table width='529' border='1' cellpadding='0' cellspacing='0' bordercolor='#3366CC'>"+
		"<tr><th colspan='6' bgcolor='#E5ECF9' scope='col'><span class='Estilo3'>DATOS</span></th></tr>"+
		"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Id Cable</div></th>"+
			"<th colspan='2' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>"+ "IDELEMENTO" +"</span></th>"+
			"<th width='120' bgcolor='#E5ECF9' scope='row'><span class='Estilo2'>Nombre</span></th>"+
			"<th colspan='2' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" + "NOMBRE ELEMENTO"  + "</span></th></tr>"+
		"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >MAC</div></th>"+
			"<th colspan='5' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>"+ "MAC_ELEMENTO" +"</span></th></tr>"+
		"<tr><th bgcolor='#E5ECF9' scope='row'><div align='left' class='Estilo2' >Fecha Instalacion</div></th>"+
			"<th colspan='5' bgcolor='#FFFFFF' scope='row'><span class='Estilo3'>" + "FECHA" + "</span></th></tr></table>";
		alert(marca);
		var tab1 = new GInfoWindowTab("Informacion", '<div id="tab1" class="bubble">'+html+'</div>');
							var infoTabs = [tab1];
							marca.openInfoWindowTabsHtml(infoTabs);
							return;
		Ext.Ajax.request({
			url: 'query_procesos.php',
			method: 'POST',
			params: {
					n		: 21,
					ered	: trim(id_ered),
					query	: trim(id)
			},
			success: function(result, request){
							var html=result.responseText;
							//alert (respuesta);
							var tab1 = new GInfoWindowTab("Informacion", '<div id="tab1" class="bubble">'+html+'</div>');
							var infoTabs = [tab1];
							marca.openInfoWindowTabsHtml(infoTabs);
			},
			failure: function(result, request){Ext.MessageBox.alert('Fallo', 'Error al Area');}
		});
		
		
		
	}
	
