# 极光栈（AuroraHub）官网开发规范

## 1. 文件
1. 源文件：
1.1. 源文件存放在 `/` 目录下。
1.2. 源文件命名规则：
1.2.1. 源文件名：`<网页名称>`
1.3. js和css的存放位置
1.3.1. js和css的存放位置：`/src`
1.3.2. js的文件名：`script-<网页名称>`
1.3.3 css的文件名：`style-<网页名称>`
1.4. 图片的存放位置：`/img`
1.5. 文档的存放位置：`/docs`

## 翻译（i18n国际化）
- 翻译文件存放在 `/` 目录下。
- 当你每次新增了按钮/输入框等文字时，请在翻译文件中分别增加zn和en

## 公共模版
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>教程|微信轰炸器</title>
    <link rel="stylesheet" href="/src/styles.css"></link>
    <link rel="stylesheet" href="tutorial-template.css"></link>
    <link rel="icon" href="/images/logo.svg" type="image/svg+xml" />
</head>
<body>
    <header class="main-header">
        <div class="header-logo">
            <img src="/images/logo.png" alt="极光栈 Logo">
            <span class="logo-text">极光栈<br>AuroraHub</span>
        </div>

        <nav class="nav-menu">
            <ul>
                <li><a href="/index.html" data-i18n="home">首页</a></li>
                <li><a href="/info.html" data-i18n="info">资讯</a></li>
                
                <li><a href="/tutorials.html" data-i18n="tutorials">教程</a></li>
                <li><a href="/resources.html" data-i18n="resources">资源广场</a></li>
            </ul>
        </nav>
        
        <div class="header-utils">
            <button class="hamburger-menu">☰</button>
            <button class="theme-switcher" onclick="toggleTheme()">🌙</button>
            <button id="login-btn" style="display:none !important;"></button>
            <button id="register-btn" style="display:none !important; margin-left:8px;"></button>
            <select class="lang-switcher">
                <option value="zh">中文</option>
                <option value="en">English</option>
            </select>
        </div>
    </header>

    <script src="/src/scripts.js"></script>
</body>
</html>
```