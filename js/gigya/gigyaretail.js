// CONSTANTS

var CAMERA_SHOP = 1;
var PET_SHOP = 2;
var CPG_SHOP = 3;

// VARIABLES

var pagetype = '';
var hasPassword;
var isLoggedIn;
var gUID;
var qrcode = null;

// PETS only
var pets = [];

// Camera only
var photogType = "";
var gearUsage = "";

// Store depending configuration
var setup_done = -1; // 1=camera, 2=pet, 3=cpg
var loginSSet = "";
var proproSSet = "";
var proproStartScreen = "";
var profileSSet = "";
var embedProfileSSet = "";
var embedProfileStartScreen = "";
var reauthSSet = "";
var nlSSet = "";

// Friends mgt
var query = "";
var exptime = null;

// Mobile mgt
var isMobile = false; //initiate as false

function setupCpgStore(){
    console.log('CPG STORE');
    loginSSet = "CPG-RegistrationLogin";
    proproSSet = "progressive-profiling"; 
    proproStartScreen = "skin-capture"; 
    profileSSet = "CPG-ProfileUpdate";
    embedProfileSSet = "screen-set-a";
    embedProfileStartScreen = "edit-profile1";
    reauthSSet = "Pet-ReAuthentication";
    nlSSet = "NL-RegistrationLogin";
    setup_done = CPG_SHOP;
}

function setupCameraStore(){
    console.log('CAMERA STORE');
    loginSSet = "Retail-RegistrationLogin";
    proproSSet = "progressive-profiling"; 
    proproStartScreen = "photo-capture"; 
    profileSSet = "Retail-ProfileUpdate";
    embedProfileSSet = "screen-set-a";
    embedProfileStartScreen = "edit-profile1";
    reauthSSet = "Pet-ReAuthentication";
    nlSSet = "NL-RegistrationLogin";
    setup_done = CAMERA_SHOP;
}

function setupPetStore(){
    console.log('PET FOOD');
    loginSSet = "Pet-RegistrationLogin";
    proproSSet = "progressive-profiling";
    proproStartScreen = "pet-nb-capture";
    profileSSet = "Pet-ProfileUpdate";
    embedProfileSSet = "screen-set-a";
    embedProfileStartScreen = "edit-profile1";
    reauthSSet = "Pet-ReAuthentication";
    nlSSet = "NL-RegistrationLogin";
    setup_done = PET_SHOP;
}

function setupWhichStore(){
    if (setup_done == -1) {
        // specific site
        if (location.hostname == "cpg.gigyaretail.com") {
            setupCpgStore();
            return 0;
        }

        // generic site
        switch () {
        case 3:
            setupCameraStore();
            break;
        case 9:
            setupPetStore();
            break;
        default:
            alert("This store content is not supported");
        }
    }
}

// GLOBAL SETUP & ONLOAD

jQuery(document).ready(function () {

    console.log('onload! '+CURRENT_ROOT_CATEGORY);

    // first step - detect if pet or cameras or whatever...
    setupWhichStore();

    // fixes logout and customise "account" links from the menu
    jQuery("a[title$='Log Out']").attr("onclick","gigya.accounts.logout();");
    jQuery('a[href$="nl.html"]').attr("onclick","subscribeMe(event);");
    jQuery('a[href$="nl.html"]').attr("href","#");
    jQuery('a[href$="customer/account/"]').eq(2).attr("onclick","loginAndRedirect(null);");
    jQuery('a[href$="customer/account/"]').eq(2).attr("href","#");

    //http://gigyaretail.com/index.php/customer/account/

    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

    //registers events 
    gigya.accounts.addEventHandlers({
        onLogin:loginEventHandler,
        onLogout:logoutEventHandler
    });

    //checks for the session (TODO: re-use the one Magento must have done...)

    gigya.accounts.getAccountInfo( // checks login status - accounts
    {
        include: "profile, data, identities-all",
        callback: getaccountinfoEventHandler
    });

    console.log('should be doing my thing here...');

    //page customisation
    if (document.getElementsByClassName('checkout-onepage-index').length > 0) {
        pagetype = 'checkout';
    }

    if (document.getElementsByClassName('catalog-product-view').length > 0) {
        pagetype = 'product';
        console.log('product!!');

        //disable Gigya reviews before re-implementing them myself?
        document.getElementsByClassName('box-reviews')[0].id = "full_ratings";
        showRatings();
        showTheRating();

        //hide native share
        document.getElementsByClassName('sharing-links')[0].style.display = 'none';

        // TODO: only if we have a session - which is not trivial as we are in onload only - no call to getaccountinfo yet [[
        if (true) {
            var params = {
                data: {
                    last_category: CURRENT_PRODUCT_INFO.category
                }
            };
            params.callback = logMe;
            gigya.accounts.setAccountInfo(params);
        }
        // ]]

    }

    if (document.getElementsByClassName('my-wishlist').length > 0) {
        pagetype = 'wishlist';
        console.log('wishlist!!');
        // TODO: only if we have a session - which is not trivial as we are in onload only - no call to getaccountinfo yet [[
        if (true) {
            console.log("wishlist store: "+CURRENT_WISHLIST.items);
            var params = {
                data: {
                    wishlist: CURRENT_WISHLIST
                }
            };
            params.callback = logMe;
            gigya.accounts.setAccountInfo(params);
        }
        // ]]
    }
    console.log('done my thiiiing!');

});

