app.get('/login_endpoint', function(req, res){
    var myUsername = req.query.username;
    var myPassword = req.query.password;

    pool.query("SELECT * FROM users WHERE email=?", [myUsername], function(error, results, fields){
        if (error) throw error;
        if(results.length == 0) {
        	pool.query("SELECT * FROM users WHERE email=?", [myUsername], function(error, results, fields){
			    if (error) throw error;
			    if(results.length == 0) {
			    	res.send("Incorrect email or username.");	
			    }
			    if(results[0].password == myPassword) {
			    	//create "logged in" cookie here
			    	cookies.set({
			    		name: "token",
			    		value: "logged-in"
			    	});
			    	res.send("login");
			    }
			});
        }
        if(results[0].password == myPassword) {
        	//create "logged in" cookie here
        	cookies.set({
	    		name: "token",
	    		value: "logged-in"
			});
			res.send("login");
		}
		else {
			res.send("Incorrect password.")
		}

    });
});