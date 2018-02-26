'use strict';

document.querySelector('.map').classList.remove('.map--faded');

var getRandom = function (max, min) {
  if (typeof min === 'undefined') {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var similarOffer = [];
var OFFER_TITLE = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
  var OFFER_TYPE = ['flat', 'house', 'bungalo'];
  var OFFER_FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
  var OFFER_PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
  var offerFeatures = [];

var generateData = function () {
  var ARRAY_LENGTH = 8;

  var generateOfferFeatures = function (){
    var offerFeaturesNum = getRandom(OFFER_FEATURES.length - 1);
    var j = 0;
    while (offerFeatures.length < offerFeaturesNum) {
      var offerFeaturesItem = getRandom(OFFER_FEATURES.length - 1);
      offerFeatures.push(OFFER_FEATURES[offerFeaturesItem]);
      OFFER_FEATURES.splice(offerFeaturesItem, 1);
      j++;
    }
    return offerFeatures;
  };

  for (var i = 0; i < ARRAY_LENGTH; i++) {
    generateOfferFeatures();
    similarOffer.push({
      author: 'img/avatars/user{{xx}}.png',
      offer: {
        // title: ,
        // address: ,
        // price: ,
        // type: ,
        // rooms: ,
        // guests: ,
        // checkin: ,
        // checkout: ,
        features: offerFeatures,
        // description: ,
        // photos:
      },
      location: {
        x: getRandom(900, 300),
        y: getRandom(500, 150)
      }
    });
  }

};

generateData();

console.log(similarOffer);
