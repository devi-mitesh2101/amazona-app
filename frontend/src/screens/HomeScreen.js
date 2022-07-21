import React, { useEffect } from 'react'
import { Product } from '../components/Product'
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions';

export const HomeScreen = () => {
	const dispatch = useDispatch();
	const productList = useSelector(state => state.productList);
	const { loading, error, products } = productList;
	useEffect(() => {
		dispatch(listProducts());
	}, [])
	return (
		<>
			{loading ? <LoadingBox></LoadingBox>
				:
				error ? <MessageBox variant="danger">{error} </MessageBox>
					:
					<div className='row mt-4 mx-1 d-flex justify-content-center '>
						{
							products.map((product) => (
								<Product key={product._id} product={product} />
							))
						}
					</div>
			}
		</>
	)
}
