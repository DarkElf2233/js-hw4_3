
const decs = [...document.querySelectorAll('.product__quantity-control_dec')];
const incs = [...document.querySelectorAll('.product__quantity-control_inc')];
const addButtons = [...document.querySelectorAll('.product__add')];
const cart = document.querySelector('.cart__products');

function decreaseOrIncreaseQuantity(el, operator) {
    const prodControls = el.closest('.product__quantity-controls');
    const quantity = prodControls.querySelector('.product__quantity-value');
    let quantityValue = parseInt(quantity.textContent);

    if (quantityValue === 0 && operator === '-') {
        return;
    } else if (operator === '-') {                 
        quantity.textContent = quantityValue - 1;
    } else if (operator === '+') {                 
        quantity.textContent = quantityValue + 1;
    }
}

for (let dec of decs) {
    dec.addEventListener('click', () => {
        decreaseOrIncreaseQuantity(dec, '-');
    });
}

for (let inc of incs) {
    inc.addEventListener('click', () => {
        decreaseOrIncreaseQuantity(inc, '+');
    });
}

for (let button of addButtons) {
    button.addEventListener('click', () => {
        const currentProd = button.closest('.product');
        let currentQuantity = currentProd.querySelector('.product__quantity-value');
        const currentImg = currentProd.querySelector('.product__image');

        if (cart.querySelector('.cart__product')) {
            const cartProds = [...cart.querySelectorAll('.cart__product')];
            for (let cartProd of cartProds) {
                if (cartProd.getAttribute('data-id') === currentProd.getAttribute('data-id')) {
                    console.log(cartProd);
                    const cartProdQuantity = cartProd.querySelector('.cart__product-count');
                    cartProdQuantity.textContent = parseInt(cartProdQuantity.textContent) + parseInt(currentQuantity.textContent);
                    return;
                }
            }
        }

        cart.insertAdjacentHTML('beforeEnd', `
            <div class="cart__product" data-id="${currentProd.getAttribute('data-id')}">
                <img class="cart__product-image" src="${currentImg.getAttribute('src')}">
                <div class="cart__product-count">${currentQuantity.textContent}</div>
            </div>
        `);
    });
}
