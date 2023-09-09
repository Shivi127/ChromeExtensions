
chrome.runtime.onMessage.addListener((msg, sender, response) => {

  if (msg.name == "fetchWords") {
    const apiKey = '1zduqv4rmucsebdqy8xjj8g8varmt9al91m3pqrwtrs7wemp2';
    const dateStr = new Date().toISOString().slice(0, 10);
    const apiCall = 'https://api.wordnik.com/v4/words.json/wordOfTheDay?date=' + dateStr + '&api_key=' + apiKey;

    fetch(apiCall)
      .then(function (res) {
        if (res.status !== 200) {
          response({ word: "ERROR", desc: "There is a problem in the response" });
          return;
        }
        res.json()
          .then(function (data) {
              response({ word: data.word, desc: data.note });
            });
          }).catch(function (err) {
        response({ word: "ERROR", desc: "There is a problem looking up the API" });
      });
    }
    // Return true to indicate that you will send the response asynchronously
    return true;
});
