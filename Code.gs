var token = ''; //Enter Your Telegram Token Here
var gWelcomeMessage = 'Welcome to the CovidSL Bot' + '\n' +
        '\n' +
        '𝗪𝗵𝗮𝘁 𝘄𝗼𝘂𝗹𝗱 𝘆𝗼𝘂 𝗹𝗶𝗸𝗲 𝘁𝗼 𝗸𝗻𝗼𝘄 𝗮𝗯𝗼𝘂𝘁 𝗰𝗼𝗿𝗼𝗻𝗮𝘃𝗶𝗿𝘂𝘀?'  + '\n' +
        '\n' +
        'Reply with a number at any time to get the latest information on the topic:' + '\n' +
        '\n' +
        '1. Latest Stats 🔢'  + '\n' +
        '2. Protect Yourself 🛡'  + '\n' +
        '3. Mythbusters 🛑'  + '\n' +
        '4. News & Info 📰'  + '\n' +
        '5. Share 📣';

function doGet(e){return ContentService.createTextOutput("User says")}

function doPost(e) {
  // Make sure to only reply to json requests
  if(e.postData.type == "application/json") {
    
    // Parse the update sent from Telegram
    var update = JSON.parse(e.postData.contents);

    // Instantiate our bot passing the update 
    var bot = new Bot(token, update);
    
    // Building commands
    var bus = new CommandBus();
    bus.on(/\/start/, function () {
      this.replyToSender(gWelcomeMessage);
    });
    
    bus.on(/^1$/, checkStats);
    
    bus.on(/^2$/, protectYourself);
    
    bus.on(/^3$/, mythBusters);
    
    bus.on(/^4$/, newsInfo);
    
    bus.on(/^5$/, share);
    
    bus.on(/^0$/, sendMenu);
    
    // Register the command bus
    bot.register(bus);
    
    // If the update is valid, process it
    if (update) {
      bot.process();
    }   
  }      
}


function setWebhook() {
  var bot = new Bot(token, {});
  var result = bot.request('setWebhook', {
    url: "" //Webhook URL here
  });
  
  Logger.log(result);
}

function checkStats(){

var latestStatsJSON = UrlFetchApp.fetch("https://hpb.health.gov.lk/api/get-current-statistical");
var data = JSON.parse(latestStatsJSON);
var message = '𝗟𝗮𝘁𝗲𝘀𝘁 𝗦𝘁𝗮𝘁𝘀 🔢' + '\n\n' +
                'Sri Lanka' + '\n' +
                '🇱🇰⚫️ Total Cases : ' + data.data.local_total_cases + '\n' +
                '🇱🇰⚪️ New Cases   : ' + data.data.local_new_cases + '\n' +
                '🇱🇰🔵 Recovered   : ' + data.data.local_recovered + '\n' +
                '🇱🇰🔴 Deaths      : ' + data.data.local_deaths + '\n\n' +
                'Global' + '\n' +
                '🗺️⚫ Total Cases:  ' + data.data.global_total_cases +  '\n' +
                '🗺️⚪️ New Cases  : ' + data.data.global_new_cases +  '\n' +
                '🗺️🔵 Recovered  : ' + data.data.global_recovered +  '\n' +
                '🗺️🔴 Deaths     : ' + data.data.global_deaths +  '\n\n' +
                '📌 Reply 0 for Menu \n\n ᴰᵃᵗᵃ ˢᵒᵘʳᶜᵉ ⁻ ᴴᵉᵃˡᵗʰ ᴾʳᵒᵐᵒᵗᶦᵒⁿ ᴮᵘʳᵉᵃᵘ';

this.replyToSender(message);

}

function protectYourself(){
  var message = '𝗣𝗿𝗼𝘁𝗲𝗰𝘁 𝗬𝗼𝘂𝗿𝘀𝗲𝗹𝗳 🛡' + '\n\n' + '🧼 Wash your hands frequently\n' +
                    '\n' +
                    '👄 Avoid touching your eyes, mouth and nose\n' +
                    '\n' +
                    '💪 Cover your mouth and nose with your bent elbow or tissue when you cough or sneeze\n' +
                    '\n' +
                    '🚷 Avoid crowded places\n' +
                    '\n' +
                    '🏠Stay at home if you feel unwell - even with a slight fever and cough\n' +
                    '\n' +
                    '🤒 If you have a fever, cough and difficulty breathing, seek medical care early - but call by phone first\n' +
                    '\n' +
                    'ℹ Stay aware of the latest information from Government & WHO \n' +
                    '\n' +
                    '⏩ Share this service with this link: https://j.mp/covidsl-tg-share \n' +
                    '\n' +
                    '📌 Reply 0 for Menu';
  this.replyToSender(message);
}

