var regionFilter = document.getElementById('region');
        if (regionFilter) {
            fetch('http://localhost:3000/api/regions')
                .then(response => response.json())
                .then(data => {
                    var regions = data;
                    var regionFilter = document.getElementById('region');
                    for (var i = 0; i < regions.length; i++) {
                        var region = regions[i];
                        var option = document.createElement('option');
                        option.value = region;
                        option.textContent = region;
                        regionFilter.appendChild(option);
                    }
                })
                .catch(error => console.error('Error:', error));
        }

        document.getElementById('nearestForm').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the form from being submitted normally

            // Check if all fields are filled
            if (!event.target.checkValidity()) {
                alert('Veuillez remplir tous les champs.');
                return;
            }

            // Get the form data
            var formData = new FormData(event.target);

            // Build the URL
            var url = 'http://localhost:3000/api/nearest?latitude=' + formData.get('latitude') +
                '&longitude=' + formData.get('longitude') +
                '&nb=' + formData.get('nb') +
                '&radius=' + formData.get('radius') +
                '&population=' + formData.get('population') +
                '&region=' + formData.get('region');

            // Execute the request
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // Display the result on the page
                    document.getElementById('result').innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                })
                .catch(error => console.error('Error:', error));
        });

        document.getElementById('regionsForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from being submitted normally
        
            // Check if all fields are filled
            if (!event.target.checkValidity()) {
                alert('Veuillez remplir tous les champs.');
                return;
            }
        
            // Get the form data
            var formData = new FormData(event.target);
        
            // Build the URL
            var url = 'http://localhost:3000/api/regions';
    
        
            // Execute the request
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // Display the result on the page
                    document.getElementById('regionsResult').innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                })
                .catch(error => console.error('Error:', error));
        });