import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import data from '../data'
import { LoadingBox } from '../components/LoadingBox'
import { MessageBox } from '../components/MessageBox'
import { Rating } from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { detailsProduct } from '../actions/productActions'


export const ProductScreen = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const { id: productId } = params;
	const [qty, setQty] = useState(1);

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	useEffect(() => {
		dispatch(detailsProduct(productId));
	}, [dispatch, productId]);

	const addToCartHandler = () => {
		navigate(`/cart/${productId}?qty=${qty}`)
	}
	// let params = useParams();
	// const product = data.products.find((x) => x._id == params.id)
	// console.log(params.id);
	// if (!product) {
	// 	return <div>Product Not Found</div>
	// }

	return (
		<>

			{loading ? <LoadingBox></LoadingBox>
				:
				error ? <MessageBox variant="danger">{error} </MessageBox>
					:
					<div className='productscreen'>
						<Link to='/' className='text-decoration-none'>Back to result</Link>
						<div className='row my-3'>
							<div className='col-lg-6 col-md-6 col-sm-12'>
								<img
									className="large img-fluid"
									src={product.image}
									alt={product.name}
								></img>
							</div>
							<div className='col-lg-3 my-3'>
								<ul className="list-group">
									<li className='list-unstyled'><h5>{product.name}</h5></li>
									<li className='list-unstyled'><Rating rating={product.rating} numReviews={product.numReviews} /></li>
									<li className='list-unstyled'>Price : $ {product.price}</li>
									<li className='list-unstyled'>Description : {product.description}</li>
								</ul>
							</div>
							<div className='col-lg-3 my-3'>
								<div className="card p-3 lh-lg bg-light" >
									<ul className="list-group ">
										<li className='list-unstyled'>
											<div className='d-flex justify-content-between'>
												<b>Price</b>
												<div>${product.price}</div>
											</div>
										</li>
										<li className='list-unstyled'>
											<div className='d-flex justify-content-between'>
												<b>Status</b>
												<div>
													{product.countInStock > 0 ? (<span className='text-success'>In Stock</span>) :
														(<span className='text-danger'>Unavailable</span>)}
												</div>
											</div>
										</li>
										{
											product.countInStock > 0 && (
												<>
													<li className='list-unstyled'>
														<div className='d-flex justify-content-between'>
															<b>Qty</b>
															<div>
																<select className='p-1' value={qty} onChange={(e) => setQty(e.target.value)}>
																	{
																		[...Array(product.countInStock).keys()].map((x) => (
																			<option key={x + 1} value={x + 1}>
																				{x + 1}
																			</option>
																		)
																		)}
																</select>
															</div>
														</div>
													</li>
													<li className='list-unstyled'>
														<button onClick={addToCartHandler} className='btn btn-warning my-3 w-100'>Add to Cart</button>
													</li>
												</>

											)
										}

									</ul>

								</div>

							</div>
						</div>
					</div>
			}


		</>
	)
}