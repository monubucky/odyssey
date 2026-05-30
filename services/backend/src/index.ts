import { OpenAPIHono } from '@hono/zod-openapi'
import orders from './routes/order'

const app = new OpenAPIHono()

app.route('/orders', orders)

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    title: 'Odyssey API',
    version: '1.0.0',
  },
})

export default app