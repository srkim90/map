// 지도를 클릭한 위치에 표출할 마커입니다

kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
    
    // 클릭한 위도, 경도 정보를 가져옵니다 
    var latlng = mouseEvent.latLng; 
    
    // 마커 위치를 클릭한 위치로 옮깁니다
    marker.setPosition(latlng);
    
    var message = '[' + latlng.getLat() + ',' + latlng.getLng() + ']';
    
    console.log({
        '"lat"' : latlng.getLat(),
        '"lng"' : latlng.getLng(),
        '"title"' : ""
    })
    
});

nowPosMarker = null
function moveMarker(lat, lng) {
    pos = new kakao.maps.LatLng(lat, lng)
    if (nowPosMarker == null) {
        nowPosMarker = new kakao.maps.Marker({ 
        position: pos}); 
        nowPosMarker.setMap(map);
    }
    else {
        nowPosMarker.setPosition(pos);
    }

}