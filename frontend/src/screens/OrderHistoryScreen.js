import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { listOrderMine } from '../actions/orderActions';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';

export const OrderHistoryScreen = (props) => {
	const navigate = useNavigate();
	const orderMineList = useSelector(state => state.orderMineList);
	const { loading, error, orders } = orderMineList;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(listOrderMine());
	}, [dispatch]);
	return (
		<div className='mt-5 '>
			<h3>Order History</h3>
			{loading ? <LoadingBox></LoadingBox> :
				error ? <MessageBox variant='danger'>{error}</MessageBox> :
					(
						<table className="table container">
							<thead>
								<tr>
									<th>ID</th>
									<th>DATE</th>
									<th>TOTAL</th>
									<th>PAID</th>
									<th>DELIVERED</th>
									<th>ACTIONS</th>
								</tr>
							</thead>
							<tbody>
								{
									orders.map((order) => (
										<tr key={order._id}>
											<td>{order._id}</td>
											<td>{order.createdAt.subString(0, 10)}</td>
											<td>{order.totalPrice}</td>
											<td>{order.isPaid ? order.paidAt.subString(0, 10) : 'No'}</td>
											<td>{order.isDelivered ? order.deliveredAt.subString(0, 10) : 'No'}</td>
											<td>
												<button type='button'
													className='btn-sm'
													onClick={() => { navigate(`/order/${order._id}`) }}>Details</button>
											</td>
										</tr>
									))}

							</tbody>
						</table>
					)
			}
		</div>
	)
}
