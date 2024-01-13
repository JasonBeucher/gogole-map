// function callApi() {
//     $.ajax({
//         url: 'http://localhost:3000/api',
//         type: 'GET',
//         success: function (data) {
//             $('#apiResponse').text(data);
//             console.log(data)
//         },
//         error: function (error) {
//             console.error('Error:', error);
//         }
//     });
// }
// const carteWidth = 850;
// const carteHeight = 850;
// const coordCoinHautGauche = [51.29882174293374, -5.432754245480544];
// const coordCoinBasDroit = [41.70469610254452, 8.529800125775425];

// function pixelsToDegrees(x, y) {
//     const coordCoinHautGauche = [51.39882174293374, -5.332754245480544];
//     const coordCoinBasDroit = [41.70469610254452, 8.529800125775425];
//     const carteWidth = 850;
//     const carteHeight = 850;
//     const latitude = coordCoinHautGauche[0] - (y / carteHeight) * (coordCoinHautGauche[0] - coordCoinBasDroit[0]);
//     const longitude = coordCoinHautGauche[1] + (x / carteWidth) * (coordCoinBasDroit[1] - coordCoinHautGauche[1]);
//     return {latitude : latitude, longitude: longitude};
// }
   
// function getCoordinates(event) {
//     var img = document.getElementById('map-img');
//     var container = document.getElementById('map-container');
//     var rect = img.getBoundingClientRect();
//     var x = event.clientX - rect.left;
//     var y = event.clientY - rect.top;
//     var coord = pixelsToDegrees(x, y);

//     // Create a new marker element
//     var marker = document.createElement('div');
//     marker.style.position = 'absolute';
//     marker.style.left = (x / img.width * 100) + '%';
//     marker.style.top = (y / img.height * 100) + '%';
//     marker.style.transform = 'translate(-50%, -50%)';
//     marker.style.width = '10px';
//     marker.style.height = '10px';
//     marker.style.backgroundColor = 'red';
//     marker.style.borderRadius = '50%';

//     // Create a new label element
//     var label = document.createElement('div');
//     label.style.position = 'absolute';
//     label.style.left = '15px';
//     label.style.top = '-20px';
//     label.style.color = 'black';
//     label.textContent = 'Lat: ' + coord.latitude.toFixed(2) + ', Lng: ' + coord.longitude.toFixed(2);

//     // Add the label to the marker
//     marker.appendChild(label);

//     // Add the marker to the map container
//     container.appendChild(marker);
// }



