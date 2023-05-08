const infinityPoint = document.querySelector('#infinity_point')
const sortBy = document.querySelector('#sort_by')
const show = document.querySelector('#show')
const filterForms = document.querySelectorAll('.filter-form')
const paginateLinks = document.querySelectorAll('.paginate_link[data-url]')

const { loading, createUrl, hiddenLoading, getApi, appendProduct, setProduct, updateCount, updatePointInfinity, updatePaginate } = collectionService()


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
                        const infinityPoint = data.getPointInfinity()
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

paginateFunc(paginateLinks)

function paginateFunc(paginateLinks) {
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
            paginateFunc(document.querySelectorAll('.paginate_link[data-url]'))
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
            getPointInfinity() {
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
        updatePaginate
    }
    return services;
}
