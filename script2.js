// submenu-center
// submenu-onleft
// submenu-leftest
// submenu-onright
// submenu-rightest

var n = $('ul[role="menubar"]').children().length;
console.log(n);

var w = 0;

//var e = $('.has-children:nth-child(1) > ul > li:nth-child(1)').offset();
var e = $('ul[role="menubar"] > li:nth-child(1)').offset();
console.log("e:"+e.left);

for (i = 1; i <= n; i++) {
    w += $('ul[role="menubar"] > li:nth-child(' + i + ')').outerWidth();
    console.log(i+":"+w);
    
    var b = $('ul[role="menubar"] > li:nth-child(' + i + ') > ul').children().length;
    for (u = 1; u <= b; u++) {
        var p = $('ul[role="menubar"] > li:nth-child(' + i + ') > ul li:nth-child(' + u +')').outerWidth();
        console.log(u+":"+p);
    }
    
    var y = $('ul[role="menubar"] > li:nth-child(' + i + ') > ul').position();
    console.log(y);
}
console.log(w);