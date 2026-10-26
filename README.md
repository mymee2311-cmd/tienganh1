# Ôn Thi Tiếng Anh — Trắc nghiệm đảo câu và đáp án

Web độc lập cho **250 câu trắc nghiệm** trong tài liệu người dùng cung cấp (25 nhóm × 10 câu). Không gồm bài đọc điền từ của web trước.

## Tính năng
- Mỗi lượt làm mới sử dụng thuật toán Fisher–Yates để đảo cả thứ tự câu và 4 phương án; chỉ số đáp án đúng luôn được ánh xạ theo nội dung gốc.
- Chọn 10, 20, 50 hoặc 250 câu; chọn một đáp án, xem phản hồi nếu bật chế độ giải ngay.
- Nộp bài, thống kê, xem đáp án; làm lại toàn bộ (xáo lại), hoặc chỉ câu sai.
- Tương thích máy tính và điện thoại, chạy tĩnh không cần server.

## Đưa lên GitHub Pages
Tạo repository mới (ví dụ `onthi-tracnghiem`), upload trực tiếp bốn file `index.html`, `styles.css`, `app.js`, `questions.js` tại thư mục gốc. Vào Settings → Pages → Deploy from a branch → main → /(root) → Save.

## Độ tin cậy dữ liệu
Giữ câu và lựa chọn theo bản văn gốc kể cả lỗi chính tả. Đáp án do đối chiếu ngữ pháp/ý nghĩa, **chưa có bảng đáp án chính thức**; một số câu có hai đáp án hợp lý hoặc cách diễn đạt chưa chuẩn. Lời giải chưa chuyên sâu cho mọi câu; hãy rà soát kỹ trước khi dùng làm đề chấm chính thức.

Muốn sửa đáp án: trong `questions.js`, `correct` là chỉ số đáp án **theo lựa chọn gốc** (`0=A`, `1=B`, `2=C`, `3=D`), trước khi đảo tự động.
