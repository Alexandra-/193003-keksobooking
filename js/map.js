'use strict';

document.querySelector('.map').classList.remove('.map--faded');

var similarOffer = [];
var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFERS_NUM = 8;

var offerTypeToCaption = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом'
};

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

function shuffle(array) {
  var newArr = array.slice();
  newArr.sort(function () {
    return Math.random() - 0.5;
  });
  return newArr;
}

function shuffleRandomNumArray(array) {
  var newArr = array.slice();
  return shuffle(array).slice(getRandom(newArr.length));
}

function generateData(count) {
  var shuffleTitles = shuffle(OFFER_TITLES);
  var authorImages = shuffle(generateArray(8));

  for (var i = 0; i < count; i++) {
    var offerFeatures = shuffleRandomNumArray(OFFER_FEATURES);
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
    var pinImage = new Image(40, 40);
    pinImage.src = similarOffer[i].author.avatar;
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

function createOffer(array) {

  var offer = similarOfferTemplate.cloneNode(true);

  offer.querySelector('h3').textContent = array.offer.title;
  offer.querySelector('h3 + p > small').textContent = array.offer.address;
  offer.querySelector('.popup__price').textContent = array.offer.price + '\u20BD/ночь';

  var offerType = array.offer.type;
  var offerTypeText;

  offerTypeText = offerTypeToCaption[offerType];

  offer.querySelector('h4').textContent = offerTypeText;
  offer.querySelector('h4 + p').textContent = array.offer.rooms + ' комнаты для ' + array.offer.rooms + ' гостей';
  offer.querySelector('h4 + p + p').textContent = 'Заезд после ' + array.offer.checkin + ', выезд до ' + array.offer.checkout;
  offer.querySelector('.popup__features + p').textContent = array.description;

  var offerFeatures = offer.querySelector('.popup__features');
  offerFeatures.innerHTML = '';
  for (var m = 0; m < array.offer.features.length; m++) {
    var offerFeaturesItem = document.createElement('li');
    offerFeaturesItem.classList.add('feature', 'feature--' + array.offer.features[m]);
    offerFeatures.appendChild(offerFeaturesItem);
  }

  var offerPictures = offer.querySelector('.popup__pictures');
  var offerPicturesEl = offerPictures.querySelector('li');
  offerPictures.removeChild(offerPicturesEl);
  for (var k = 0; k < array.offer.photos.length; k++) {
    var offerPictureItem = document.createElement('li');
    var offerPictureImg = new Image(40, 40);
    offerPictureImg.src = array.offer.photos[k];
    offerPictureItem.appendChild(offerPictureImg);
    offerPictures.appendChild(offerPictureItem);
  }

  offer.querySelector('.popup__avatar').src = array.author.avatar;

  map.insertBefore(offer, mapFilter);

}

createOffer(similarOffer[0]);
