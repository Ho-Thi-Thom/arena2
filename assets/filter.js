(() => {
  // app/scripts/filter.js
  var select = document.getElementById("sort_by");
  select.addEventListener("change", function() {
    const selectedOption = select.options[select.selectedIndex].value;
    const url = new URL(window.location.href);
    url.searchParams.set("sort_by", selectedOption);
    window.location.href = url.toString();
  });
})();
