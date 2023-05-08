const infinityPoint = document.querySelector('#infinity_point')
if (infinityPoint) {
    const service = function (target) {
        const url = target.dataset.url
        const sectionId = target.dataset.sectionId
        function loading() {
            target.innerHTML = "loading"
        }

        function hiddenLoading() {
            target.innerHTML = ""
        }

        async function callApi() {
            fetch(`${url}&sections=${sectionId}`)
                .then(response => {
                    response.json();
                })
                .then(data => {
                    console.log(data)
                    console.log(sectionId)
                });

        }

        function appendData(data) {
            const infinity_point = appendChild(data, "infinity");
            if (infinity_point == '') {
                observer.disconnect();
            };
        }

        const services = {
            loading,
            hiddenLoading,
            callApi,
            appendData
        }
        return services;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const { loading, hiddenLoading, callApi, appendData } = service(entry.target)
                loading();
                callApi().then((data) => {
                    // appendData(data);
                }).finally(() => {
                    hiddenLoading();
                })

            }
        })
    }
    )

    observer.observe(infinityPoint)
}


// window.handleChangeSortBy = (event) => {
//     const sectionUrl = window.location.pathname
//     const sectionId = event.target.dataset.sectionId
//     const value = event.target.value;

//     const url = new URLSearchParams(sectionUrl)
//     url.set('sort_by', value)
//     url.set('sections', sectionId)

//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             const _data = data.sections[sectionId]
//             appendChild(_data)
//         });

// }
// window.handleChangeShow = (event) => {
//     const sectionId = event.target.dataset.sectionId;
//     const value = event.target.value;
//     const url = `${window.Shopify.routes.root}cart/update.js`;
//     const data = {
//         attributes: {
//             items_per_page: value
//         },
//         sections: [sectionId]
//     };
//     const options = {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };
//     fetch(url, options)
//         .then(response => response.json())
//         .then(data => {
//             const _data = data.sections[sectionId]
//             appendChild(_data)
//         })
//         .catch(error => console.error(error));
// }


appendChild = (data, type) => {
    const listProduct = document.querySelector('#collection__products');
    const div = document.createElement("div");
    div.innerHTML = data;
    const elements = div.querySelectorAll('#collection__products > *');

    if (type != 'infinity') {
        listProduct.innerHTML = '';
    }
    elements.forEach(element => {
        listProduct.appendChild(element);
    });

    const infinity_point = div.querySelector("#infinity_point").dataset.url;
    infinityPoint.setAttribute('data-url', infinity_point);

    return infinity_point
}



// const selected = document.getElementById('sort_by');
// selected.addEventListener('change', function () {

// });

// query El > addEventListener + ()=>

// function

// qrey > addEventListener={}