mapboxgl.accessToken = 'pk.eyJ1Ijoic3k0MjMyIiwiYSI6ImNtOTdsZWVsNzA2azkya29mYmx3bmxuZ3AifQ.IQl49ozKfheJnY-xUTRZKQ';

const letterDescriptions = {
    'A': 'One & Two Family Buildings',
    'B': 'Two Family Buildings',
    'C': 'Walk-Up Apartments',
    'D': 'Elevator Apartments',
    'E': 'Warehouses',
    'F': 'Factories & Industrial',
    'G': 'Garages',
    'H': 'Hotels',
    'I': 'Institutions',
    'J': 'Theaters & Concert Halls',
    'K': 'Retail',
    'L': 'Loft Buildings',
    'M': 'Religious Facilities',
    'N': 'Asylums',
    'O': 'Offices',
    'P': 'Cultural Facilities',
    'Q': 'Parks & Recreation',
    'R': 'Condominiums',
    'S': 'Mixed Residential with Stores',
    'T': 'Transportation',
    'U': 'Infrastructure',
    'V': 'Vacant or Misc Zoning',
    'W': 'Schools',
    'Y': 'Public Services',
    'Z': 'Government Buildings'
};

const colorPalette = [
    '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4',
    '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff',
    '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1',
    '#000075', '#808080', '#ffffff', '#000000', '#a9a9a9', '#98fb98',
    '#dda0dd', '#f0e68c'
];

const letterColors = {};
const letters = Object.keys(letterDescriptions);
letters.forEach((letter, i) => {
    letterColors[letter] = colorPalette[i % colorPalette.length];
});

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-73.9712, 40.7831], // Manhattan
    zoom: 12
});

map.on('load', () => {
    map.addSource('buildings', {
        type: 'geojson',
        data: 'buildings.geojson'
    });

    map.addLayer({
        id: 'buildings-layer',
        type: 'fill',
        source: 'buildings',
        paint: {
            'fill-color': [
                'match',
                ['slice', ['get', 'BldgClass'], 0, 1],
                ...letters.flatMap(l => [l, letterColors[l]]),
                '#cccccc'
            ],
            'fill-opacity': 0.5
        }
    });

    map.on('click', 'buildings-layer', (e) => {
        const props = e.features[0].properties;
        const code = props.BldgClass || 'Unknown';
        const letter = code.charAt(0);
        const group = letterDescriptions[letter] || 'Unknown Group';
        const units = props.UnitsRes || 'N/A';
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<strong>${code}</strong><br/>${group}<br/>Residential Units: ${units}`)
            .addTo(map);
    });

    map.on('mouseenter', 'buildings-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'buildings-layer', () => {
        map.getCanvas().style.cursor = '';
    });

    // Add legend
    const legend = document.getElementById('legend');
    letters.forEach(letter => {
        const color = letterColors[letter];
        const desc = `${letter}: ${letterDescriptions[letter]}`;
        const div = document.createElement('div');
        div.innerHTML = `<span class="color-box" style="background:${color}"></span>${desc}`;
        legend.appendChild(div);
    });
});