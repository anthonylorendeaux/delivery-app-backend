import mongoose, { ConnectOptions } from "mongoose"

type DBInput = {
  db: string,
}
export default ({ db }: DBInput) => {
  const connect = () => {
    mongoose
      .connect(db, { useNewUrlParser: true, } as ConnectOptions)
      .then(() => {
        return console.info(`Successfully connected to ${db}`)
      })
      .catch(err => {
        console.error(`Error connecting to database :`, err)
        return process.exit(1)
      })
  }
  connect()
  mongoose.connection.on("disconnected", connect)
}