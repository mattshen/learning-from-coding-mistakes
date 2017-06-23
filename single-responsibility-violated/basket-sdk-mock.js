const data = require('./data-source');
const _ = require('lodash');

const getBaskets = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(_.cloneDeep(data.simpleBasketList)));
  });
}

const getBasket = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(_.cloneDeep(data.basketsWithFruits.find(o => o.id === id))));
  });
};

const addApple = (basket_id, apple_id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      data.basketsWithFruits.find(o => o.id === basket_id).apples.push({id: apple_id});
      resolve({});
    });
  });
}

module.exports = {
  getBaskets,
  getBasket,
  addApple,
}