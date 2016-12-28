document.addEventListener('DOMContentLoaded', function(e) {
  var map = L.map('bigmap', { zoomControl: false });
  var basemapURL = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
  var USABounds = [
    [49.3, -67.0], //Northeast
    [24.7, -124.8], //Southwest
  ];

  L.tileLayer(basemapURL, {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
  }).addTo(map);

  // Set the map view, and fit it to the bounds
  map.setView([0, 0], 18);
  map.fitBounds(USABounds);

  // Disable map interaction
  map.dragging.disable();
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();

  // The list of locations, based on Lat / Lng
  var locations = {
    lutsen: [47.636553, -90.708654]
  }

  var urls = {
    lutsen: 'https://www.lutsenresort.com/'
  }

  var dates = [
    { m: 'June', d: 16 },
    { m: 'June', d: 30 },
    { m: 'July', d: 14 },
    { m: 'July', d: 28 },
  ]

  // Set up the Adventure button
  var calendarContainer = document.getElementById('calendar-container');
  var buttonContainer = document.getElementById('btn-container');
  var button = document.getElementById('go-button');

  button.addEventListener('click', function(e) {
    // Set these for the location to go to and a website to show
    var location = locations.lutsen;
    var url = urls.lutsen;
    var text = 'Lutsen Resort';

    // Setup the marker
    var marker = L.marker(location);
    map.flyTo(location, 14, { duration: 15 });
    var popup = '<a target="_blank" href="' + url + '">' + text + '</a>';
    marker.bindPopup(popup);

    // Animate the buttons
    setTimeout( function() {
      marker.addTo(map).openPopup();
      buttonContainer.style.display = 'none';
      calendarContainer.style.display = 'block';
    }, 15000);
  });

  // Set up the Dates
  var dateContainer = document.getElementById('date-container');
  function createDate(date) {
    // date is an object with m, the month, and d, the day
    var dateobj = document.createElement('div');
    dateobj.classList.add('date-item');

    var monthchild = document.createElement('p');
    monthchild.textContent = date.m;
    monthchild.classList.add('date-month');
    dateobj.appendChild(monthchild);

    var daychild = document.createElement('p');
    daychild.textContent = date.d;
    daychild.classList.add('date-day');
    dateobj.appendChild(daychild);

    dateContainer.appendChild(dateobj);
  }
  dates.forEach(function(d) {
    createDate(d);
  })
});
