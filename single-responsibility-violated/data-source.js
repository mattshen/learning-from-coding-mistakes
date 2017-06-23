const simpleBasketList = [
  {
    id: 'B01'
  },{
    id: 'B02'
  }
];

const basketsWithFruits = [
  {
    id: 'B01', 
    oranges: [
      {id: 'ORA0101'},
      {id: 'ORA0102'}
    ],
    apples: [
      {id: 'APL0101'},
      {id: 'APL0102'}
    ]
  },{
    id: 'B02', 
    oranges: [
      {id: 'ORA0201'},
      {id: 'ORA0202'}
    ],
    apples: [
      {id: 'APL0201'},
      {id: 'APL0202'}
    ]
  }
];

module.exports = {
  simpleBasketList, basketsWithFruits
}