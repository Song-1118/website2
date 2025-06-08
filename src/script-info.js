// 初始化资讯页面功能
document.addEventListener('DOMContentLoaded', () => {
    // 加载语言设置
    loadLocale(localStorage.getItem('lang') || 'zh');
    
    // 绑定卡片点击事件
    document.querySelectorAll('.card-clickable').forEach(card => {
        card.addEventListener('click', function(e) {
            // 阻止默认链接跳转行为
            if (e.target.tagName === 'A') return;
            window.location = this.closest('[onclick]').getAttribute('onclick').match(/'(.*?)'/)[1];
        });
    });

    // 初始化暗黑模式
    const savedTheme = localStorage.getItem('theme') || '';
    document.documentElement.setAttribute('data-theme', savedTheme);
});

// 多语言加载功能
async function loadLocale(lang) {
    try {
        // 修改i18n文件路径为info目录下的版本
        const response = await fetch('../info/i18n.json');
        const data = await response.json();
        updateTextContent(lang, data);
    } catch (error) {
        console.error('Error loading language file:', error);
    }
}

// 更新文本内容
function updateTextContent(lang, i18nData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const keyPath = element.getAttribute('data-i18n').split('.');
        let value = i18nData[lang];
        
        try {
            keyPath.forEach(key => {
                value = value[key];
            });
            
            if (value) {
                element.textContent = value;
                if (element.tagName === 'INPUT') {
                    element.placeholder = value;
                }
            }
        } catch (error) {
            console.warn(`i18n key "${keyPath.join('.')}" not found`);
        }
    });
}

// 修改语言切换事件增加元素存在判断
const langSwitcher = document.querySelector('.lang-switcher');
if (langSwitcher) {
    langSwitcher.addEventListener('change', async (e) => {
        const lang = e.target.value;
        localStorage.setItem('lang', lang);
        await loadLocale(lang);
        e.target.blur(); // 新增失焦操作
    });
}

// 新增移动端菜单切换功能
const hamburgerMenu = document.querySelector('.hamburger-menu');
if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu ul');
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// 新增窗口resize监听器
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelector('.nav-menu ul').style.display = 'flex';
    } else {
        document.querySelector('.nav-menu ul').style.display = 'none';
    }
});

// 修改初始化函数中的语言选择器判断
async function initSettings() {
    // 保留主题初始化逻辑
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : '');
    document.documentElement.setAttribute('data-theme', savedTheme);

    const savedLang = localStorage.getItem('lang') || 'zh';
    const langSwitcher = document.querySelector('.lang-switcher');
    if (langSwitcher) {
        langSwitcher.value = savedLang;
    }
    await loadLocale(savedLang);
    
    checkLoginEnable();
}
// 新增主题切换函数
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? '' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}