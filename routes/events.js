exports.list = function(req, res){

    req.getConnection(function(err,connection){
         
          connection.query('SELECT * FROM event',function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
              res.render('events',{page_title:"Events",data:rows});
              //res.json(rows);
                  
             
           });
           
           //console.log(query.sql);
      });
    
  };

  exports.lists = function(req, res){

    req.getConnection(function(err,connection){
         
          connection.query('SELECT * FROM event',function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
              //res.render('partners',{page_title:"Partners",data:rows});
              res.json(rows);
                  
             
           });
           
           //console.log(query.sql);
      });
    
  };

exports.add = function(req, res){
    res.render('add_event',{page_title:"Add Event"});
    //res.json(res);
  };

/*Save the customer*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            event_name: input.event_name,
            event_date: input.event_date,
            event_state: input.event_state
        }

        connection.query("INSERT INTO event set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/api/events');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.delete_event = function(req,res){
          
    var id = req.params.id;
   
    req.getConnection(function (err, connection) {
       
       connection.query("DELETE FROM event WHERE id = ? ",[id], function(err, rows)
       {
           
            if(err)
                console.log("Error deleting : %s ",err );
           
            res.redirect('/api/events');
            
       });
       
    });
};

exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        connection.query('SELECT * FROM event WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_event',{page_title:"Edit Event",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            event_name: input.event_name,
            event_date: input.event_date,
            event_state: input.event_state
        };
        
        connection.query("UPDATE event set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/api/events');
          
        });
    
    });
};
