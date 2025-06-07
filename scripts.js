// 新增头部组件加载逻辑
function loadHeader() {
    const headerPlaceholders = document.querySelectorAll('[data-load-header]');
    
    headerPlaceholders.forEach(placeholder => {
        fetch('components/header.html')
            .then(response => response.text())
            .then(html => {
                placeholder.outerHTML = html;
                initHeaderFunctions();
                bindLangSwitcher(); // 新增绑定事件
                initSettings(); // 确保在header加载后初始化
            });
    });
}

// 初始化头部交互功能
function initHeaderFunctions() {
    // 原有头部交互逻辑...
}

// 修改初始化函数添加空值检查和元素加载确认
async function initSettings() {
    // 新增主题初始化逻辑
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : '');
    document.documentElement.setAttribute('data-theme', savedTheme);

    // 新增元素加载检查
    const checkElement = setInterval(() => {
        const langSwitcher = document.querySelector('.lang-switcher');
        if (langSwitcher) {
            clearInterval(checkElement);
            const savedLang = localStorage.getItem('lang') || 'zh';
            langSwitcher.value = savedLang;
            loadLocale(savedLang);
        }
    }, 100); // 每100ms检查一次元素存在性
}

// 修改语言切换事件绑定方式为动态绑定
function bindLangSwitcher() {
    const langSwitcher = document.querySelector('.lang-switcher');
    if (langSwitcher) {
        // 删除原有事件监听器
        const newElement = langSwitcher.cloneNode(true);
        langSwitcher.parentNode.replaceChild(newElement, langSwitcher);
        
        // 重新绑定事件
        newElement.addEventListener('change', async (e) => {
            const lang = e.target.value;
            localStorage.setItem('lang', lang);
            await loadLocale(lang);
            e.target.blur();
        });
    }
}

// 文档加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    // 新增初始化检查
    const checkElements = setInterval(() => {
        const langSwitcher = document.querySelector('.lang-switcher');
        if (langSwitcher) {
            clearInterval(checkElements);
            initSettings();
            bindLangSwitcher(); // 确保事件重新绑定
        }
    }, 100);
});