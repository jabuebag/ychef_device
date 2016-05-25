// get home view instance
var historyView = myApp.addView('.history-view', {
    dynamicNavbar: true,
    animatePages: false
});

// now load home page
historyView.router.loadPage('history.html');

$$('#history').on('show', function() {
    if (menuCollectDatas.data.length != 0) {
        historyView.router.reloadPage('history.html');
        $$('#collect-label').hide();
        initMenuCollectData();
    }
});

myApp.onPageBeforeInit('home_page', function(page) {
    $$('.tab-setting').on('click', function() {
        if (username) {
            myApp.showTab('#setting');
        } else {
            myApp.popup('.popup-login');
        }

        //myApp.showTab('#setting');
    });
});

function initMenuCollectData() {
    var menuTemplate = $$('#MenuCollectTemplate').html();
    var result = bindHtmlData(menuTemplate, menuCollectDatas);
    $$('#collect-data-ul').html(result);
}
