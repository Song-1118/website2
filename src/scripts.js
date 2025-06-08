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
        // 修改前: const response = await fetch(`i18n.json`);
        // 修改后使用根目录绝对路径
        const response = await fetch(`/i18n.json`);
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

// 修改登录功能检查逻辑增加空值判断
function checkLoginEnable() {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    
    if (loginBtn && registerBtn) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
    }
}

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

document.addEventListener('DOMContentLoaded', initSettings);

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

// 新增注册表单提交处理
// 修改后的注册表单提交处理
document.querySelector('.login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 新增功能未完成提示
    showError('注册功能暂未完成，敬请期待');

});

// 新增错误提示函数
function showError(message) {
    const errorDiv = document.querySelector('.error-message') || document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = 'color:red; padding:10px; margin-bottom:15px; border:1px solid #ffcccc; background:#ffeeee;';
    
    const form = document.querySelector('.login-form');
    if (!document.querySelector('.error-message')) {
        form.prepend(errorDiv);
    }
}
