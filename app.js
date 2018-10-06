//force stay at top
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

//timer countdown
var count = 0;
var counter = null;

// window.onload = function() {
//   initCounter();
// };

function initCounter() {
  // get count from localStorage, or set to initial value of 1000
  count = getLocalStorage('count') || 1000;
  counter = setInterval(timer, 1000); //1000 will  run it every 1 second
}

function setLocalStorage(key, val) {
  if (window.localStorage) {
    window.localStorage.setItem(key, val);
  }

  return val;
}

function getLocalStorage(key) {
    return window.localStorage ? window.localStorage.getItem(key) : '';
}

var deadline = 'November 1 2018';

function getTimeRemaining(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function timer() {
    count = setLocalStorage('count', count - 1);
    if (count == -1) {
        clearInterval(counter);
        return;
    }

    document.getElementById("days").innerHTML = getTimeRemaining(deadline).days;
    document.getElementById("hours").innerHTML = getTimeRemaining(deadline).hours;
    document.getElementById("minutes").innerHTML = getTimeRemaining(deadline).minutes;
    document.getElementById("seconds").innerHTML = getTimeRemaining(deadline).seconds;
}

$( "#clockdiv" ).addClass('animated fadeInUp');
$( ".clock-button-view" ).addClass('animated fadeInUp');


//Sticky top nav bar
$(document).ready(function() {
  // Custom 
  var stickyToggle = function(sticky, stickyWrapper, scrollElement) {
    var stickyHeight = sticky.outerHeight();
    var stickyTop = stickyWrapper.offset().top;

    if (scrollElement.scrollTop() >= stickyTop){
      stickyWrapper.height(stickyHeight);
      sticky.addClass("is-sticky");
    }
    else{
      sticky.removeClass("is-sticky");
      stickyWrapper.height('auto');
    }

    navbarModificationOnScroll(sticky, scrollElement);
    
};
  
  // Find all data-toggle="sticky-onscroll" elements
  $('[data-toggle="sticky-onscroll"]').each(function() {
    var sticky = $(this);
    var stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
    sticky.before(stickyWrapper);
    sticky.addClass('sticky');
    
    // Scroll & resize events
    $(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function() {
      stickyToggle(sticky, stickyWrapper, $(this));
    });
    
    // On page load
    stickyToggle(sticky, stickyWrapper, $(window));
  });
});

function navbarModificationOnScroll(sticky, scrollElement) {
    var navBarBrand = $(".navbar-light .navbar-brand");
    // var navBarItem = $(".navbar-light .navbar-nav .nav-item a");    
    var navBarItem = $(".nav-link");

    if (scrollElement.scrollTop() >= 430){ //50 is default, plus 380 header height
        sticky.addClass("nav-bar-bg-on-scroll");
        navBarBrand.css("color", "white");
        navBarItem.css("color", "white");

        if (scrollElement.scrollTop() >= 880) { //animate in whitepaper button, 500 is default height for whitepaper button, plus 380 header height
            $("#navbar-whitepaper-button").removeClass("d-none");
            $('#navbar-whitepaper-button').addClass('animated bounceInRight');
        }
    }
    else{
        sticky.removeClass("nav-bar-bg-on-scroll");
        navBarBrand.css("color", "black");
        navBarItem.css("color", "black");

        $("#navbar-whitepaper-button").addClass("d-none"); //hide whitepaper button if at top
    }
}

//typewriter
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    initCounter();
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #FF8600}";
    document.body.appendChild(css);

    $(".loading-screen").remove();
};

//load images
var imgs = [];
var imgUrls = ["resource/walletDetailsIphone.png","resource/marketIphone.png","resource/videoCallIphone.png","resource/messagingIphone.png"];
for (i=0;i<imgUrls.length;i++) {
    imgs.push(new Image());
    imgs[i].src = imgUrls[i]
}

//feature box 

function addOnHover(box) {
    box.addClass('feature-box-active');
    box.addClass('animated pulse');
}

function removeOtherOnHover(tempBox1,tempBox2,tempBox3) {
    tempBox1.removeClass('feature-box-active');
    tempBox2.removeClass('feature-box-active');
    tempBox3.removeClass('feature-box-active');
}

function changeIphoneBg(iphoneImg) {
    iPhoneDiv.css("width", "100%");
    iPhoneDiv.css("height", "100%");
    iPhoneDiv.css("margin", "0 auto");
    iPhoneDiv.css("background", "url(" + iphoneImg + ")" + " no-repeat center center");
    iPhoneDiv.css("background-size", "250%");
    iPhoneDiv.css("transition", "0.4s linear");
}

var box1 = $( "#feature-box-1" )
var box2 = $( "#feature-box-2" )
var box3 = $( "#feature-box-3" )
var box4 = $( "#feature-box-4" )

