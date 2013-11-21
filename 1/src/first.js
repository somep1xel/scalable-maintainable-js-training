;(function ( $, window, document, undefined ) {

    var pluginName = "questionsPlugin",
        quizData = [],
        quizCounter = 0,
        defaults = {
            propertyName: "value"
        };

    function Plugin( element, options ) {

        this.element = element;
        
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    Plugin.prototype.init = function () {

         this.loadQuestions();
         
    };


    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( !$.data(this, "plugin_" + pluginName )) {
                $.data( this, "plugin_" + pluginName, 
                new Plugin( this, options ));
            }
        });
    }

    Plugin.prototype.loadQuestions = function ( options ) {

        var element = $(this.element);
        var _self = this;
        $.getJSON('questions.json', function(data){

          $.each( data, function( key, val ) {
            quizData.push(val);
          });
           _self.renderQuestions();
           _self.bindEvents();
        });
       
    }



    Plugin.prototype.renderQuestions = function ( id, item ) {
        
        var element = $(this.element),
         _self = this,
        answersHtml = '';

        $.each( quizData, function( key, question ) {
            answersHtml = answersHtml + _self.renderQuestionItem(question);
        });

        element.append(answersHtml);
        element.find(".question").first().show();
    }

    Plugin.prototype.renderQuestionItem = function ( questionItem ) {

        var element = $(this.element),
         _self = this
        answersHtml = '';

        answersHtml = answersHtml + "<div class='question' style='display:none;'><strong>" + questionItem.question + "</strong>" + "<br><br>";

        $.each( questionItem.answers, function( key, answer ) {
            answersHtml = answersHtml + "<input type='radio' name='q"+key+"' value='"+questionItem.points[key] + "'>" + answer + "<br><br>";
        });

        return "</div>" + answersHtml;
    }
    
    Plugin.prototype.bindEvents = function (  ) {
        var element = $(this.element),
        _self = this;

        element.find(".question input").on('click', function(){
            quizCounter = Number(quizCounter) + Number(this.value);
            element.parent().find(":hidden").first().show();

            // pass results to another plugin
            if (element.parent().find(":hidden").children().length == 0)
            {
                element.resultsPlugin({quizCounter:quizCounter});
            }
        });
    }
    

})( jQuery, window, document );