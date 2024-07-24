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
            const data = await res.text();
            console.log(data);

        } else {
            console.log(`Error code ${res.status}`);
        }
    } catch (err) {
        console.log(err)
    }
}

readCsv();

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

var iCon1 = new LeafIcon({iconUrl: 'https://www.bing.com/th?pid=Sgg&qlt=100&u=https%3A%2F%2Fimages.start.gg%2Fimages%2Ftournament%2F585089%2Fimage-6f3d77267362365f7bb0b99aa05d03d6-optimized.png&ehk=R2c%2BMEF%2FzHeWppOQxd%2Fvs4BUkqWQaTZAUcfFe3l8Hlk%3D&w=280&h=280&r=0'});

L.marker([51.45651594883573, -0.9772721659515068], {icon: iCon1}).addTo(map).bindPopup("I am a green leaf.thesecond");