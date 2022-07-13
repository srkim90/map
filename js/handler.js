
function onEndDraw(jsonData, idx) {
    if (idx == 0) {
        //map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADMAP);
        level = map.getLevel();
        map.setLevel(level);
    }
    var location = calcCenterLocation(jsonData, (500-idx)/5)
    map.setCenter(new kakao.maps.LatLng(location['lat'], location['lng']))
    if (idx == 500) {
            return
    }
    setTimeout(onEndDraw, N_SLEEP_MS, jsonData, idx + 1)
}

function onTimeout(idx, jsonData) {
    if (idx > (N_DLAY_DISPLAY_STEP)) {
        setTimeout(onEndDraw, N_END_DRAW_SLEEP, jsonData, 0)
        return
    }
    if (idx == 0) {
        map.setLevel(MOVE_MAP_LEVEL)
    }
    var startDrawRatio = idx * (100.0 / N_DLAY_DISPLAY_STEP)
    var endDrawRatio = (idx+1) * (100.0 / N_DLAY_DISPLAY_STEP)

    var sleepMs = N_SLEEP_MS
    if (drawAll(jsonData, startDrawRatio, endDrawRatio,  '#FF0000', 0.9, locationMarker)) {
        sleepMs += N_OVERLAY_SLEEP
    }
    setTimeout(onTimeout, sleepMs, idx + 1, jsonData)
}
