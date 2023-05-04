window.showItem = () => {
    jQuery.post(window.Shopify.routes.root + 'cart/update.js',
        {
            attributes: {
                IdCart: document.getElementById('items_per_page').value
            },
            section: document.getElementById('items_per_page').dataset.section
        }, data => {
            const form = document.getElementById('items_per_page');
            form.closest('form').submit();
        }
    );

}


