myApp.onPageBeforeInit('history_page', function (page) {
    initMenuCollectData();
});

function initMenuCollectData() {
    var menuTemplate = $$('#MenuCollectTemplate').html();
    var result = bindHtmlData(menuTemplate, menuCollectDatas);
    $$('#collect-data-ul').html(result);
}