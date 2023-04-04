import App from './app'
import { SignInRoute } from './routes/signinRoute'
import { SignUpRoute } from './routes/signupRoute'
import { TaskRoute } from './routes/taskRoute'
import { usersRoute } from './routes/userRoute'

const app = new App([new SignInRoute(),new SignUpRoute(),new TaskRoute(),new usersRoute()])
app.listen()