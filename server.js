const express = require('express');
const swig = require('swig');
const router = require('./routes');
const db = require('./db');

const app = express();

app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false });

app.use('/vendor', express.static(__dirname + '/node_modules'));
app.use('/', router);

app.use((err,req,res,next)=>{
  console.error(err);
  res.status(500).send(err.message);
})

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`listening on port ${port}`))

db.seed()
.then(()=>console.log('db is synched and seeded'))
.catch(e => console.log(e));
