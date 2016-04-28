myApp.onPageAfterAnimation('setting_page', function (page) {
    $$('.ac-unregister').on('click', function () {
        var buttons1 = [
            {
                text: '注销帐号',
                label: true
        },
            {
                text: '注销',
                bold: true
        },
    ];
        var buttons2 = [
            {
                text: 'Cancel',
                color: 'red'
        }
    ];
        var groups = [buttons1, buttons2];
        myApp.actions(groups);
    });
});