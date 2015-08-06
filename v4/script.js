(function() {
    'use strict';
    
    $('ul[role="menubar"] > li.has-children').hover(function() {
        // Hide submenu on page that has selected class
        var menuElement = $('li.has-children.selected');
        $(menuElement).children('ul.child-menu').css("display", "none");
        $(menuElement).children('.navi-arrow').css("display", "none");   
        // Show submenu that's being hovered
        setSubmenuPosition(this);
        $(this).children('.navi-arrow').css("display", "initial");
        $(this).children('ul.child-menu').css("display", "inline-block");
    }, function() {
        // Hide submenu that was hovered
        $(this).children('.navi-arrow').css("display", "none");
        $(this).children('ul.child-menu').css("display", "none");
        // Show submenu on page that has selected-class
        var menuElement = $('ul[role="menubar"] > li.selected.has-children');
        if( menuElement.is(':not(:first-child)')) {
            $(menuElement).children('.navi-arrow').css("display", "initial");
            $(menuElement).children('ul.child-menu').css("display", "inline-block");
        }
        else {
            if(typeof(Storage) !== "undefined") {
                var pageName = localStorage.getItem("mainPageClicked");
                if(pageName !== null) {
                    setSubmenuPosition(menuElement);
                    $(menuElement).children('.navi-arrow').css("display", "initial");
                    $(menuElement).children('ul.child-menu').css("display", "inline-block");
                }
            }
        } 
    });

    $('ul[role="menubar"] > li.has-children').click(function() {
        if ($(this).is(':first-child')) {
            if(typeof(Storage) !== "undefined") {
                //var pageName = $(this).children('a').text();
                //localStorage.setItem("clickedPage", pageName);
                localStorage.setItem("mainPageClicked", "1");
            } 
        }
    });
    
    $( window ).resize(showClickedMenu);
    
    $(window).load(showClickedMenu);
        
    function showClickedMenu() {
        // Show child-menu when it's parent has selected-class UNLESS it's the main page
        var selectedElement = $('ul[role="menubar"] > li.selected.has-children');
        if( selectedElement.is(':not(:first-child)')) {
            setSubmenuPosition(selectedElement);
            $(selectedElement).children('ul.child-menu').css("display", "inline-block");
            $(selectedElement).children('.navi-arrow').css("display", "initial");
        }
        // Show main page child-menu ONLY when it's selected from navigation 
        else {
            if(typeof(Storage) !== "undefined") {
                var pageName = localStorage.getItem("mainPageClicked");
                if(pageName !== null) {
                    //localStorage.removeItem("clickedPage");
                    //console.log(pageName);
                    var menuElement = $('ul[role="menubar"] > li.has-children.selected');
                    setSubmenuPosition(menuElement);
                    $(menuElement).children('ul.child-menu').css("display", "inline-block");
                    $(menuElement).children('.navi-arrow').css("display", "initial");
                }
                else {
                    $('ul.child-menu').css("display", "none");
                    $('.navi-arrow').css("display", "none");
                }
            }
        }
        
        
        
        
    };
        
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
        var naviArrowOffset = Math.round(menuItemPosition + menuItemWidth/2);
        $(that).children('.navi-arrow').css("left",naviArrowOffset);
    }

})();