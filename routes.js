const router = require('express').Router();
const db = require('./db');

router.get('/',(req,res,next)=>{
  let users;
  return db.models.User.findAll()
  .then(_users => users = _users)
  .then(()=>{
     db.models.User.totalByLetter()
    .then( filtered => res.render('index', { users: users, filtered: filtered }))
  })
  .catch(next);
})

router.get('/user/filter/:letter', (req,res,next)=>{
  let users;
  return db.models.User.findAll({
    where: { lname: { $like: `${ req.params.letter }%` }}
  })
  .then(_users => users = _users)
  .then(()=>{
     db.models.User.totalByLetter()
    .then( filtered => res.render('index', { users: users, filtered: filtered }))
  })
  .catch(next);
})

router.post('/regenerate',(req,res,next)=>{
  db.seed()
  .then( ()=> res.redirect('/'))
  .catch(next);
})

module.exports = router;
