// @flow
import * as React from 'react';

import './style.css';
import SidebarButton from '../SidebarButton';

type Props = {
	apps: Array<Object>,
	runApp: (app: Object) => void,
	closeApp: (app: Object) => void,
};

export default class AvailableApps extends React.Component<Props> {
	static defaultProps = {
		apps: []
	};

	render() {
		const { apps, runApp, closeApp } = this.props;
		return (
			<section className="availableApps">
				<header className="availableApps-title">Available Apps</header>
				<div className="availableApps-content">
					{apps.map(app => {
						const appStyle = {
							borderLeftColor: app.color,
						}
						return (
							<div key={app.id} className="availableApps-app" style={appStyle}>
								{app.title}
								<div className="availableApps-buttons">
									<SidebarButton type="delete" size="small" color="#555" onClick={() => closeApp(app)} />
									<SidebarButton type="add" size="small" background={app.color} onClick={() => runApp(app)} />
								</div>
							</div>
						);
					})}
				</div>
			</section>
		)
	}
}
