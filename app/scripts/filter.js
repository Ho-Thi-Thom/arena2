
// const select = document.getElementById('sort_by');
// select.addEventListener('change', function () {
//     const selectedOption = select.options[select.selectedIndex].value;
//     const url = new URL(window.location.href);
//     url.searchParams.set('sort_by', selectedOption);
//     window.location.href = url.toString();
// });



// if (sortBy) {
//     sortBy.addEventListener("change", (event) => {
//         const value = event.target.value;
//         const sectionId = event.target.dataset.sectionId
//         function callback(searchParams) {
//             searchParams.set('section_id', sectionId)
//             searchParams.set('sort_by', value)
//         }
//         const url = createUrl(callback)

//         getApi(url).then((data) => {
//             setProduct(data.getElementProduct())
//         })
//     })
// }

// if (show) {
//     show.addEventListener("change", (event) => {
//         const value = event.target.value;
//         const sectionId = event.target.dataset.sectionId
//         const url = `${window.Shopify.routes.root}cart/update.js`;
//         const data = {
//             attributes: {
//                 items_per_page: value
//             },
//             sections: [sectionId]
//         };
//         const options = {
//             method: 'POST',
//             body: JSON.stringify(data),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         };

//         function getResponse(res) {
//             return res.json()
//                 .then(data => data.sections[sectionId])

//         }

//         getApi(url, options, getResponse).then((data) => {
//             setProduct(data.getElementProduct())
//             updatePointInfinity(data.getPointInfinity())
//             updatePaginate(data.getPaginate())
//         })
//     })
// }

// if (filterForms) {
//     filterForms.forEach(
//         (filterForm) => {
//             filterForm.addEventListener("submit", (event) => {
//                 event.preventDefault()
//                 let url = ''
//                 const data = new FormData(event.target);
//                 for (let [name, value] of data) {
//                     url += `&${name}=${value}`
//                 }
//                 url = url.replace('&', "?")

//                 getApi(url).then((data) => {
//                     setProduct(data.getElementProduct())
//                     updateCount(data.getProductCount())
//                     updatePointInfinity(data.getPointInfinity())
//                     updatePaginate(data.getPaginate())
//                 })
//             })
//         }
//     )
// }
