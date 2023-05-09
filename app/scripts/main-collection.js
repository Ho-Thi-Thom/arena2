const infinityPoint = document.querySelector('#infinity_point')
const sortBy = document.querySelector('#sort_by')
const show = document.querySelector('#show')
const filterForms = document.querySelectorAll('input[type="checkbox"]')
const filterPrice = document.querySelectorAll('input[type="number"]')
const paginateLinks = document.querySelectorAll('.paginate_link[data-url]')

const { loading, createUrl, hiddenLoading, getApi, appendProduct, setProduct, updateCount, updatePointInfinity, updatePaginate, createUrlFilter } = collectionService()


if (infinityPoint) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target
                const url = target.dataset.url
                const sectionId = target.dataset.sectionId


                function callback(searchParams) {
                    searchParams.set('section_id', sectionId)
                }
                const _url = createUrl(callback, url.split('?')[1])

                loading(target);
                getApi(_url)
                    .then((data) => {
                        const infinityPoint = data.getElementPointInfinity()
                        appendProduct(data.getElementProduct())
                        updatePointInfinity(infinityPoint)

                        if (!infinityPoint.dataset.url) {
                            observer.disconnect()
                        }
                    }).finally(() => {
                        hiddenLoading(target);
                    })
            }
        })
    })
    observer.observe(infinityPoint)
}

if (sortBy) {
    sortBy.addEventListener("change", (event) => {
        const value = event.target.value;
        const sectionId = event.target.dataset.sectionId

        function callback(searchParams) {
            searchParams.set('sort_by', value)
            // searchParams.set('section_id', sectionId)
        }
        const url = createUrl(callback, window.location.href.split('?')[1])
        history.pushState(null, null, url);
        getApi(url).then((data) => {
            setProduct(data.getElementProduct())
        })
    })
}

