function initMap() {

  const ironhackMAD = {
    lat: 40.39279917456607,
    lng: -3.698590505452073
  };


  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: ironhackMAD,
  });

}