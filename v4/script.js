(function() {
    'use strict';

    $('ul[role="menubar"] > li.has-children').hover(function() {
        setSubmenuPosition(this);
        $(this).children('ul.child-menu').css("display", "inline-block");
    }, function() {
        $(this).children('ul.child-menu').css("display", "none");
    });

    $('ul[role="menubar"] > li.has-children').click(function() {
        if(typeof(Storage) !== "undefined") {
            var pageName = $(this).children('a').text();
            localStorage.setItem("clickedPage", pageName);
        } 
    });
    
    $(window).load(function () {
        if(typeof(Storage) !== "undefined") {
            var pageName = localStorage.getItem("clickedPage");
            if(pageName !== null) {
                localStorage.removeItem("clickedPage");
                console.log(pageName);
                var menuElement = $('li:contains('+ pageName +')');
                //setSubmenuPosition(menuElement);
                //$(menuElement).children('ul.child-menu').css("display", "block");
            }
        }
    });
    
    function setSubmenuPosition(that) {
        var mainMenuHeight = $('nav#navigation').height();
        $(that).children('ul.child-menu').css("top", mainMenuHeight);

        var mainMenuWidth = $('nav#navigation').width();
        var subMenuWidth = parseInt($('ul.child-menu').css("width")); 
        var menuItemWidth = $(that).position().left;
        var subMenuOffset = (mainMenuWidth/2)-(subMenuWidth/2)-menuItemWidth;
        $(that).children('ul.child-menu').css("left", subMenuOffset);
    }

})();