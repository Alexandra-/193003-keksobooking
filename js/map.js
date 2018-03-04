'use strict';

document.querySelector('.map').classList.remove('.map--faded');

var similarOffer = [];
var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFERS_NUM = 8;

function getRandom(max, min) {
  if (typeof min === 'undefined') {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min) + min);
}

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

function generateOfferFeatures() {
  var offerFeaturesCopy = OFFER_FEATURES.slice();
  var offerFeatures = [];
  var offerFeaturesNum = getRandom(offerFeaturesCopy.length);
  for (var i = offerFeatures.length; offerFeatures.length <= offerFeaturesNum; i++) {
    var offerFeaturesItem = getRandom(offerFeaturesCopy.length);
    offerFeatures.push(offerFeaturesCopy[offerFeaturesItem]);
    offerFeaturesCopy.splice(offerFeaturesItem, 1);
  }

  return offerFeatures;

}

function generateData(count) {
  var shuffleTitles = shuffle(OFFER_TITLES);
  var authorImages = shuffle(generateArray(8));

  for (var i = 0; i < count; i++) {
    var offerFeatures = generateOfferFeatures();
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
      author: {
        avatar: 'img/avatars/user0' + authorImages[i] + '.png'
      },
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

generateData(OFFERS_NUM);

var mapPin = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var PIN_IMAGE_WIDTH = 40;
var PIN_IMAGE_HEIGHT = 40;

function createPin() {
  for (var i = 0; i < similarOffer.length; i++) {
    var pin = document.createElement('button');
    var pinLeft = similarOffer[i].location.x - PIN_IMAGE_WIDTH / 2;
    var pinTop = similarOffer[i].location.y - PIN_IMAGE_HEIGHT / 2;
    pin.style.left = pinLeft + 'px';
    pin.style.top = pinTop + 'px';
    pin.classList.add('map__pin');
    var pinImage = document.createElement('img');
    pinImage.src = similarOffer[i].author.avatar;
    pinImage.setAttribute('width', '40');
    pinImage.setAttribute('height', '40');
    pinImage.draggable = false;
    pin.appendChild(pinImage);
    fragment.appendChild(pin);
  }

  mapPin.appendChild(fragment);
}

createPin();

var similarOfferTemplate = document.querySelector('template').content.querySelector('article.map__card');
var map = document.querySelector('.map');
var mapFilter = document.querySelector('.map__filters-container');

function createOffer() {

  var offer = similarOfferTemplate.cloneNode(true);

  offer.querySelector('h3').textContent = similarOffer[0].offer.title;
  offer.querySelector('h3 + p > small').textContent = similarOffer[0].offer.address;
  offer.querySelector('.popup__price').textContent = similarOffer[0].offer.price + '\u20BD/ночь';

  var offerType = similarOffer[0].offer.type;
  var offerTypeText;
  if (offerType === 'flat') {
    offerTypeText = 'Квартира';
  } else if (offerType === 'bungalo') {
    offerTypeText = 'Бунгало';
  } else {
    offerTypeText = 'Дом';
  }
  offer.querySelector('h4').textContent = offerTypeText;
  offer.querySelector('h4 + p').textContent = similarOffer[0].offer.rooms + ' комнаты для ' + similarOffer[0].offer.rooms + ' гостей';
  offer.querySelector('h4 + p + p').textContent = 'Заезд после ' + similarOffer[0].offer.checkin + ', выезд до ' + similarOffer[0].offer.checkout;
  offer.querySelector('.popup__features + p').textContent = similarOffer[0].description;

  var offerPictures = offer.querySelector('.popup__pictures');
  for (var k = 0; k < similarOffer[0].offer.photos.length; k++) {
    var offerPictureItem = offer.querySelector('.popup__pictures li').cloneNode(true);
    var offerPictureItemImg = offerPictureItem.querySelector('img');
    offerPictureItemImg.src = similarOffer[0].offer.photos[k];
    offerPictureItemImg.setAttribute('width', '40');
    offerPictureItemImg.setAttribute('height', '40');
    offerPictures.appendChild(offerPictureItem);
  }

  offer.querySelector('.popup__avatar').src = similarOffer[0].author.avatar;

  map.insertBefore(offer, mapFilter);

}

createOffer();
