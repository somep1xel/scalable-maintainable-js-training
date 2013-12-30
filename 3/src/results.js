;(function ( $, window, document, undefined ) {

    var pluginName = "resultsPlugin",
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


 Plugin.prototype.loadResults = function ( ) {

        var element = $(this.element);
        var _self = this;

        $.getJSON(this.options.feedUrl, function(data){

          $.each( data, function( key, val ) {
            quizResults.push(val);
          });

          
        }).complete(function(){
            _self.showResult(_self.options.quizCounter);
        });
       
    }

 Plugin.prototype.showResult = function ( quizCounter ) {


        var element = $(this.element);
        var _self = this;

      $.each( quizResults, function( key, resultItem ) {

        if (Number(quizCounter) <  Number(resultItem.to) && (Number(key) == Number(quizResults.length-1)))
        {
            alert(String(resultItem.status));
            return;
        }

        if (Number(quizResults.length-1) == Number(key))
        {
            if (previousStatus)
            alert(String(previousStatus));
        else
            alert(String(resultItem.status));
            return;
        }
        var previousTo = Number(resultItem.to);
        var previousStatus = String(resultItem.status);
      });
    }

})( jQuery, window, document );