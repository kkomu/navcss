

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

$('li.has-children').click(function () {
    var i = $(this).index();
    localStorage.setItem('submenu', i+1);
    //console.log(i);
    //$( this ).css("aria-selected","true");
});

function getOpenSubmenu() {
    var i = localStorage.getItem('submenu');
    if(i) {  
        //$('ul[role="menubar"] li:nth-child('+ i +') ul.child-menu').toggleClass("visible");
        $('ul[role="menubar"] li:nth-child('+ i +') ul.child-menu').css("display","table");
        localStorage.removeItem("submenu");
    }
}

// Liferay:
/*
function getOpenSubmenu() {
    $('li.has-children[aria-selected="true"] ul.child-menu').css("display","table");
}
*/

$( window ).load(getOpenSubmenu);
$( window ).load(getSubmenuOffset);
$( window ).resize(getSubmenuOffset);