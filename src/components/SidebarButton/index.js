// @flow
import * as React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import './style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
	type: 'add'|'delete',
	size: 'large'|'medium'|'small',
	background: ?string,
	color: string,
	children?: Node
};
export default class SidebarButton extends React.Component<Props> {
	static defaultProps = {
		type: 'add',
		size: 'medium',
		color: '#fff',
		background: null
	};

	render() {
		const { type, size, children, color, background, ...props } = this.props;
		const buttonStyle = { 
			color
		};
		return (
			<div 
				className={classNames(
					'sidebarButton',
					`sidebarButton--${type}`,
					`sidebarButton--size-${size}`,
					{ 'sidebarButton--colored': background }
				)}
				role="button"
				style={buttonStyle}
				{...props}
			>
				<div className="sidebarButton-button" style={{ borderColor: background, background }}>
					<div className="sidebarButton-icon">
						<FontAwesomeIcon icon={type === 'delete' ? 'minus' : 'plus'} />
					</div>
				</div>
				<div className="sidebarButton-title">{children}</div>
			</div>
		)
	}
}
