// 教程数据加载与渲染
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/tutorials/tutorials.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const tutorials = await response.json();
        renderTutorials(tutorials);
    } catch (error) {
        console.error('Error loading tutorials:', error);
        showErrorMessage('教程加载失败，请稍后重试');
    }
});

// 渲染教程卡片
function renderTutorials(tutorials) {
    const container = document.getElementById('tutorialsItemsContainer');
    if (!container) return;

    container.innerHTML = tutorials.map(tutorial => `
        <div class="tutorial-card" onclick="window.location.href='${tutorial.link || '#'}'">
            <div class="tutorial-header">
                <h2>${tutorial.title}</h2>
                <div class="lang">
                <span data-i18n="lang"></span>
                <span class="lang-text">${tutorial.lang}</span>
                </div>
            </div>
            <p class="tutorial-desc">${tutorial.description}</p>
            <div class="tutorial-meta">
                <span>${formatDate(tutorial.date)}</span>
                <div class="author">
                <span data-i18n="author">作者: </span>
                <span>${tutorial.author || '极光栈'}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// 格式化日期
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
    });
}

// 显示错误信息
function showErrorMessage(message) {
    const container = document.getElementById('tutorialsItemsContainer');
    if (!container) return;
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ff4d4f;
        padding: 1rem;
        text-align: center;
        border: 1px solid var(--border-color);
        border-radius:-
    `;
    
    container.appendChild(errorDiv);
}