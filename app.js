// 1. بيانات مشروع "العطيفي" من الفايربيز
const firebaseConfig = {
    apiKey: "AIzaSyDBLxSjRnhrShWgX026E8SgLbl_RGCZXNE",
    authDomain: "al-altifii-supplies.firebaseapp.com",
    projectId: "al-altifii-supplies",
    storageBucket: "al-altifii-supplies.firebasestorage.app",
    messagingSenderId: "886488014592",
    appId: "1:886488014592:web:4791b32865b245528c1de5",
    measurementId: "G-LKVDPTXHZ"
};

// 2. تشغيل الفايربيز وقاعدة البيانات
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 3. مسك عناصر الفورم من الـ HTML
const contactForm = document.getElementById('mainContactForm');

// 4. الاستماع لحدث الضغط على زر الإرسال
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // منع الصفحة من الـ Refresh

        // التقاط القيم المكتوبة داخل الخانات
        const name = document.getElementById('senderName').value;
        const email = document.getElementById('senderEmail').value;
        const phone = document.getElementById('senderPhone').value;
        const message = document.getElementById('senderMessage').value;

        // تغيير نص الزرار لإعلام المستخدم وجاري الإرسال
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = "جاري الإرسال...";
        submitBtn.disabled = true;

        // 5. حفظ البيانات في جدول (Collection) داخل الفايربيز هنسميه customer_messages
        db.collection('customer_messages').add({
            customerName: name,
            customerEmail: email,
            customerPhone: phone,
            customerMessage: message,
            sentAt: firebase.firestore.FieldValue.serverTimestamp() // وقت وصول الرسالة تلقائياً
        })
        .then(() => {
            alert('تم إرسال رسالتك بنجاح لشركة العطيفى! سنتواصل معك قريباً.');
            contactForm.reset(); // تفريغ الخانات بعد النجاح
        })
        .catch((error) => {
            console.error("خطأ في الإرسال: ", error);
            alert('حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة مرة أخرى.');
        })
        .finally(() => {
            // إرجاع الزر لحالته الأصلية
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}