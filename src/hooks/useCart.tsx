import { useState, useEffect, useMemo } from 'react';
import { db } from '../data/db';
import type { Guitar, CartItem } from '../types';

export const useCart = () => {
	const initialCart = (): CartItem[] => {
		// al localStorage le cuesta reconocer el tipo de dato, por eso se especifica el type al que hace referencia
		// persistencia del carrito aun cuando se actualiza la pantalla
		const localStorageCart = localStorage.getItem('cart');
		return localStorageCart ? JSON.parse(localStorageCart) : [];
	};

	const [data] = useState(db);
	const [cart, setCart] = useState(initialCart);

	const MAX_ITEMS = 5;
	const MIN_ITEMS = 1;

	// actualiza el almacenamiento local cada que suceda un cambio en cart
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	// Funcionalidad - Elementos en el carrito
	function addToCart(item: Guitar) {
		const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

		if (itemExists >= 0) {
			if (cart[itemExists].quantity >= MAX_ITEMS) return;
			const updatedCart = [...cart]; // crear copia del carrito para no modificar el state
			updatedCart[itemExists].quantity++;
			setCart(updatedCart);
		} else {
			const newItem: CartItem = { ...item, quantity: 1 }; // se caste (transforma) de un tipo a otro. quantity que pertenece a Item que es de tipo Guitar sera ahora de tipo CartItem
			setCart([...cart, newItem]); // agrega nuevos elementos al carrito
		}
	}

	function removeFromCart(id: Guitar['id']) {
		// forma de axceder al type Guitar y seleccionar el elemento especifico (id)
		setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
	}

	// para los botones que agregan o disminuyen la cantidad de elementos del carrito
	function increaseQuantity(id: Guitar['id']) {
		const updatedCart = cart.map((item) => {
			if (item.id === id && item.quantity < MAX_ITEMS) {
				return {
					...item,
					quantity: item.quantity + 1,
				};
			}
			return item;
		});
		setCart(updatedCart);
	}

	function decreaseQuantity(id: Guitar['id']) {
		const updatedCart = cart.map((item) => {
			if (item.id === id && item.quantity > MIN_ITEMS) {
				return {
					...item,
					quantity: item.quantity - 1,
				};
			}
			return item;
		});
		setCart(updatedCart);
	}

	function clearCart() {
		setCart([]);
	}

	// el hook useMemo y state derivados (de cart)
	const isEmpty = useMemo(() => cart.length === 0, [cart]); // para no crear un state nuevo de const [cart, setCart] = useState([]); se usa un derivado
	// useMemo renderiza solo los elementos cuando uno en especifico cambia. (valor a renderiza, elemento que cambia)
	const carTotal = useMemo(
		() => cart.reduce((total, item) => total + item.quantity * item.price, 0),
		[cart]
	);
	// se recomienda hacer return como objeto {} para poder llamar las creadas funciones por su nombre en especifico. tambien se puede Con arreglos () pero es recomendable el objeto
	return {
		data,
		cart,
		addToCart,
		removeFromCart,
		decreaseQuantity,
		increaseQuantity,
		clearCart,
		isEmpty,
		carTotal,
	};
};
