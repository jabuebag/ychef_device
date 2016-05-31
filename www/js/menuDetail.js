var currentListingId;
var menuPrice;
var nextLink;

myApp.onPageBeforeAnimation('detail_page', function(page) {
    myApp.showIndicator();
});

myApp.onPageAfterAnimation('detail_page', function(page) {
    initHome = false;
    currentListingId = page.query.id;
    initMenuDetailData(currentListingId);
    myApp.hideIndicator();
    $$('#menu-detail-payment').on('click', function() {
        if (username) {
            homeView.router.loadPage({
                url: 'menuEvent.html',
                animatePages: true
            });
        } else {
            nextLink = 'menuEvent.html';
            myApp.popup('.popup-login');
        }

    });
});

function initMenuDetailData(currentListingId) {
    var menuDetailTemplate = $$('#MenuDetailTemplate').html();
    $$.getJSON(REMOTE_SERVER + 'listing/detailPortalJson/' + currentListingId, function(data) {
        var menuDetailData = data;
        menuPrice = menuDetailData.price;
        var result = bindHtmlData(menuDetailTemplate, menuDetailData);
        $$('#MenuDetailCard').html(result);
    });
}
