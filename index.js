mapboxgl.accessToken = 'pk.eyJ1IjoibWFha2EiLCJhIjoiY2lzZnp4eWhvMDAzejJwbnExNmY5ODdsMCJ9.EeEx5fDH-zH3pdvuHMuncg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/maaka/ckpyfv95h0lo117pfglrascsk',
    center: [5.922896, 51.975716],
    antialias: true,
    zoom: 8
});

map.addControl( // Add the Mapbox geocoder (search for place) control to the map.
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        placeholder: 'Probeer: Deventer',
        mapboxgl: mapboxgl
    })
);

// Select menu item by Querystring
// var toggle = window.location.search.substring(1);
// console.log(urlData);

var urlData = searchToObject();
if (urlData.menuItem == '1') {
    menuSelect(1)
} else {
    menuSelect(2)
};

var params = new URLSearchParams(window.location.search)
console.log(params);
for (let p of params) {
    console.log(p);
}


console.log(location.search
    .slice(1)
    .split('&')
    .map(p => p.split('='))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {}))


function searchToObjectOLD() {
    var pairs = window.location.search.substring(1).split("&"),
        obj = {},
        pair,
        i;

    for (i in pairs) {
        if (pairs[i] === "") continue;

        pair = pairs[i].split("=");
        obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }

    return obj;
}


function menuSelect(menuItem) {
    $(".menuItem").removeClass("active"); // make sure non menu item is slected
    $("#map").addClass("blured-map");
    $(".content-pannel").addClass("hidden-content-pannel");
    switch (menuItem) { // execute 
        case 1:
            $("#menu-1").addClass("active");
            $(".content-pannel").removeClass("hidden-content-pannel");
            break;

        case 2:
            $("#menu-2").addClass("active");
            $("#map").removeClass("blured-map");
            break;

        default:
    };
};

function searchToObject() {
    var urlDataString = decodeURIComponent(window.location.search);

    urlDataString = "{\"" +
        urlDataString
            .replace(/\?/gi, "")
            .replace(/\&/gi, "\",\"")
            .replace(/\=/gi, "\":\"") +
        "\"}";

    urlObj = JSON.parse(urlDataString);
    console.log(urlObj)
    return urlObj;
}