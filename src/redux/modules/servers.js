import { server as serverSchema } from '../../schema';
import { normalize, denormalize } from 'normalizr';
import { takeEvery, select, put } from '@redux-saga/core/effects';
import moment from 'moment';
import uuid from 'uuid';

export const STATE_KEY = 'servers';

export const SERVER_POST = `${STATE_KEY}/POST`;
export const SERVER_DELETE = `${STATE_KEY}/DELETE`;
export const SERVER_INIT = `${STATE_KEY}/INIT`;
export const SERVER_RUN_APP = `${STATE_KEY}/RUN_APP`;
export const SERVER_CLOSE_APP = `${STATE_KEY}/CLOSE_APP`;

export const FIND_AND_DELETE = `${STATE_KEY}/FIND_AND_DELETE`;
export const FIND_AND_RUN = `${STATE_KEY}/FIND_AND_RUN`;
export const FIND_AND_CLOSE = `${STATE_KEY}/FIND_AND_CLOSE`;

// Reducer
export default (state = {}, action) => {
	const denormalized = denormalize(state.result, [serverSchema], state.entities);
	switch (action.type) {
		case SERVER_INIT:
			return normalize(action.payload, [serverSchema]);

		case SERVER_POST:
			denormalized.push({
				...action.payload,
				runnedApps: []
			});
			return normalize(denormalized, [serverSchema]);

		case SERVER_DELETE: {
			let { serverId } = action.payload;
			let index = denormalized.findIndex(server => server.id === serverId);
			denormalized.splice(index, 1);
			return normalize(denormalized, [serverSchema]);
		}
		case SERVER_RUN_APP: {
			let server = denormalized.find(server => server.id === action.payload.serverId);

			server.runnedApps = [...server.runnedApps, action.payload.appInstance];
			return normalize(denormalized, [serverSchema]);
		}
		case SERVER_CLOSE_APP: {
			let { appInstanceId, serverId } = action.payload;
			let server = denormalized.find(server => server.id === serverId);

			let index = server.runnedApps.findIndex(({ id }) => appInstanceId === id);
			server.runnedApps.splice(index, 1);
			return normalize(denormalized, [serverSchema]);
		}
		default:
			return state;
	}
};

// Action creators
export const initServers = (servers) => ({ type: SERVER_INIT, payload: servers });

export const addServer = () => ({ type: SERVER_POST, payload: { id: uuid() } });

export const findAndDeleteServer = () => ({ type: FIND_AND_DELETE, payload: {} });

export const findServerAndRunApp = (app) => ({ type: FIND_AND_RUN, payload: { app }})

export const findAppAndClose = (app) => ({ type: FIND_AND_CLOSE, payload: { app } })

// Saga
export function* serverSaga() {
	yield takeEvery(FIND_AND_DELETE, findAndDeleteSaga);
	yield takeEvery(FIND_AND_RUN, findAndRunSaga);
	yield takeEvery(FIND_AND_CLOSE, findAndCloseSaga);
};

function* findAndDeleteSaga() {
	const servers = yield select(serversSelector)
	const freeServers = servers.filter(server => !server.runnedApps.length).reverse();
	
	if (freeServers.length) {
		yield put({ type: SERVER_DELETE, payload: { serverId: freeServers[0].id } })
	}
}

function* findAndRunSaga({ payload: { app } }) {
	const servers = yield select(serversSelector)
	const availableServer = servers.find(server => !server.runnedApps || server.runnedApps.length < 2);
	if (availableServer) {
		yield put({
			type: SERVER_RUN_APP,
			payload: {
				serverId: availableServer.id,
				appInstance: { ...app, id: uuid(), appId: app.id, startedAt: moment() }
			}
		});
	}
}

function* findAndCloseSaga({ payload: { app }}) {
	const servers = yield select(serversSelector);
	const _servers = servers
		.filter(server => server.runnedApps.findIndex(({ appId }) => app.id === appId) > -1)
		.sort((a, b) => {
			const aApp = a.runnedApps.find(({ appId }) => app.id === appId);
			const bApp = b.runnedApps.find(({ appId }) => app.id === appId);

			if (aApp.startedAt.isBefore(bApp.startedAt)) return 1;
			if (aApp.startedAt.isAfter(bApp.startedAt)) return -1;
			return 0;
		});

	if (_servers.length) {
		const { id: appInstanceId } = _servers[0].runnedApps.find(appInstance => appInstance.appId === app.id);
		yield put({ type: SERVER_CLOSE_APP, payload: { serverId: _servers[0].id, appInstanceId }});
	}
}

const serversSelector = ({ servers }) => denormalize(servers.result, [serverSchema], servers.entities);