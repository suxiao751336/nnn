const express=require('express');
const cors=require('cors');
const mysql=require('mysql');

const app=express();
const host = '0.0.0.0';
const port = process.env.PORT || 8081;

//const selectAll = 'select * from lostandfound where unit_id>(select count(*) from lostandfound)-5 order by unit_id asc limit 5 ';
const selectAll = 'select * from loselist';

const selectAll01 = 'select * from loselist order by id';
var pool=mysql.createPool({
	connectionLimit:10,
    host:"us-cdbr-iron-east-05.cleardb.net",
    user:'b23a34da9fe379',
    password:'68882ca0',
    database:'heroku_c595c5d7e6b1b97'
});

  

app.use(cors());

// app.get('/',(req,res)=>{
// res.send('go to /measurement to see measurement');
// });


  app.get('/log', function(request,response){
	console.log("active");
});

app.get('/found',(req,res)=>{
pool.query(selectAll,(err, results)=>{
    if(err){
        return res.send(err)
    }
    else{
        return res.json({
            data: results
        })
    }
})
})



  app.get('/', function(request,response){
  pool.query('select * from jing', function (err, rows, fields) {
    if(err){
        console.log('error',err);
        throw err;
    }
        response.send(['hello jing!!!change',rows]);
  });
});



app.get('/measurement',(req,res)=>{
    pool.query(selectAll,(err, results)=>{
        if(err){
            return res.send(err)
        }
        else{
            
            console.log(JSON.stringify(results));
            return res.json({
                data: results
    
            });
            
            
        }
    })
    })




    app.get('/measurement/detail',(req,res)=>{
        const {ID}=req.query;
       console.log(ID);
        const detail_quary=" SELECT * FROM loselist WHERE ID='"+ID+"'"
                                   
       pool.query(detail_quary,(err,results)=>{
            if(err){
                return res.send(err)
            }else{
               
               console.log(results);
            return res.json({
                data: results
               
            });
            
            }
        });
        });

        app.get('/measurement/login',(req,res)=>{
            const {username,passWord}=req.query;
            console.log(username);
            console.log(passWord);
            const login_quary=" SELECT auth FROM user WHERE username='"+username+"' and password='"+passWord+"'"
                                       
           pool.query(login_quary,(err,results)=>{
                if(err){
                    return res.send(err)
                }else{
                   
                   console.log(results);
                   return res.json({
                    data: results
                });
                
                }
            });
            });





        app.get('/measurement/chart',(req,res)=>{
    
            const detail_quary="SELECT area ,count(*) as time FROM loselist group by area"
                                       
           pool.query(detail_quary,(err,results)=>{
                if(err){
                    return res.send(err)
                }else{
                   
                   console.log(results);
                return res.json({
                    data: results
                   
                });
                
                }
            });
            });




app.get('/found/add',(req,res)=>{
const{name,logo,lengths,width,color,mark,time,descr,area}=req.query;
//console.log(name,logo,lengths,width,color,mark,time,descr,area);
const INSERT_PRODUCTS_QUERY="INSERT INTO lostandfound (name,logo,lengths,width,color,mark,time,descr,area) VALUES ('"+name+"','"+logo+"','"+lengths+"','"+width+"','"+color+"','"+mark+"','"+time+"','"+descr+"','"+area+"')"

pool.query(INSERT_PRODUCTS_QUERY,(err,results)=>{
    if(err){
        return res.send(err)
    }else{
        return res.send('successfully added product')
    }
});
});


app.get('/found/delect',(req,res)=>{
    const{ID}=req.query;
    //console.log(name);
    const DELECT_PRODUCTS_QUERY="DELETE FROM lostandfound WHERE ID='"+ID+"'"
    pool.query(DELECT_PRODUCTS_QUERY,(err,results)=>{
        if(err){
            return res.send(err)
        }else{
            return res.send('successfully delect product')
        }
    });
    });

app.listen(port, host, function() {
    console.log('products server listening on 8080')
})