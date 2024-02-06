prediction1 = "";
prediction2 = "";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
  Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
  });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/JhChngIlm/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data1 = "The First Prediction Is "+ prediction1;
    speak_data2 = "And The Second Prediction Is "+ prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis)
}

function check() {
  img = document.getElementById("captured_image");
  classifier.classify(img, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  else{
      console.log(results);
      document.getElementById("result_gesture_name").innerHTML = results[0].label;
      document.getElementById("result_gesture_name2").innerHTML = results[1].label;

      prediction1 = results[0].label;
      prediction2 = results[1].label;

      speak();
      if (results[0].label == "Hi") {
        document.getElementById("update_gesture").innerHTML = "&#128075;";
      }

      if (results[0].label == "Thank you") {
        document.getElementById("update_gesture").innerHTML = "&#128077;";
      }

      if (results[0].label == "Water") {
        document.getElementById("update_gesture").innerHTML = "&#9996;";
      }

      if (results[1].label == "Hi") {
        document.getElementById("update_gesture2").innerHTML = "&#128075;";
      }

      if (results[1].label == "Thank you") {
        document.getElementById("update_gesture2").innerHTML = "&#128077;";
      }

      if (results[1].label == "Water") {
        document.getElementById("update_gesture2").innerHTML = "&#9996;";
      }
  }
}
