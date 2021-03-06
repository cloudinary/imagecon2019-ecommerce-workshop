import {observable, action} from "mobx";
import { camelizeKeys } from "../helpers";
import bindObjectProps from "./bindObjectProps";
import request from "../services/api";

const getObservableWithActions = (obj) =>
	observable(...bindObjectProps(obj));

const createProduct = (data) =>
	getObservableWithActions({
		id: "",
		name: "",
		price: 0,
		discount: 0,
		items: [],
		...data,
	});

const products = observable([]);

const addProduct = action((...newProducts) => {
	products.replace(products.concat(newProducts));
});

const serializeProductItems = (product) =>
	product.items.map((item)=>({...camelizeKeys(item), mediaType: item.resource_type}));

const setProducts = action((newProducts) => {
	products.replace(newProducts.map((product) => ({
		...product,
		items:  serializeProductItems(product),
	})));
});

const fetchProducts = () => {
	request("/products")
		.then((result) => {
			setProducts(result.products
				.filter((p) => p.name));
		})
		.catch((error) => {
			console.log("!!!!!!!!!! ERROR ", error);
		});
};

const cart = observable({
		products: [],
	},
	{});

export {
	createProduct,
	addProduct,
	fetchProducts,
	products,
	cart,
}