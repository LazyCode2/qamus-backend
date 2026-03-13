import express from 'express'
import cors from "cors"
import cfg from './config/cfg.js'
import { connect } from './config/db.js'
import entryRouter from './routes/routes.js'

const app = express()

app.use(cors({
  origin: ["https://qamus-one.vercel.app/"]
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/entries', entryRouter)

app.get('/health', (_, res) => res.json({ status: 'ok' }))

app.use((_, res) => res.status(404).json({ error: 'Not found' }))

app.use((err, _, res, __) => res.status(500).json({ error: err.message }))

const start = async () => {
  await connect()
  app.listen(cfg.port, () =>
    console.log(`[server] running on port ${cfg.port} (${cfg.nodeEnv})`)
  )
}

start()