// CALL BACKS

function loginEventHandler(eventObj) {
    console.log(eventObj.profile.firstName + " has logged-in");
    console.log(eventObj);
}

function processLogin(eventObj) {
    
    // counting the number of logins (API only - no more cookie now)
    // STEP 1: get previous number
    if (eventObj.data.login_nb) { // we're in
        var nb = parseInt(eventObj.data.login_nb);
        nb++;
        console.log("now "+nb+"th login");

        // PROGRESSIVE PROFILING

        // STEP 1 - determining if we should show it based on previously captured data
        var captured_data = "";
        try {
            if (setup_done==PET_SHOP) {
                captured_data = ""+eventObj.data.pet.pets[0].name;
            }
            if (setup_done==CAMERA_SHOP) {
                captured_data = ""+eventObj.data.retail.surveys[0];
            }
            // TODO : add CPG case
        } catch(err) {
            captured_data = "";
        }

        // STEP 2: add the nb login logic
        if ((nb>=3) && ((captured_data == "")||(captured_data == "undefined"))) {
        //if (true) {

            params = {
                screenSet: proproSSet,
                startScreen: proproStartScreen,
                onAfterScreenLoad:afterProProHandler,
                onAfterSubmit:submitProProHandler
            }
            gigya.accounts.showScreenSet(params);

        } else {
            console.log('not showing propro - nb['+nb+'] - data['+captured_data+']');
        }

        var params = {
            data: {
                login_nb: ""+nb
            }
        };
        //params.callback = logMe;
        gigya.accounts.setAccountInfo(params);


        // TEMP TEST FRIENDS [[

        /*params = {
            detailLevel: "extended",
            siteUsersOnly: true,
            callback: manageFriends
        }
        gigya.socialize.getFriendsInfo(params);*/

        // ]]




    } else { // new guy
        console.log("First login [");

        if (setup_done == CAMERA_SHOP) { //camera section only
            var params = {
                data: {
                    login_nb: "1"
                }
            };

            params.callback = logMe;
            gigya.accounts.setAccountInfo(params);
        }
        // PET ONLY SECTION [
        if (setup_done == PET_SHOP) {
            var pets = [];
            //creating placeholders for the pets details
            for (i = 0; i < eventObj.data.pet.nb_pets; i++) {
                pets[i] = {
                    type: "",
                    breed: "",
                    name: "",
                    age: ""
                }
            }

            var params = {
                data: {
                    login_nb: "1",
                    pet: {
                        pets: pets
                    }
                }
            };

            params.data.pet.pets = pets;
            params.callback = logMe;
            gigya.accounts.setAccountInfo(params);
        }
        // PET ONLY SECTION ]

        console.log("First login ]");

    }
}

function manageFriends(responseObj) {
    var loc = window.location;
    var trueBaseUrl = loc.protocol + "//" + loc.host + "/";

    //console.log(responseObj);

    var friendsList = "";
    var friendsArray = responseObj.UIDs.split(",");

    for (i=0; i<friendsArray.length; i++) {
        friendsList += "'"+friendsArray[i]+"',";
    }
    friendsList = friendsList.slice(0, -1);

    query = "select profile.email, data.retail.type_photog, data.wishlist from accounts where UID in ("+friendsList+")";
    exptime = new Date().getTime();
    /*
    var url = trueBaseUrl + 'ws/generateQuerySig.php?query=' + encodeURIComponent(query) + "&exptime=" + exptime;

    new Ajax.Request(url, {
        onSuccess: function (trans) {
            console.log("AJAX:");
            console.log(trans.responseText);
            var params = {
                query: query,
                querySig: trans.responseText,
                expTime: exptime,
                callback: function (responseObj) {
                    console.log(responseObj);
                }
            }
            gigya.accounts.search(params);
        }
    });*/
}

