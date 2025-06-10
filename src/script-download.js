const renderDownloadItems = async () => {
    const container = document.getElementById('downloadItemsContainer');
    
    try {
        // 显示加载状态
        container.innerHTML = '<div class="loading-spinner"></div>';

        const [downloadsResponse, i18nResponse] = await Promise.all([
            fetch('/download/download.json'),
            fetch('i18n.json')
        ]);

        if (!downloadsResponse.ok || !i18nResponse.ok) {
            throw new Error('Failed to fetch data');
        }

        const downloadData = await downloadsResponse.json();
        window.i18nData = await i18nResponse.json();
        
        const downloads = Object.values(downloadData).sort((a, b) => a.id.localeCompare(b.id));
        const lang = document.documentElement.lang || 
                     navigator.language || 
                     navigator.userLanguage || 
                     'zh';
        const baseLang = lang.split('-')[0].toLowerCase();
        
        container.innerHTML = downloads.map(item => `
            <div class="download-card" id="${item.id}">
                <div class="download-header">
                    <h3>${window.i18nData?.[baseLang]?.[item.title] || window.i18nData?.zh?.[item.title] || item.title}</h3>
                    <span class="version-badge">${item.version}</span>
                </div>
                <p class="download-desc">${window.i18nData?.[baseLang]?.[item.description] || window.i18nData?.zh?.[item.description] || item.description}</p>
                <div class="download-meta">
                    <div class="meta-item">
                        <span class="meta-label" data-i18n="last_updated"></span>
                        <span class="meta-value">${formatDate(item.date)}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label" data-i18n="file_size"></span>
                        <span class="meta-value">${item.size}</span>
                    </div>
                </div>
                <div class="download-actions">
                    ${item.downloads.map(d => `
                        <button class="btn-download" data-type="${d.type}" 
                                data-i18n="${d.label}" aria-label="${window.i18nData?.[baseLang]?.[d.label] || window.i18nData?.zh?.[d.label] || d.label}">
                            ${window.i18nData?.[baseLang]?.[d.label] || window.i18nData?.zh?.[d.label] || d.label}
                        </button>
                    `).join('')}
                </div>
            </div>
        `).join('');
        
        addDownloadEventListeners();
    } catch (error) {
        console.error('加载下载数据失败:', error);
        container.innerHTML = `
            <div class="error-message">
                <p>${window.i18nData?.[baseLang]?.['download_error'] || window.i18nData?.zh?.['download_error'] || '下载失败'}</p>
                <button onclick="renderDownloadItems()">${window.i18nData?.[baseLang]?.['retry'] || window.i18nData?.zh?.['retry'] || '重试'}</button>
            </div>
        `;
    }
};

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString(document.documentElement.lang, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// 新增updateTextElements函数
function updateTextElements() {
    const lang = document.documentElement.lang || 'zh';
    const translations = window.i18nData;
    if (!translations || !translations[lang]) return;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (element.tagName === 'INPUT') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

// 新增语言切换监听
function setupLanguageSwitcher() {
    // 监听语言属性变化
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'lang') {
                console.log('Language changed to:', document.documentElement.lang);
                renderDownloadItems();
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['lang']
    });
}

// 下载按钮事件
function addDownloadEventListeners() {
    document.querySelectorAll('.btn-download').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.closest('.download-card').id;
            const downloadType = this.dataset.type;
            handleDownload(itemId, downloadType);
        });
    });
}

// 处理下载逻辑
function handleDownload(itemId, type) {
    // 从url下载
    const url = "/download/作者很懒，还没做文件.txt"
    const fileName = url.split('/').pop();
    
    // 创建隐藏的a标签进行下载
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName; // 设置download属性强制下载
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    renderDownloadItems();
    setupLanguageSwitcher(); // 新增语言切换监听
});