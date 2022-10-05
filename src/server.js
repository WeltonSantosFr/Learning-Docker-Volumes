import { readFile, writeFile, readdir } from "node:fs/promises"
import express from "express"

const volumePath = "data/"
const fileName = "database.json"
const fullPath = volumePath + fileName

const app = express()
app.use(express.json())

app.get("/foods", async (req, res) => {
  const fileString = await readFile(fullPath)
  return res.json(JSON.parse(fileString))
})

app.post("/foods", async (req, res) => {
  const { food } = req.body

  const fileString = await readFile(fullPath)
  const jsonParsed = JSON.parse(fileString)
  
  jsonParsed.push(food)

  writeFile(fullPath, JSON.stringify(jsonParsed))

  return res.status(201).json({"message":"Food added to list!"})
})


async function bootstrap(){
  const dataDir = await readdir(volumePath)
  
  if(!dataDir.includes(fileName)){
    await writeFile(fullPath, "[]")
    console.log("arquivo criado!")
  }

  app.listen(3000, () => console.log("App running at http://localhost:3000/"))
}

bootstrap()