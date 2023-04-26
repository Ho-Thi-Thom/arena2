document.addEventListener("shopify:section:load", () => {
  render();
});

function render() {
  var divs = document.getElementsByClassName("owl-carousel");
  if (divs.length > 0) {
    for (var i = 0; i < divs.length; i++) {
      var item = divs[i];
      var itemGap = parseInt(item.dataset.itemGap);
      var itemsPerLineMobile = parseInt(item.dataset.itemsPerLineMobile);
      var itemsPerLineTablet = parseInt(item.dataset.itemsPerLineTablet);
      var itemsPerLineDesktop = parseInt(item.dataset.itemsPerLineDesktop);
      $(item).owlCarousel({
        loop: true,
        responsiveClass: false,
        autoplay: false,
        margin: itemGap,
        autoplayTimeout: 1000,
        responsive: {
          0: {
            items: itemsPerLineMobile,
            loop: true,
            nav: false,
            dots: false,
          },
          769: {
            items: itemsPerLineTablet,
            loop: true,
            nav: false,
            dots: false,
          },
          1025: {
            items: itemsPerLineDesktop,
            loop: true,
            nav: false,
            dots: false,
          },
        },
      });
    }
  }
}

window.slide = render;
