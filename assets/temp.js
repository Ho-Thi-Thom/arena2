(() => {
  // app/scripts/temp.js
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var checkedValues = {};
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function() {
      if (this.checked) {
        if (!checkedValues[this.name]) {
          checkedValues[this.name] = [];
        }
        checkedValues[this.name].push(this.value);
      } else {
        if (checkedValues[this.name]) {
          checkedValues[this.name] = checkedValues[this.name].filter((value) => value !== this.value);
        }
      }
      const urlParams = new URLSearchParams();
      Object.keys(checkedValues).forEach((name) => {
        checkedValues[name].forEach((value) => {
          urlParams.append(name, value);
        });
      });
      const newUrl = window.location.pathname + "?" + urlParams.toString();
      console.log(newUrl);
      history.pushState(null, null, newUrl);
    });
  });
})();
