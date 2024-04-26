
//*********************************************
//  RESPONSIVE HOME PAGE BEFORE WINDOW LOAD
//*********************************************

// Check android devices OS system if they are older than 4.4
var ua = navigator.userAgent;
if (ua.indexOf("Android") >= 0) {
    var androidversion = parseFloat(ua.slice(ua.indexOf("Android") + 8)),
        wHeight = $(window).height();
    if (androidversion < 4.9) {
        $(".home .right-animation").css({ "height": wHeight + "px", "width": wHeight + "px" });
    }
}

// Start Window Load Function
$(window).on('load', function () {

    'use strict';

    //Quadra Modal
    if ($('#quadra_fixed_modal').exists()) {
        $.fn.qfmScript = function () {
            $('#quadra_fixed_modal:not(.hiding)').each(function () {
                //Open and Close Modal
                var $qfm = $(this), $qfmtop = $(this).find('.quadra_fixed_modal_top'), $qfmtitle = $(this).find('#qfm_title'), $qfmbutton = $(this).find('#qfm_button');
                $('.quadra_fixed_modal_top, .qfm-trigger').on('click', function () {
                    $qfm.toggleClass('active force-show');
                    $('body').toggleClass('qdr-modal-open');
                    $qfmtop.delay(400).toggleClass('open_modal');
                    $qfmtitle.delay(100).fadeToggle(900);
                    $qfmbutton.delay(100).fadeToggle(900);
                    $qfm.animate({ scrollTop: 0 }, "fast");
                    return false;
                });
                //Close the QFM with press ESC.
                $(document).keyup(function (e) { if (e.keyCode == 27) { $qfm.removeClass('active force-show'); $('body').removeClass('qdr-modal-open'); $qfmtop.delay(400).removeClass('open_modal'); $qfmtitle.delay(100).fadeOut(900); $qfmbutton.delay(100).fadeIn(900); $qfm.animate({ scrollTop: 0 }, "fast"); } });
                //caches a jQuery object containing the header element
                function showHideQFM() {
                    if ($qfm.data('showme') && $qfm.data('hideme')) {
                        //get positions
                        var showMe = $qfm.data('showme'), hideMe = $qfm.data('hideme'), winHeight = $(window).outerHeight(), showMeP = $(showMe).offset().top, hideMeP = $(hideMe).offset().top, nowP = $(this).scrollTop();
                        //Show and hide Modal
                        if (nowP >= showMeP - winHeight && nowP <= hideMeP - winHeight) { $qfm.addClass("clickable"); $('.drop-msg, #back-to-top').addClass('qfm-time'); } else { $qfm.removeClass("clickable"); $('.drop-msg, #back-to-top').removeClass('qfm-time'); }
                    }
                }
                window.onscroll = showHideQFM;
            });
        }
        $('body').qfmScript();
    }

    $('.oinone-box').each(function () {
        var $this = $(this);
        $($this).waypoint(function () {
            $this.addClass('oinone-loaded');
            this.destroy();
        }, { offset: '75%' });
    });

    $(".svg-slider").on('init', function () {
        var newPath = $(".slick-current .slide-img").attr("data-svg-path");
        $(".svg-mask .desktop-only path").attr("d", newPath);
    }).on('afterChange', function (event, slick, currentSlide) {
        var newPath = $(".slick-current .slide-img").attr("data-svg-path");
        $(".svg-mask .desktop-only path").attr("d", newPath);
    }).slick({ initialSlide: 0 });


    $(".more-trigger").each(function () {
        var item = $(this),
            elem = $(".home-socials a");
        $(window).on('click touchstart touch', function (event) { $(".home-socials .others.active, .more-trigger.active").removeClass('active'); });
        $(item).on('click touch', function () { $(".home-socials .others, .more-trigger").toggleClass('active'); return false; });
        $(elem).on('click touch touchstart', function (event) { event = event || window.event; event.stopPropagation(); });
    });


    $(".contents .articles article").each(function () {
        var article = $(this),
            imgChanger = $("#article-images img.article-image-changer"),
            imgSrc = $(this).find(".article-image").attr("src");
        $("#article-images .article-image-container").append('<div class="' + $(this).attr("id") + ' article-img" style="background-image: url(' + imgSrc + ')"></div>');
        $("#article-images .article-image-container .article-img:first-child").addClass("showing");

        $(article).waypoint(function (direction) {
            if (direction === 'up') {
                var activeImgClass = $(article).attr("id");
                $("." + activeImgClass).addClass("showing");
                $("#article-images .article-image-container").find(".article-img").not("." + activeImgClass).removeClass(activeImgClass).removeClass("showing");
            }
        }, { offset: '0%' });
        $(article).waypoint(function (direction) {
            if (direction === 'down') {
                var activeImgClass = $(article).attr("id");
                $("." + activeImgClass).addClass("showing");
                $("#article-images .article-image-container").find(".article-img").not("." + activeImgClass).removeClass(activeImgClass).removeClass("showing");
            }
        }, { offset: '75%' });
    });

    $(window).on("resize", function () {
        Waypoint.refreshAll();
    });






    // End Function
});


    //*********************************************
    //  TEAM TYPE 2 SCRIPTS
    //*********************************************

        // Team type 2 scripts
        if ($(".team-type-2").exists()) {
            $.fn.team2Function = function(options) {
                $('.team-type-2 .member').each(function(){
                    var descBody = $(this).find('.member-description'),
                        $this = $(this),
                        descBodyHeight = $(descBody).height() / 2,
                        bodyHeight = $(this).find('.member-body').height() / 2;
                    if(!!('ontouchstart' in window)){//check for touch device
                        $('div').not($this).on('touchstart touchmove', function (e) {
                             $(descBody).css({'top': 0});
                        });
                        $('body').on('touchstart touchmove', function (e) {
                             $(descBody).css({'top': 0});
                        });
                        $this.on('touchstart touchend touchmove', function (e) {
                            $(descBody).css({'top': - bodyHeight - descBodyHeight - 20});
                        });
                    }else{
                        $(this).on('mouseover', function(){
                            var descBody = $(this).find('.member-description'),
                            descBodyHeight = $(descBody).height() / 2,
                            bodyHeight = $(this).find('.member-body').height() / 2;
                            $(descBody).css({'top': - bodyHeight - descBodyHeight - 20});
                        });
                        $(this).on('mouseout', function(){
                            $(descBody).css({'top': 0});
                        });
                    }
                });
            }
            $('.team-type-2').team2Function();
            $(window).resize(function(){ $('.team-type-2').team2Function(); });
        }

    //Calculate Items Width
        $.fn.calculateWidth = function() {
            $('.calculate-width').each(function(){
                var $this = $(this), tagCount = $(this).find('> *').not('.no-calculate').length, tags = $(this).find('> *').not('.no-calculate'), contWidth = $(this).width();
                $(this).addClass('clearfix'); $(tags).addClass('width-calculated').css({'width': contWidth / tagCount + 'px'});
            });
        }; $('body').calculateWidth();

    //Quadra Interactive Packages Scripts
        if ($(".interactive-packages").exists()){
            $('.interactive-packages .steps .step').each(function(){
                var itemNr = $(".step").index( this ) + 1,
                    $this = $(this),
                    stepW = $this.width(),
                    startWith = $('.interactive-packages .steps').attr('data-startWith');
                $('.selector').css({'right': stepW / 2 + 'px'});
                $('.interactive-packages .package_title span.title_selector').text(($(startWith).data('name')));
                //Get texts
                $('.interactive-packages .package-boxes .box1 span.box-title-selector').text(($(startWith).data('box1'))); $('.interactive-packages .package-boxes .box2 span.box-title-selector').text(($(startWith).data('box2'))); $('.interactive-packages .package-boxes .box3 span.box-title-selector').text(($(startWith).data('box3'))); $('.interactive-packages .package-boxes .box4 span.box-title-selector').text(($(startWith).data('box4')));
                //Get elements when click
                $this.on('click', function(){
                    var stepWidth = $('.steps .step').width();
                    $('.interactive_bar').css({'width': itemNr * stepWidth + 'px'}); $('.interactive-packages .title').removeClass('active'); $('.interactive-packages .title:nth-child(' + itemNr + ')').addClass('active'); $('.interactive-packages .package_title span.title_selector').text(($this.data('name'))); $('.interactive-packages .package-boxes .box1 span.box-title-selector').text(($this.data('box1')));
                    $('.interactive-packages .package-boxes .box2 span.box-title-selector').text(($this.data('box2'))); $('.interactive-packages .package-boxes .box3 span.box-title-selector').text(($this.data('box3'))); $('.interactive-packages .package-boxes .box4 span.box-title-selector').text(($this.data('box4')));
                });
            });
        }


