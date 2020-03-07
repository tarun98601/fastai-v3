var el = x => document.getElementById(x);
var radioButton1;
var radioButton2;

function showPicker() {
  el("file-input").click();
}

function showPicked(input) {
  el("upload-label").innerHTML = input.files[0].name;
  var reader = new FileReader();
  reader.onload = function(e) {
    el("image-picked").src = e.target.result;
    el("image-picked").className = "";
  };
  reader.readAsDataURL(input.files[0]);
}

function analyze() {
  var uploadFiles = el("file-input").files;
  if (uploadFiles.length !== 1) alert("Please select a file to analyze!");

  el("analyze-button").innerHTML = "Analyzing...";
  var xhr = new XMLHttpRequest();
  var loc = window.location;
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
    true);
  xhr.onerror = function() {
    alert(xhr.responseText);
  };
  xhr.onload = function(e) {
    if (this.readyState === 4) {
      var response = JSON.parse(e.target.responseText);
      el("result-label").innerHTML = `Result = ${response["result"]}`;
    }
    el("analyze-button").innerHTML = "Analyze";
  };

  var fileData = new FormData();
  fileData.append("file", uploadFiles[0]);
  fileData.append("model", radioButtonSelected());
  xhr.send(fileData);
}

function Initialize(){
  RenderRadioButtons();
}

function RenderRadioButtons(){
  radioButton1 = el("airplaneOptionButton");
  radioButton2 = el("movieGenreOptionButton");

  radioButton1Text = el("airplaneOptionButtonText");
  radioButton1Text.innerHTML = 'Airplane Classification'

  radioButton2Text = el("movieGenreOptionButtonText");
  radioButton2Text.innerHTML = 'Movie Genre Prediction'
}

function radioButtonSelected(){
  if(radioButton1.checked == true){
    return "airplane"
  }
  else if(radioButton2.checked == true){
    return "movieGenre";
  }
  return "movieGenre"
}

