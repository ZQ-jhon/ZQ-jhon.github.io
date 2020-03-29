---
title: 安装 VMWare for MacOS 并使用 随航(Sidecar) 功能 
date: 2020-03-29 19:03:00
tags: vmware
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---

本文记录了在 VMWare 下的 MacOS 使用 Sidecar 的种种踩坑记录，希望能对你有所帮助。

## 前置条件
1. 科学上网环境
2. 一个可以用来 随航 的硬件设备(iPad/iPhone)

## 安装 VMWare for MacOS 并使用 随航(Sidecar) 功能


### VMWare安装教程
这个 up 主讲的比较细，跟着一步一步做就好了 [https://www.bilibili.com/video/BV1a7411e7Pq](https://www.bilibili.com/video/BV1a7411e7Pq)

### 镜像地址
MacOS 10.15 镜像：[https://www.mediafire.com/file/7wm2251an4c2n64/macOS_Catalina_ISO_By_Techbland.iso/file
](https://www.mediafire.com/file/7wm2251an4c2n64/macOS_Catalina_ISO_By_Techbland.iso/file
)
由于 google drive 上下载镜像比较蛋疼，所以我又找了一个比较 nice 的镜像，可以用迅雷下载（迅雷中打开代理，设置 sockts5 科学代理）速度杠杠的:

{% asset_image xunlei.png %}



## 提前准备

### VMWare 设置 
随航 其实支持两种连入方式：
1. 同一 wifi
2. lightning / type-c 连接

由于 VMWare 中，设置的虚拟机网络为继承主机网络，因此，这里采用方式 2

首先，硬件设置中，usb 接口调整为 2.0：

{% asset_image 1.png %}

插入 usb, 看 macOS 能否识别/读取 iPad/iPhone。
在插入外部设备的时候，VMWare 会弹出提示，这里要选择连接到虚拟机：
{% asset_image 4.png %}
如果不能，在 windows 上下载 iTnues 并登陆 iCloud，信任设备，毕竟 VMWare 中的虚拟机也是享用的宿主机的端口，宿主机倘若无法识别，那虚拟机自然也识别不了。
如果一切就绪，那么 Mac 上应该显示如下:
{% asset_image 2.png %}
{% asset_image 3.png %}


## Sidecar 故障排查
可以正常识别后，发现 iPad 只显示控制栏，主要的显示区域是黑的:
{% asset_image 6.jpg %}

于是，google 关键词：“vmware cannot use sidecar”

得到如下结果：
[https://forums.macrumors.com/threads/sidecar-has-anyone-got-it-working.2184104/page-11?post=27807001#post-27807001](https://forums.macrumors.com/threads/sidecar-has-anyone-got-it-working.2184104/page-11?post=27807001#post-27807001)

大致意思就是，首先需要关闭苹果的系统完整性保护（SIP）具体的关闭步骤，请看 
[在 VMWare 中启用恢复模式](https://www.cnblogs.com/FashionDoo/p/10536756.html)
找到 Recvoer 开头的 EFI 文件，回车即可：
{% asset_image recovery.png %}
{% asset_image efi.png %}

在 Recover 的命令行中输入:
`csrutil disable` 如果出现下图，那就是 OK 了
{% asset_image 8.png %}

得到成功的 stout 后，继续输入 reboot 重启。


关闭以后，发现 System/Library/PrivateFrameworks/SideCarCore.framework/Versions/A/ 不具备写入权限，你 download 下来的 SidecarCore 无法写入到该目录，也无法通过拖拽等方式移入 chown 也不管用，一番 google 后，来到了这里：
[https://github.com/pookjw/SidecarPatcher#how-to-patch](https://github.com/pookjw/SidecarPatcher#how-to-patch)

跟着 How To Patch 一步一步做，结果一大堆报错：[!11](11.png)
来到 issue 区，发现不止我有这个问题，开发者说了，应该这么去排查 'Failed to load module' 的问题：
[https://github.com/pookjw/SidecarPatcher/issues/49#issuecomment-604580909](https://github.com/pookjw/SidecarPatcher/issues/49#issuecomment-604580909)


安装 XCODE 时，提示无法安装：
{% asset_image 9.png %}
系统必须是 10.15.2 以上（这个跟 VMWare 安装的镜像版本相关，如果有 10.15.2 以上的镜像，就别用这个[镜像](#镜像地址)了）

到了这一步，有两种处理方式：
1. （推荐）直接更新系统, 但确保你的安装盘总空间在 70 G 以上，否则会出现存储空间不足的提示，毕竟一个 update package 得 17 G 左右。
更新后的系统：
{% asset_image newest.png %}
这时，打开 AppStore 就可以正常的下载 Xcode 了
2. （不推荐）注册海外 apple id，去 [https://developer.apple.com/download/more/](https://developer.apple.com/download/more/) 下载 xcode 历史版本

## 运行效果
待更新

<b>😘 觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>
