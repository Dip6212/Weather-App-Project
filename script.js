let primaryTab = document.querySelector(".local_tab");
let secondaryTab = document.querySelector(".city_tab");
let grantLocationTab = document.querySelector(".grant_location_tab");
let searchSec = document.querySelector(".search_container");
let loadingSection = document.querySelector(".loading_section");
let userInfo = document.querySelector(".weather_data");



const key = "c0fbb6c21d2ccca7840201d67d6cb518";

let currentTab = primaryTab;
currentTab.classList.add("current_tab");
getfromSessionStorage();

function switchTab(clickedTab) {

  if (clickedTab != currentTab) {
    currentTab.classList.remove("current_tab");
    currentTab = clickedTab;
    currentTab.classList.add("current_tab");
  }

  if (!searchSec.classList.contains("active")) {

    grantLocationTab.classList.remove("active");
    userInfo.classList.remove("active");
    searchSec.classList.add("active");
  }
  else {
    searchSec.classList.remove("active");
    userInfo.classList.remove("active");
    getfromSessionStorage();
  }


}

primaryTab.addEventListener('click', () => {
  switchTab(primaryTab);
})

secondaryTab.addEventListener('click', () => {
  switchTab(secondaryTab);
})


function getfromSessionStorage() {

  const localCoordinates = sessionStorage.getItem("user-coordinates");
  if (!localCoordinates) {

    grantLocationTab.classList.add("active");
  }
  else {
    const coordinates = JSON.parse(localCoordinates);
    fetchUserWeatherInfo(coordinates);
  }

}


function renderWeatherInfo(weather_info){

  let cityName=document.querySelector(".name");
  let countryIcon=document.querySelector(".flag");
  let desc=document.querySelector(".weather");
  let weatherIcon=document.querySelector(".weather_icon");
  let temp=document.querySelector(".temperature");
  let windspeed=document.querySelector(".windspeed");
  let humidity=document.querySelector(".humidity");
  let clouds=document.querySelector(".clouds");
  

  cityName.innerHTML=weather_info?.name;
  countryIcon.src=`https://flagcdn.com/144x108/${weather_info?.sys?.country.toLowerCase()}.png`;
  desc.innerHTML=weather_info?.weather?.[0]?.description;
  weatherIcon.src=`http://openweathermap.org/img/w/${weather_info?.weather?.[0]?.icon}.png`;
  temp.innerText = `${weather_info?.main?.temp} °C`;
  windspeed.innerText = `${weather_info?.wind?.speed} m/s`;
  humidity.innerText = `${weather_info?.main?.humidity}%`;
  clouds.innerText = `${weather_info?.clouds?.all}%`;

}




async function fetchUserWeatherInfo(coordinates) {

  const {lat,lon} =coordinates;
  grantLocationTab.classList.remove("active");
  loadingSection.classList.add("active");

  try {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);
  const info = await response.json();
    loadingSection.classList.remove("active");
    userInfo.classList.add("active");
  renderWeatherInfo(info);

  } 
  catch (error) {
    loadingSection.classList.remove("active");
    userInfo.innerHTML=error.message;
  }

}

function getLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  else{
    alert("geolocation is not supported");
  }
}

function showPosition(position){
  const userCoordinates={
    lat:position.coords.latitude,
    lon:position.coords.longitude,
  }

  sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
  fetchUserWeatherInfo(userCoordinates);
}

let grantAccessButton=document.querySelector(".grant_access_btn");
grantAccessButton.addEventListener("click",getLocation);

let searchInput=document.querySelector(".search_input");

searchSec.addEventListener('submit',(e)=>{
  e.preventDefault();
  let cityName=searchInput.value;
  if(cityName===""){
    return;
  }
  else{
    fetchSearchWeatherInfo(cityName);
  }
})

async function fetchSearchWeatherInfo(city){

  loadingSection.classList.add("active");
  userInfo.classList.remove("active");
  grantLocationTab.classList.remove("active");

  try {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
      );
      
    const data = await response.json();
    loadingSection.classList.remove("active");
    userInfo.classList.add("active");
    console.log(data);
    renderWeatherInfo(data);
}
catch(err) {
    userInfo.innerHTML=err.message;
}
}


