const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5026

const { Pool } = require('pg');
  var pool;
  pool = new Pool({
    //connectionString: 'postgres://postgres:root@localhost/users'
    //for heroku: process.env.DATABASE_URL
    connectionString: process.env.DATABASE_URL,
  ssl: {
   rejectUnauthorized: false
  }
  });

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => res.render('pages/index'));

app.get ('/database', (req,res) => {
  var getrctQuery = `SELECT * FROM rectangles`;
  pool.query(getrctQuery,(error, result) => {
    if (error)
    {
      res.end(error);
    }
    var results = {'rows': result.rows}
    res.render('pages/db',results);
  })
});


/*
app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM test_table');
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});
*/

app.post('/addData', (req, res) =>{
  console.log("post request for add rectangle");
  var username = req.body.name;
  var ccolor = req.body.color;
  var mwidth = req.body.width;
  var mheight = req.body.height;
  var uid = req.body.userid;

  if (username != "" && ccolor != "" && mwidth && mheight  && uid != ""){
    
    var insertInDatabase= (`insert into rct values('${username}','${ccolor}',${mwidth},${mheight},'${uid}')`);
    pool.query(insertInDatabase, (error, result) => {
      if(error){
        res.end(error);
      }
    })
  
    res.redirect('/database');
  }
  else{
    res.redirect('/');
  }
});

app.post('/change/:id', (req, res)=>{
  var name = req.body.name;
  var color = req.body.color;
  var width = req.body.width;
  var height = req.body.height;
  var userid = req.body.userid;
  if(name != ""){
    pool.query(`UPDATE rectangles SET name = ' ${name}' WHERE id = ${userid}`, (err, res) => {
      if(err){
        res.end(err);
      } 
    });
  }
  
});
app.post('/delete', (req, res)=>{
  var userid = req.body.userid;
  pool.query(`delete from rectangles where id= ${userid}`, (err, res) => {
    console.log(err, res);
  });
  res.redirect('/database');
});
   
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

  