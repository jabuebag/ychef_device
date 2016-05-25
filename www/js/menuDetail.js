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
    $$.getJSON('http://localhost:8080/listing/detailPortalJson/'+currentListingId, function (data) {
        var menuDetailData = data;
        menuPrice = menuDetailData.price;
        var result = bindHtmlData(menuDetailTemplate, menuDetailData);
        $$('#MenuDetailCard').html(result);
    });
}