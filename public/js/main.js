function initMap() {

  const ironhackMAD = {
    lat: 40.39279917456607,
    lng: -3.698590505452073
  };


  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: ironhackMAD,
  });
  
  function getPlaces(map) {
  axios
    .get('/api/places')
    .then((response) => printPlaces(response.data, map))
    .catch((err) => console.log(err))
}

function printPlaces(places, map) {
  places.forEach((elm) => {
    let position = {
      lat: elm.location.coordinates[0],
      lng: elm.location.coordinates[1],
    }

    new google.maps.Marker({ map, position, title: elm.name })
  })
}
}