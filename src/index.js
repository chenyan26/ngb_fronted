import 'jquery/src/jquery.js';

import './index.html';
import './index.less';


import 'bootstrap/less/bootstrap.less';
import 'bootstrap/dist/js/bootstrap.js';

import dva from 'dva';

import createLoading from 'dva-loading';

// 1. Initialize

const app = dva();

/*
const app = dva({
	initialState: {
    	app: {

    	}
	}
});
*/

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/app'));
app.model(require('./models/customer'));
app.model(require('./models/sale'));
app.model(require('./models/stb'));
app.model(require('./models/account'));
app.model(require('./models/stbRecord'));
app.model(require('./models/vsRecord'));
app.model(require('./models/vodRecord'));
app.model(require('./models/content'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
