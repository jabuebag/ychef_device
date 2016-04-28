myApp.onPageAfterAnimation('setting_page', function (page) {
  $$('.ac-unregister').on('click', function () {
    var buttons = [
        {
            text: '注销帐号',
            label: true
        },
        {
            text: '注销',
            bold: true
        },
        {
            text: '取消',
            color: 'red'
        },
    ];
    myApp.actions(buttons);
});
});