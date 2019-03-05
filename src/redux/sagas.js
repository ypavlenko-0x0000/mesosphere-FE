import { sagaMiddleware } from './';

import { serverSaga } from './modules/servers';

sagaMiddleware.run(serverSaga);
