console.log('Hello Map');

     function initMap() {
        var Hida = {lat: 36.239905, lng: 137.186486};
        var Gero = {lat: 35.805693, lng: 137.243191};
        var Hirugano = {lat: 36.003896, lng: 136.895696};
        var Nissekiji = {lat: 36.662134, lng: 137.391052};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 9,
          center: Hida
        });

        var markers = [
          ['飛騨', 36.239905, 137.186486, '../assets/images/google-map-api/mapiconsstation.png'],
          ['下呂', 35.805693, 137.243191, '../assets/images/google-map-api/mapiconsbar.png'],
          ['ひるがの', 36.003896, 136.895696, '../assets/images/google-map-api/mapiconstravelautumn.png'],
          ['郡上', 35.815754, 136.902175, '../assets/images/google-map-api/mapiconsrestaulant.png'],
          ['日石寺', 36.662134, 137.391052, '../assets/images/google-map-api/mapiconscafe.png']
        ];
        for (var i = 0; i < markers.length; i++) {
          var name = markers[i][0];
          var latlng = new google.maps.LatLng(markers[i][1],markers[i][2]);
          var icons = markers[i][3];
          createMarker(name,latlng,icons,map)
        }
      };

      function createMarker(name,latlng,icons,map){
        var marker = new google.maps.Marker({
        position: latlng,
        icon:icons,
        map: map
        });
      }

        function onButtonClick(){
          console.log(document.geo-form.geo-search.value);
        }
