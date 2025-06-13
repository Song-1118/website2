# 音乐板块设计

---

## 基础

- 路径( <id> 为歌曲编号)：`/music#<id>`

- css:`/src/styles.css`,`/src/style-music`

- js:`/src/scripts.js`,`/src/music-script.js`

## 功能

### 播放音乐：

- 音频搜索方案：

  1.json存放：

```json
{
	"id":{
        "name": "name",
        "songer": "songer",
        "link": "link"
    }
}
```

​	2.自动扫描：

​		js自动扫描`/musics`目录下的音频文件