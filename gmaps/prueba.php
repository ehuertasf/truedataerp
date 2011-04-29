<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <title>Google Maps JavaScript API Example: Marker Drag Events</title>

	<script type="text/javascript">
    	function aaa(){
	    	alert(window.location.host);
    	}
  </script>

    <!--
    <script src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAAzr2EBOXUKnm_jVnk0OJI7xSosDVG8KKPE1-m51RBrvYughuyMxQ-i1QfUnH94QxWIa6N4U6MouMmBA"
            type="text/javascript"></script>


    LAB.ARYGE.COM
	  <script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=true_or_false
	    &amp;key=ABQIAAAATU_QaAK6ctarcM0DWuBfxRS9ExIQQG9UjVRIK-I93kWBTHsfVBR4eUYMXs5FCmGPwVZYrA2YiYoCnQ"
	    type="text/javascript">
	  </script>
	-->
	<!--IP 72.167.232.80
	  <script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=true_or_false
	      &amp;key=ABQIAAAATU_QaAK6ctarcM0DWuBfxRTtKSeOLSJH78vMGoUIyFc3sOjLPhQv7QrxFpoce6VB-bqhDHuqAY5Y9A"
	      type="text/javascript">
    </script>

-->

    <script type="text/javascript">

    function initialize() {
      if (GBrowserIsCompatible()) {
        var map = new GMap2(document.getElementById("map_canvas"));
        var center = new GLatLng(37.4419, -122.1419);
        map.setCenter(center, 13);

        var marker = new GMarker(center, {draggable: true});

        GEvent.addListener(marker, "dragstart", function() {
          map.closeInfoWindow();
        });

        GEvent.addListener(marker, "dragend", function() {
          marker.openInfoWindowHtml("Just bouncing along...");
        });

        map.addOverlay(marker);

      }
    }
    </script>
  </head>

  <body onload="aaa()">
    <div id="map_canvas" style="width: 500px; height: 300px"></div>
  </body>
</html>
