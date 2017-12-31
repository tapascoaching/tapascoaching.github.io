$(document).ready(function() {
  $("#owl-demo").owlCarousel({
    items : 1,
    nav : true,
    dots : true,
    autoPlay : true,
    slideSpeed : 200,
    navText: ["",""],
    lazyLoad : true,
    baseClass : "owl-carousel"
  });

  setTimeout(() => {
    $('.popup, .overlay').fadeIn(800)
  }, 2000)

  $('.popup').on('click', () => {
    $('.popup, .overlay').fadeOut()
  })
});
