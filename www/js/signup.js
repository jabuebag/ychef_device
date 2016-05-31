var signup_username;
var signup_password;
var nickname;

$$('#signup-submit-btn').on('click', function() {
    // myApp.closeModal('.popup-login');
    // myApp.showTab('#setting');
    nickname = $$('#signup-nickname').val();
    signup_username = $$('#signup-username').val();
    signup_password = $$('#signup-password').val();
    if (!nickname) {
        myApp.alert('请输入昵称');
    } else if (!signup_username) {
        myApp.alert('请输入邮箱');
    } else if (!signup_password) {
    	myApp.alert('请输入密码');
    } else {
        myApp.showIndicator();
        signup(nickname, username, password);
    }
});

$$('#signup-login-btn').on('click', function() {
    myApp.closeModal('.popup-signup');
    myApp.popup('.popup-login');
});


function signup(nickname, username, password) {
    var data = '{"email" : "' + signup_username + '" , "password" : "' + signup_password + '" , "username" : "' + nickname + '" }';
    var data = JSON.parse(data);

    $.ajax({
        type: "POST",
        cache: true,
        data: data,
        url: REMOTE_SERVER + "user/deviceSignup",
        crossDomain: true,
        jsonpCallback: 'callback',
        dataType: 'jsonp',
        success: function(responseData) {
            myApp.hideIndicator();
            myApp.closeModal('.popup-signup');
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