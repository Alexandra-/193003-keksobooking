'use strict';

document.querySelector('.map').classList.remove('.map--faded');

var similarOffer = [];
var OFFER_TITLES = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
  var OFFER_TYPES = ['flat', 'house', 'bungalo'];
  var OFFER_CHECKIN = ["12:00", "13:00", "14:00"];
  var OFFER_FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
  var OFFER_PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]

  var OFFERS_NUM = 8;

function generateOfferFeatures(){
  var offerFeatures = [];
  var offerFeaturesNum = getRandom(OFFER_FEATURES.length);
  for (var i = offerFeatures.length; offerFeatures.length <= offerFeaturesNum; i++) {
    var offerFeaturesItem = getRandom(OFFER_FEATURES.length);
    offerFeatures.push(OFFER_FEATURES[offerFeaturesItem]);
    OFFER_FEATURES.splice(offerFeaturesItem, 1);
    i++;
  }

  return offerFeatures;
};

console.log(generateOfferFeatures());

function generateArray(num) {
  var arr = [];
  for (var i = 1; i <= num; i++) {
    arr.push(i);
  }
  return arr;
}

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
      var num = Math.floor(Math.random() * (i + 1));
      var d = arr[num];
      arr[num] = arr[i];
      arr[i] = d;
  }
  return arr;
}

function generateData(count){
  var shuffleTitles = shuffle(OFFER_TITLES);
  var authorImages = shuffle(generateArray(8));

  console.log(authorImages);

  for (var i = 0; i < count; i++) {
    var offerFeatures = generateOfferFeatures();
    console.log(offerFeatures);
    var offerPrice = getRandom(1000000, 1000);
    var offerType = OFFER_TYPES[getRandom(OFFER_TYPES.length)];
    var offerRooms = getRandom(6, 1);
    var offerGuests = getRandom(offerRooms + 1, 1);
    var offerCheckin = OFFER_CHECKIN[getRandom(OFFER_CHECKIN.length)];
    var offerCheckout = OFFER_CHECKIN[getRandom(OFFER_CHECKIN.length)];
    var offerPhotos = shuffle(OFFER_PHOTOS);
    var locationX = getRandom(901, 300);
    var locationY = getRandom(501, 150);


    similarOffer.push({
      author: 'img/avatars/user' + authorImages[i] + '.png',
      offer: {
        title: shuffleTitles[i],
        address: locationX + ', ' + locationY,
        price: offerPrice,
        type: offerType,
        rooms: offerRooms,
        guests: offerGuests,
        checkin: offerCheckin,
        checkout: offerCheckout,
        features: offerFeatures,
        description: '',
        photos: offerPhotos
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }

}

function getRandom (max, min) {
  if (typeof min === 'undefined') {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min) + min);
};

generateData(OFFERS_NUM);

console.log(similarOffer);

var mapPin = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var PIN_IMAGE_WIDTH = 40;
var PIN_IMAGE_HEIGHT = 40;

function createPin () {
  for (var i = 0; i < similarOffer.length; i++) {
    var pin = document.createElement('button');
    var pinLeft = similarOffer[i].location.x - PIN_IMAGE_WIDTH / 2;
    var pinTop = similarOffer[i].location.y - PIN_IMAGE_HEIGHT / 2;
    pin.style.left = pinLeft + 'px';
    pin.style.top = pinTop + 'px';
    pin.classList.add('map__pin');
    var pinImage = document.createElement('img');
    pinImage.src = similarOffer[i].author;
    pinImage.setAttribute('width', '40');
    pinImage.setAttribute('height', '40');
    pinImage.draggable = false;
    pin.appendChild(pinImage);
    fragment.appendChild(pin);

  }

  mapPin.appendChild(fragment);
};

createPin();





