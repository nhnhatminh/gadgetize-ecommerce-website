$('#btn-cate').click(function(){
  $('.categories').slideToggle('slide');
})

$('#btn-slide-menu-op').click(function(){
  $('.slide-in-menu').toggle('slide');
})

$('#btn-closing').click(function(){
  $('.slide-in-menu').toggle('slide');
})
$(document).ready(function() {
  var primgw = $('.pr-img').width();
  $('.pr-img').height(primgw);
  $('#owl-cate').owlCarousel({
    responsiveClass: true,
    nav: true,
    loop: true,
    margin: 24,
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 3,
      },
      820: {
        items: 5,
      },
      1200: {
        items: 6,
      },
      1400: {
        items: 8,
      },
    }
  })
})

$(document).ready(function() {
  $('#brands').owlCarousel({
    responsiveClass: true,
    nav: true,
    loop: true,
    margin: 100,
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1200: {
        items: 5,
      },
    }
  })
})

$(document).ready(function() {
  $('#service').owlCarousel({
    responsiveClass: true,
    nav: true,
    loop: true,
    margin: 24,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      1200: {
        items: 6,
      },
    }
  })
})