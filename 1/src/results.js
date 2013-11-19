;(function ( $, window, document, undefined ) {

    var pluginName = "quiz",
        quizData = [],
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

         this.renderQuestions();
         this.bindEvents();
    };


    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( !$.data(this, "plugin_" + pluginName )) {
                $.data( this, "plugin_" + pluginName, 
                new Plugin( this, options ));
            }
        });
    }

    Plugin.prototype.renderQuestion = function ( id, item ) {
        var element = $(this.element),
        answersHtml = '';

        element.append( "<br><br><div class='q' data-id='" + id + "'>" + item.question);

        $.each( item.answers, function( key, answer ) {
            answersHtml = answersHtml + "<div class='aaa' data-id='" + key + "'>" + answer + "</div>" ;
        });

        element.append( answersHtml + "</div>" );

    }

    Plugin.prototype.bindEvents = function (  ) {
        $(".aaa").on('click', function(){

            alert('ee');
        });
    }
    


})( jQuery, window, document );