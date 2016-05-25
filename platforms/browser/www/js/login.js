var username;
var password;

$$('#login-login-btn').on('click', function() {
    // myApp.closeModal('.popup-login');
    // myApp.showTab('#setting');
    username = $$('#login-username').val();
    password = $$('#login-password').val();
    login(username, password);
});

$$('#login-signup-btn').on('click', function() {
    myApp.closeModal('.popup-login');
    myApp.popup('.popup-signup');
});

function login(username, password) {
    var data = '{"email" : "' + username + '" , "password" : "' + password + '" }';
    var data = JSON.parse(data);

    $.ajax({
        type: "POST",
        cache: true,
        data: data,
        url: "http://192.168.1.52:8080/user/deviceLogin",
        crossDomain: true,
        jsonpCallback: 'callback',
        dataType: 'jsonp',
        success: function(responseData) {
            myApp.closeModal('.popup-login');
            myApp.showTab('#setting');
        },
        error: function(responseData) {
            myApp.alert("登录失败");
            username = null;
            password = null;
        }
    });
}
