const basketClient = require('./basket-sdk-mock');

const basketsCache = {}; //because getting baskets is slow, so want want to cache them here

const appInMemStore = {
  apples: [],
  oranges: []
};

class FruitService {

  init() {
    this.getBaskets().then(baskets => {
      baskets.forEach(b => {
        this.getApples(b.id).then(result => appInMemStore['apples'].push(result));
        this.getOranges(b.id).then(result => appInMemStore['oranges'].push(result));
        this.throwAwayBasket(b.id);
      });
    });
  }

  getBaskets() {
    return basketClient.getBaskets();
  }

  getBasket(id) {
    return new Promise((resolve, reject)=>{
      if (basketsCache[id]) {
        return resolve(basketsCache[id]);
      } 

      basketClient.getBasket(id).then(basket => {
        basketsCache[id] = basket;
        return resolve(basketsCache[id]);
      });
    });
  }

  getApples(basket_id) {
    return this.getBasket(basket_id).then(basket => basket.apples);
  }

  getOranges(basket_id) {
    return this.getBasket(basket_id).then(basket => basket.oranges);
  }

  throwAwayBasket(id) {
    return this.getBasket(id).then(basket => {
      delete basketsCache[id];
    });
  }

  addApple(basket_id, apple_id) {
    return basketClient.addApple(basket_id, apple_id);
  }

}

const myFruitService = new FruitService();
myFruitService.init();

console.log('wait service to be initialized ...')
setTimeout(()=> {
  console.log('check appInMemStore ...\n');
  console.log('apples', appInMemStore['apples']);
  console.log('oranges', appInMemStore['oranges']);

  //check basket one again
  myFruitService.getBasket('B01').then(async (b) => {
    if (b != null) {

      const apples = await myFruitService.getApples('B01');
      console.log('check local apples ...\n', apples);

      console.log('add an apple ...');
      await myFruitService.addApple('B01', 'APL0103');

      const apples1 = await myFruitService.getApples('B01');
      console.log('check local apples ...\n', apples1);

      const apples3 = (await basketClient.getBasket('B01')).apples;
      console.log('check remote apples ...\n', apples3);

    }
  });

}, 5000);