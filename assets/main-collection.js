(() => {
  // app/scripts/main-collection.js
  var infinityPoint = document.querySelector("#infinity_point");
  var sortBy = document.querySelector("#sort_by");
  var show = document.querySelector("#show");
  var filterForms = document.querySelectorAll(".filter-form");
  var paginateLinks = document.querySelectorAll(".paginate_link[data-url]");
  var { loading, createUrl, hiddenLoading, getApi, appendProduct, setProduct, updateCount, updatePointInfinity, updatePaginate } = collectionService();
  if (infinityPoint) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let callback2 = function(searchParams) {
            searchParams.set("section_id", sectionId);
          };
          var callback = callback2;
          const target = entry.target;
          const url = target.dataset.url;
          const sectionId = target.dataset.sectionId;
          const _url = createUrl(callback2, url.split("?")[1]);
          loading(target);
          getApi(_url).then((data) => {
            const infinityPoint2 = data.getPointInfinity();
            appendProduct(data.getElementProduct());
            updatePointInfinity(infinityPoint2);
            if (!infinityPoint2.dataset.url) {
              observer.disconnect();
            }
          }).finally(() => {
            hiddenLoading(target);
          });
        }
      });
    });
    observer.observe(infinityPoint);
  }
  if (sortBy) {
    sortBy.addEventListener("change", (event) => {
      const value = event.target.value;
      const sectionId = event.target.dataset.sectionId;
      function callback(searchParams) {
        searchParams.set("sort_by", value);
      }
      const url = createUrl(callback, window.location.href.split("?")[1]);
      history.pushState(null, null, url);
      getApi(url).then((data) => {
        setProduct(data.getElementProduct());
      });
    });
  }
  if (show) {
    show.addEventListener("change", (event) => {
      const value = event.target.value;
      const sectionId = event.target.dataset.sectionId;
      const url = `${window.Shopify.routes.root}cart/update.js`;
      const data = {
        attributes: {
          items_per_page: value
        },
        sections: [sectionId]
      };
      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      };
      function getResponse(res) {
        return res.json().then((data2) => data2.sections[sectionId]);
      }
      function callback(searchParams) {
        searchParams.set("items_per_page", value);
      }
      const _url = createUrl(callback, window.location.href.split("?")[1]);
      history.pushState(null, null, _url);
      getApi(url, options, getResponse).then((data2) => {
        setProduct(data2.getElementProduct());
        updatePointInfinity(data2.getPointInfinity());
        updatePaginate(data2.getPaginate());
      });
    });
  }
  if (filterForms) {
    filterForms.forEach((filterForm) => {
      filterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let url = "";
        const data = new FormData(event.target);
        for (let [name, value] of data) {
          if (value !== "") {
            url += `&${name}=${value}`;
          }
        }
        url = url.replace("&", "?");
        getApi(url).then((data2) => {
          setProduct(data2.getElementProduct());
          updateCount(data2.getProductCount());
          updatePointInfinity(data2.getPointInfinity());
          updatePaginate(data2.getPaginate());
        });
      });
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      const checkedValues = {};
      const queryParams = new URLSearchParams(window.location.search);
      const urlParams = new URLSearchParams();
      queryParams.forEach((value, name) => {
        if (!checkedValues[name]) {
          checkedValues[name].push(value);
        }
        checkedValues[name].push(value);
      });
      console.log(checkedValues);
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", (event) => {
          if (event.target.checked) {
            if (!checkedValues[event.target.name]) {
              checkedValues[event.target.name] = [];
            }
            checkedValues[event.target.name].push(event.target.value);
          } else {
            if (checkedValues[event.target.name]) {
              checkedValues[event.target.name] = checkedValues[event.target.name].filter((value) => value !== event.target.value);
            }
          }
          Object.keys(checkedValues).forEach((name) => {
            checkedValues[name].forEach((value) => {
              urlParams.append(name, value);
            });
          });
          const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
          history.pushState(null, null, newUrl);
        });
      });
    });
  }
  if (paginateLinks) {
    paginateLinks.forEach((paginateLink) => {
      paginateLink.addEventListener("click", (event) => {
        const target = event.target;
        const url = target.dataset.url;
        const sectionId = target.dataset.sectionId;
        function callback(searchParams) {
          searchParams.set("section_id", sectionId);
        }
        const _url = createUrl(callback, url.split("?")[1]);
        getApi(_url).then((data) => {
          setProduct(data.getElementProduct());
          updatePaginate(data.getPaginate());
        });
      });
    });
  }
  function collectionService() {
    let listProduct = document.querySelector("#collection__products");
    let productCount = document.querySelector(".product_count");
    let infinityPoint2 = document.querySelector("#infinity_point");
    let paginate = document.querySelector(".paginate");
    function loading2(target) {
      target.innerHTML = "Loading...";
    }
    function hiddenLoading2(target) {
      target.innerHTML = "";
    }
    function createUrl2(callback, initParam) {
      const urlSearchParams = new URLSearchParams(initParam);
      callback(urlSearchParams);
      return window.location.pathname + "?" + urlSearchParams.toString();
    }
    function getApi2(url, options, getResponse) {
      return fetch(url, options).then((res) => getResponse?.(res) ?? res.text()).then((data) => _extract(data));
    }
    function appendProduct2(elements) {
      elements.querySelectorAll("#collection__products > *")?.forEach((element) => {
        listProduct?.appendChild(element);
      });
    }
    function setProduct2(element) {
      if (listProduct) {
        listProduct.parentNode.replaceChild(element, listProduct);
        listProduct = document.querySelector("#collection__products");
      }
    }
    function updateCount2(element) {
      if (productCount) {
        productCount.parentNode.replaceChild(element, productCount);
        productCount = document.querySelector(".product_count");
      }
    }
    function updatePointInfinity2(element) {
      if (infinityPoint2) {
        infinityPoint2.setAttribute("data-url", element.dataset.url);
      }
    }
    function updatePaginate2(element) {
      if (paginate) {
        paginate.parentNode.replaceChild(element, paginate);
        paginate = document.querySelector(".paginate");
      }
    }
    function _extract(data) {
      const div = document.createElement("div");
      div.innerHTML = data;
      return {
        getElementProduct() {
          return div.querySelector("#collection__products");
        },
        getProductCount() {
          return div.querySelector(".product_count");
        },
        getPointInfinity() {
          return div.querySelector("#infinity_point");
        },
        getPaginate() {
          return div.querySelector(".paginate");
        }
      };
    }
    const services = {
      loading: loading2,
      hiddenLoading: hiddenLoading2,
      getApi: getApi2,
      appendProduct: appendProduct2,
      setProduct: setProduct2,
      updateCount: updateCount2,
      updatePointInfinity: updatePointInfinity2,
      createUrl: createUrl2,
      updatePaginate: updatePaginate2
    };
    return services;
  }
})();
