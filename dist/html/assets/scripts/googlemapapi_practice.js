!function(e){"use strict";function o(e,o,n){new google.maps.Map(document.getElementById("map"),{zoom:n,center:{lat:e,lng:o}})}function n(e,o,n,a){new google.maps.Marker({position:o,icon:n,map:a})}o(38.126434,136.969707,5),e.getJSON("markers.json",function(e){console.log("json Data:"+e.markers[0].place);for(var o=0;o<e.markers.length;o++){var a=e.markers[o].place,r=new google.maps.LatLng(e.markers[o].lat,e.markers[o].lng),s=e.markers[o].img;n(a,r,s,map),console.log("name:"+a),console.log("latlng:"+r),console.log("icons:"+s)}}),document.addEventListener("click",function(e){if("search-button"===e.target.className){var n=document.getElementById("geo-search").value;(new google.maps.Geocoder).geocode({address:n},function(e,n){if(n==google.maps.GeocoderStatus.OK){var a=e[0];o(e[0].geometry.bounds.f.b,e[0].geometry.bounds.b.b,11),console.log(a)}else console.log("error:GeocoderStatus = No")})}})}(jQuery);