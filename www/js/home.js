// get home view instance
var homeView = myApp.addView('.home-view', {
    animatePages:false
});

// now load home page
homeView.router.loadPage('home.html');

// home 'tab' show event listener
$$('#home').on('show', function () {
    
});

// before home 'page' init event listener
$$(document).on('pageBeforeInit', '.page[data-page="home_page"]', function (e) {
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

