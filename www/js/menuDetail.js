// before menu detail 'page' init event listener
myApp.onPageBeforeInit('detail_page', function (page) {
    initHome=false;
    var id = page.query.id;
    initMenuDetailData(id);
});

function initMenuDetailData(id) {
    var menuDetailTemplate = $$('#MenuDetailTemplate').html();
    $$.getJSON('http://localhost:8080/listing/detailPortalJson/'+id, function (data) {
        var menuDetailData = data;
        var result = bindHtmlData(menuDetailTemplate, menuDetailData);
        $$('#MenuDetailCard').html(result);
    });
}