var iPhoneDiv = $( ".iphone-img-box" )

box1.mouseover(function() {
    addOnHover(box1);
    removeOtherOnHover(box2,box3,box4);

    changeIphoneBg("resource/walletDetailsIphone.png");
});
box1.mouseout(function() {
    box1.removeClass('animated pulse');
});

box2.mouseover(function() {
    addOnHover(box2);
    removeOtherOnHover(box1,box3,box4);

    changeIphoneBg("resource/marketIphone.png");
});
box2.mouseout(function() {
    box2.removeClass('animated pulse');
});

box3.mouseover(function() {
    addOnHover(box3);
    removeOtherOnHover(box1,box2,box4);

    changeIphoneBg("resource/videoCallIphone.png");
});
box3.mouseout(function() {
    box3.removeClass('animated pulse');
});

box4.mouseover(function() {
    addOnHover(box4);
    removeOtherOnHover(box1,box2,box3);
    changeIphoneBg("resource/messagingIphone.png");
});
box4.mouseout(function() {
    box4.removeClass('animated pulse');
});

//google chart
google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Token', 'Percentage of distribution'],
            ['Token Sale', 40],
            ['Founders & Management', 20],
            ['Partners & Advisors', 20],
            ['Treasury', 15],
            ['Community Development', 5]
        ]);

        var options = {
        titleTextStyle: {color: 'rgba(27, 47, 83, 1)', fontSize: 20},
        backgroundColor: 'transparent',
        // legend: 'none',
        pieSliceText: 'label',
        title: 'Token Distribution',
        pieStartAngle: 100,
        colors: ['#48a3ff', '#488dff', '#4864ff', '#4e48ff', '#6e67ff']
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
    }

google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart2);
    function drawChart2() {
        var data = google.visualization.arrayToDataTable([
            ['Budget', 'Percentage of allocation'],
            ['Post ICO', 30],
            ['Marketing', 30],
            ['App Development & Technology', 20],
            ['R&D', 5],
            ['Crypto Exchange Listing', 5],
            ['Contingency & Working Capital', 10]
        ]);

        var options = {
        titleTextStyle: {color: 'rgba(27, 47, 83, 1)', fontSize: 20},
        backgroundColor: 'transparent',
        // legend: 'none',
        pieSliceText: 'label',
        title: 'Budget Allocation',
        pieStartAngle: 100,
        colors: ['#48a3ff', '#488dff', '#4864ff', '#4e48ff', '#6e67ff','#71c7ec']
        };

        var chart2 = new google.visualization.PieChart(document.getElementById('piechart2'));
        chart2.draw(data, options);
    }



//event on hover
var cardArray = [$( "#card1" ), $( "#card2" ), $( "#card3" ), $( "#card4" ), $( "#card5" ), $( "#card6" ), $( "#card7" ), $( "#card8" )];

function animateCard(card) {
    card.mouseover(function() {
        card.addClass('animated pulse');
    });
    card.mouseout(function() {
        card.removeClass('animated pulse');
    });
}

cardArray.forEach(card => {
    animateCard(card);
});

//Moving banner
var title = ['<p>Every new beginning comes from some other beginning s end.</p>','<p>Even the genius asks questions.</p>','<p>It s better to burn out, than to fade away.</p>'];
var index = 0;

function change_title() {
    var x = title[index];
    $('.banner-text').html(x);
    index++;
    if (index >= title.length) { index = 0; }
};

function change_left() {
    $('.banner-text').removeClass('slide-right').addClass('slide-left');
}

function change_right() {
    $('.banner-text').removeClass('slide-left').addClass('slide-right');
    // change_title();
}

function to_left() {
    setInterval(change_left, 10000);
};

function to_right() {
    setInterval(change_right, 20000);
};

to_left();
to_right();

//Scrolling
var currentNavId = "";

function scrollToDiv(navId, div, tempTop) {
    $(navId).click(function() {

        if(currentNavId === navId) {
            // return;
        }

        $('html, body').animate({
            scrollTop: $(div).offset().top - tempTop
        }, 1700);

        currentNavId = navId;
    });
} 

scrollToDiv('#eco-nav', '.ecosystem', 30);
scrollToDiv('#app-nav', '.integrated-app', 90);
scrollToDiv('#token-nav', '.distribution-chart', 30);
scrollToDiv('#milestone-nav', '.timeline-view', 30);
scrollToDiv('#team-nav', '.team-member-view', 25);
// scrollToDiv('#navBrand', '.clock-title', 0);
scrollToDiv('#footerBrand', '.clock-title', 0);


//click on image
$( "#round1" ).click(function() {
    alert( "Handler for called." );
});