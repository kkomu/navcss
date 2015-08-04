$( document ).ready(function() {
        // Position css-arrow under the main menu item for mega-menu
        $('ul[role="menubar"] > li.has-children').hover(function() {

                var poss = $(this).position();
                var widd = $(this).width();
                if(poss !== undefined && widd != undefined) {
                    //console.log(poss.left);
                    //console.log(widd);

                    var arrowPos = Math.round(poss.left + widd / 2);
                    //console.log(arrowPos);
                    $(this).children('.mega-arrow').css("left", arrowPos);
                }

            });

        // Position css-arrow under the main menu item for child-menu
        $('ul[role="menubar"] > li.selected').each(function() {

                var poss = $(this).position();
                var widd = $(this).width();
                if(poss !== undefined && widd != undefined) {
                    //console.log(poss.left);
                    //console.log(widd);

                    var arrowPos = Math.round(poss.left + widd / 2);
                    //console.log(arrowPos);
                    $(this).children('.navi-arrow').css("left", arrowPos);
                }

        });

        var megaMenuVisible = {
            visibility: "visible",
            opacity: "1"
        };

        var megaMenuHidden = {
            visibility: "hidden",
            opacity: "0"
        };

        // Show mega-menu and mega-arrow when hovering top navigation
        $('ul[role="menubar"] > li.has-children > a').hover(function () {
            $('.navi-arrow').css("display", "none");
            $('li.selected > .child-menu').css("display", "none");
            $(this).siblings('.mega-arrow').css(megaMenuVisible);
            $(this).siblings('ul.mega-menu').css(megaMenuVisible);
        // Show child-menu and navi-arrow when not hovering
        }, function () {
            $(this).siblings('.mega-arrow').css(megaMenuHidden);
            $(this).siblings('ul.mega-menu').css(megaMenuHidden);
            $('.navi-arrow').css("display", "initial");
            $('li.selected > .child-menu').css("display", "table");
        });

        // Show mega-menu and mega-arrow when hovering mega-menu
        $('ul[role="menubar"] > li > ul.mega-menu').hover(function () {
            $('.navi-arrow').css("display", "none");
            $('li.has-children:hover > .mega-arrow').css(megaMenuVisible);
            $(this).css(megaMenuVisible);
        // Show child-menu and navi-arrow when not hovering
        }, function () {
            $('li.has-children:hover > .mega-arrow').css(megaMenuHidden);
            $(this).css(megaMenuHidden);
            $('.navi-arrow').css("display", "initial");
        });
});

$( window ).load(setSubmenuVerticalPosition);
$( window ).load(setSubmenuOffset);
$( window ).resize(setSubmenuOffset);

/**
 * setSubMenuOffset
 * Horizontally center submenu when screen size changes
 */
function setSubmenuOffset() {
    //var poss = $('ul[role="menubar"] > li.selected.has-children').position();
    var mainMenuWidth = $('nav#navigation').width();
    var subMenuWidth = parseInt($('ul.child-menu').css("min-width"));
    var subMenuOffset = (mainMenuWidth/2)-(subMenuWidth/2);
    $('ul.child-menu').css("left", subMenuOffset);
    $('ul[role="menubar"] > li.selected > .navi-arrow').css("display", "initial");
    $('ul[role="menubar"] > li.selected > ul.child-menu').css("display", "table");
}

/**
 * setSubmenuVerticalPosition
 * Vertically position submenu
 */
function setSubmenuVerticalPosition() {
    var mainMenuHeight = $('nav#navigation').height();
    $('ul.child-menu').css("top", mainMenuHeight);
    $('ul.mega-menu').css("top", mainMenuHeight);
}
