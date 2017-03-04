const conn = require('./_conn');
const User = require('./User');
const faker = require('faker');


let users = [];

const generateFakeUsers = ()=> {
  for(let i = 0; i < 100; i++){
    let user = {};
    user.fname= faker.name.firstName();
    user.lname = faker.name.lastName();
    user.email = `${user.fname}.${user.lname}@example.com`;
    user.lat = faker.address.latitude();
    user.lng = faker.address.longitude();
    users.push(user);
  }
}

const sync = ()=> {
  return conn.sync({ force: true });
}

const seed = ()=> {
  generateFakeUsers();
  return sync()
  .then( ()=> Promise.all([
    users.map(user => User.create(user))
  ]))
  .catch(e => console.log(e))
}

module.exports = {
  seed,
  models:{
    User
  }
}
