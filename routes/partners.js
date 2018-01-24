exports.list = function(req, res){

    req.getConnection(function(err,connection){
         
          connection.query('SELECT * FROM partner',function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
              res.render('partners',{page_title:"Partners",data:rows});
              //res.json(rows);
                  
             
           });
           
           //console.log(query.sql);
      });
    
  };

  exports.lists = function(req, res){

    req.getConnection(function(err,connection){
         
          connection.query('SELECT * FROM partner',function(err,rows)
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
    res.render('add_partner',{page_title:"Add Customers"});
    //res.json(res);
  };

/*Save the customer*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            partnertype: input.partnertype,
            organization: input.organization,
            conperson: input.conperson,
            emailperson: input.emailperson,  
            orgaddress: input.orgaddress,
            partnerstate: input.partnerstate,
            community: input.community
        }

         connection.query("INSERT INTO partner set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/api/partners');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.delete_partner = function(req,res){
          
    var id = req.params.id;
   
    req.getConnection(function (err, connection) {
       
       connection.query("DELETE FROM partner  WHERE id = ? ",[id], function(err, rows)
       {
           
            if(err)
                console.log("Error deleting : %s ",err );
           
            res.redirect('/api/partners');
            
       });
       
    });
};

exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        connection.query('SELECT * FROM partner WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_partner',{page_title:"Edit Partner",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

exports.sendmail = function(req,res){
          
    var id = req.params.id;
   
    req.getConnection(function (err, connection) {
        connection.query('SELECT * FROM partner WHERE id = ?',[id],
        function(err, rows)
        {
            var mailOptions={
                to : rows.id,
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
            
                res.render('partners',{page_title:"Edit Customers",data:rows});
                
        });
       
    });
};