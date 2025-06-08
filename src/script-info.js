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