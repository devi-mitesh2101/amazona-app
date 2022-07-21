import React from 'react'
import { Link } from 'react-router-dom';
import { Rating } from './Rating';

export const Product = (props) => {
	const { product } = props;
	return (
		<div key={product._id} className='col-lg-3 col-md-4 col-sm-12 my-3'>
			<div className="card border-1">
				<Link to={`/product/${product._id}`}>
					<img src={product.image} className="card-img-top img-fluid" alt={product.name} />
				</Link>
				<div className="card-body bg-light">
					<Link to={`/product/${product._id}`} className='text-decoration-none text-black'>
						<h6 className='fw-bold'>{product.name}</h6>
					</Link>
					<Rating rating={product.rating} numReviews={product.numReviews} />
					<div className='price fs-5 text-black'>${product.price}</div>
				</div>
			</div>
		</div>
	)
}
