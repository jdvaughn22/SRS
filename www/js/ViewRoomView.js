var ViewRoomView = function () {

	this.initialize = function() {
        // todo: must call grid() first... (corresponds to "onload=grid()" in original code)

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
        this.grid();
        //$('.content', this.$el).html(employeeListView.$el);
        return this;
    };

    /*this.findByName = function() {
        service.findByName($('.search-key').val()).done(function (employees) {
            employeeListView.setEmployees(employees);
        });
    };*/

    this.grid = function() {

        var counter = 0;
        // Grabs the number from the form in the height box
        var height = localStorage.getItem('gridHeight');
        console.log("height is: ", height);

        //Grabs the number from the form in the width box
        var width = localStorage.getItem('gridWidth');
        console.log("width is: ", width);

        var lastClicked;

        var grid = loadClickableGrid(height, width,
                    function(el,row,col,i){


              });

        //prints the array
        //var testGrid = document.getElementById("test").appendChild(grid);
        $("#test", this.$el).html(grid);


    }

    this.initialize();

    // TODO: stick javascript that configure room needs in here somewhere.
    // TODO: build some sort of structure around local storage???
}

      var loadClickableGrid = function( rows, cols, callback) {
          var i=0;
          console.log("empty chairs are: ", localStorage.getItem('empChairArray'));
          console.log("empty chairs are: ", localStorage.getItem('occChairArray'));

          var empChairArray = localStorage.getItem('empChairArray').split(",");
          var occChairArray = localStorage.getItem('occChairArray').split(",");
          var grid = document.createElement('table');
          grid.className = 'grid';

          //creates the rows
          for (var r=0;r<rows;++r){
              var tr = grid.appendChild(document.createElement('tr'));
              
              //creates the columns
              for (var c=0;c<cols;++c){
                  var cell = tr.appendChild(document.createElement('td'));
                  //adds numbers to the cells
                  //cell.innerHTML = ++i;
                  cell.id = ++i;
                  if(cell.id == empChairArray[0]){
                    cell.className = 'clicked1';
                    empChairArray.shift();
                  }

                  else if(cell.id == occChairArray[0]){
                    cell.className = 'clicked2';
                    occChairArray.shift();
                  }


                  cell.addEventListener('click',(function(el,r,c,i){
                      return function(){
                          callback(el,r,c,i);
                      };
                  })

                  (cell,r,c,i),false);
              }
          }
          return grid;
      }


