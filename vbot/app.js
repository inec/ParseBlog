function isChrome() {
  var isChromium = window.chrome,
    winNav = window.navigator,
    vendorName = winNav.vendor,
    isOpera = winNav.userAgent.indexOf("OPR") > -1,
    isIEedge = winNav.userAgent.indexOf("Edge") > -1,
    isIOSChrome = winNav.userAgent.match("CriOS");

  if(isIOSChrome){
    return true;
  } else if(isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false) {
    return true;
  } else {
    return false;
  }
}

function gotoListeningState() {
  const micListening = document.querySelector(".mic .listening");
  const micReady = document.querySelector(".mic .ready");

  micListening.style.display = "block";
  micReady.style.display = "none";
}

function gotoReadyState() {
  const micListening = document.querySelector(".mic .listening");
  const micReady = document.querySelector(".mic .ready");

  micListening.style.display = "none";
  micReady.style.display = "block";
}

function addBotItem(text) {
  const appContent = document.querySelector(".app-content");
  appContent.innerHTML += '<div class="item-container item-container-bot"><div class="item"><p>' + text + '</p></div></div>';
  appContent.scrollTop = appContent.scrollHeight; // scroll to bottom
}

function addUserItem(text) {
  const appContent = document.querySelector(".app-content");
  appContent.innerHTML += '<div class="item-container item-container-user"><div class="item"><p>' + text + '</p></div></div>';
  appContent.scrollTop = appContent.scrollHeight; // scroll to bottom
}

function displayCurrentTime() {
  const timeContent = document.querySelector(".time-indicator-content");
  const d = new Date();
  const s = d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  timeContent.innerHTML = s;
}

function addError(text) {
  addBotItem(text);
  const footer = document.querySelector(".app-footer");
  footer.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function(event) {

  // test for relevant API-s
  // for (let api of ['speechSynthesis', 'webkitSpeechSynthesis', 'speechRecognition', 'webkitSpeechRecognition']) {
  //   console.log('api ' + api + " and if browser has it: " + (api in window));
  // }

  displayCurrentTime();

  // check for Chrome
  if (!isChrome()) {
    addError("This demo only works in Google Chrome.");
    return;
  }

  if (!('speechSynthesis' in window)) {
    addError("Your browser doesn’t support speech synthesis. This demo won’t work.");
    return;
  }

  if (!('webkitSpeechRecognition' in window)) {
    addError("Your browser cannot record voice. This demo won’t work.");
    return;
  }

  // Now we’ve established that the browser is Chrome with proper speech API-s.

  // api.ai client
  const apiClient = new ApiAi.ApiAiClient({accessToken: 'ce460bbe19e24028ac331611ad365cfd'});

  // Initial feedback message.
  addBotItem("Hi! I’m Happy Saving bot. Tap the microphone and start talking to me.");

  var recognition = new webkitSpeechRecognition();
  var recognizedText = null;
  recognition.continuous = false;
  recognition.onstart = function() {
    console.log("L-88");
    recognizedText = null;
  };
  recognition.onresult = function(ev) {
    console.log("L-99"+ev);
    recognizedText = ev["results"][0][0]["transcript"];
     console.log("L-100"+recognizedText);
    addUserItem(recognizedText);
 
    ga('send', 'event', 'Message', 'add', 'user');

    let promise = apiClient.textRequest(recognizedText);

    promise
        .then(handleResponse)
        .catch(handleError);

        

    function handleResponse(serverResponse) {

      // Set a timer just in case. so if there was an error speaking or whatever, there will at least be a prompt to continue
      var timer = window.setTimeout(function() { startListening(); }, 5000);

      const speech = serverResponse["result"]["fulfillment"]["speech"];
      var msg = new SpeechSynthesisUtterance(speech);
      msg.voice = window.speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Google UK English Female'; })[0];
//console.log("L-127"+ msg.voice); 

      addBotItem(speech);
      ga('send', 'event', 'Message', 'add', 'bot');
      msg.addEventListener("end", function(ev) {
        window.clearTimeout(timer);
        startListening();
      });
      msg.addEventListener("error", function(ev) {
        window.clearTimeout(timer);
        startListening();
      });

//msg.name == "Google UK English Female".voice = voices.filter(function(voice) { return voice.name == 'Microsoft Zira Desktop - English (United States)'; })[0];


window.speechSynthesis.speak(msg);
    }
    function handleError(serverError) {
      console.log("Error from api.ai server: ", serverError);
    }
  };

  function startText(rText) {
    console.log("L-14799");
    recognizedText = rText;// ev["results"][0][0]["transcript"];
     console.log("L-100"+recognizedText);
    addUserItem(recognizedText);
 
    //ga('send', 'event', 'Message', 'add', 'user');

    let promise = apiClient.textRequest(recognizedText);

    promise
        .then(handleResponse)
        .catch(handleError);

        

    function handleResponse(serverResponse) {

      // Set a timer just in case. so if there was an error speaking or whatever, there will at least be a prompt to continue
     // var timer = window.setTimeout(function() { startListening(); }, 5000);

      const speech = serverResponse["result"]["fulfillment"]["speech"];
      //var speech="I'm a boy";
      var msg = new SpeechSynthesisUtterance(speech);
      msg.voice = window.speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Google UK English Female'; })[0];
//console.log("L-171"+ msg.voice); 

      addBotItem(speech);



//msg.name == "Google UK English Female".voice = voices.filter(function(voice) { return voice.name == 'Microsoft Zira Desktop - English (United States)'; })[0];


window.speechSynthesis.speak(msg);
    }
    function handleError(serverError) {
      console.log("Error from api.ai server: ", serverError);
    }
  }; //end of startText()

  recognition.onerror = function(ev) {
    console.log("Speech recognition error", ev);
  };
  recognition.onend = function() {
    gotoReadyState();
  };

  function startListening() {
    gotoListeningState();
    recognition.start();
  }

  const startButton = document.querySelector("#start");

  startButton.addEventListener("click", function(ev) {
    ga('send', 'event', 'Button', 'click');
    startListening();
    ev.preventDefault();
  });

  const textButton = document.querySelector("#btnEnter");
  textButton.addEventListener("click", function(eev) {
   // ga('send', 'event', 'Button', 'click');
   var qtext=document.querySelector("#texta")
    console.log("L-164", qtext.value);
    startText(qtext.value);
    qtext.value="";
    //
    //apiClient.textRequest("hello");
    eev.preventDefault();
  });
  // Esc key handler - cancel listening if pressed
  // http://stackoverflow.com/questions/3369593/how-to-detect-escape-key-press-with-javascript-or-jquery
  document.addEventListener("keydown", function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
      if (evt.key === 'Enter'){

        var qtext=document.querySelector("#texta")
        console.log("L-225 Enter ", qtext.value);
        startText(qtext.value);
        qtext.value="";

      }
        isEscape = (evt.key == "Escape" || evt.key == "Esc");
     
    }else {
        isEscape = (evt.keyCode == 27);
    }

    if (isEscape) {
        recognition.abort();
    }
  });


});
