import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser } from '../actions/userActions';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';

export const ProfileScreen = () => {
	const userSignin = useSelector(state => state.userSignin);
	const { userInfo } = userSignin;
	const userDetails = useSelector(state => state.userDetails);
	const { loading, error, user } = userDetails;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(detailsUser(userInfo._id));
	}, [dispatch, userInfo._id]);
	const submitHandler = (e) => {
		e.preventDefault();
		//dispatch update profile
	}
	return (
		<div className='container mt-5'>
			<form className='form w-50 m-auto' onSubmit={submitHandler}>
				<h3 className='mb-3'>User Profile</h3>
				{loading ? <LoadingBox></LoadingBox>
					:
					error ? <MessageBox varient='danger'>{error}</MessageBox>
						:
						<>
							<div className="mb-3">
								<label for="name" className="form-label">Name</label>
								<input type="name" className="form-control" id="name" placeholder="Enter name" value={user.name} />
							</div>

							<div className="mb-3">
								<label for="email" className="form-label">Email</label>
								<input type="email" className="form-control" id="email" placeholder="Enter email" value={user.email} />
							</div>

							<div className="mb-3">
								<label for="password" className="form-label">Password</label>
								<input type="password" className="form-control" id="password" placeholder="Enter password" />
							</div>

							<div className="mb-3">
								<label for="confirmPassword" className="form-label">Confirm Password</label>
								<input type="confirmPassword" className="form-control" id="confirmPassword" placeholder="Enter Confirm Password" />
							</div>
							<div>
								<label />
								<button type="submit" className="btn btn-primary">Update</button>
							</div>
						</>
				}
			</form>
		</div>
	)
}
