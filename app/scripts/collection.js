const filterBtns = document.querySelectorAll('.collection__toolbar-filter-btn')
const filter = document.querySelector('.collection__toolbar__filter')

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filter.classList.toggle("active")
    })
})