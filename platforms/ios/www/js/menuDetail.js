var currentListingId;
var menuPrice;
// before menu detail 'page' init event listener
myApp.onPageBeforeInit('detail_page', function (page) {
    initHome=false;
    currentListingId = page.query.id;
    initMenuDetailData(currentListingId);
});

function initMenuDetailData(currentListingId) {
    var menuDetailTemplate = $$('#MenuDetailTemplate').html();
    $$.getJSON('http://192.168.1.52:8080/listing/detailPortalJson/'+currentListingId, function (data) {
        var menuDetailData = data;
        menuPrice = menuDetailData.price;
        var result = bindHtmlData(menuDetailTemplate, menuDetailData);
        $$('#MenuDetailCard').html(result);
    });
}