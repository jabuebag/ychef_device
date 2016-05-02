var menuTemplate;
// get home view instance
var homeView = myApp.addView('.home-view', {
    dynamicNavbar: true,
    animatePages: false
});

// now load home page
homeView.router.loadPage('home.html');

// before home 'page' init event listener
myApp.onPageBeforeInit('home_page', function(page) {
    if (menuDatas) {
        initMenuData();
    } else {
        $$.getJSON('http://localhost:8080/listing/listingsJson', function(data) {
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
    // add pull refresh event
    $$('.pull-to-refresh-content').on('refresh', function(e) {
        // refresh menu list
        addRefreshedMenu();
    });
}

function bindHtmlData(template, data) {
    var compiledTemplate = Template7.compile(template);
    var result = compiledTemplate(data);
    return result;
}

function collectMenu(element) {
    var id = element.getAttribute('data');
    if (menuCollectDatas.data.find(function(temp) {
            return temp.id == id;
        })) {
        myApp.alert('该Menu已收藏！');
    } else {
        menuCollectDatas.data.push(menuDatas.data.find(function(temp) {
            return temp.id == id;
        }));
        myApp.alert('收藏成功！');
    }
}

function addRefreshedMenu() {
    $$.getJSON('http://localhost:8080/listing/listingsMoreJson/' + menuDatas.data[0].id, function(data) {
        var result = bindHtmlData(menuTemplate, data);
        $$('#MenuCard').prepend(result);
        // show refresh result label
        var refreshMsg;
        if (data.success) {
            refreshMsg = '目前有' + data.data.length + '条更新';
        } else {
            refreshMsg = '目前有0条更新';
        }
        $$('#pull-refresh-label').text(refreshMsg);
        $$('#pull-refresh-label').show();
        setTimeout(function() {
            $$('#pull-refresh-label').hide();
        }, 1000);
    });
    myApp.pullToRefreshDone();
}
