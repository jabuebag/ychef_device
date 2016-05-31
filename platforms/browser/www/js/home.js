// template7 template
var menuTemplate;
var menuTitleTemplate;
// Loading flag
var infinitLoading = false;
// get home view instance
var homeView = myApp.addView('.home-view', {
    dynamicNavbar: true,
    animatePages: false
});

var menuSearchbar;

// now load home page
homeView.router.loadPage('home.html');

$$('#home').on('show', function() {});

// before home 'page' init event listener
myApp.onPageBeforeInit('home_page', function(page) {
    if (menuDatas) {
        initMenuData();
    } else {
        myApp.showIndicator();
        $$.getJSON(REMOTE_SERVER + 'listing/listingsJson', function(data) {
            menuDatas = data;
            initMenuData();
            initMenuTitleData();
        });
        myApp.hideIndicator();
    }
    // add pull refresh event
    $$('.pull-to-refresh-content').on('refresh', function(e) {
        // refresh menu list
        addRefreshedMenu();
    });
    // add infinit scroll event
    $$('.infinite-scroll').on('infinite', function() {
        // Exit, if loading in progress
        if (infinitLoading) return;
        // Set loading flag
        infinitLoading = true;
        addInfinitMenu();
        infinitLoading = false;
    });
    // init search bar
    menuSearchbar = myApp.searchbar('.searchbar', {
        searchList: '.list-block-search',
        searchIn: '.item-title',
        onEnable: function(s) {
            $$('#MenuCard').hide();
            $$('#menu-search-list').show();
        },
        onDisable: function(s) {
            $$('#MenuCard').show();
            $$('#menu-search-list').hide();
        }
    });

    $$('.tab-setting').on('click', function() {
        if (username) {
            myApp.showTab('#setting');
        } else {
            myApp.popup('.popup-login');
        }

        //myApp.showTab('#setting');
    });
});

function initMenuData() {
    menuTemplate = $$('#MenuTemplate').html();
    if (!menuTemplate) {
        return;
    }
    var result = bindHtmlData(menuTemplate, menuDatas);
    $$('#MenuCard').html(result);
}

function initMenuTitleData() {
    menuTitleTemplate = $$('#MenuTitleTemplate').html();
    if (!menuTitleTemplate) {
        return;
    }
    var result = bindHtmlData(menuTitleTemplate, menuDatas);
    $$('#search-list-Data').html(result);
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
    $$.getJSON(REMOTE_SERVER + 'listing/listingsRefreshJson/' + menuDatas.data[0].id, function(data) {
        var refreshMsg;
        if (data.success) {
            var menuResult = bindHtmlData(menuTemplate, data);
            $$('#MenuCard').prepend(menuResult);
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

function addInfinitMenu() {
    $$.getJSON(REMOTE_SERVER + 'listing/listingsMoreJson/' + menuDatas.data[menuDatas.data.length - 1].id, function(data) {
        if (data.success) {
            var result = bindHtmlData(menuTemplate, data);
            $$('#MenuCard').append(result);
        }
    });
}
