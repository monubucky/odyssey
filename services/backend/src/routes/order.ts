import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'

const app = new OpenAPIHono()

const OrderSchema = z.object({
  id: z.string(),
  status: z.string(),
  total: z.number(),
})

const route = createRoute({
  method: 'get',
  path: '/orders',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(OrderSchema),
        },
      },
      description: 'List orders',
    },
  },
})

app.openapi(route, async (c) => {
  return c.json([], 200)
})

export default app