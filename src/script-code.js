document.addEventListener('DOMContentLoaded', () => {
    const renderCodeCards = async () => {
        try {
            const response = await fetch('/codes/codes.json');
            const codesData = await response.json();
            const container = document.getElementById('codeItemsContainer');
            
            Object.entries(codesData).forEach(([id, data]) => {
                const card = document.createElement('article');
                card.className = 'code-card';
                card.onclick = () => window.location.href = `codes/code-detail.html#${id}`;
                
                card.innerHTML = `
                    <div class="card-header">
                        <img src="${data.icon}" alt="${data.title}" class="code-icon">
                        <h2>${data.title}</h2>
                    </div>
                    <p class="code-desc">${data.description}</p>
                    <div class="card-footer">
                        <span class="version-badge">${data.version}</span>
                        <button class="btn-detail">查看详情</button>
                    </div>
                `;
                
                container.appendChild(card);
            });
        } catch (error) {
            console.error('加载代码列表失败:', error);
        }
    };

    renderCodeCards();
});