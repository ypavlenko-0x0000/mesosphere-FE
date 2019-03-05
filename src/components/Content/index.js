// @flow
import * as React from 'react';
import './style.css';

import SidebarContainer from '../../containers/SidebarContainer';
import ServersContainer from '../../containers/ServersContainer';


type Props = {
	onMount: () => void
};

export default class Content extends React.Component<Props> {
	componentDidMount() {
		const { onMount } = this.props;

		onMount();
	}
	render() {
		return (
			<div className="content">
				<div className="content-wrapper">
					<SidebarContainer />
					<ServersContainer />
				</div>
			</div>
		)
	}
}
