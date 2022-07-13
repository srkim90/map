
function doPopup(marker, pos) {
    console.log(marker)
    var lat = marker['lat']
    var lng = marker['lng']
    var title = marker['title']

    var markerPosition  = new kakao.maps.LatLng(lat, lng); 
    //var marker = new kakao.maps.Marker({position: markerPosition});
    //marker.setMap(map);
    var customOverlay = new kakao.maps.CustomOverlay({
    position: markerPosition,
    content: format(content, title),
    xAnchor: 0.0,
    yAnchor: 0.0
    });
    customOverlay.setMap(map);
    
}