(function() {
    'use strict';
    
    // Liferay uses class 'selected' on menu item that has been selected
    // However the class is always added to first page
    // We don't want to show the submenu when we first come to the page
    
    // Handle hovering main menu items
    $('ul[role="menubar"] > li.has-children').hover(function() {
        // Hide submenu of selected menu item
        var menuElement = $('li.has-children.selected');
        $(menuElement).children('ul.child-menu').css("display", "none");
        $(menuElement).children('.navi-arrow').css("display", "none");   
        // Show submenu of hovered menu item
        setSubmenuPosition(this);
        $(this).children('.navi-arrow').css("display", "initial");
        $(this).children('ul.child-menu').css("display", "inline-block");
    }, function() {
        // Hide submenu of hovered menu item
        $(this).children('.navi-arrow').css("display", "none");
        $(this).children('ul.child-menu').css("display", "none");
        // Show submenu of selected menu item
        var menuElement = $('ul[role="menubar"] > li.selected.has-children');
        if( menuElement.is(':not(:first-child)')) {
            $(menuElement).children('.navi-arrow').css("display", "initial");
            $(menuElement).children('ul.child-menu').css("display", "inline-block");
        }
        // Check if first page is really selected
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
    
    // Save variable to local storage if first menu item is clicked
    $('ul[role="menubar"] > li.has-children').click(function() {
        if(typeof(Storage) !== "undefined") {
            localStorage.removeItem("mainPageClicked");
            if ($(this).is(':first-child')) {
                if(typeof(Storage) !== "undefined") {
                    localStorage.setItem("mainPageClicked", "1");
                } 
            }
        }
    });
    
    $(window).resize(setMainMenuWidth);
    $(window).load(setMainMenuWidth);
    
    // Wrap main menu item's text when screen get smaller
    function setMainMenuWidth() {
        var width = 0;
        var count = $('ul[role="menubar"] > li').size();
        var masa = $('ul[role="menubar"]').outerWidth();
        $('ul[role="menubar"] > li').each(function() {
            width += $(this).width();
        });
        
        console.log(width);
        console.log(masa);
        
        if(width > masa) {
            $('ul[role="menubar"] > li').each(function() {
                var widd = Math.round(95 / count);
                console.log(widd);
                $(this).css("width",widd+"%");
                $(this).css("padding","0 0 10px 0");
            });
        }
        else {
             $('ul[role="menubar"] > li').each(function() {
                $(this).css("width","initial");
                $(this).css("padding","0 15px 10px 15px");
             });
        }
    }
    $(window).resize(showClickedMenu);
    $(window).load(showClickedMenu);
    
    // Keep submenu 
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
    
    // Position submenu and navi-arrow correctly
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
        $(that).children('.navi-arrow').css("top", mainMenuHeight-20);
    }

})();