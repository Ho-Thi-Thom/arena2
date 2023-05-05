const infinityPoint = document.querySelector('#infinity_point')
if (infinityPoint) {
    const service = function (target) {
        var url = target.dataset.url
        function loading() {
            target.innerHTML = "loading"
        }

        function hiddenLoading() {
            target.innerHTML = ""
        }

        async function callApi() {
            const response = await fetch(url);
            const html = await response.text();
            return html;
        }

        function appendData(data) {
            const div = document.createElement("div");
            div.innerHTML = data;
            const infinity_point = div.querySelector("#infinity_point").dataset.url;
            console.log("check", infinity_point)
            if (infinity_point == '') {
                observer.disconnect();
            };
            target.setAttribute('data-url', infinity_point);
            const listProduct = document.querySelector('#collection__products');
            const elements = div.querySelectorAll('#collection__products > *');
            elements.forEach(element => {
                listProduct.appendChild(element);
            });
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
                    appendData(data);
                }).finally(() => {
                    hiddenLoading();
                })

            }
        })
    }
    )

    observer.observe(infinityPoint)
}


window.handleChangeSortBy = (event) => {
    const elementSelect = document.getElementById('sort_by')
    const sectionUrl = elementSelect.dataset.url
    const elementForm = document.getElementById('form_sort_by')
    const sectionId = elementForm.dataset.sectionId
    const value = event.target.value;
    const url = sectionUrl + "?" + "sort_by=" + value + "&section_id=" + sectionId + ""
    fetch(url)
        .then(response => response.text())
        .then(data => {
            appendChild(data)
        });

}
window.handleChangeShow = (event) => {
    const elementForm = document.getElementById('form_show');
    const sectionId = elementForm.dataset.sectionId;
    const value = event.target.value;
    const url = `${window.Shopify.routes.root}cart/update.js`;
    const data = {
        attributes: {
            IdCart: value
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
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            const _data = data.sections[sectionId]
            appendChild(_data)
        })
        .catch(error => console.error(error));
}


appendChild = (data) => {
    const listProduct = document.querySelector('#collection__products');
    const div = document.createElement("div");
    div.innerHTML = data;
    const elements = div.querySelectorAll('#collection__products > *');
    listProduct.innerHTML = '';
    elements.forEach(element => {
        listProduct.appendChild(element);
    });
}


