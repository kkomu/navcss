// submenu-center
// submenu-onleft
// submenu-leftest
// submenu-onright
// submenu-rightest

var n = $('ul[role="menubar"]').children().length;
console.log(n);

// Mark one or two menu items as center
if (n % 2 !== 0) {
    var c = Math.round(n/2);
    $('ul[role="menubar"] > li:nth-child(' + c + ')').addClass("submenu-center");
}
else {
    var c1 = n/2;
    var c2 = c1+1;
    $('ul[role="menubar"] > li:nth-child(' + c1 + ')').addClass("submenu-center");
    $('ul[role="menubar"] > li:nth-child(' + c2 + ')').addClass("submenu-center");
}

$('ul[role="menubar"] > li:nth-child(1)').addClass("submenu-leftest");
$('ul[role="menubar"] > li:nth-child(' + n + ')').addClass("submenu-rightest");

if (n % 2 === 0) {
    for (i = 0; i < n / 2 - 1; i++) {
        console.log("hyy");
    }
}


var w = $('.has-children:nth-child(1) > ul').css( "width" );
$('.has-children:nth-child(1) > ul').addClass("assdalkjasdjllkas");
console.log(w);

var w = $('.has-children:nth-child(2) > ul').width();
console.log(w);

var w = $('.has-children:nth-child(3) > ul').width();
console.log(w);

var w = $('.has-children:nth-child(4) > ul').width();
console.log(w);

var w = $('.has-children:nth-child(5) > ul').width();
console.log(w);

var w = $('.has-children:nth-child(6) > ul').width();
console.log(w);

var w = $('.has-children:nth-child(1) > ul').children().length;
console.log(w);

$('li.has-children').click(function () {
    $(this).children('ul.child-menu').toggleClass('child-menu-visible');
});