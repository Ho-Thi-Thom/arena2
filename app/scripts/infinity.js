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
        // , {
        //     root: document.getElementById('collection__products'),
        //     rootMargin: '-50% 0px -50% 0px',
        //     threshold: []
        // }
    )

    observer.observe(infinityPoint)
}

