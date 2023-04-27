(() => {
  // app/scripts/infinity.js
  var infinityPoint = document.querySelector("#infinity_point");
  if (infinityPoint) {
    const service = function(target) {
      const url = target.dataset.url;
      function loading() {
        target.innerHTML = "loading";
      }
      function hiddenLoading() {
        target.innerHTML = "";
      }
      async function callApi() {
      }
      function appendData(data) {
        target.appendChild(data);
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
            appendData(data);
          }).finally(() => {
            hiddenLoading();
          });
        }
      });
    });
    observer.observe(infinityPoint);
  }
})();
