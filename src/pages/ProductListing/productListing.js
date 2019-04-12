import React, { Fragment, useEffect } from "react";
import { inject, } from "mobx-react";
import ProductGrid from "../../components/ProductGrid/productGrid";
import HomeSlider from "../../components/HomeSlider/HomeSlider";

const ProductListingPage = (props) => {

	useEffect(() => {
		props.appData.fetchProducts();
	}, []);

	return <Fragment>
		<HomeSlider/>
		<section className="section">
			<div className="container">
				<div className="title is-4 has-text-centered">BEST SELLERS</div>
				<div className="columns is-multiline is-mobile products is-centered">
					<ProductGrid products={props.appData.products}/>
				</div>
				<div className="load-more"></div>
			</div>
		</section>
	</Fragment>;
};

export default inject("appData")(ProductListingPage);