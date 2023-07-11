// dataStorage.js

let publishedData = [];

const places = [{
  id: '01',
  naming: 'The City of Lights',
  location: 'Paris, France',
  photo: 'https://www.holidify.com/images/bgImages/PARIS.jpg'
},
{
  id: '02',
  naming: 'The Grand Canyon',
  location: 'USA',
  photo: 'https://www.holidify.com/images/cmsuploads/compressed/grand_20181214130027.jpg'
},
{
  id: '03',
  naming: 'The Land Where Adventures Wait',
  location: 'New Zealand',
  photo: 'https://holidify.com/images/bgImages/NEW-ZEALAND.jpg'
},
{
  id: '04',
  naming: ' The heritage of England',
  location: 'London, UK',
  photo: 'https://www.holidify.com/images/bgImages/LONDON.jpg'
},
{
  id: '05',
  naming: ' Great Barrier Reef ',
  location: 'Australia',
  photo: 'https://www.holidify.com/images/bgImages/GREAT-BARRIER-REEF.jpg'
},
]

export const addData = (data) => {
  publishedData.push(data);
};

export const getData = () => {
  console.log('getData():',publishedData)
  return publishedData;
};

export const resetData = () => {
  console.log('RESET')
  publishedData = [];
};



export const getPlaces = () => {
  console.log('getPlaces():',places)
  return places;
};

export const gpsDefault = {
gps:{ 
        longitude: 30.602185,
        latitude: 50.515339,
      },
}
