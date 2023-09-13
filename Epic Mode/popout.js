
document.querySelector('button.play').addEventListener('click', function(){
  var SelTrack = document.querySelector('select').value;
  console.log("I am here, select me please", SelTrack)
  chrome.runtime.sendMessage({name: "playTrack", track: SelTrack});

});


document.querySelector('button.pause').addEventListener('click', function(){

  chrome.runtime.sendMessage({name: "pauseTrack"});

});
