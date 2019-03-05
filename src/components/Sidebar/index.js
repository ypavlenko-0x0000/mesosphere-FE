// @flow
import * as React from 'react';
import './style.css';

import SidebarButton from '../SidebarButton';
import AvailableApps from '../AvailableApps';

type Props = {
	apps: Array<Object>,
	addServer: () => void,
	findAndDeleteServer: () => void,
	findServerAndRunApp: (app: Object) => void,
	findAppAndClose: (app: Object) => void
}

export default class Sidebar extends React.Component<Props> {
	static defaultProps = {
		apps: []
	}
	render() {
		const { apps, addServer, findAndDeleteServer, findServerAndRunApp, findAppAndClose } = this.props;
		return (
			<div className="sidebar">
				<div className="sidebar-buttons">
					<SidebarButton size="large" onClick={addServer}>Add server</SidebarButton>
					<SidebarButton size="large" onClick={findAndDeleteServer} type="delete">Destroy</SidebarButton>
				</div>
				<AvailableApps apps={apps} runApp={findServerAndRunApp} closeApp={findAppAndClose} />
			</div>
		)
	}
}
