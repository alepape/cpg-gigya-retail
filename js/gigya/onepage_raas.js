/**
 *
 * Created with PhpStorm.
 * User:
 * Date: 7/6/14
 * Time: 4:18 PM
 */


var gigyaOnepage = gigyaOnepage || {};

gigyaOnepage.embedGigyaLogin = function () {
    jQuery('.col-2').hide();
    $('onepage-guest-register-button').enable();
}

gigyaOnepage.embedGigyaRe = function () {
    $('onepage-guest-register-button').disable();
    showSS();
}

function showSS() {
    var params = gigyaMageSettings.RaaS;
    gigya.accounts.showScreenSet(JSON.parse('{"screenSet": "' + params.WebScreen + '", "mobileScreenSet":"' + params.MobileScreen + '", "startScreen":"' + params.LoginScreen + '"}'));
}

gigyaOnepage.register = function () {
    console.log("check out onepage_raas.js if you read this...");
}

gigyaOnepage.init = function () {
    $$('.col-2 button[type=submit]')[0].remove();
    $$("#checkout-step-login .form-list")[0].observe("change", function(event) {
        var el = event.findElement("input");
        if (typeof el !== 'undefined') {
            console.log(el.value);
            if (el.value == 'register') {
                gigyaOnepage.embedGigyaRe();
            } else {
                gigyaOnepage.embedGigyaLogin();
            }
        }
    });
    gigyaOnepage.embedGigyaLogin();
}

document.observe("dom:loaded", function () {
   gigyaOnepage.init();
});
