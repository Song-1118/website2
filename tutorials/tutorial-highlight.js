// Python关键字列表
const PYTHON_KEYWORDS = [
    'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await',
    'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except',
    'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is',
    'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return',
    'try', 'while', 'with', 'yield'
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
        
        // 修改: 调整模块名高亮正则表达式，只高亮.前面的部分
        code = code.replace(/(from|import)\s+([\w.]+)/g, 
            (match, p1, p2) => {
                const moduleName = p2.split('.')[0];
                return `${p1} <span class="code-module">${moduleName}</span>${p2.substring(moduleName.length)}`;
            });

        // 高亮函数名 (单词后面跟着括号)
        code = code.replace(/([a-zA-Z_][a-zA-Z0-9_]*)(\([^)]*\))/g, 
            '<span class="code-function">$1</span><span class="code-params">$2</span>');

        // 高亮函数定义 (def关键字后的函数名)
        code = code.replace(/(def\s+)([a-zA-Z_][a-zA-Z0-9_]*)(\([^)]*\))/g, 
            '$1<span class="code-function">$2</span><span class="code-params">$3</span>');

        // 字符串
        code = code.replace(/'''([\s\S]*?)'''/g, '<span class="code-string">$&</span>');
        code = code.replace(/"""([\s\S]*?)"""/g, '<span class="code-string">$&</span>');
        // code = code.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '<span class="code-string">$&</span>');
        // code = code.replace(/"([^"\\]*(\\.[^"\\]*)*)"(?![^<]*>)/g, '<span class="code-string">$&</span>');

        // 修改: 更精确地替换HTML特殊字符，避免影响标签
        // 只替换不在HTML标签内且不在HTML实体中的>符号
        code = code.replace(/(?<!&|\w|")&gt;(?!>)/g, '>');
        // 只替换不在HTML标签内且不在HTML实体中的<符号
        code = code.replace(/(?<!&|\w|")&lt;(?!<)/g, '<');

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