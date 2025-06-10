// Python关键字列表
const PYTHON_KEYWORDS = [
    'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await',
    'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except',
    'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is',
    'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return',
    'try', 'while', 'with', 'yield', 'print'
];

// 高亮代码中的Python关键字、模块和函数
function highlightPythonKeywords() {
    const codeBlocks = document.querySelectorAll('.code');
    
    codeBlocks.forEach(block => {
        let code = block.innerHTML;
        
        // 高亮关键字
        PYTHON_KEYWORDS.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            code = code.replace(regex, `<span class="code-keyword">${keyword}</span>`);
        });
        
        // 修改: 调整模块名高亮正则表达式
        code = code.replace(/(from|import)\s+([\w.]+)/g, 
            '$1 <span class="code-module">$2</span>');
            
        // 高亮函数名 (单词后面跟着括号)
        code = code.replace(/([a-zA-Z_][a-zA-Z0-9_]*)(\(\))/g, 
            '<span class="code-function">$1$2</span>');

        // 字符串
        code = code.replace(/'''([\s\S]*?)'''/g, '<span class="code-string">$&</span>');
        code = code.replace(/"""([\s\S]*?)"""/g, '<span class="code-string">$&</span>');
        code = code.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '<span class="code-string">$&</span>');
        code = code.replace(/"([^"\\]*(\\.[^"\\]*)*)"(?![^<]*>)/g, '<span class="code-string">$&</span>');

        block.innerHTML = code;
        
        // 添加复制按钮
        const copyBtn = document.createElement('button');
        copyBtn.className = 'code-copy-btn';
        copyBtn.textContent = 'Copy';
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(block.textContent)
                .then(() => {
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy';
                    }, 2000);
                });
        };
        
        // 将按钮添加到父元素.code-block中
        const codeBlock = block.closest('.code-block');
        if (codeBlock) {
            codeBlock.appendChild(copyBtn);
        }
    });
}

document.addEventListener('DOMContentLoaded', highlightPythonKeywords);