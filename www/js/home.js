var menuTemplate;
// get home view instance
var homeView = myApp.addView('.home-view', {
    dynamicNavbar: true,
    animatePages: false
});

// now load home page
homeView.router.loadPage('home.html');

// before home 'page' init event listener
myApp.onPageBeforeInit('home_page', function (page) {
    if (menuDatas) {
        initMenuData();
    } else {
        $$.getJSON('http://localhost:8080/listing/listingsJson', function (data) {
            menuDatas = data;
            initMenuData();
        });
    }
});

function initMenuData() {
    menuTemplate = $$('#MenuTemplate').html();
    if (!menuTemplate) {
        return;
    }
    var result = bindHtmlData(menuTemplate, menuDatas);
    $$('#MenuCard').html(result);
    // add alert collect click action
    $$('.alert-collect').on('click', function (event) {
        collectMenu(event);
    });
    // add pull refresh event
    $$('.pull-to-refresh-content').on('refresh', function (e) {
        // refresh menu list
        addRefreshedMenu();
    });
}

function bindHtmlData(template, data) {
    var compiledTemplate = Template7.compile(template);
    var result = compiledTemplate(data);
    return result;
}

function collectMenu(event) {
    var id = event.target.getAttribute('data');
    if (menuCollectDatas.data.find(function (temp) {
            return temp.id == id;
        })) {
        myApp.alert('该Menu已收藏！');
    } else {
        menuCollectDatas.data.push(menuDatas.data.find(function (temp) {
            return temp.id == id;
        }));
        myApp.alert('收藏成功！');
    }
}

function addRefreshedMenu() {
    setTimeout(function () {
        $$.getJSON('http://localhost:8080/listing/listingsMoreJson/'+menuDatas.data[0].id, function (data) {
            var result = bindHtmlData(menuTemplate, data);
            $$('#MenuCard').prepend(result);
            $$('.alert-collect').on('click', function (event) {
                collectMenu(event);
            });
        });
        myApp.pullToRefreshDone();
    }, 1000);
}