function loginAndRedirect(url) {
    console.log("I should login and then redirect to here: "+url);

    if (url) {
        setCookie("redirectNow",url, 1);
    }

    params = {
        screenSet: loginSSet,
        context: url
    }
    gigya.accounts.showScreenSet(params);

}

function processPetProPro(index, prefix, screenID){

    // PET ONLY FUNCTION
    if (setup_done == PET_SHOP) {
        var name, breed, type, age;

        type = document.getElementById(prefix+'.type').value;
        breed = document.getElementById(prefix+'.breed').value;
        name = document.getElementById(prefix+'.name').value;
        age = document.getElementById(prefix+'.age').value;

        var params = {
            data:{
                pet:{
                    pets:[]
                }
            }
        };
        pets[index] = {
            type: type,
            breed: breed,
            name: name,
            age: age
        };
        params.data.pet.pets = pets;
        params.callback = logMe;
        gigya.accounts.setAccountInfo(params);

        console.log("i should close this: "+screenID);

        params = {
            screenSet:screenID
        }
        gigya.accounts.hideScreenSet(params);

        alert("Thank You!");
    }

}

function submitProProHandler(eventObj){

    if (setup_done == CAMERA_SHOP) {
        var params = {
            data: {
                retail: {
                    surveys: [
                        "picture_style"
                    ]
                }
            }
        };

        params.callback = logMe;
        gigya.accounts.setAccountInfo(params);
    }

}

function afterProProHandler(eventObj){
    
    // PET ONLY SECTION [
    if (setup_done == PET_SHOP) {
        // TODO: BUG
        console.log("i should refresh the selector here: "+document.getElementById("nb_pets_select").value);
    }
    // PET ONLY SECTION ]
}

function logMe(eventObj) {
    console.log("LOG ME");
    console.log(eventObj);    
}

function logoutEventHandler(eventObj) {
    console.log("User has logged-out");
}

function getaccountinfoEventHandler(responseObj){

    console.log("on user info:");
    console.log(responseObj);
            
    if (responseObj.profile == undefined) {
        console.log("no session");
        isLoggedIn = false;
        //jQuery(".skip-account .icon").css("background-image", "url(../images/icon_sprite.png)");
        //jQuery(".skip-account .icon").css("background-size", "initial");

    } else {
        console.log(responseObj.profile.firstName + " is in");
        isLoggedIn = true;
        gUID = responseObj.UID;

        if (getCookie("loginEvent")=="true") {
            console.log("ALP: this is a new login, not an existing session");
            processLogin(responseObj);
            setCookie("loginEvent","false", -1);
        }

        var redirectNow = getCookie("redirectNow");
        if (redirectNow!="") {
            console.log("ALP: need to redirect");
            setCookie("redirectNow","", -1);
            document.location = redirectNow;
        }

        // changes the my account behaviour to remove the screenset call
        jQuery("a[title$='My Account']").attr("href","/customer/account/");
        jQuery("a[title$='My Account']").attr("class","");

        if(responseObj.profile.thumbnailURL != undefined) {
            jQuery(".skip-account .icon").css("background-image", "url("+responseObj.profile.thumbnailURL+")");
            jQuery(".skip-account .icon").css("background-size", "contain");
            jQuery(".skip-account .icon").css("background-position", "0px");        
        }

        // PET ONLY SECTION [
        if (setup_done == PET_SHOP) {

            if (responseObj.data.last_category=="Cat Food") {
                document.getElementById('emoji').innerHTML = "🐱&nbsp;&nbsp;"
            } else if (responseObj.data.last_category=="Dog Food"){
                document.getElementById('emoji').innerHTML = "🐶&nbsp;&nbsp;"
            }
            // storing pets for later
            pets=responseObj.data.pet.pets;
        }
        // PET ONLY SECTION ]

        // checking if the user has a password (will be useful in the account page)
        hasPassword = false;
        for (i=0;i<responseObj.identities.length; i++) {
            if(responseObj.identities[i].provider == "site") {
                if (responseObj.identities[i].allowsLogin == true) {
                    //I HAVE A PASSWORD
                    hasPassword = true;
                    break;
                }
            }
        }
        if (hasPassword) {
            setCookie("hasPassword","1", 1);
        } else {
            setCookie("hasPassword","0", 1);
            console.log("NO PASSWORD");
        }

        if (pagetype=="checkout") {
            //console.log(responseObj);
            if (responseObj.loginProvider != "site") {
                triggerSeconAuth();
            }
        }



    }
}


