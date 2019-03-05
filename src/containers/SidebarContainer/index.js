import { connect } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import { addServer, findAndDeleteServer, findServerAndRunApp, findAppAndClose } from '../../redux/modules/servers';
import { createStructuredSelector } from 'reselect';

export default connect(
	createStructuredSelector({
		apps: ({ apps }) => apps
	}),
	{
		addServer,
		findAndDeleteServer,
		findServerAndRunApp,
		findAppAndClose,
	}
)(Sidebar);
