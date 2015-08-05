(function() {
    'use strict';
    
    $('ul[role="menubar"] > li.has-children').hover(function() {
        setSubmenuPosition(this);
        if(localStorage.getItem("clickedPage") !== null) { 
            var pageName = localStorage.getItem("clickedPage");
            var menuElement = $('li:contains('+ pageName +')');
            setSubmenuPosition(menuElement);
            $(menuElement).children('ul.child-menu').css("display", "none");
            $(menuElement).children('.navi-arrow').css("display", "none");   
        }
        $(this).children('.navi-arrow').css("display", "initial");
        $(this).children('ul.child-menu').css("display", "inline-block");
    }, function() {
        $(this).children('.navi-arrow').css("display", "none");
        $(this).children('ul.child-menu').css("display", "none");
        if(localStorage.getItem("clickedPage") !== null) { 
            var pageName = localStorage.getItem("clickedPage");
            var menuElement = $('li:contains('+ pageName +')');
            setSubmenuPosition(menuElement);
            $(menuElement).children('ul.child-menu').css("display", "inline-block");
            $(menuElement).children('.navi-arrow').css("display", "initial");   
        }
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
                //localStorage.removeItem("clickedPage");
                console.log(pageName);
                var menuElement = $('li:contains('+ pageName +')');
                setSubmenuPosition(menuElement);
                $(menuElement).children('ul.child-menu').css("display", "inline-block");
                $(menuElement).children('.navi-arrow').css("display", "initial");
            }
            else {
                $('ul.child-menu').css("display", "none");
                $('.navi-arrow').css("display", "none");
            }
        }
    });
        
    /*
    $('.selected').each(function() {
        setSubmenuPosition(this);
        $(this).children('ul.child-menu').css("display","inline-block");
    });
    */
    function setSubmenuPosition(that) {
        // Set submenu top position
        var mainMenuHeight = $('nav#navigation').height();
        $(that).children('ul.child-menu').css("top", mainMenuHeight);
        
        // Center submenu horizontally
        var mainMenuWidth = $('nav#navigation').width();
        var subMenuWidth = parseInt($('ul.child-menu').css("width")); 
        var subMenuOffset = (mainMenuWidth/2)-(subMenuWidth/2);
        $(that).children('ul.child-menu').css("left", subMenuOffset);
        
        // Center navi-arrow horizontally
        var menuItemPosition = $(that).position().left;
        var menuItemWidth = $(that).outerWidth();
        console.log(menuItemWidth);
        var naviArrowOffset = Math.round(menuItemPosition + menuItemWidth/2);
        $(that).children('.navi-arrow').css("left",naviArrowOffset);
    }

})();