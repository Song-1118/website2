document.addEventListener('DOMContentLoaded', () => {
    const loadCodeDetail = async () => {
        const codeId = window.location.hash.substring(1);
        if (!codeId) return;

        try {
            const response = await fetch(`/codes/codes.json`);
            const codesData = await response.json();
            const data = codesData[codeId];
            
            if (data) {
                document.getElementById('codeTitle').textContent = data.title;
                document.getElementById('codeVersion').textContent = data.version;
                document.getElementById('codeDescription').textContent = data.description;
                document.getElementById('authorName').textContent = data.author;
                // document.getElementById('codeIcon').setAttribute('src', data.icon);
                // 更新元数据
                document.querySelectorAll('.meta-value').forEach((elem, index) => {
                    elem.textContent = index === 0 ? data.last_updated : data.file_size;
                });
                
                // 新增：绑定下载按钮
                const downloadBtn = document.querySelector('.btn-download');
                if (data.link && data.link.github) {
                    downloadBtn.onclick = () => {
                        window.location.href = data.link.github;
                    };
                }
            }
        } catch (error) {
            console.error('加载代码数据失败:', error);
        }
    };

    loadCodeDetail();
    window.addEventListener('hashchange', loadCodeDetail);
});