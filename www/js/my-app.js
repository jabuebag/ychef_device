var myApp = new Framework7({
    modalTitle: '提示',
    // Hide and show indicator during ajax requests
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }
});
var $$ = Dom7;

// used to store all the menus
var menuDatas;
// used to store collect menus
var menuCollectDatas = {data: []};