var map = L.map('map').setView([53.121894512502045, -1.5519944913521624], 7);
const readCsv = async () => {
    try {
        //read .csv file on a server
        const target = `https://docs.google.com/spreadsheets/d/1RPNDM7w04O-fywmtH66uO5wgB4vPB0SL2aEn6YmR_PM/gviz/tq?tqx=out:csv&sheet=Sheet1`;
        
        //target can also be api with req.query
        //get csv-structure-response from a server 
        //const target = `https://SOME_DOMAIN.com/api/data/log_csv?[QUERY]`;
        
        const res = await fetch(target, {
            method: 'get',
            headers: {
                'content-type': 'text/csv;charset=UTF-8',
                //in case you need authorisation
                //'Authorization': 'Bearer ' + [TOKEN] //or what you like
            }
        });

        if (res.status === 200) {
            csvData = await res.text();
            console.log('Here');
            console.log(csvData);



            // Split the CSV data into lines
const lines = csvData.split('\n');

// Extract the headers
const headers = lines[0].replace(/"/g, '').split(',');

// Initialize an array to hold the data
const data = [];

// Loop through each line of data (skip the first line as it is the header)
for (let i = 1; i < lines.length; i++) {
    // Split each line by comma to get the individual parts
    const parts = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g).map(part => part.replace(/"/g, ''));
    
    // Create an object to hold the current row data
    const row = {};
    
    // Loop through each part and assign it to the corresponding header
    headers.forEach((header, index) => {
        row[header] = parts[index];
    });
    
    // Push the row object to the data array
    data.push(row);
}

// Output the data array to see the result
console.log(data);

// Now you can access each row and the corresponding variables
data.forEach(entry => {
    const { Name, Region, Address, Day, Discord, Latitude, Longitude, Image } = entry;
    console.log(`Name: ${Name}`);
    console.log(`Region: ${Region}`);
    console.log(`Address: ${Address}`);
    console.log(`Day: ${Day}`);
    console.log(`Discord: ${Discord}`);
    console.log(`Latitude: ${Latitude}`);
    console.log(`Longitude: ${Longitude}`);
    console.log(`Image: ${Image}`);
    console.log('--------------------------');

    L.marker([Latitude, Longitude], {icon: new LeafIcon({iconUrl: Image})}).addTo(map).bindPopup(Name + '<p>' + Region + '<p>' + Address + '<p>' + Day + '<p>' + Discord);

});












        } else {
            console.log(`Error code ${res.status}`);
        }
    } catch (err) {
        console.log(err)
    }
}


L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 10,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var LeafIcon = L.Icon.extend({
    options: {
        iconSize:     [60, 60],
        iconAnchor:   [30, 30],
        popupAnchor:  [0, -30]
    }
});

readCsv();
