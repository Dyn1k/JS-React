import {useState, useEffect} from 'react';
import {API_URL, API_KEY} from '../config';

import {Preloader} from './Preloader';
import {GoodsList} from './GoodsList';
import {Cart} from './Cart';
import {BasketList} from './BasketList';
import {Alert} from './Alert';

function setBasketItems() {
    const userItems = JSON.parse(localStorage.getItem('items'));
    return userItems ? userItems : [];
}

function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(setBasketItems);
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');

    const addToBasket = (item) => {
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id);

        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            };
            setOrder([...order, newItem]);
        } else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    };
                } else {
                    return orderItem;
                }
            });
            setOrder(newOrder);
        }
        setAlertName(item.name);
    };

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter(element => element.id !== itemId);
        setOrder(newOrder);
    };

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow);
    };

    const incrementQuantity = (itemId) => {
        const newOrder = order.map(element => {
            if (element.id === itemId) {
                const newQuantity = element.quantity + 1;
                return {
                    ...element,
                    quantity: newQuantity,
                }
            } else {
                return element;
            }
        });
        setOrder(newOrder);
    };

    const decrementQuantity = (itemId) => {
        const newOrder = order.map(element => {
            if (element.id === itemId) {
                const newQuantity = element.quantity - 1;
                return {
                    ...element,
                    quantity: newQuantity >= 0 ? newQuantity : 0,
                };
            } else {
                return element;
            }
        })
        setOrder(newOrder);
    };

    const closeAlert = () => {
        setAlertName('');
    };

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(order));
    }, [order])

    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                Authorization: API_KEY,
            },
        })
            .then(response => response.json())
            .then(data => {
                data.featured && setGoods(data.featured);
                setLoading(false);
            })
    }, []);

    return <main className='container content'>
        <Cart quantity={order.length} handleBasketShow={handleBasketShow}/>
        {loading ? <Preloader/> : <GoodsList goods={goods} addToBasket={addToBasket}/>}
        {isBasketShow && <BasketList order={order}
                                     handleBasketShow={handleBasketShow}
                                     removeFromBasket={removeFromBasket}
                                     incrementQuantity={incrementQuantity}
                                     decrementQuantity={decrementQuantity}
        />}
        {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
    </main>
}

export {Shop};