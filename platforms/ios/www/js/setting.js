var unregisterActionToken = false;
// get home view instance
var settingView = myApp.addView('.setting-view', {
    dynamicNavbar: true,
    animatePages: false
});

// now load home page
settingView.router.loadPage('settings.html');

$$('#setting').on('show', function() {
    username = signup_username;
    password = signup_password;
});

myApp.onPageBeforeInit('setting_page', function(page) {
    if (!unregisterActionToken) {
        addUnregisterAction();
    }
    $$('.tab-setting').on('click', function() {
        if (username) {
            myApp.showTab('#setting');
        } else {
            myApp.popup('.popup-login');
        }
    });
});

function addUnregisterAction() {
    $$('.ac-unregister').on('click', function() {
        var buttons1 = [{
            text: '注销帐号',
            label: true
        }, {
            text: '注销',
            bold: true,
            onClick: function() {
                username = null;
                myApp.showTab('#home');
            }
        }, ];
        var buttons2 = [{
            text: 'Cancel',
            color: 'red'
        }];
        var groups = [buttons1, buttons2];
        myApp.actions(groups);
    });
    unregisterActionToken = true;
}
