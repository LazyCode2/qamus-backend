import mongoose from 'mongoose'
import cfg from './cfg.js'

export const connect = async () => {
  mongoose.set('strictQuery', true)
  await mongoose.connect(cfg.mongoUri)
}

export const disconnect = async () => {
  await mongoose.disconnect()
}