(() => {
  // app/scripts/infinity.js
  var infinityPoint = document.querySelector("#infinity_point");
  if (infinityPoint) {
    const service = function(target) {
      const url = target.dataset.url;
      const sectionId = target.dataset.sectionId;
      function loading() {
        target.innerHTML = "loading";
      }
      function hiddenLoading() {
        target.innerHTML = "";
      }
      async function callApi() {
        fetch(`${url}&sections=${sectionId}`).then((response) => {
          response.json();
        }).then((data) => {
          console.log(data);
          console.log(sectionId);
        });
      }
      function appendData(data) {
        const infinity_point = appendChild(data, "infinity");
        if (infinity_point == "") {
          observer.disconnect();
        }
        ;
      }
      const services = {
        loading,
        hiddenLoading,
        callApi,
        appendData
      };
      return services;
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const { loading, hiddenLoading, callApi, appendData } = service(entry.target);
          loading();
          callApi().then((data) => {
          }).finally(() => {
            hiddenLoading();
          });
        }
      });
    });
    observer.observe(infinityPoint);
  }
  appendChild = (data, type) => {
    const listProduct = document.querySelector("#collection__products");
    const div = document.createElement("div");
    div.innerHTML = data;
    const elements = div.querySelectorAll("#collection__products > *");
    if (type != "infinity") {
      listProduct.innerHTML = "";
    }
    elements.forEach((element) => {
      listProduct.appendChild(element);
    });
    const infinity_point = div.querySelector("#infinity_point").dataset.url;
    infinityPoint.setAttribute("data-url", infinity_point);
    return infinity_point;
  };
})();
