const audioEle = document.querySelector('.audio-element');

chrome.runtime.onMessage.addListener((msg) => {
    if (!msg.offscreen) {
      return;
    }
    switch (msg.name) {
      case "playTrack":
        audioEle.src = 'track-'+msg.track+'.mp3';
        audioEle.play();
        break;
      case "pauseTrack":
        audioEle.pause();
        break;
    }
  });
  
