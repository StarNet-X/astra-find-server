## Astra Find Server

### 这是什么？
> 在一个人游玩 Minecraft 时你是否会感觉到孤独？在你好友都不在线的时候你会不会孤独？
>  
> 没错！Astra Find Server，一个用 Node.js 编写的 Minecraft Java版服务器的扫描器，将会为您寻找某服务器中所有的 Minecraft 服务器！你可以使用它去寻找朋友，或者与陌生人游玩。

**免责声明:因本项目造成他人服务器的一切问题本团队及本项目编写者均不承担任何责任**

### 我没服玩！

> 不用担心！可以看看下面的列表

<details>

**欢迎各位通过 Issue 提交服务器地址哦**

地址等级: 
* A  非常容易封IP
* B+ 容易封IP
* B  比较容易封IP
* C+ 可能会封IP
* C  不会封IP 

| 名称 | IP地址 | 等级 |
| :-----| ----: | :----: |
| 简幻欢 | play.simpfun.cn | B+ |

</details>

### 怎么使用？

1. [下载/安装 Node.js](https://nodejs.cn/download/)

2. Clone 本库或者下载源代码

3. 运行

  * 需要先安装所需的库
  ```bash
  npm install socket.io
  npm install express
  ```

  * 完成后运行下面的命令
  ```bash
  node main.js [port]
  ```

  * 打开对应的网页即可(一般本地为 localhost:[port])

测试阶段，欢迎提问/反馈

### 鸣谢

实现原理参考 Python 扫描服务器列表 修改制作，但作者不明，仍作感谢

第三方 Node.js 库:

* [Socket.io](https://github.com/socketio/socket.io)

* [express](https://github.com/expressjs/express)

### 许可

本项目使用 MIT License 开源

©2023-2024 StarNet.X
