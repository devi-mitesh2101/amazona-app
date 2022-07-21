import React from 'react'

export const MessageBox = (props) => {
	return (
		<div className={`p-2 border border-1 border-light m-2 rounded alert-${props.variant || 'info'}`}>
			{props.children}
		</div>
	)
}
