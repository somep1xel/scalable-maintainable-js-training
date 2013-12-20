var APP = APP || {};
 
// module-"class" (constructor)
APP.questionsPlugin = (function (APP, $, undefined) {

	// static
	var pluginName = "questionsPlugin",
		quizData = [],
		quizCounter = 0,
        options = null;
		
		
    return function (options) {
	
		// private
		var quizData = [];
		var quizCounter = 0;
		var element = null;
		
		this.init = function (options) {
			this.element = $(options.element);
			this.loadQuestions();
		};
		
		this.loadQuestions = function ( ) {

			var _self = this;
			$.getJSON('questions.json', function(data){

			  $.each( data, function( key, val ) {
				quizData.push(val);
			  });
			}).complete(function(){
			   _self.renderQuestions();
			   _self.bindEvents();
			});
		   
		};

		this.renderQuestions = function ( ) {
			
			var element = $(this.element),
			 _self = this,
			answersHtml = '';

			$.each( quizData, function( key, question ) {
				answersHtml = answersHtml + _self.renderQuestionItem(question);
			});

			element.append(answersHtml);
			element.find(".question").first().show();
		};

		this.renderQuestionItem = function ( questionItem ) {

			var element = $(this.element),
			 _self = this
			answersHtml = '';

			answersHtml = answersHtml + "<div class='question' style='display:none;'><strong>" + questionItem.question + "</strong>" + "<br><br>";

			$.each( questionItem.answers, function( key, answer ) {
				answersHtml = answersHtml + "<input type='radio' name='q"+key+"' value='"+questionItem.points[key] + "'>" + answer + "<br><br>";
			});

			return "</div>" + answersHtml;
		};
		
		this.bindEvents = function (  ) {
			var element = $(this.element),
			_self = this;

			element.find(".question input").on('click', function(){

				quizCounter = Number(quizCounter) + Number(this.value);
				element.find(":hidden").first().show();

				// pass results to another plugin
				if (element.find(":hidden").children().length == 0)
				{
					//_self.options.completeCallback(element,quizCounter); // for passing callback as parameter
					APP.EventBus.trigger('completed', element); // using event bus
				}
			});
		};
		
		this.init(options);
    };
}(APP, jQuery));