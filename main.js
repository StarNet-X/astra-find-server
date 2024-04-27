/*
 * ©2024 满月叶
 * GitHub: MoonLeeeaf
 * StarNet-X
 * 主类
 */

const scanner = require("./scanner")
const express = require('express')
const http = require("http")
const sio = require("socket.io")
const fs = require("fs")
const io = require("./iolib")

let app = express()

app.use('/', express.static('static'))

let httpServer = http.createServer(app)

let server = new sio.Server(httpServer)

async function sleep(t) { return new Promise((res) => setTimeout(() => res(), t)) }

// https://ai.wendabao-a.net/
function divideNumbersInRange(start, end, n) {
    const rangeSize = Math.ceil((end - start + 1) / n)
    const result = []

    for (let i = 0; i < n; i++) {
        const groupStart = start + i * rangeSize
        const groupEnd = Math.min(start + (i + 1) * rangeSize - 1, end)

        result.push({ min: groupStart, max: groupEnd })
    }

    return result
}

let stopScan

async function scan(server, wait, startport, endport, client) {
    console.log("线程已被分配任务")
    for (let i = startport; i < endport + 1; i++) {
        scanner.scan(server, i).then((data) => {
            if (stopScan == client.handshake.address) return
            if (data.version != null)
                data._scanner = {
                    server: server,
                    port: i,
                }
            client.emit("result", data)
            console.log("扫描: " + server + ":" + i + "")
        })
        if (stopScan == client.handshake.address) break
        await sleep(wait)
        if (stopScan == client.handshake.address) break
    }
    console.log("线程任务完毕")
}

io.mkdirs("saved_json")

function 转换数据(data) {

}

server.on("connection", (client) => {
    client.on("scan", (server, wait, threads) => {
        stopScan = null
        for (let i of divideNumbersInRange(1, 65535, threads))
            scan(server, wait, i.min, i.max, client)
    })
    client.on("save", (server, data) => {
        let d = new Date()
        let fileName = "saved_json/" + server + "_" + d.getFullYear() + d.getMonth() + d.getDay() + ".json"
        data._time = Date.now()

        let file = io.open(fileName, "rw")
        if (!io.exists(fileName))
            file.writeJson([])
    
        let arr = file.readJson()
        arr.push(data)
        file.writeJson(arr)
        file.close()
    })
    client.on("stop", () => {
        stopScan = client.handshake.address
    })
    client.on("disconnect", () => {
        stopScan = client.handshake.address
    })
})

let port = process.argv[2] != null ? parseInt(process.argv[2]) : 8080

httpServer.listen(port)

console.log("本地扫描服务器运行于端口 %d", port)

/* let limit = 65535
wait = wait == null ? 0 : wait
// 遍历到 65535
for (let i = 0; i < limit; i++) {
    scanner.scan(server, i).then((data) => {
        client.emit("result", data)
        console.log("扫描: " + server + ":" + i + "")
    })
    await sleep(wait)
} */
