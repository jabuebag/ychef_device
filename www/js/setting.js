var settingView = myApp.addView('.setting-view', {
    animatePages:false
});

settingView.router.loadPage('settings.html');
 
$$('#setting').on('show', function () {
    
}); 