import express from 'express'
import bodyParser from "body-parser"
import cors from "cors"
import fs from "fs"
import * as https from 'https'
import {router} from "./routes.js"
const app = express()

app.set('view engine', 'pug')
app.set('views', './src/views')

app.use(express.static('./src'))
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({extended: true}))

const port = 3200

const corsOptions = {
    'credentials': true,
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'origin': true,
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'allowedHeaders': 'Authorization,X-Requested-With,X-HTTPMethod-Override,Content-Type,Cache-Control,Accept',
}

app.use(cors(corsOptions))
app.use("/", router)

const privateKey = fs.readFileSync('./private.key', 'utf8')
const publicKey = fs.readFileSync('./public.csr', 'utf8')
const credentials = {key: privateKey, cert: publicKey}

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
    console.log(`Https server is running on ${port}`);
});