// 删除原i18nData获取方式
// const i18nData = JSON.parse(document.getElementById('i18n-data').textContent);

// 新增异步加载语言文件功能
let i18nData = {};

async function loadLocale(lang) {
    try {
        const response = await fetch(`i18n.json`);
        const data = await response.json();
        i18nData = data;
        updateTextContent(lang);
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

// 修改初始化函数
async function initSettings() {
    const savedTheme = localStorage.getItem('theme') || '';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const savedLang = localStorage.getItem('lang') || 'zh';
    document.querySelector('.lang-switcher').value = savedLang;
    await loadLocale(savedLang);
}

// 修改语言切换事件
document.querySelector('.lang-switcher').addEventListener('change', async (e) => {
    const lang = e.target.value;
    localStorage.setItem('lang', lang);
    await loadLocale(lang);
});