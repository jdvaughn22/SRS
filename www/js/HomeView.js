var HomeView = function () {

    this.loginCount = 2;

	this.initialize = function() {
		// div wrapper for view, used to attach events
		this.$el = $('<div/>');
		//this.$el.on('keyup', '.search-key', this.findByName);
		//employeeListView = new EmployeeListView();
        this.$el.on('click', '#login-button', this.validateLogin);

		this.render();
	};

	this.render = function() {
        this.$el.html(this.template());
        //$('.content', this.$el).html(employeeListView.$el);
        return this;
    };


    // Note: Like all Javascript password scripts, this is hopelessly insecure as the user can see 
    //the valid usernames/passwords and the redirect url simply with View Source.  
    // And the user can obtain another three tries simply by refreshing the page.  
    //So do not use for anything serious!
    this.validateLogin = function() {

        var un = document.myform.username.value;
        var pw = document.myform.pword.value;

        console.log("entered username is: ", un);
        console.log("entered password is: ", pw);
        var valid = false;

        var unArray = ["Tester"];  // as many as you like - no comma after final entry
        var pwArray = ["password"];  // the corresponding passwords;

        for (var i = 0; i < unArray.length; i++) {
            if ((un == unArray[i]) && (pw == pwArray[i])) {
                valid = true;
                break;
            }
        }

        if (valid) {
            window.location = "#adminHome";
            return false;
        }

        var t = " tries";
        if (loginCount == 1) {t = " try"}

        if (loginCount >= 1) {
            alert ("Invalid username and/or password.  You have " + loginCount + t + " left.");
            document.myform.username.value = "";
            document.myform.pword.value = "";
            setTimeout("document.myform.username.focus()", 25);
            setTimeout("document.myform.username.select()", 25);
            loginCount--;
        }

        else {
            alert ("Still incorrect! You have no more tries left!");
            document.myform.username.value = "No more tries allowed!";
            document.myform.pword.value = "";
            document.myform.username.disabled = true;
            document.myform.pword.disabled = true;
            return false;
        }
    }

    this.initialize();
}

var loginCount = 2;