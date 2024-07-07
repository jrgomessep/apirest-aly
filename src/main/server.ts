import './infrastructure/config/module-alias'
import { setupApp } from '@/main/infrastructure/config'

const createServer = async (): Promise<void> => {
  const app = await setupApp()
  app.listen(process.env.PORT, () => { console.log(`Server running at http://localhost:${process.env.PORT}`) })
}

createServer()
