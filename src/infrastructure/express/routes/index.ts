import { type Express, type NextFunction, type Request, type Response, Router } from 'express'

export default (app: Express): void => {
  const router = Router()
  app.use('/alyplus', router)
  router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ msg: 'Hello World' })
  })
}
