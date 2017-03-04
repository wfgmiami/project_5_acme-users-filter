const conn = require('./_conn');

const User = conn.define('user', {
  fname: conn.Sequelize.STRING,
  lname: conn.Sequelize.STRING,
  email: conn.Sequelize.STRING,
  lat: conn.Sequelize.DECIMAL,
  lng: conn.Sequelize.DECIMAL
},{
  classMethods: {
    totalByLetter: function(){
      return this.findAll()
      .then( users => {
        let filtered = users.reduce( (memo,user) => {
          let letter = user.lname.substring(0,1);
          (memo[letter]) ? memo[letter] = ++memo[letter] : memo[letter] = 1;
          return memo;
        }, {})
        return filtered;
      })
    }
  }
})

module.exports = User;
