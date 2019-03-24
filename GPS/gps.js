/* jslint browser:true */

var id = null;
var firstTime = -1;

var loc1 = {lat: 43.774361, lon: -79.5058407, u: 515, v: 185, desc:"STADIUM"};
var loc2 = {lat: 43.7739999, lon: -79.5072669, u: 390, v: 195, desc:"TELESCOPE"};
var loc3 = {lat: 43.7740456, lon: -79.5038193, u: 355, v: 300,desc:"MYSTERY"};
var caches = [loc1, loc2, loc3];
var currentCache = -1;

u_1 = 640;
v_1 = 315;
gps_1 = 43.7737253;
gps_01 = -79.5047206;

u_2 = 395;
v_2 = 425;
gps_2 = 43.7726854;
gps_02 = -79.5065017;

function togglegps() {
    var button = document.getElementById("togglegps");
    if (navigator.geolocation) {
        if (id === null) {
            id = navigator.geolocation.watchPosition(showPosition, handleError, {enableHighAccuracy : true, timeout: 1000});
            button.innerHTML = "STOP GPS";
            firstTime = -1;
        } else {
            navigator.geolocation.clearWatch(id);
            id = null;
            button.innerHTML = "START GPS";
        }
    } else {
        alert("NO GPS AVAILABLE");
    }
}

function interpolate(gps1, gps2, u1, u2, gps) {
  var u_1 = 640;
  var v_1 = 315;
  var gps_1 = 43.7737253;
  var gps_01 = -79.5047206;

  var u_2 = 395;
  var v_2 = 425;
  var gps_2 = 43.7726854;
  var gps_02 = -79.5065017;
  var u = u_1 + (u_2 - u_1) * (latitude.innerHTML - gps_1)/(gps_2 - gps_1);
  var v = v_1 + (v_2 - v_1) * (longitude.innerHTML - gps_01)/(gps_02 - gps_01);
  document.getElementById('debug').innerHTML =  u + "," + v;
  var me_moving = document.getElementById('me');

  me_moving.style.top = v +"px";
  me_moving.style.left = u +"px";
  // console.log(u.value);

}

function handleError(error) {
    var errorstr = "Really unknown error";
    switch (error.code) {
    case error.PERMISSION_DENIED:
        errorstr = "Permission deined";
        break;
    case error.POSITION_UNAVAILABLE:
        errorstr = "Permission unavailable";
        break;
    case error.TIMEOUT:
        errorstr = "Timeout";
        break;
    case error.UNKNOWN_ERROR:
        error = "Unknown error";
        break;
    }
    alert("GPS error " + error);
}


function showPosition(position) {

    var latitude = document.getElementById("latitude");
    var longitude = document.getElementById("longitude");
    var now = document.getElementById("now");

    latitude.innerHTML = position.coords.latitude;
    longitude.innerHTML = position.coords.longitude;
    if (firstTime < 0) {
      firstTime = position.timestamp;
    }
    interpolate();
    now.innerHTML = position.timestamp - firstTime;

}

function updateCache() {
  if (currentCache == caches.length)
  {
    currentCache = -1;
  }
  currentCache++;
  showCache(caches[currentCache]);
}

function showCache(targetcache) {
  var target_moving = document.getElementById("target");
  if (currentCache == 0){
    document.getElementById("updateTarget").innerHTML = "By Court";
      target_moving.style.top = "185px";
      target_moving.style.left = "515px";
  }
  else if (currentCache == 1){
    document.getElementById("updateTarget").innerHTML = "By Telescope";
      target_moving.style.top = "195px";
      target_moving.style.left = "390px";
  }
  else if (currentCache == 2){
      document.getElementById("updateTarget").innterHTML = "By Stairs";
        target_moving.style.top = "300px";
        target_moving.style.left = "355px";
        currentCache = currentCache - 3;
  }
}
