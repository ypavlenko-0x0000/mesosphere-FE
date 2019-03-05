import { connect } from 'react-redux';
import Servers from '../../components/Servers';
import { createStructuredSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { server as serverSchema } from '../../schema'

export default connect(
	createStructuredSelector({
		servers: ({ servers }) => denormalize(servers.result, [serverSchema], servers.entities)
	}),
)(Servers)