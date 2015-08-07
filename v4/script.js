$( document ).ready(function() {
    'use strict';

    $(window).resize(setMainMenuWidth);
    $(window).resize(showClickedMenu);
    $(window).load(setMainMenuWidth);
    $(window).load(showClickedMenu);

    // Liferay uses class 'selected' on menu item that has been selected
    // We'll show the child-menu whenever main menu item has class '.selected'
    // However the the class 'selected' is added to main page by default
    // We don't want to show the child-menu when we visit the page first time
    // Local storage is used to store value when main page has actually been clicked

    // Handle hovering main menu items
    $('nav#navigation > ul[role="menubar"] > li.has-children').hover(function() {
        // Hide submenu of '.selected menu' item
        var menuElement = $('li.has-children.selected');
        $(menuElement).children('ul.child-menu').css("display", "none");
        $(menuElement).children('.navi-arrow').css("display", "none");
        // Show submenu of hovered menu item
        setNaviArrowPosition(this);
        $(this).children('.navi-arrow').css("display", "inline");
        $(this).children('ul.child-menu').css("display", "block");
    }, function() {
        // Hide submenu of hovered menu item
        $(this).children('.navi-arrow').css("display", "none");
        $(this).children('ul.child-menu').css("display", "none");
        // Show submenu of '.selected' menu item
        var menuElement = $('nav#navigation > ul[role="menubar"] > li.selected.has-children');
        // If it's not the main page then just show '.selected' page
        if( menuElement.is(':not(:first-child)')) {
            $(menuElement).children('.navi-arrow').css("display", "inline");
            $(menuElement).children('ul.child-menu').css("display", "block");
        }
        // Check if first page is really selected
        else {
            if(typeof(Storage) !== "undefined") {
                var pageName = localStorage.getItem("mainPageClicked");
                if(pageName !== null) {
                    setNaviArrowPosition(menuElement);
                    $(menuElement).children('.navi-arrow').css("display", "inline");
                    $(menuElement).children('ul.child-menu').css("display", "block");
                }
            }
        }
    });

    // Save variable to local storage if first menu item is clicked
    $('nav#navigation > ul[role="menubar"] > li.has-children').click(function() {
        if(typeof(Storage) !== "undefined") {
            localStorage.removeItem("mainPageClicked");
            if ($(this).is(':first-child')) {
                if(typeof(Storage) !== "undefined") {
                    localStorage.setItem("mainPageClicked", "1");
                }
            }
        }
    });

    // Wrap main menu item's text when screen get smaller
    function setMainMenuWidth() {
        var menuItemsWidth = 0;
        var menuItemCount = $('nav#navigation > ul[role="menubar"] > li').size();
        var naviWidth = $('nav#navigation > ul[role="menubar"]').outerWidth();
        $('nav#navigation > ul[role="menubar"] > li').each(function() {
            menuItemsWidth += $(this).width();
        });
        if(menuItemsWidth > naviWidth) {
            $('nav#navigation > ul[role="menubar"] > li').each(function() {
                var itemWidth = Math.round(95 / menuItemCount);
                console.log(itemWidth);
                $(this).css("width",itemWidth+"%");
            });
        }
        else {
            $('nav#navigation > ul[role="menubar"] > li').each(function() {
                $(this).css("width","initial");
            });
        }
    }


    // Show child-menu under '.selected' main menu item
    function showClickedMenu() {
        // Show child-menu when it's parent has selected-class UNLESS it's the main page
        var selectedElement = $('nav#navigation > ul[role="menubar"] > li.selected.has-children');
        if( selectedElement.is(':not(:first-child)')) {
            setNaviArrowPosition(selectedElement);
            $(selectedElement).children('ul.child-menu').css("display", "block");
            $(selectedElement).children('.navi-arrow').css("display", "inline");
        }
        // Show main page child-menu ONLY when it's clicked from navigation
        else {
            if(typeof(Storage) !== "undefined") {
                var pageName = localStorage.getItem("mainPageClicked");
                if(pageName !== null) {
                    var menuElement = $('nav#navigation > ul[role="menubar"] > li.has-children.selected');
                    setNaviArrowPosition(menuElement);
                    $(menuElement).children('ul.child-menu').css("display", "block");
                    $(menuElement).children('.navi-arrow').css("display", "inline");
                }
                else {
                    $('ul.child-menu').css("display", "none");
                    $('.navi-arrow').css("display", "none");
                }
            }
        }
    };

    // Position  navi-arrow correctly
    function setNaviArrowPosition(that) {
        // Center navi-arrow horizontally
        var menuItemPosition = $(that).position().left;
        var menuItemWidth = $(that).outerWidth();
        var naviArrowOffset = Math.round(menuItemPosition + menuItemWidth/2);
        $(that).children('.navi-arrow').css("left",naviArrowOffset);
    }
});