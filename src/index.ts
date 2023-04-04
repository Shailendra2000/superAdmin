import App from './app'
import { AuthRoute,TaskRoute,usersRoute } from './routes'

const app = new App([new AuthRoute(),new TaskRoute(),new usersRoute()])
app.listen()