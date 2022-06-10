var input = document.querySelector(".input_text");
var main = document.querySelector("#name");
var temp = document.querySelector(".temp");
var main = document.querySelector(".main");
var button = document.querySelector(".submit");

button.addEventListener("click", function (name) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      input.value +
      "&appid=50a7aa80fa492fa92e874d23ad061374&units=metric"
  )
    .then((response) => response.json())
    .then((data) => {
      var tempValue = data["main"]["temp"];
      var mainValue = data["weather"][0]["main"];
      console.log(data);
      //window.location.href = "weather.html";
    })

    .catch((err) => alert("Wrong city name!"));
});