function mythBusters(){
                var message = '𝗠𝘆𝘁𝗵𝗯𝘂𝘀𝘁𝗲𝗿𝘀 🛑' + '\n\n' + 'There is a lot of false information around. These are the facts.\n' +
                    '\n' +
                    '🔢 People of all ages CAN be infected by the coronavirus. Older people, and people with pre-existing medical conditions (such as asthma, diabetes, heart disease) appear to be more vulnerable to becoming severely ill with the virus. \n' +
                    '\n' +
                    '☀ The coronavirus CAN be transmitted in areas with hot and humid climates\n' +
                    '\n' +
                    '🦟 The coronavirus CANNOT be transmitted through mosquito bites.\n' +
                    '\n' +
                    '🐶 There is NO evidence that companion animals/pets such as dogs or cats can transmit the coronavirus.\n' +
                    '\n' +
                    '🛀 Taking a hot bath DOES NOT prevent the coronavirus\n' +
                    '\n' +
                    '💨 Hand dryers are NOT effective in killing the coronavirus\n' +
                    '\n' +
                    '🟣 Ultraviolet light SHOULD NOT be used for sterilization and can cause skin irritation\n' +
                    '\n' +
                    '🌡 Thermal scanners CAN detect if people have a fever but CANNOT detect whether or not someone has the coronavirus\n' +
                    '\n' +
                    '💦 Spraying alcohol or chlorine all over your body WILL NOT kill viruses that have already entered your body\n' +
                    '\n' +
                    '💉 Vaccines against pneumonia, such as pneumococcal vaccine and Haemophilus influenzae type b (Hib) vaccine, DO NOT provide protection against the coronavirus.\n' +
                    '\n' +
                    '👃 There is NO evidence that regularly rinsing the nose with saline has protected people from infection with the coronavirus. \n' +
                    '\n' +
                    '🧄 Garlic is healthy but there is NO evidence from the current outbreak that eating garlic has protected people from the coronavirus.\n' +
                    '\n' +
                    '💊 Antibiotics DO NOT work against viruses, antibiotics only work against bacteria.\n' +
                    '\n' +
                    '🧪 To date, there is NO specific medicine recommended to prevent or treat the coronavirus.\n' +
                    '\n' +
                    'Check the facts on the WHO website: https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters \n' +
                    '\n' +
                    '📌 Reply 0 for Menu';
  this.replyToSender(message);
}
    
function newsInfo(){
                  var message = '𝗡𝗲𝘄𝘀 & 𝗜𝗻𝗳𝗼 📰' +'\n\n' + '🔗 Health Promotion Bureau - http://hpb.health.gov.lk/covid-19' +'\n\n'+
                  '🔗 Epidemiology Unit - http://www.epid.gov.lk/web/' + '\n\n' +
                  '🔗 WHO Sri Lanka - https://www.who.int/srilanka/covid-19' +'\n\n'+
                  '🔗 Quarantine Unit - http://www.quarantine.health.gov.lk/index.php?lang=en' +'\n\n'+
                  '🔗 Department Of Government Information - https://www.dgi.gov.lk/' +'\n\n'+
                  '🔗 WHO information about the virus - https://www.who.int/emergencies/diseases/novel-coronavirus-2019' +'\n\n'+
                  '🔗 WHO South East Asia - https://www.who.int/southeastasia' +
                  '\n\n' +
                  '📌 Reply 0 for Menu';
this.replyToSender(message);
}
    
function share(){                 var message = '𝗣𝗿𝗼𝘁𝗲𝗰𝘁 𝘆𝗼𝘂𝗿𝘀𝗲𝗹𝗳, 𝘆𝗼𝘂𝗿 𝗳𝗮𝗺𝗶𝗹𝘆, 𝗳𝗿𝗶𝗲𝗻𝗱𝘀 𝗮𝗻𝗱 𝗰𝗼𝗺𝗺𝘂𝗻𝗶𝘁𝘆 🙏' + '\n\n' +
                  'Share this service with your loved ones and help them to protect themselves 👉 https://j.mp/covidsl-tg-share'+ '\n\n' +
                  '📌 Reply 0 for Menu';

this.replyToSender(message);
}
    
function sendMenu(){
                var message = '𝗪𝗵𝗮𝘁 𝘄𝗼𝘂𝗹𝗱 𝘆𝗼𝘂 𝗹𝗶𝗸𝗲 𝘁𝗼 𝗸𝗻𝗼𝘄 𝗮𝗯𝗼𝘂𝘁 𝗰𝗼𝗿𝗼𝗻𝗮𝘃𝗶𝗿𝘂𝘀?'  + '\n' +
        '\n' +
        'Reply with a number at any time to get the latest information on the topic:' + '\n' +
        '\n' +
        '1. Latest Stats 🔢'  + '\n' +
        '2. Protect Yourself 🛡'  + '\n' +
        '3. Mythbusters 🛑'  + '\n' +
        '4. News & Info 📰'  + '\n' +
        '5. Share 📣';
this.replyToSender(message);
}

function Bot (token, update) {
  this.token = token;
  this.update = update;
  this.handlers = [];
}

Bot.prototype.register = function ( handler) {
  this.handlers.push(handler);
}

Bot.prototype.process = function () {  
  for (var i in this.handlers) {
    var event = this.handlers[i];
    var result = event.condition(this);
    if (result) {
      return event.handle(this);
    }
  }
}

Bot.prototype.request = function (method, data) {
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify(data)
  };
  
  var response = UrlFetchApp.fetch('https://api.telegram.org/bot' + this.token + '/' + method, options);
    
  if (response.getResponseCode() == 200) {
    return JSON.parse(response.getContentText());
  }
  
  return false;
}

Bot.prototype.replyToSender = function (text) {
  return this.request('sendMessage', {
    'chat_id': this.update.message.from.id,
    'text': text
  });
}

function CommandBus() {
  this.commands = [];
}

CommandBus.prototype.on = function (regexp, callback) {
  this.commands.push({'regexp': regexp, 'callback': callback});
}

CommandBus.prototype.condition = function (bot) {
  return true;
}

CommandBus.prototype.handle = function (bot) {  
  for (var i in this.commands) {
    var cmd = this.commands[i];
    var tokens = cmd.regexp.exec(bot.update.message.text);
    if (tokens != null) {
      return cmd.callback.apply(bot, tokens.splice(1));
    }
  }
  return bot.replyToSender('I am Sorry, I did not understand it 😔 , Please can you enter a numbers between 0-5 😊' + '\n\n' +
                  '📌 Reply 0 for Menu');
}
