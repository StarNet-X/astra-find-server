/*
 * ©2024 满月叶
 * GitHub: MoonLeeeaf
 * StarNet-X
 * 本代码从原作者的 Python 代码翻译而来
 */

const net = require('net');

class Protocol {
  constructor() {
    this.protocolVersion = 65
  }
  // 解码字节流
  decodeJsonBytes(data) {
    data = data.toString()
    data = data.substring(data.indexOf("{"), 114514)// data.slice(3).toString("utf-8");
    const jsonData = JSON.parse(data);
    if (jsonData === null) {
      throw new Error("JSON decoding error");
    }
    return jsonData;
  }

  // 创建一个握手包
  makeHandshakePacket(host, port) {
    const data = Buffer.concat([
      Buffer.from([0]),
      Buffer.from([this.protocolVersion]),
      Buffer.from([host.length]),
      Buffer.from(host, 'utf-8'),
      (() => {
        let a = Buffer.alloc(2)
        a.writeInt16BE(port - 32768, 0)
        return a
      })(),
      Buffer.from([1])
    ]);
    return this.makePacket(data);
  }

  // 请求服务器信息包
  makeStatePacket() {
    return this.makePacket(Buffer.from([0]));
  }

  // 制作一个包
  makePacket(data) {
    const length = Buffer.alloc(4);
    length.writeUInt32BE(data.length, 0);
    return Buffer.concat([length, data]);
  }

  // 读取包
  readPacket(c) {
    // 读取数据包长度
    const length = this.decodeVarint([c.read(2)]);
    // 获取足够长的数据
    return this.recvall(length, c);
  }

  recvall(length, c) {
    //let data = Buffer.alloc(0);
    let data = []
    while (data.length < length) {
      const more = c.read(length - data.length);
      if (!more) {
        throw new Error("EOFError");
      }
      data.push(more) //= Buffer.concat([data, more]);
    }
    return Buffer.from(data) // data;
  }

  // 解析计算机在通信协议中用varint表示数值的方法
  decodeVarint(data) {
    let number = 0;
    let shift = 0;
    for (const rawByte of data) {
      const valByte = rawByte & 0x7F;
      number |= valByte << shift;
      if ((rawByte & 0x80) === 0) {
        break;
      }
      shift += 7;
    }
    return number;
  }

}

async function sleep(t) {
  return new Promise((res) => setTimeout(() => res(), t))
}

async function scan(server, port) {
  return new Promise((res) => {
    let protocol = new Protocol();
    let client = new net.Socket();
    client.connect(port, server, async () => {
      // console.log('Connected');
      client.write(protocol.makeHandshakePacket(server, port));
      client.write(protocol.makeStatePacket())

      let ls = Buffer.alloc(0)
      client.on('data', (data) => {
        ls = Buffer.concat([ls, data])
      })

      await sleep(3000)

      try {
        res(protocol.decodeJsonBytes(ls))
      } catch (e) {
        res("错误: " + JSON.stringify(e))
      }
    })
    client.on("error", () => res("连接错误"))
    client.on("timeout", () => res("连接超时"))
    client.on("close", () => res("未收到数据包"))
  })
}

module.exports = {
  scan: scan,
}
