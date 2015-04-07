var TakeSurveyView = function() {
    

	this.initialize = function() {
		// div wrapper for view, used to attach events
		this.$el = $('<div/>');

        // when survey form is submitted, save the answers to localstorage
        this.$el.on('submit', '#survey-form',
            function() 
            {
                console.log("survey submitted!");

                // magically turn answers into string
                var answerString = JSON.stringify($("#survey-form").serializeArray());
                // save answers to local storage so we can pull them out later
                localStorage.setItem("answerString", answerString);

                console.log("answers are: " + answerString);
            
                // and redirect to view for selecting chair
                window.location = "#selectChair";
            }
        );

        // fetch the survey that is marked as active and populate the page with Q's and A's
        getDocsWithQuery("wwystest", "tests_dev", JSON.stringify({"activeFlag":"true"})).
            then(
                function(tests) {
                    var activeTest = tests[0];
                    //console.log("num tests:" + tests.length);
                    //console.log("test:" + JSON.stringify(activeTest));
                    console.log("questions:" + activeTest.surveyQuestions.questions);
                    console.log("answer types:" + activeTest.surveyQuestions.answerTypes);
                    console.log("answer choices:" + activeTest.surveyQuestions.answerChoices);
                
                    // populate question and answers into html here.
                    populateQuestions(activeTest, 'survey');
                }
            );

		this.render();
	};

	this.render = function() {
        this.$el.html(this.template());
        return this;
    };

    this.initialize();

}


function populateQuestions(test, divName)
{
  for (var i = 0; i < test.surveyQuestions.questions.length; i++)
  {
    var curQuestion = test.surveyQuestions.questions[i];
    var curType = test.surveyQuestions.answerTypes[i];
    var curAnswers = test.surveyQuestions.answerChoices[i];

    var questionDiv = document.createElement('div');
    questionDiv.id = "question" + (i+1);
    questionDiv.innerHTML = "</br><p>(" + (i+1) + ") " + curQuestion + "</p>";
    document.getElementById(divName).appendChild(questionDiv);

    var answerDiv = document.createElement('div');
    answerDiv.id = "answer" + (i+1);
    var answerHtml = "";
    
    for (var x in curAnswers)
    {
      answerHtml += "<input type='" + curType + "' name='answer" + (i+1) + "' value='" 
                  + curAnswers[x] + "'>" + curAnswers[x] + "</input></br>";
    }

    answerDiv.innerHTML = answerHtml;
    document.getElementById(divName).appendChild(answerDiv);
  }
}
