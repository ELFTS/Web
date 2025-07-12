// 显示页面的函数
function showPage(pageClass) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.querySelector(`.${pageClass}`).classList.add('active');
    
    // 同步更新导航栏选中状态
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageClass);
    });
    
    // 更新URL hash
    window.location.hash = pageClass;
}

// 新增页面加载时根据hash恢复状态
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1) || 'home';
    showPage(hash);
    
    // 为所有导航链接添加点击事件处理
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(link.dataset.page);
        });
    });

    // 新增：为下载按钮添加点击事件
    const downloadTrigger = document.getElementById('downloadTrigger');
    const downloadModal = document.getElementById('downloadModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');

    if (downloadTrigger && downloadModal) {
        downloadTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            downloadModal.classList.add('active');
            document.body.classList.add('no-scroll');  // 添加禁止滚动
        });
    }

    // 新增：为关闭按钮添加点击事件
    if (modalClose && downloadModal) {
        modalClose.addEventListener('click', () => {
            downloadModal.classList.remove('active');
            document.body.classList.remove('no-scroll');  // 移除禁止滚动
        });
    }

    // 新增：为遮罩层添加点击事件
    if (modalOverlay && downloadModal) {
        modalOverlay.addEventListener('click', () => {
            downloadModal.classList.remove('active');
            document.body.classList.remove('no-scroll');  // 移除禁止滚动
        });
    }
});

// 在文件底部添加显示模态框的逻辑
document.getElementById('downloadTrigger').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('downloadModal').classList.add('active');
});

// 添加点击遮罩层关闭功能
document.querySelector('.modal-overlay').addEventListener('click', function() {
    document.getElementById('downloadModal').classList.remove('active');
});

// 添加关闭按钮事件
document.getElementById('modalClose').addEventListener('click', function() {
    document.getElementById('downloadModal').classList.remove('active');
});
