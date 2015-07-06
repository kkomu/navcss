$( window ).load(getSubmenuOffset);
$( window ).resize(getSubmenuOffset);

/**
 * getSubMenuOffset
 * Horizontally center submenu when screen size changes
 */
function getSubmenuOffset() {
    var mainMenuWidth = $('ul[role="menubar"]').width();
    var subMenuWidth = parseInt($('ul.child-menu').css("min-width"));
    var subMenuOffset = (mainMenuWidth/2)-(subMenuWidth/2);
    $('ul.child-menu').css("left",subMenuOffset);
}