// @flow
import * as React from 'react';
import classNames from 'classnames';
import './style.css';

type Props = {
	servers: Array<Object>
};

export default class Servers extends React.Component<Props> {
	static defaultProps = {
		servers: [],
	}
	render() {
		const { servers } = this.props;
		return (
			<section className="servers">
				<header className="servers-header">
					<h1 className="g-h1">Server Canvas</h1>
				</header>
				<div className="servers-canvas">
					{servers.map(server => {
						const appClass = classNames('servers-app', {
							'servers-app--half': server.runnedApps.length === 2
						});
						return (<div key={server.id} className="servers-item">
							{!!server.runnedApps.length && server.runnedApps.map(app => 
								<div 
									key={app.id}
									style={{
										backgroundColor: app.color,
									}}
									className={appClass}
								>
									<center className="servers-appTitle">{app.title}</center>
									<center className="servers-appAdded">Added {app.startedAt.fromNow()}</center>
								</div>
							)}
						</div>)
					})}
				</div>
			</section>
		)
	}
}