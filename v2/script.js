var subMenuWidth = 950;

$( window ).load(getSubmenuOffset);
$( window ).resize(getSubmenuOffset);

function getSubmenuOffset() {
    var mainMenuWidth = $('ul[role="menubar"]').width();
    var subMenuOffset = (mainMenuWidth/2)-(subMenuWidth/2);
    $('ul.child-menu').css("left",subMenuOffset);
}