import { schema } from 'normalizr';

export const app = new schema.Entity('apps');
export const server = new schema.Entity('servers', {
	runnedApps: [app]
});


