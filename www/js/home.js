// get home view instance
var homeView = myApp.addView('.home-view', {
    dynamicNavbar: true,
    animatePages: false
});

// now load home page
homeView.router.loadPage('home.html');

// before home 'page' init event listener
myApp.onPageBeforeInit('home_page', function (page) {
    if (!initHome) {
        if (menuDatas) {
            initMenuData();
        } else {
            $$.getJSON('http://localhost:8080/listing/listingsJson', function (data) {
                menuDatas = data;
                initMenuData();
            });
        }
        initHome=true;
    }
});

function initMenuData() {
    var menuTemplate = $$('#MenuTemplate').html();
    var result = bindHtmlData(menuTemplate, menuDatas);
    $$('#MenuCard').html(result);
    $$('.alert-collect').on('click', function (event) {
        var id = event.target.getAttribute('data');
        menuCollectDatas.data.push(menuDatas.data.find(function (temp) {
            return temp.id == id;
        }));
        myApp.alert('收藏成功！');
    });
}

function bindHtmlData(template, data) {
    var compiledTemplate = Template7.compile(template);
    var result = compiledTemplate(data);
    return result;
}