import React from 'react'

export const Rating = (props) => {
	const { rating, numReviews } = props;
	return (
		<div className='rating '>
			<span>
				<i className={
					rating >= 1
						? 'fa-solid fa-star text-warning me-1'
						: rating >= 0.5 ? 'fa-solid fa-star-half-stroke text-warning me-1'
							: 'far fa-star text-warning '}>
				</i>
			</span>
			<span>
				<i className={
					rating >= 2
						? 'fa-solid fa-star text-warning me-1'
						: rating >= 1.5 ? 'fa-solid fa-star-half-stroke text-warning me-1'
							: 'far fa-star text-warning'}>
				</i>
			</span>
			<span>
				<i className={
					rating >= 3
						? 'fa-solid fa-star text-warning me-1'
						: rating >= 2.5 ? 'fa-solid fa-star-half-stroke text-warning me-1'
							: 'far fa-star text-warning'}>
				</i>
			</span>
			<span>
				<i className={
					rating >= 4
						? 'fa-solid fa-star text-warning me-1'
						: rating >= 3.5 ? 'fa-solid fa-star-half-stroke text-warning me-1'
							: 'far fa-star text-warning'}>
				</i>
			</span>
			<span>
				<i className={
					rating >= 5
						? 'fa-solid fa-star text-warning me-1'
						: rating >= 4.5 ? 'fa-solid fa-star-half-stroke text-warning me-1'
							: 'far fa-star text-warning'}>
				</i>
			</span>
			<span className='ms-1 text-black-75'>
				{numReviews + ' reviews'}
			</span>
		</div >
	)
}
