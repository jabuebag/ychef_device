var username;
var password;

$$('#login-login-btn').on('click', function() {
    // myApp.closeModal('.popup-login');
    // myApp.showTab('#setting');
    username = $$('#login-username').val();
    password = $$('#login-password').val();
    if (!username) {
        myApp.alert('请输入用户名');
    } else if (!password) {
        myApp.alert('请输入密码');
    } else {
        myApp.showIndicator();
        login(username, password);
    }
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
        url: REMOTE_SERVER + "user/deviceLogin",
        crossDomain: true,
        jsonpCallback: 'callback',
        dataType: 'jsonp',
        success: function(responseData) {
            myApp.hideIndicator();
            myApp.closeModal('.popup-login');
            if (nextLink) {
                myApp.showTab('#home');
            } else {
               myApp.showTab('#setting'); 
            }
            
        },
        error: function(responseData) {
            myApp.hideIndicator();
            myApp.alert("登录失败");
            username = null;
            password = null;
        }
    });
}
