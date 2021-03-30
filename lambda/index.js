
const Alexa = require('ask-sdk-core');
const SKILL_NAME = 'home menu';
const GET_ITEM_MESSAGE = "Here's your item: ";
const HELP_MESSAGE = 'You can say what is on the menu, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Enjoy the day...Goodbye!';
const MORE_MESSAGE = ' Would you like something else?'
const PAUSE = '<break time="0.3s" />'
const WHISPER = '<amazon:effect name="whispered"/>'


const data = [
        'Chana white.',
        'chana black',
        'dal makhni',
        'mung dal',
        'rajmaa',
        'roangi',
        'spinach paneer',
        'paneer korma',
        'chilli paneer',
        'dal rice chatny',
        'rice plow',
        'chana dal',
        'masoor dal',
        'green peas and paneer',
        'Gobi manchurian',
        'pasta',
        'veggie noodles',
        'aloo gobi',
        'turnip',
        'saag',
        'Ma chole dal',
        'taco tuesday, please make sure we have sour cream and corn',
        'pizza',
        'Mac and cheese, although that is quite unhealthy',
        'egg bhurji',
        'paneer bhurji',
        'aloo bagan',
        'pani puri',
        'chicken biryani',
        'idli sambar',
        'pow bhaji'
];

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechObj = getAItem();
        return handlerInput.responseBuilder
            .speak(speechObj.speach)
            .reprompt(speechObj.reprompt)
            .getResponse();
    }
};
const GetItemHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'home_menu';
    },
    handle(handlerInput) {
      const speechObj = getAItem();
      return handlerInput.responseBuilder
          .speak(speechObj.speach)
          .reprompt(speechObj.reprompt)
          .getResponse();
    }
};

const YesIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent';
    },
    handle(handlerInput) {
      const speechObj = getAItem();
      return handlerInput.responseBuilder
          .speak(speechObj.speach)
          .reprompt(speechObj.reprompt)
          .getResponse();
    }
};

const NoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent';
    },
    handle(handlerInput) {
      const speechText = STOP_MESSAGE;
      return handlerInput.responseBuilder
          .speak(speechText)
          .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = STOP_MESSAGE;
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

function getAItem() {

  const itemArr = data;
  const itemIndex = Math.floor(Math.random() * itemArr.length);
  const randomItem = itemArr[itemIndex];
  const tempOutput = WHISPER + GET_ITEM_MESSAGE + randomItem + PAUSE;
  const speechOutput = tempOutput + MORE_MESSAGE
  const more = MORE_MESSAGE
  return {speach: speechOutput, reprompt:more };
}

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GetItemHandler,
        YesIntentHandler,
        NoIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) 
    .addErrorHandlers(
        ErrorHandler)
    .lambda();