function deleteMe() {
    new Ajax.Request(baseUrl + 'gigyaAccount/account/delete', {
        onSuccess: function (trans) {
            console.log("user deleted... redirecting to home...");
            window.location = trans.responseJSON.redirect;
        }
    });
}

function subscribeMe(event) {
    event.stopPropagation();
    params = {
        screenSet: nlSSet,
        startScreen: 'gigya-register-screen',
        onAfterScreenLoad:onAfterNLScreenLoadHandler,
        onAfterSubmit:onAfterNLSubmitHandler
    }
    gigya.accounts.showScreenSet(params);
}

function onAfterNLScreenLoadHandler() {
    jQuery("input[name*='password']").val("123456");
    jQuery("input[name*='password']").hide();
    jQuery("#hideme").hide();
}

function onAfterNLSubmitHandler() {
    alert('Thank you for subscribing to the Gigya Retail Newsletter!')
}

function fixProfileCSS() {
    css_fix = 'h1.gigya-screen-caption{margin:0;margin-bottom:10px;color:#636363;font-family:"Raleway", "Helvetica Neue", Verdana, Arial, sans-serif;font-size:18px;font-weight:400;font-style:normal;line-height:1.4;text-rendering:optimizeSpeed;text-transform:uppercase;margin-bottom:15px;padding-bottom:7px;border-bottom:1px solid #ededed}.gigya-label-text{display:inline-block !important;font-size:13px !important;font-family:"Raleway", "Helvetica Neue", Verdana, Arial, sans-serif !important;font-weight:600 !important;margin:0 !important;padding:0 !important;color:#636363 !important;line-height:1.5 !important}.gigya-input-text{width:365px !important;max-width:100% !important;height:30px !important;padding:0 8px !important;font-family:"Raleway", "Helvetica Neue", Verdana, Arial, sans-serif !important;color:#636363 !important;font-size:14px !important;line-height:1.5 !important;text-indent:5px !important;border-radius:4.5px !important;border:1px solid #b6bdc5 !important;box-sizing:border-box !important}.gigya-myPhoto-profile-box-wrapper{border-radius:3px !important;border:1px solid #b6bdc5 !important;position:relative !important;margin-left:10px !important;margin-top:30px !important}#social_mgt{margin-right:auto !important;margin-left:0px !important}.gigya-composite-control-checkbox{padding:0px !important}.gigya-input-checkbox{margin-right:5px !important;margin-bottom:3px !important}.buttons-set{clear:both;margin:10px 0 0 !important;padding-top:10px !important;border-top:1px solid #ededed !important;text-align:right !important}.buttons-set button.button{margin-left:5px !important;min-width:140px !important;padding:7px 15px !important;color:#FFFFFF !important;text-align:center !important}';
    var node = document.createElement('style'); //maybe I should have been re-injecting it after loading a screenset popup for the password reset...
    node.innerHTML = css_fix;
    document.body.appendChild(node);    
}

function showCustomProfileUpdate() {

    // Because this section can be called before the dom is ready, check for the store here too:
    setupWhichStore();
    console.log("showing custom screenset into the account page");

    document.getElementById('form-validate').style.display = 'none';
    
    fixProfileCSS();

    var jsonParams = JSON.parse('{"screenSet":"'+embedProfileSSet+'", "startScreen": "'+embedProfileStartScreen+'", "containerID": "pref-centre"}');
    jsonParams.onAfterScreenLoad = onAfterScreenLoadHandler;

    gigya.accounts.showScreenSet(jsonParams);

}


// UTIL METHODS FOR REGO / CIAM USE CASES

function showQR() {
    if (qrcode != null) {
        qrcode.clear();
        qrcode.makeCode(gUID);
    } else {
        qrcode = new QRCode(document.getElementById("qrcode"), gUID);
        jQuery("#qrcode").css({"position": "fixed", "top": "20%", "left": "15%", "right": "15%"});
        jQuery("#qrcode").click(hideQR);
    }
    jQuery("#qrcode").show();
}

function hideQR(eventObj) {
    jQuery("#qrcode").hide();
}

