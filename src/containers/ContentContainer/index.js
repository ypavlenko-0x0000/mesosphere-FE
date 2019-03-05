import { connect } from 'react-redux';
import Content from '../../components/Content';
import uuid from 'uuid';

import { initServers } from '../../redux/modules/servers';


export default connect(
	null,
	{
		onMount: () => initServers([
			{id: uuid(), runnedApps: [] },
			{id: uuid(), runnedApps: [] }
		])
	}
)(Content);
