const fs = require('fs');
const path = require('path');

/**
 * Script chuyển đổi từ OpenPencil (.op) sang Pencil (.pen)
 * Cách dùng: node op-to-pen.cjs <input.op> <output.pen>
 */

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
    console.error('Cách dùng: node op-to-pen.cjs <input.op> <output.pen>');
    process.exit(1);
}

try {
    const opData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    
    // Khởi tạo cấu trúc file .pen
    const penData = {
        version: "2.9", // Version mới nhất của Pencil
        variables: opData.variables || {},
        themes: opData.themes || {},
        children: []
    };

    // Hàm chuyển đổi thuộc tính node (Mapping logic)
    function mapNode(node) {
        const newNode = { ...node };

        // 1. Chuyển đổi Path geometry
        if (node.d) {
            newNode.geometry = node.d;
            delete newNode.d;
        }

        // 2. Chuyển đổi Frame clip
        if (node.clipContent !== undefined) {
            newNode.clip = node.clipContent;
            delete newNode.clipContent;
        }

        // 3. Chuyển đổi Fill (Mảng sang Đơn)
        if (Array.isArray(node.fill) && node.fill.length > 0) {
            const firstFill = node.fill[0];
            if (firstFill.type === 'solid') {
                newNode.fill = firstFill.color;
            } else {
                newNode.fill = firstFill; // Giữ nguyên nếu là gradient/image
            }
        }

        // 4. Đệ quy cho con
        if (newNode.children) {
            newNode.children = newNode.children.map(mapNode);
        }

        return newNode;
    }

    // Xử lý Pages từ OpenPencil
    // Vì Pencil không có khái niệm Page ở cấp Root, ta đưa con của mỗi Page vào Frame lớn hoặc Root
    opData.pages.forEach((page, index) => {
        console.log(`Đang xử lý trang: ${page.name}`);
        
        // Tạo một Frame đại diện cho mỗi trang để tránh chồng lấn
        const pageFrame = {
            type: "frame",
            id: `page_${index}_${Date.now()}`,
            name: `Page: ${page.name}`,
            x: index * 2000, // Đặt các trang cách nhau 2000px
            y: 0,
            width: 1920,
            height: 1080,
            children: page.children.map(mapNode)
        };
        
        penData.children.push(pageFrame);
    });

    fs.writeFileSync(outputFile, JSON.stringify(penData, null, 2));
    console.log(`✅ Chuyển đổi thành công! File đã lưu tại: ${outputFile}`);

} catch (error) {
    console.error('❌ Lỗi chuyển đổi:', error.message);
}
