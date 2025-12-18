let withdrawAttempts = 0;

// فتح لوحة التحكم
function openAdmin() {
    document.getElementById('adminPanel').style.display = 'flex';
}

// إغلاق لوحة التحكم
function closeAdmin() {
    document.getElementById('adminPanel').style.display = 'none';
}

// حفظ التعديلات من لوحة التحكم للمواجهة الرئيسية
function saveChanges() {
    document.getElementById('disp-name').innerText = document.getElementById('in-name').value;
    document.getElementById('disp-addr').innerText = document.getElementById('in-addr').value;
    document.getElementById('disp-sub').innerText = "$" + document.getElementById('in-sub').value;
    document.getElementById('disp-profit').innerText = "$" + document.getElementById('in-profit').value;
    document.getElementById('disp-fee').innerText = document.getElementById('in-fee').value;
    closeAdmin();
}

// التحكم في النوافذ المنبثقة
function closeModal() { document.getElementById('failModal').style.display = 'none'; }
function triggerFail() { document.getElementById('failModal').style.display = 'flex'; }

// معالجة ضغطة زر السحب
function handleWithdrawClick() {
    withdrawAttempts++;
    addLogEntry();
    if (withdrawAttempts >= 3) {
        setTimeout(triggerFail, 600);
    }
}

// إجبار النظام على الفشل
function forceFail() {
    withdrawAttempts = 3;
    addLogEntry();
    triggerFail();
}

// إضافة عملية جديدة في السجل
function addLogEntry() {
    const logContainer = document.getElementById('withdrawLogs');
    const now = new Date();
    const timeStr = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
    
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `
        <div>
            <span style="color:var(--danger); font-weight:bold;">خطأ في النظام</span>
            <div style="font-size:0.7rem; color:#64748b;">عذراً، تعذر إتمام التحويل حالياً</div>
        </div>
        <span style="font-size:0.75rem; color:var(--text-secondary);">${timeStr}</span>
    `;
    
    // إضافة الإدخال الجديد في أعلى القائمة
    logContainer.insertBefore(entry, logContainer.childNodes[2]);
}
