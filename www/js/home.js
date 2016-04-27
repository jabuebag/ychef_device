// get home view instance
var homeView = myApp.addView('.home-view', {
    dynamicNavbar: true,
    animatePages: false
});

// now load home page
homeView.router.loadPage('home.html');

// before home 'page' init event listener
myApp.onPageBeforeInit('home_page', function (page) {
    initMenuData();
});

function initMenuData() {
    var menuTemplate = $$('#MenuTemplate').html();
    $$.getJSON('http://localhost:8080/listing/listingsJson', function (data) {
        var menuData = data;
        var result = bindHtmlData(menuTemplate, menuData);
        $$('#MenuCard').html(result);
    });
}

function bindHtmlData(template, data) {
    var compiledTemplate = Template7.compile(template);
    var result = compiledTemplate(data);
    return result;
}

// add event to template7 html show
$(window).load(function () {
    var i = setInterval(function () {
        if ($('.alert-collect').length) {
            clearInterval(i);
            $$('.alert-collect').on('click', function () {
                myApp.alert('收藏成功！');
            });
        }
    }, 100);
});