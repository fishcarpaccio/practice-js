// 初期化
initMap(38.126434, 136.969707, 5);

//関数の定義（マップのイニシャライズ）
function initMap(lat, lng, zoom) {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: zoom,
    center: {
      lat: lat,
      lng: lng
    }
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
    var latlng = new google.maps.LatLng(markers[i][1], markers[i][2]);
    var icons = markers[i][3];
    createMarker(name, latlng, icons, map)
  }
};

// マーカーを置く
function createMarker(name, latlng, icons, map) {
  var marker = new google.maps.Marker({
    position: latlng,
    icon: icons,
    map: map
  });
}


// フォームから座標情報を受け取って行う処理の実行
document.addEventListener('click', function (e) {
  if (e.target.className === 'search-button') {
    var geo = document.getElementById("geo-search").value;
    // フォームから住所を受け取って行う処理の実行

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': geo
      },
      function (results, status) {
        // 取得できたら
        if (status == google.maps.GeocoderStatus.OK) {
          // 緯度経度を変数へ格納
          var debug = results[0];
          var lat = results[0].geometry.bounds.f.b;
          var lng = results[0].geometry.bounds.b.b;
          // 取得した緯度経度でGoogleMap表示
          initMap(lat, lng, 11)
          console.log(debug);
        } else {
          console.log('error:GeocoderStatus = No');
        }
      }
    )
  };
});