//*********************************************
//  CONTACT FORM VALIDATE SCRITPS
//*********************************************

//Contact Form Settings
var rnuma = Math.floor(Math.random() * 5);
var rnumb = Math.floor(Math.random() * 5);
var sum = rnuma + rnumb;
$("#math").html(sum); $("#verify").attr("placeholder", rnuma + "+" + rnumb + "= ?");
var validator = $('#contact_form, .quick_form, #newsletter_form');

// Validate Contact Form
$(validator).each(function () {
    var sendBtn = $(this).find('button#submit'),
        $this = $(this),

        timer = window.setTimeout(3500);

    // Classic Quadra Validate
    $(this).validate({
        ignore: ".ignore",
        rules: {
            verify: { equalTo: "#math" },
            hiddenRecaptcha: {
                required: function () {
                    if (grecaptcha.getResponse() === '') {
                        $('.g-recaptcha').addClass('error_warning');
                        return true;
                    } else {
                        $('.g-recaptcha').removeClass('error_warning');
                        return false;
                    }
                }
            }
        },
        onfocusout: false,
        showErrors: function (map, list) {
            this.currentElements.removeClass("error_warning");
            this.currentElements.closest('.border-effect').removeClass('error_warning');
            $.each(list, function (index, error) {
                window.clearTimeout(timer);
                $(error.element).addClass("error_warning");
                $(error.element).closest('.border-effect').addClass('error_warning');
                $("div#error_message").fadeIn(300).clearQueue();
                $("div#error_message").on("click", function () { $(this).fadeOut("fast"); window.clearTimeout(timer); });
                timer = window.setTimeout(function () { $("div#error_message").fadeOut("fast"); }, 3500);
            });
        },
        submitHandler: function (form) {
            event.preventDefault();
            // console.log(form.name.value);

            $(sendBtn).not('.loading').addClass('loading').append("<span class='loader'></span>");
            console.log(form);
            var mailObj = {
                name: form.name.value,
                email: form.email.value,
                subject: form.subject.value,
                // phone:form.phone.value,
                message: form.message.value
            }
            console.log(mailObj);



            $.ajax({
                url: form.action,
                type: form.method,
                // data: new FormData($(validator)[0]),
                data: jQuery.param(mailObj),
                // data: jQuery.param(
                //     mailObj),
                cache: false,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                processData: false,
                success: function () {
                    $("div#error_message").fadeOut("fast");
                    $("div#submit_message").fadeIn("fast");
                    $(validator).find(".inputfile + label span").empty();
                    setTimeout(function () { $("div#submit_message").fadeOut("fast"); }, 5000);
                    $(sendBtn).removeClass('loading');
                    $(validator).trigger("reset");
                }
            });
            // return false;
        }
    });

});



