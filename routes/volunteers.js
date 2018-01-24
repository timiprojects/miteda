exports.list = function(req, res){

    req.getConnection(function(err,connection){
         
          connection.query('SELECT * FROM volunteer',function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
              res.render('volunteers',{page_title:"Volunteers",data:rows});
              //res.json(rows);
                  
             
           });
           
           //console.log(query.sql);
      });
    
  };

exports.add = function(req, res){
    res.render('add_volunteer',{page_title:"Add Volunteer"});
    //res.json(res);
  };

/*Save the customer*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            firstname: input.firstname,
            lastname: input.lastname,
            email: input.email,
            phone: input.phone,  
            volunteertype: input.volunteertype,
            qualification: input.qualification,
            event: input.event
        }

        connection.query("INSERT INTO volunteer set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/api/volunteers');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.delete_volunteer = function(req,res){
          
    var id = req.params.id;
   
    req.getConnection(function (err, connection) {
       
       connection.query("DELETE FROM volunteer  WHERE id = ? ",[id], function(err, rows)
       {
           
            if(err)
                console.log("Error deleting : %s ",err );
           
            res.redirect('/api/volunteers');
            
       });
       
    });
};

exports.sendmail = function(req,res){
          
    var id = req.params.id;
   
    req.getConnection(function (err, connection) {
        connection.query('SELECT * FROM volunteer WHERE id = ?',[id],
        function(err, rows)
        {
            var mailOptions={
                to : rows[0].id,
                subject : "Tested Ok",
                text : ""
            }
            console.log(mailOptions);
            smtpTransport.sendMail(mailOptions, function(error, response){
             if(error){
                    console.log(error);
                    res.end("error");
             }else{
                    console.log("Message sent: " + response.message);
                    res.end("sent");
                }
            });
            if(err)
                console.log("Error deleting : %s ",err );
            
            res.redirect('/api/volunteers');
                
        });
       
    });
};

exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        connection.query('SELECT * FROM volunteer WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_volunteer',{page_title:"Edit Volunteer",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};