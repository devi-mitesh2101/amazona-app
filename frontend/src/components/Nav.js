import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Nav = () => {
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">Amazona</Link>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon text-light"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link className="nav-link text-white" aria-current="page" to="/cart">
									Cart
									{cartItems.length > 0 && (
										<span className="badge bg-danger rounded-circle ms-1">{cartItems.length}</span>
									)}
								</Link>
							</li>
							{
								userInfo ? (
									<Link to='#' className='text-decoration-none text-white pt-1'>{userInfo.name}</Link>
								) : (
									<li className='nav-item'>
										<Link className='nav-link text-white' to='/signin'>Sign in</Link>
									</li>
								)
							}
						</ul>
					</div>
				</div>
			</nav >
		</div >
	)
}