(function ($, window, document, undefined) {

    'use strict';



        //Get screen size of device
        $.fn.getDeviceWidth = function() {
            if ($(window).width() > 1280 ) { $('body').not('.device-lg').removeClass("device-lg device-md device-sm device-xs device-xxs").addClass('device-lg'); }
            if ($(window).width() > 1024 && $(window).width() < 1280 ) { $('body').not('.device-md').removeClass("device-lg device-md device-sm device-xs device-xxs").addClass('device-md'); }
            if ($(window).width() > 769 && $(window).width() < 1024 ) { $('body').not('.device-sm').removeClass("device-lg device-md device-sm device-xs device-xxs").addClass('device-sm'); }
            if ($(window).width() > 480 && $(window).width() < 769 ) { $('body').not('.device-xs').removeClass("device-lg device-md device-sm device-xs device-xxs").addClass('device-xs'); }
            if ($(window).width() < 480 ) { $('body').not('.device-xxs').removeClass("device-lg device-md device-sm device-xs device-xxs").addClass('device-xxs'); }
        }
        $('body').getDeviceWidth();


    //*********************************************
    //  GOOGLE MAP 2 - Gray
    //*********************************************

    // Map Coordination - Map looks
    var position = new google.maps.LatLng(30.9003263,75.7866329);
    // First Marker Coordination
    var myposition = new google.maps.LatLng(30.902282,75.8201693);
    // Map Options
    var myOptions = {
        zoom: 13,
        // center: position,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        scrollwheel: false,
        // Google Map Color Styles
        styles:
            [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]
    };
    //Map ID
    var map = new google.maps.Map(document.getElementById('google_map'), myOptions),
        // Marker Images for first and second
        image = 'images/marker4.png',
        // Your Title and description
        contentString = '<h4>' + 'Auribises Technologies' + '</h4><p>' + '2144 B20 Krishna Nagar, Ludhiana, India' + '</p>',
        //Marker Position and image selector
        marker = new google.maps.Marker({ position: myposition, map: map, icon: image }),
        // Infowindow
        infowindow = new google.maps.InfoWindow({ content: contentString });
    //Click function for marker
    google.maps.event.addListener(marker, 'click', function () { infowindow.open(map, marker); });


    //*********************************************
    //  DEMOS
    //*********************************************

    $('#demos').cubeportfolio({
        loadMoreAction: 'click',
        layoutMode: 'grid',
        animationType: 'quicksand',
        gridAdjustment: 'responsive',
        defaultFilter: '*',
        caption: 'none',
        displayType: 'none',
        displayTypeSpeed: 0,
        gapHorizontal: 65,
        gapVertical: 40,
        mediaQueries: [{
            width: 1700,
            cols: 4
        }, {
            width: 1540,
            cols: 3,
            options: {
                caption: '',
                gapHorizontal: 70,
                gapVertical: 50,
            }
        }, {
            width: 1281,
            cols: 3,
            options: {
                caption: '',
                gapHorizontal: 55,
                gapVertical: 25,
            }
        }, {
            width: 993,
            cols: 3,
            options: {
                caption: '',
                gapHorizontal: 40,
                gapVertical: 20,
            }
        }, {
            width: 640,
            cols: 2,
            options: {
                caption: '',
                gapHorizontal: 25,
                gapVertical: 15,
            }
        }, {
            width: 300,
            cols: 1,
            options: {
                caption: '',
                gapHorizontal: 25,
                gapVertical: 15,
            }
        }]
    });

    // End Function
})(jQuery, window, document);



