function BasketItem(props) {
    const {
        id,
        name,
        price,
        quantity,
        removeFromBasket = Function.prototype,
        incrementQuantity = Function.prototype,
        decrementQuantity = Function.prototype,
    } = props;
    return <li className="collection-item">
        {name}
        <i className="material-icons basket-quantity" onClick={() => decrementQuantity(id)}>remove</i> {' '}
        x{quantity} {' '}
        <i className="material-icons basket-quantity" onClick={() => incrementQuantity(id)}>add</i> {' '}
        = {price * quantity}
        <span className="secondary-content">
            <i className="material-icons blue-text basket-clear" onClick={() => removeFromBasket(id)}>clear</i>
        </span>
    </li>
}

export {BasketItem};