$(document).ready(function() {
    var mainMenuWidth = $('nav#navigation').width();
    var subMenuWidth = parseInt($('ul.child-menu').css("min-width"));
    var mainMenuHeight = $('nav#navigation').height();
    $('ul.child-menu').css("top", mainMenuHeight);
    
    $('ul[role="menubar"] > li.has-children').hover(function() {
        var menuItemWidth = $(this).position().left;
        var subMenuOffset = (mainMenuWidth/2)-(subMenuWidth/2)-menuItemWidth;
        $(this).children('ul.child-menu').css("left", subMenuOffset);
        $(this).children('ul.child-menu').css("display", "table");
    }, function() {
        $(this).children('ul.child-menu').css("display", "none");
    });


});

//$( window ).load(setSubmenuOffset);
//$( window ).load(setSubmenuVerticalPosition);
//$( window ).resize(setSubmenuOffset);

/**
 * setSubMenuOffset
 * Horizontally center submenu when screen size changes
 */
function setSubmenuOffset() {
    var mainMenuWidth = $('nav#navigation').width();
    //console.log("mainMenuWidth: " + mainMenuWidth);
    var subMenuWidth = parseInt($('ul.child-menu').css("min-width"));
    //console.log("mainMenuWidth: " + mainMenuWidth);
    var subMenuOffset = (mainMenuWidth/2)-(subMenuWidth/2);
    //console.log("subMenuOffset: " + subMenuOffset);
    $('ul.child-menu').css("left", subMenuOffset);
}

/**
 * setSubmenuVerticalPosition
 * Vertically position submenu
 */
function setSubmenuVerticalPosition() {
    var mainMenuHeight = $('nav#navigation').height();
    //console.log("mainMenuHeight: " + mainMenuHeight);
    $('ul.child-menu').css("top", mainMenuHeight);
}