var mapImg = document.getElementById('map-img');
var citiesNum = document.getElementById('citiesNum');
var rangeKm = document.getElementById('rangeKm');

citiesNum.value = 50;
rangeKm.value = 50;
mapImg.ondragstart = function () { return false; };
citiesNum.addEventListener('input', function () {
    document.getElementById('citiesNumValue').textContent = this.value;
});

rangeKm.addEventListener('input', function () {
    document.getElementById('rangeKmValue').textContent = this.value;
});

document.getElementById('closeInfoBox').addEventListener('click', function () {
    document.getElementById('infoBox').style.display = 'none';
});
const coordCoinHautGauche = [51.39882174293374, -5.332754245480544];
const coordCoinBasDroit = [41.70469610254452, 8.529800125775425];
const carteWidth = 850;
const carteHeight = 850;
/*
* Fonction qui convertit des coordonnées en pixels en coordonnées en degrés
*/
function pixelsToDegrees(x, y) {

    const latitude = coordCoinHautGauche[0] - (y / carteHeight) * (coordCoinHautGauche[0] - coordCoinBasDroit[0]);
    const longitude = coordCoinHautGauche[1] + (x / carteWidth) * (coordCoinBasDroit[1] - coordCoinHautGauche[1]);
    return { latitude: latitude, longitude: longitude };
}
function degreesToPixel(latitude, longitude) {

    const x = carteWidth * (longitude - coordCoinHautGauche[1]) / (coordCoinBasDroit[1] - coordCoinHautGauche[1]);
    const y = carteHeight * (coordCoinHautGauche[0] - latitude) / (coordCoinHautGauche[0] - coordCoinBasDroit[0]);
    return { x: x, y: y };
}
/*
* Fonction qui convertit des coordonnées en degrés en coordonnées en pixels
*/
function getCoordinates(event) {
    var img = document.getElementById('map-img');
    var rect = img.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var coord = pixelsToDegrees(x, y)
    console.log(coord)
    return coord;
}

/*
* Fonction qui place le marqueur sur la carte
*/
function placeMarker(event) {
    var mapContainer = document.getElementById('map-container');
    var marker = document.getElementById('marker');
    var xPercentage = (event.clientX - mapContainer.offsetLeft) / mapContainer.offsetWidth * 100;
    var yPercentage = (event.clientY - mapContainer.offsetTop) / mapContainer.offsetHeight * 100;
    marker.hidden = false;
    marker.style.left = xPercentage + '%';
    marker.style.top = yPercentage + '%';
    marker.style.transform = 'translate(-50%, -60%)';
    var coord = getCoordinates(event);
    var infoBox = document.getElementById('info-box');
    var gpsCoordinates = document.getElementById('gps-coordinates');
    gpsCoordinates.textContent = 'Latitude: ' + coord.latitude.toFixed(2) + ', Longitude: ' + coord.longitude.toFixed(2);
    infoBox.style.display = 'block';
    infoBox.style.left = marker.style.left;
    infoBox.style.top = (parseFloat(marker.style.top) - 10) + '%'; // Position the info box above the marker
    infoBox.style.transform = 'translate(-50%, 0)';
    var latitude = coord.latitude;
    var longitude = coord.longitude;
    var nb = document.getElementById('citiesNum').value;
    var radius = document.getElementById('rangeKm').value;
    showCities(latitude, longitude, nb, radius);
}

/*
* Fonction pour appeler l'API
*/
function showCities(latitude, longitude, nb, radius) {
    $.ajax({
        url: 'http://localhost:3000/api?latitude=' + latitude + '&longitude=' + longitude + '&nb=' + nb + '&radius=' + radius,
        type: 'GET',
        success: function (data) {
            removeCities();
            var cities = data;
            var cityMarkerTemplate = document.querySelector('.city-marker-template');


            for (var i = 0; i < cities.length; i++) {
                var city = cities[i];
                var cityCoordinates = degreesToPixel(city.latitude, city.longitude);
                var cityMarker = cityMarkerTemplate.cloneNode(true);
                cityMarker.classList.remove('city-marker-template');
                cityMarker.classList.add('city-marker');
                cityMarker.hidden = false;
                cityMarker.style.left = cityCoordinates.x + 'px';
                cityMarker.style.top = cityCoordinates.y + 'px';
                cityMarker.title = 'Ville: ' + '<strong>' + city.name + '</strong>' + '<br>' +
                   'Distance: ' + '<strong>' + city.distance.toFixed(0) + '</strong>' + ' km' + '<br>' +
                   'Population: ' + '<strong>' + city.population + '</strong>' + '<br>' +
                   'Region: ' + '<strong>' + city.region + '</strong>';
                cityMarker.id = 'city-marker-' + i; // Ajoutez un identifiant unique
                document.getElementById('map-container').appendChild(cityMarker);
                citiesList(city, i); // Passez l'index à la fonction citiesList
            }
            // Initialise les tooltips
            $('[data-toggle="tooltip"]').tooltip({html: true});

        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}
/*
* Fonction pour afficher la liste des villes
*/
function citiesList(city, index) {
    var cityList = document.getElementById('city-list');
    var cityMarker = document.getElementById('city-marker-' + index);
    var listItem = document.createElement('li');
    var summary = document.createElement('summary');

    listItem.classList.add('city-item');
    listItem.id = 'city-item-' + index; // Ajoutez un identifiant unique
    summary.innerHTML = '[ '+city.distance.toFixed(0)+' km ] '+'<strong>'+city.name+'</strong>';

    listItem.appendChild(summary);
    cityList.appendChild(listItem);

    // Ajoutez des gestionnaires d'événements pour les événements mouseover et mouseout
    listItem.addEventListener('mouseover', function () {
        document.getElementById('city-marker-' + index).style.transform = 'translate(-50%, -50%) scale(1.5)';
        $('#city-marker-' + index).tooltip('show');

    });
    listItem.addEventListener('mouseout', function () {
        document.getElementById('city-marker-' + index).style.transform = 'translate(-50%, -50%)';
        $('#city-marker-' + index).tooltip('hide');
    });
    cityMarker.addEventListener('mouseover', function () {
        listItem.style.backgroundColor = '#f5f5f5';
        listItem.style.fontWeight = 'bold';
        listItem.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    });
    cityMarker.addEventListener('mouseout', function () {
        listItem.style.backgroundColor = '';
        listItem.style.fontWeight = '';
    });

    listItem.addEventListener('click', function () {
        var cityName = city.name;

        document.getElementById('cityName').textContent = cityName;
        document.getElementById('cityRegion').textContent = city.region;
        document.getElementById('cityLatitude').textContent = city.latitude;
        document.getElementById('cityLongitude').textContent = city.longitude;
        document.getElementById('cityPopulation').textContent = city.population;
        document.getElementById('cityDistance').textContent = city.distance.toFixed(0);

        document.getElementById('infoBox').style.display = 'block';
    });
}

/*
* Fonction pour supprimer les marqueurs de villes
*/
function removeCities() {
    var cityList = document.getElementById('city-list');
    cityList.innerHTML = ''; // Clear the list
    var cities = document.querySelectorAll('.city-marker');
    for (var i = 0; i < cities.length; i++) {
        cities[i].remove();
    }
}
