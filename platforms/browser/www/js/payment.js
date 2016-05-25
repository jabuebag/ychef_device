var GST = 1.05;
var cardNum;
var validateMonth;
var validateYear;
var cvvCode;
var email;
var stripToken;
// before menu detail 'page' init event listener
myApp.onPageBeforeInit('menu_payment_page', function(page) {

});

myApp.onPageAfterAnimation('menu_payment_page', function(page) {
    setElementValue();
    $$('#payment-menu-submit').on('click', function() {
        cardNum = $$('#cardNum-value').val();
        validateMonth = $$('#validateMonth-value').val();
        validateYear = $$('#validateYear-value').val();
        cvvCode = $$('#cvvCode-value').val();
        email = $$('#email-value').val();

        if (!validate_cardNum(cardNum)) {
            myApp.alert("请填写正确的卡号");
        } else if (!validate_validateMonth(validateMonth)) {
            myApp.alert("请填写正确的月份");
        } else if (!validate_validateMonth(validateYear)) {
            myApp.alert("请填写正确的年份");
        } else if (!validate_cvvCode(cvvCode)) {
            myApp.alert("请填写正确的安全码");
        } else if (!validate_email(email)) {
            myApp.alert("请填写正确的邮箱地址");
        } else {
            getToken();
        }
    });
});

function setElementValue() {
    $$('#payment-menu-total').html('TOTAL: ' + pickerPeopleValue * menuPrice * GST + '$');
    $$('#payment-menu-price').html(menuPrice);
    $$('#payment-menu-quantity').html(pickerPeopleValue);
}

function tokenResponseHandler(status, response) {
    if (response.error) {
        myApp.alert("非常抱歉，我们无法确认您的信用卡。");
    } else {
        stripToken = response.id;
        var data = '{"eventId" : "' + eventId + '" , "quantity" : "' + pickerPeopleValue + '" , "id" : "' + currentListingId + '" , "token" : "' + stripToken + '" , "email" : "' + email + '" }';
        var data = JSON.parse(data);

        $.ajax({
            type: "POST",
            cache: true,
            data: data,
            url: "http://192.168.1.52:8080/booking/chargeJson",
            crossDomain: true,
            jsonpCallback: 'callback',
            dataType: 'jsonp',
            success: function(responseData) {
                if (responseData.success) {
                    myApp.modal({
                        title: '厨说',
                        text: '恭喜您，支付成功！',
                        verticalButtons: true,
                        buttons: [{
                            text: '返回首页',
                            onClick: function() {
                                homeView.router.loadPage({
                                    url: 'home.html',
                                    animatePages: false
                                });
                            }
                        }, {
                            text: '已购菜单',
                            onClick: function() {
                                myApp.alert('You clicked second button!')
                            }
                        }]
                    });
                } else {
                    myApp.modal({
                        title: '厨说',
                        text: '很遗憾，支付失败！',
                        verticalButtons: true,
                        buttons: [{
                            text: '返回首页',
                            onClick: function() {
                                homeView.router.loadPage({
                                    url: 'home.html',
                                    animatePages: false
                                });
                            }
                        }, {
                            text: '重新支付',
                            onClick: function() {
                                cardNum = null;
                                $$('#cardNum-value').val('');
                                validateMonth = null;
                                $$('#validateMonth-value').val('');
                                validateYear = null;
                                $$('#validateYear-value').val('');
                                cvvCode = null;
                                $$('#cvvCode-value').val('');
                                email = null;
                                $$('#email-value').val('');
                                homeView.router.loadPage({
                                    url: 'payment.html',
                                    animatePages: false
                                });
                            }
                        }]
                    });
                }
            },
            error: function(responseData) {
                myApp.alert("系统故障，请重新预订");
            }
        });
    }
}

function getToken() {
    Stripe.card.createToken({
        number: cardNum,
        cvc: cvvCode,
        exp_month: validateMonth,
        exp_year: validateYear
    }, tokenResponseHandler);
}

function validate_cardNum(cardNum) {
    if (!validate_cardNum) {
        return false;
    }
    var re16digit = /^\d{16}$/
    if (!re16digit.test(cardNum)) {
        return false;
    } else {
        return true;
    }
}

function validate_validateMonth(validateMonth) {
    if (!validateMonth) {
        return false;
    }
    var re2digit = /^\d{2}$/
    if (!re2digit.test(validateMonth)) {
        return false;
    } else {
        return true;
    }
}

function validate_cvvCode(cvvCode) {
    if (!cvvCode) {
        return false;
    }
    var re3digit = /^\d{3}$/
    if (!re3digit.test(cvvCode)) {
        return false;
    } else {
        return true;
    }
}

function validate_email(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
