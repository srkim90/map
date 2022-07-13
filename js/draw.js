
function drawLine(linePath, strokeColor, strokeOpacity) {
    var polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: strokeColor, // 선의 색깔입니다
        strokeOpacity: strokeOpacity, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid' // 선의 스타일입니다
        });
        polyline.setMap(map);   
}

function calcCenterLocation(jsonData, endDrawRatio) {
    lnArray = jsonData.length
    s_lat = jsonData[0]['lat']
    s_lng = jsonData[0]['lng']
    e_lat = jsonData[lnArray - 1]['lat']
    e_lng = jsonData[lnArray - 1]['lng']
    var lat = s_lat - ((s_lat - e_lat) / 100) * endDrawRatio
    var lng = s_lng - ((s_lng - e_lng) / 100) * endDrawRatio

    return {
        'lat' : lat,
        'lng' : lng
    }
}





function checkMarker(markers, jsonData, sIdx, eIdx) {
    isMArked = false
    if (sIdx == null || eIdx == null || markers == null) {
        return false
    }
    for (idx = sIdx; idx <= eIdx ; idx++) {
        try {
            var lat = jsonData[idx]['lat']
            var lng = jsonData[idx]['lng']
        } catch(error) {
            continue
        }

        for (var marker of markers) { 
            //console.log(marker)
            if (marker['checked'] == true) {
                continue
            }
            var mLat = marker['lat']
            var mLng = marker['lng']
            var abs = Math.abs(mLat - lat) + Math.abs(mLng - lng)
            if (abs < 0.00015) {
                marker['checked'] = true
                doPopup(marker, jsonData[idx])
                isMArked = true
            }
        }
    }
    return isMArked
}

function drawAll(jsonData, startDrawRatio, endDrawRatio, strokeColor, strokeOpacity, markers) {
    var linePath = []
        var idx = 0
        var actualDraw = 0
        var sIdx = null
        var eIdx = null
        for (var step of jsonData) { 
            idx++
            if (idx % 25 != 0) {
                continue;
            }
            notRatio = (idx / jsonData.length) * 100
            if (startDrawRatio < notRatio) {
                if (sIdx == null) {
                    sIdx = idx 
                }
                actualDraw++
                var lat = step['lat']
                var lng = step['lng']
                linePath.push(new kakao.maps.LatLng(lat, lng))
            }
            if (endDrawRatio < notRatio) {
                eIdx = idx
                moveMarker(lat, lng)
                break
            }
        }
        if (eIdx == null) {
            eIdx = idx
        }

        if (actualDraw > 0) {
            drawLine(linePath, strokeColor, strokeOpacity)
            var location = calcCenterLocation(jsonData, endDrawRatio)
            map.setCenter(new kakao.maps.LatLng(location['lat'], location['lng']))
        }
        if (marker != null && idx > 0) {
            return checkMarker(markers, jsonData, sIdx, eIdx)
        }
        return false
}