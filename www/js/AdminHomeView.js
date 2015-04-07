var AdminHomeView = function () {

	this.initialize = function() {
		// div wrapper for view, used to attach events
		this.$el = $('<div/>');
		//this.$el.on('keyup', '.search-key', this.findByName);
		//employeeListView = new EmployeeListView();

        // enable show/hide dashboard
        this.$el.on('click', '#menu-toggle', 
            function(e) {
                console.log("test");
                e.preventDefault();
                $("#wrapper", this.$el).toggleClass("toggled");
            });


		this.render();
	};

	this.render = function() {
        this.$el.html(this.template());
        //$('.content', this.$el).html(employeeListView.$el);
        return this;
    };

    /*this.findByName = function() {
        service.findByName($('.search-key').val()).done(function (employees) {
            employeeListView.setEmployees(employees);
        });
    };*/

    this.initialize();
}