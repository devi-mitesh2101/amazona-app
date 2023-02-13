import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signout } from '../actions/userActions';

export const Nav = () => {
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const dispatch = useDispatch();

	const signoutHandler = () => {
		dispatch(signout());
	}
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

							<li className="nav-item  ">
								<Link className="nav-link text-white" aria-current="page" to="/cart">
									Cart
									{cartItems.length > 0 && (
										<span className="badge bg-danger rounded-circle ms-2">{cartItems.length}</span>
									)}
								</Link>
							</li>
							{
								userInfo ? (
									<div className='nav-item dropdown'>
										<Link to='#' className='nav-link dropdown-toggle text-decoration-none text-white'
											id="dropdownMenu"
											type="button"
											data-bs-toggle="dropdown"
											aria-expanded="false">
											{userInfo.name}
										</Link>

										<ul className="dropdown-menu bg-dark text-center " aria-labelledby="dropdownMenu">

											<Link to='/orderhistory' className='dropdown-item text-white'>Order History</Link>

											<Link className="dropdown-item text-white"
												to="#signout"
												onClick={signoutHandler}>
												Sign Out
											</Link>

										</ul>

									</div>

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
