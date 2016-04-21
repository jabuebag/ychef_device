var historyView = myApp.addView('.history-view', {
    animatePages:false
});

historyView.router.loadPage('history.html');

$$('#history').on('show', function () {
    
});