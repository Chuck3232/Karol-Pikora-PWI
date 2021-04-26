function lazyLoad(){
    $('.lazy-img').each(function(){
        if ($(this).offset().top < window.innerHeight + window.pageYOffset + 300) { 
            $(this).attr('src', $(this).data('src'));
            $(this).removeClass('lazy-img');    
        } 
    })
};
var eventTimeout;
   var eventThrottler = function () {
      if ( !eventTimeout ) {
         eventTimeout = setTimeout(function() {
            eventTimeout = null;
            lazyLoad();
      }, 1000);
   }
};

$(document).on('scroll', function() {       
    eventThrottler();
});