if (show) {
    show.addEventListener("change", (event) => {
        const value = event.target.value;
        const sectionId = event.target.dataset.sectionId
        const url = `${window.Shopify.routes.root}cart/update.js`;
        const data = {
            attributes: {
                items_per_page: value
            },
            sections: [sectionId]
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        function getResponse(res) {
            return res.json()
                .then(data => data.sections[sectionId])

        }
        function callback(searchParams) {
            searchParams.set('items_per_page', value)
        }
        const _url = createUrl(callback, window.location.href.split('?')[1])
        history.pushState(null, null, _url)

        getApi(url, options, getResponse).then((data) => {
            setProduct(data.getElementProduct())
            updatePointInfinity(data.getElementPointInfinity())
            updatePaginate(data.getPaginate())
        })
    })
}


if (filterForms) {

    filterForms.forEach(input => {
        input.addEventListener('change', event => {
            const value = event.target.value;
            const name = event.target.name;
            function callback(checkedValues) {
                if (event.target.checked) {
                    if (!checkedValues[name]) {
                        checkedValues[name] = [];
                    }
                    checkedValues[name].push(value);
                } else {
                    if (checkedValues[name]) {
                        checkedValues[name] = checkedValues[name].filter(val => val !== value);
                    }
                }

            }

            const url = createUrlFilter(callback, window.location.search)
            history.pushState(null, null, url);
            getApi(url).then((data) => {
                setProduct(data.getElementProduct())
                updateCount(data.getProductCount())
                updatePointInfinity(data.getElementPointInfinity())
                updatePaginate(data.getPaginate())
            })
        })
    })
}

// if (filterPrice) {
//     const params = {}
//     filterPrice.forEach(input => {
//         input.addEventListener('change', event => {
//             const value = event.target.value;
//             const name = event.target.name;
//             params[name] = value;
//             if (Object.keys(params).length === 2) {
//                 function callback(checkedValues) {
//                     for (const key in params) {

//                         if (!checkedValues[key]) {
//                             checkedValues[key] = [];
//                         }
//                         checkedValues[key].push(params[key]);
//                     }

//                 }
//                 const url = createUrlFilter(callback, window.location.search)
//                 history.pushState(null, null, url);
//                 getApi(url).then((data) => {
//                     setProduct(data.getElementProduct())
//                     updateCount(data.getProductCount())
//                     updatePointInfinity(data.getElementPointInfinity())
//                     updatePaginate(data.getPaginate())
//                 })
//             }
//         }

//         )
//     })
// }
paginateFuc(paginateLinks)

function paginateFuc(paginateLinks) {
    if (paginateLinks) {
        paginateLinks.forEach(paginateLink => {
            paginateLink.addEventListener("click", (event) => {
                const target = event.target
                const url = target.dataset.url
                const sectionId = target.dataset.sectionId

                function callback(searchParams) {
                    searchParams.set('section_id', sectionId)
                }
                const _url = createUrl(callback, url.split('?')[1])
                getApi(_url).then((data) => {
                    setProduct(data.getElementProduct());
                    updatePaginate(data.getPaginate())
                    // remove listener
                })
            })
        })
    }
}

function collectionService() {
    let listProduct = document.querySelector('#collection__products');
    let productCount = document.querySelector('.product_count')
    let infinityPoint = document.querySelector('#infinity_point')
    let paginate = document.querySelector('.paginate')

    function loading(target) {
        target.innerHTML = "Loading..."
    }

    function hiddenLoading(target) {
        target.innerHTML = ""
    }

    function createUrl(callback, initParam) {
        const urlSearchParams = new URLSearchParams(initParam)
        callback(urlSearchParams)
        return window.location.pathname + "?" + urlSearchParams.toString()

    }


    function createUrlFilter(callback, search) {
        const params = new URLSearchParams(search);
        const checkedValues = {};
        params.forEach(function (value, key) {
            if (!checkedValues[key]) {
                checkedValues[key] = [];
            }
            checkedValues[key].push(value);
        });
        callback(checkedValues);
        const urlParams = new URLSearchParams();
        Object.keys(checkedValues).forEach((name) => {
            checkedValues[name].forEach((value) => {
                urlParams.append(name, value);
            });
        });
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        return newUrl
    }


    function getApi(url, options, getResponse) {
        return fetch(url, options).then(res => getResponse?.(res) ?? res.text()).then(data => _extract(data))
    }

    function appendProduct(elements) {
        elements.querySelectorAll("#collection__products > *")?.forEach(element => {
            listProduct?.appendChild(element);
        });
    }

    function setProduct(element) {
        if (listProduct) {
            listProduct.parentNode.replaceChild(element, listProduct)
            listProduct = document.querySelector('#collection__products')
        }
    }

    function updateCount(element) {
        if (productCount) {
            productCount.parentNode.replaceChild(element, productCount)
            productCount = document.querySelector('.product_count')
        }
    }

    function updatePointInfinity(element) {
        if (infinityPoint) {
            infinityPoint.setAttribute('data-url', element.dataset.url)
        }
    }


    function updatePaginate(element) {
        if (paginate) {
            paginate.parentNode.replaceChild(element, paginate)
            paginate = document.querySelector('.paginate')
            paginateFuc(document.querySelectorAll('.paginate_link[data-url]'))
        }
    }

    function _extract(data) {
        const div = document.createElement("div");
        div.innerHTML = data;

        return {
            getElementProduct() {
                return div.querySelector('#collection__products')
            },
            getProductCount() {
                return div.querySelector(".product_count")
            },
            getElementPointInfinity() {
                return div.querySelector("#infinity_point")
            },
            getPaginate() {
                return div.querySelector(".paginate")
            }
        }
    }


    const services = {
        loading,
        hiddenLoading,
        getApi,
        appendProduct,
        setProduct,
        updateCount,
        updatePointInfinity,
        createUrl,
        updatePaginate,
        createUrlFilter
    }
    return services;
}
