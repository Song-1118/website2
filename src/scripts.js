// 新增主题切换函数
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? '' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// 新增异步加载语言文件功能
let i18nData = {};

async function loadLocale(lang) {
    try {
        const response = await fetch(`i18n.json`);
        const data = await response.json();
        i18nData = data;
        updateTextContent(lang);
        // 修改隐私协议页面初始化逻辑
        if (window.location.pathname.includes('/privacy')) {
            document.title = i18nData[lang]['privacy_title'];
        }
    } catch (error) {
        console.error('Error loading language file:', error);
    }
}

// 新增文本更新函数
function updateTextContent(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = i18nData[lang][key];
        
        // 处理输入框placeholder
        if (element.tagName === 'INPUT') {
            element.placeholder = i18nData[lang][key];
        }
    });
}

// 修改初始化函数添加主题初始化
async function initSettings() {
    // 新增主题初始化逻辑
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : '');
    document.documentElement.setAttribute('data-theme', savedTheme);

    const savedLang = localStorage.getItem('lang') || 'zh';
    document.querySelector('.lang-switcher').value = savedLang;
    await loadLocale(savedLang);
}

document.addEventListener('DOMContentLoaded', initSettings);

// 修改语言切换事件
document.querySelector('.lang-switcher').addEventListener('change', async (e) => {
    const lang = e.target.value;
    localStorage.setItem('lang', lang);
    await loadLocale(lang);
    e.target.blur(); // 新增失焦操作
});

// 新增移动端菜单切换功能
document.querySelector('.hamburger-menu').addEventListener('click', () => {
    const navMenu = document.querySelector('.nav-menu ul');
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});

// 新增窗口resize监听器
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelector('.nav-menu ul').style.display = 'flex';
    } else {
        document.querySelector('.nav-menu ul').style.display = 'none';
    }
});
