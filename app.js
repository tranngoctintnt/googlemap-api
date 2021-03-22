function initMap() {
    var options ={
        center: {lat: 12.9505309 ,lng: 109.3535402}, // cho biet minh o khu vuc nao
        zoom: 8
    }


    var map = new google.maps.Map(document.getElementById("map"), options); // khoi tao map

    directionsDisplay.setMap(map);
    // marker
    var marker = new google.maps.Marker({
        position: options,
        map: map,
        icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    });

    var infoWindow = new google.maps.InfoWindow({
        container: '<p>My Home</p>'
    });

    marker.addListener('click', function(){
        infoWindow.open(map, marker); 
    });

    var directionsService = new google.maps.DirectionsService(); // tinh toan duong di
    var directionsDisplay = new google.maps.directionsDisplay({map: map}); // hien thi duong di

    var onChange = function(){
        calculateAndDisplayRoute(directionsService, directionsDisplay); // xu li hien thi ket qua chi duong
    };

    document.getElementById('source').addEventListener('click', onChange);
    document.getElementById('destination').addEventListener('click', onChange);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay){ // thuc hien tinh toan 
    directionsService.route({
        origin: document.getElementById('source').value, // diem xuat phat
        destination: document.getElementById('destination').value, // diem dich
    }, function(response, status){ //response trả về bao gồm tất cả các thông tin về chỉ đường
        if(status == google.map.DirectionStatus.OK) {
            directionsDisplay.setDirections(response);
        } else{
            window.alert('Khong co kq' +status);
        }

    });
}