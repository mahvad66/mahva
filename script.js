let withdrawAttempts = 0;

// فتح وإغلاق لوحة التحكم
function openAdmin() {
    document.getElementById('adminPanel').style.display = 'flex';
}

function closeAdmin() {
    document.getElementById('adminPanel').style.display = 'none';
}

// حفظ التعديلات
function saveChanges() {
    document.getElementById('disp-name').innerText = document.getElementById('in-name').value;
    document.getElementById('disp-addr').innerText = document.getElementById('in-addr').value;
    document.getElementById('disp-sub').innerText = "$" + document.getElementById('in-sub').value;
    document.getElementById('disp-profit').innerText = "$" + document.getElementById('in-profit').value;
    document.getElementById('disp-fee').innerText = document.getElementById('in-fee').value;
    closeAdmin();
}

// التحكم في النافذة المنبثقة
function closeModal() { document.getElementById('failModal').style.display = 'none'; }
function triggerFail() { document.getElementById('failModal').style.display = 'flex'; }

// منطق السحب
function handleWithdrawClick() {
    withdrawAttempts++;
    if (withdrawAttempts < 3) {
        addLogEntry(true);
    } else {
        addLogEntry(false);
        setTimeout(triggerFail, 600);
    }
}

function forceFail() {
    withdrawAttempts = 3;
    addLogEntry(false);
    triggerFail();
}

// إضافة السجل في الوسط
function addLogEntry(isSuccess) {
    const logContainer = document.getElementById('withdrawLogs');
    const now = new Date();
    const timeStr = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
    const entry = document.createElement('div');
    entry.className = 'log-entry';

    if (isSuccess) {
        entry.style.border = "1px solid rgba(14, 203, 129, 0.2)";
        entry.innerHTML = `
            <span style="color:var(--success); font-weight:bold; font-size:0.85rem;">تمت المعالجة</span>
            <div style="font-size:0.7rem; color:#64748b;">تم التحقق من طلب السحب بنجاح</div>
            <span style="font-size:0.65rem; color:var(--text-secondary); margin-top:4px;">${timeStr}</span>`;
    } else {
        entry.style.border = "1px solid rgba(246, 70, 93, 0.2)";
        entry.innerHTML = `
            <span style="color:var(--danger); font-weight:bold; font-size:0.85rem;">خطأ بالنظام </span>
            <div style="font-size:0.7rem; color:#64748b;"> نظرآ لعدم توفر الرسوم الضريبية لسحب الارباح</div>
            <span style="font-size:0.65rem; color:var(--text-secondary); margin-top:4px;">${timeStr}</span>`;
    }

    logContainer.insertBefore(entry, logContainer.childNodes[2]);
}
