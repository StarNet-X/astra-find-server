## Astra Find Server

### 这是什么？

Astra Find Server 是一个用 Node.js 编写的 Minecraft Java 服务器的端口扫描仪，将会为您寻找某地址中所有端口存在的服务器！你可以使用它去寻找朋友，或者与陌生人游玩，亦或者测试你的服务器安全性~

> [!IMPORTANT]
> **免责声明:本项目仅做学习使用, 因本项目导致的任何问题项目团队组不承担任何责任！**

> [!NOTE]
> 本项目的核心代码来源于 BiliBili Up主 [小大小深](https://space.bilibili.com/277685481)，本项目的出现也得感谢这位作者的付出

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

网页端截图:

![](.github/screenshot.png)

> [!TIP]
> 你可以在[这里](serverlist.md)去寻找一些预设的服务器，当然，请不要故意破坏他们

> [!WARNING]
> 网页端进行操作时不会验证用户行为，因此不建议直接暴露在公网进行使用，以免出现不必要的问题！
> 本项目的Bug很多，欢迎各位积极反馈

### 鸣谢

获取服务器信息 2.1.4 (本项目的核心代码正是来自这个项目哦, 欢迎给原作者一个 Star)

* [视频介绍](https://www.bilibili.com/video/BV1tm4y1P7r1/)

* [新版仓库链接](https://github.com/hite4044/Minecraft-Server-Ports-Scanner-GUI)

Node.js 第三方库:

* [Socket.io](https://github.com/socketio/socket.io)

* [express](https://github.com/expressjs/express)

前端第三方库:

* [MDUI](https://github.com/zdhxiong/mdui)

* [jQuery](https://github.com/jquery/jquery)

### 许可

本项目使用 MIT License 开源

©2023-2024 StarNet.X
