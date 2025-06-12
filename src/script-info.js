// 初始化资讯页面功能
document.addEventListener('DOMContentLoaded', () => {
    initSettings();
    loadInfoData();
    
    // 新增代码高亮处理
    const docPres = document.querySelectorAll('#post_content pre');
    docPres.forEach(pre => {
        const classVal = pre.getAttribute('class');
        if (classVal) {
            const classArr = classVal.split(';')[0].split(':');
            const lanClass = 'language-' + classArr[1];
            const preContent = `<code class="${lanClass}">${pre.innerHTML}</code>`;
            pre.innerHTML = preContent;
            pre.setAttribute("class", 'line-numbers ' + lanClass);
        }
    });

    // 监听主题变化
    const themeObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'data-theme') {
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                document.querySelectorAll('.info-card').forEach(el => {
                    el.style.backgroundColor = isDark ? '#1E1E1E' : '';
                    el.style.color = isDark ? '#FFFFFF' : '';
                });
                // 移除代码块的背景色
                document.querySelectorAll('pre').forEach(el => {
                    el.style.backgroundColor = 'transparent';
                });
            }
        });
    });
    themeObserver.observe(document.documentElement, { attributes: true });
});



// 加载资讯数据
async function loadInfoData() {
    try {
        const response = await fetch('/info/info.json');
        const infoData = await response.json();
        renderInfoCards(infoData);
        
        // 绑定卡片点击事件
        document.querySelectorAll('.card-clickable').forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.tagName === 'A') return;
                window.location = this.closest('[onclick]').getAttribute('onclick').match(/'(.*?)'/)[1];
            });
        });
    } catch (error) {
        console.error('Error loading info data:', error);
    }
}

// 渲染资讯卡片
function renderInfoCards(data) {
    const grid = document.querySelector('.article-grid');
    grid.innerHTML = '';
    
    data.forEach(item => {
        const card = document.createElement('article');
        card.className = 'info-card';
        card.innerHTML = `
            <div class="card-clickable" onclick="window.location='${item.url}'">
                <div class="info-content">
                    <h1 class="info-title">${item.title}</h1>
                    <p class="info-summary">${item.summary}</p>
                    <p class="info-date">${item.date}</p>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 窗口resize监听器
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelector('.nav-menu ul').style.display = 'flex';
    } else {
        document.querySelector('.nav-menu ul').style.display = 'none';
    }
});

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