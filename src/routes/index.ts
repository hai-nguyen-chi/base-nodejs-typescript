import routerAuth from '~/routes/auth.routes'
import routerUser from '~/routes/users.routes'

import express from 'express'

const app = express()

app.use('/api', routerAuth)
app.use('/api', routerUser)

export default app
