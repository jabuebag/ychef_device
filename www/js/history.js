myApp.onPageBeforeInit('history_page', function (page) {
    if (menuCollectDatas.data.length != 0) {
        $$('#collect-label').hide();
        initMenuCollectData();
    }
});

function initMenuCollectData() {
    var menuTemplate = $$('#MenuCollectTemplate').html();
    var result = bindHtmlData(menuTemplate, menuCollectDatas);
    $$('#collect-data-ul').html(result);
}