function triggerSeconAuth() {

    console.log("ALP: triggerSeconAuth!")

    params = {
        screenSet: reauthSSet,
        startScreen: "gigya-reauthentication-screen",
        onAfterScreenLoad: afterReAuthHandler,
        onHide: hideReAuthHandler
    };    
    gigya.accounts.showScreenSet(params); 
}

function changePassword() {
    //gigya-change-password-screen
    params = {
        screenSet: profileSSet,
        startScreen: 'gigya-change-password-screen'
    }
    gigya.accounts.showScreenSet(params);
}

function createPassword() {
	// showing
	// gigya-forgot-password-screen
	params = {
		screenSet: reauthSSet,
		startScreen: 'gigya-forgot-password-screen'
	}
	gigya.accounts.showScreenSet(params);
}

function afterReAuthHandler(eventObj){
    // show "back to login screen"
    document.getElementById('back-to-sign-in').className = "gigya-container-enabled";
}

function hideReAuthHandler(eventObj){
    // redirect to cart if cancel
    console.log("redirect to cart if cancel");
    //console.log(eventObj);
    if (eventObj.reason == "canceled") {
        window.location = "/checkout/cart/";
    }
}

function onAfterScreenLoadHandler(eventObj) {

    //console.log("too soon? "+document.getElementById('social_mgt'));

    if (isMobile) {
        jQuery('.gigya-myPhoto').eq(0).css("margin-bottom", "20px");
        jQuery('.gigya-myPhoto').eq(0).css("margin-left", "50px");
        jQuery('#qrcontainer').show();
    } else {
        jQuery('#qrcontainer').hide();
    }

    params = {
        version: 2,
        containerID: "social_mgt",
        width: "210",
        height: "50",
        requiredCapabilities: "login",
        enabledProviders: "facebook, twitter, googleplus, linkedin, messenger, yahoo",
        showTermsLink: "false",
        showEditLink: "false",
        hideGigyaLink: "true",
        onLoad: cnxUIload,
        onError: cnxUIerror
    };
    gigya.socialize.showAddConnectionsUI(params);

}

function onBeforeScreenLoadHandler(eventObj) {

    console.log("ALP: onBeforeScreenLoadHandler "+eventObj);

}

function onRaasErrorHandler(eventObj) {

    console.log("ALP: onRaasErrorHandler "+eventObj);

}

function cnxUIload(eventObj) {
    console.log("cnx load "+eventObj);
}

function cnxUIerror(eventObj) {
    console.log("cnx error "+eventObj);
}


// R&R METHODS

function onAddReviewClickedMgt(eventObj){
	console.log("plugin addreviewclicked "+eventObj);
}

function onReadReviewsClickedMgt(eventObj){
    console.log("plugin readreviewclicked "+eventObj);
}

function onLoadMgt(eventObj){
    console.log("plugin load "+eventObj);
}

function showRatings() {
    var params =
    {
        containerID: 'full_ratings',
        categoryID: 'Retail Default', 
        streamID: CURRENT_PRODUCT_INFO['sku'], // REPLACE WITH PRODUCT ID - tick
        version: 2,
        userHiResIcons: true,
        onLoad: commentsShown
    };

    gigya.comments.showCommentsUI(params);
}

function showTheRating() {
    var params =
    {
        categoryID: 'Retail Default',
        streamID: CURRENT_PRODUCT_INFO['sku'], // REPLACE WITH PRODUCT ID - tick
        linkedCommentsUI: 'full_ratings',
        showCommentButton: false,
        showReadReviewsLink: false,
        containerID: 'customer-reviews'
    };

    gigya.comments.showRatingUI(params);
    jQuery("#customer-reviews").css( 'cursor', 'pointer' );
    jQuery("#customer-reviews").attr("onclick","showReviews();");
}

function showReviews() {
    jQuery(".toggle-tabs").children()[1].click();
    jQuery('html, body').animate({
        scrollTop: jQuery('.product-collateral').offset().top
    }, 1000);
}

function commentsShown(eventObj) {
    // TODO: FIX FOR MOBILE
    $('#ratings').css({
        "width": "900px",
        "padding-left": "40px",
        "padding-right": "40px"
    });
    $('.gig-comment-rating-title').css({
        "width": "100px",
        "height": "20px"
    });
}

// COOKIE MGT METHODS

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
    //console.log("cookie ["+cname + "=" + cvalue + "; " + expires+"]");
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
