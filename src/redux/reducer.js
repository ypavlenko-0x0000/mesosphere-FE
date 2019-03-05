import { combineReducers } from 'redux';
import servers, { STATE_KEY as SERVERS_STATE_KEY } from './modules/servers';
import apps, { STATE_KEY as APPS_STATE_KEY} from './modules/apps';

export default combineReducers({
	[SERVERS_STATE_KEY]: servers,
	[APPS_STATE_KEY]: apps
});
