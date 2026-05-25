$(document).ready(function() {
  
  $('#btn-category').click(function(){
    $('.categories').slideToggle('slide');
  });

  $('#btn-slide-menu-open').click(function(){
    $('.slide-in-menu').toggle('slide');
  });

  $('#btn-closing').click(function(){
    $('.slide-in-menu').toggle('slide');
  });

  // Khởi tạo Owl Carousel
  $('#owl-category').owlCarousel({
    responsiveClass: true,
    nav: true,
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    margin: 24,
    responsive: {
      0: { items: 2 },
      768: { items: 3 },
      820: { items: 5 },
      1200: { items: 6 },
      1400: { items: 8 }
    }
  });

  // Khởi tạo Owl Carousel cho phần Brands
  $('#owl-brands').owlCarousel({
    responsiveClass: true,
    nav: false, 
    dots: false,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    margin: 24, 
    responsive: {
      0: { items: 2 },
      576: { items: 3 },
      992: { items: 4 },
      1200: { items: 5 } 
    }
  });

  /* owl carousel cho thumbnails san pham */
  $('#owl-thumbs').owlCarousel({
    responsiveClass: true,
    nav: false,
    dots: false,
    loop: false,
    margin: 10,
    responsive: {
      0: { items: 3 },
      576: { items: 4 },
      768: { items: 5 },
      992: { items: 4 }, /* tren man hinh chia 2 cot, cho hien 4-5 item */
      1200: { items: 5 },
      1400: { items: 6 }
    }
  });

  /* owl carousel cho khu vuc san pham goi y */
  $('#owl-related-products').owlCarousel({
    responsiveClass: true,
    nav: false,
    dots: true, 
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    margin: 24,
    responsive: {
      0: { items: 2 },
      576: { items: 3 },
      768: { items: 4 },
      992: { items: 5 },
      1200: { items: 6 } /* hien thi 6 items tren man hinh rong nhu figma */
    }
  });

  var primgw = $('.product-card-img').width();
  $('.product-card-img').height(primgw);
});


