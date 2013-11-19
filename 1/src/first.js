;(function ( $, window, document, undefined ) {

    var pluginName = "quiz",
        quizData = [],
        quizResults = [],
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
         this.loadResults();
         
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
          
        });
       
    }

 Plugin.prototype.loadResults = function ( options ) {

        var element = $(this.element);
        var _self = this;

        $.getJSON('results.json', function(data){

          $.each( data, function( key, val ) {
            quizResults.push(val);
          });
          
        });
       
    }

    


})( jQuery, window, document );