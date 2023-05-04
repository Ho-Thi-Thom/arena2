(() => {
  // app/scripts/show.js
  window.showItem = () => {
    const element = document.getElementById("items_per_page");
    jQuery.post(window.Shopify.routes.root + "cart/update.js", {
      attributes: {
        IdCart: element.value
      },
      section: element.dataset.section
    }, (data) => {
      const form = element;
      form.closest("form").submit();
    });
  };
})();
