// dataStorage.js

let publishedData = [];

export const addData = (data) => {
  publishedData.push(data);
};

export const getData = () => {
    // console.log(publishedData)
  return publishedData;
};