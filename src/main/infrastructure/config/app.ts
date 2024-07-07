import express, { json, type NextFunction, type Request, type Response, Router, type Express } from 'express'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  app.use(json())
  const router = Router()
  app.use('/alyplus', router)
  router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ msg: 'Hello World' })
  })
  return app
}
