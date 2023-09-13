async function createOffscreen() {
  if (await chrome.offscreen.hasDocument()) return;
  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: ["AUDIO_PLAYBACK"],
    justification: "testing",
  });
}


chrome.runtime.onMessage.addListener(async (msg) => {
  console.log("I am here, select me please msg", msg)
  switch (msg.name) {
    case "playTrack":
      await createOffscreen();
      await chrome.runtime.sendMessage({
        name: "playTrack",
        track: msg.track,
        offscreen: true,
      });
      break;
    case "pauseTrack":
      await createOffscreen();
      await chrome.runtime.sendMessage({ name: "pauseTrack", offscreen: true });
      break;
  }
});