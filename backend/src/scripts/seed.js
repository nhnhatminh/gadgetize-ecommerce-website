// Nạp biến môi trường ngay dòng đầu tiên để tránh lỗi ESM Hoisting
import "dotenv/config";
import bcrypt from "bcrypt";
import pool from "../config/database.js";

// Chặn không cho chạy seed script trên môi trường Production
if (process.env.NODE_ENV === "production") {
  console.error("LỖI BẢO MẬT: Không thể thực thi seed script trên môi trường Production!");
  process.exit(1);
}

// Hàm hỗ trợ chuyển đổi chuỗi thành slug chuẩn URL
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

const seedDatabase = async () => {
  const client = await pool.connect();
  try {
    console.log("Bắt đầu khởi tạo dữ liệu chuẩn (160 sản phẩm tiếng Việt tỉ lệ 1:1)...");
    await client.query("BEGIN");

    // 1. Dọn dẹp dữ liệu cũ trong CSDL
    await client.query(`
      TRUNCATE TABLE product_images, product_variants, products, brands, categories 
      RESTART IDENTITY CASCADE
    `);

    // 2. Tạo tài khoản mặc định
    const hashedPassword = await bcrypt.hash("Admin@123", 10);
    await client.query(
      `
      INSERT INTO users (first_name, last_name, email, password_hash, phone, role)
      VALUES 
      ('Minh', 'Admin', 'minhadmin@gadgetize.com', $1, '0987654321', 'admin'),
      ('My', 'Customer', 'mycustomer@gadgetize.com', $1, '0907654321', 'customer')
      ON CONFLICT (email) DO NOTHING
    `,
      [hashedPassword]
    );

    // 3. Khởi tạo 8 danh mục chuẩn khớp với Frontend
    const categoriesData = [
      { name: "Laptop", slug: "laptop" },
      { name: "Tai nghe không dây", slug: "tai-nghe-khong-day" },
      { name: "Bàn phím", slug: "ban-phim" },
      { name: "TV & Màn hình LCD", slug: "tv-man-hinh-lcd" },
      { name: "Chuột Gaming", slug: "chuot-gaming" },
      { name: "Điện Thoại", slug: "dien-thoai" },
      { name: "Tai nghe có dây", slug: "tai-nghe-co-day" },
      { name: "Tay cầm chơi game", slug: "tay-cam-choi-game" },
    ];

    const categoryMap = {};
    for (const category of categoriesData) {
      const res = await client.query(
        `INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING id, slug`,
        [category.name, category.slug]
      );
      categoryMap[category.slug] = res.rows[0].id;
    }

    // 4. Bộ sưu tập hình ảnh tỷ lệ vuông 1:1 chuẩn
    const categoryImages = {
      laptop: [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1544731612-de7f96afe55f?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?fit=crop&w=600&h=600&q=80"
      ],
      "tai-nghe-khong-day": [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?fit=crop&w=600&h=600&q=80"
      ],
      "ban-phim": [
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1595225476474-87563907a212?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1541140532154-b024d715b909?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1626218174358-7769486c4b79?fit=crop&w=600&h=600&q=80"
      ],
      "tv-man-hinh-lcd": [
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1593784991095-a205069470b6?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1547119957-637f8679db1e?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1551645120-d70bfe84c826?fit=crop&w=600&h=600&q=80"
      ],
      "chuot-gaming": [
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1613141411244-0e4ac259d217?fit=crop&w=600&h=600&q=80"
      ],
      "dien-thoai": [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?fit=crop&w=600&h=600&q=80"
      ],
      "tai-nghe-co-day": [
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1599669454699-248893623440?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?fit=crop&w=600&h=600&q=80"
      ],
      "tay-cam-choi-game": [
        "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1592840496694-26d035b52b48?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?fit=crop&w=600&h=600&q=80"
      ]
    };

    // 5. Danh sách mẫu 160 sản phẩm công nghệ đã việt hóa tự nhiên
    const categoryTemplates = {
      laptop: {
        brands: ["Apple", "Dell", "ASUS", "Lenovo", "HP", "Razer", "MSI", "Acer"],
        items: [
          { name: "Laptop Apple MacBook Pro 16 inch", desc: "Dòng laptop cao cấp sở hữu hiệu năng đỉnh cao, màn hình Liquid Retina XDR sắc nét cùng thiết kế chuẩn studio chuyên nghiệp." },
          { name: "Laptop Dell XPS 15 (Phiên bản Air)", desc: "Laptop mỏng nhẹ sang trọng với thiết kế viền màn hình siêu mỏng, hiệu năng ổn định tối ưu cho công việc văn phòng và đồ họa." },
          { name: "Laptop ASUS XPS 15 Ultra", desc: "Mẫu máy tính xách tay cao cấp kết hợp hoàn hảo giữa thiết kế mỏng nhẹ và sức mạnh xử lý đồ họa vượt trội." },
          { name: "Laptop Gaming Lenovo ROG Strix", desc: "Laptop chơi game chuyên nghiệp với hệ thống tản nhiệt tiên tiến, màn hình tần số quét cao cho trải nghiệm chiến game mượt mà." },
          { name: "Laptop HP ThinkPad X1", desc: "Dòng laptop huyền thoại với độ bền chuẩn doanh nghiệp, bàn phím gõ êm ái và tính năng bảo mật tối tân." },
          { name: "Laptop Razer Spectre x360", desc: "Thiết kế xoay gập 360 độ linh hoạt kết hợp vỏ nhôm nguyên khối sang trọng, đáp ứng trọn vẹn nhu cầu làm việc và giải trí." },
          { name: "Laptop Gaming MSI Blade 16", desc: "Mẫu laptop gaming mỏng nhẹ cao cấp, trang bị cấu hình phần cứng mạnh mẽ cùng khả năng hiển thị màu sắc chính xác." },
          { name: "Laptop Acer Stealth 16 Studio", desc: "Dòng laptop tối ưu cho nhà sáng tạo nội dung với thiết kế tinh tế, vi xử lý thế hệ mới và màn hình chuẩn màu sắc nét." },
          { name: "Laptop Apple Predator 16 Pro", desc: "Sự kết hợp giữa hiệu năng xử lý tốc độ cao và thiết kế hiện đại, phù hợp cho mọi tác vụ từ lập trình đến thiết kế đồ họa." },
          { name: "Laptop Dell Zenbook 14 OLED", desc: "Laptop siêu mỏng nhẹ sở hữu màn hình OLED sắc nét, thời lượng pin ấn tượng, lý tưởng cho người dùng thường xuyên di chuyển." },
          { name: "Laptop Gaming ASUS Legion Pro", desc: "Cỗ máy chiến game đỉnh cao với vi xử lý thế hệ mới, bàn phím phản hồi nhanh và hệ thống tản nhiệt AI thông minh." },
          { name: "Laptop Gaming Lenovo Alienware x16", desc: "Thiết kế đậm chất tương lai cùng sức mạnh đồ họa vượt giới hạn, đáp ứng những tựa game AAA nặng nhất hiện nay." },
          { name: "Laptop HP Gram 17", desc: "Trọng lượng siêu nhẹ trong một màn hình 17 inch rộng lớn, đem lại không gian hiển thị thoải mái mà vẫn tối ưu khả năng di động." },
          { name: "Laptop Razer Envy 14 Creator", desc: "Mẫu laptop chuyên biệt cho dân thiết kế với màn hình tỉ lệ chuẩn, màu sắc trung thực và khả năng tản nhiệt tối ưu." },
          { name: "Laptop Cảm Ứng MSI Yoga Slim", desc: "Thân máy siêu mỏng, màn hình cảm ứng sắc nét cùng khả năng xử lý đa nhiệm mượt mà cho mọi tác vụ công việc hằng ngày." },
          { name: "Laptop Gaming Acer TUF Gaming", desc: "Laptop chơi game chuẩn độ bền quân đội, thiết kế ấn tượng cùng hiệu năng mạnh mẽ trong tầm giá cực kỳ hấp dẫn." },
          { name: "Laptop Apple Vivobook Pro 15", desc: "Màn hình sắc nét, vi xử lý tốc độ cao giúp tối ưu hóa quy trình làm việc sáng tạo nội dung và xử lý hình ảnh chuyên nghiệp." },
          { name: "Laptop Gaming Dell Katana 15", desc: "Được lấy cảm hứng từ thanh kiếm Katana sắc bén, cỗ máy mang lại sức mạnh chiến game mượt mà và thiết kế đầy cá tính." },
          { name: "Laptop Gaming ASUS Nitro 5", desc: "Dòng laptop gaming quốc dân với cấu hình vượt trội, hệ thống quạt đôi tản nhiệt mát mẻ và màn hình 144Hz mượt mà." },
          { name: "Laptop Lenovo Swift Go 14", desc: "Thiết kế nhôm nguyên khối thời trang, tích hợp vi xử lý AI thế hệ mới giúp nâng cao hiệu suất làm việc mọi lúc mọi nơi." }
        ]
      },
      "tai-nghe-khong-day": {
        brands: ["Apple", "Sony", "Bose", "Samsung", "Marshall", "Sennheiser", "JBL", "Beats"],
        items: [
          { name: "Tai Nghe Chụp Tai Apple AirPods Max", desc: "Tai nghe Bluetooth cao cấp với thiết kế sang trọng, âm thanh High-Fidelity chân thực cùng công nghệ chống ồn chủ động đỉnh cao." },
          { name: "Tai Nghe Không Dây Sony AirPods Pro 2", desc: "Sự kết hợp hoàn hảo giữa khả năng chống ồn chủ động thông minh, chất âm trầm sâu lắng và thời lượng pin vượt trội." },
          { name: "Tai Nghe Chụp Tai Bose WH-1000XM5", desc: "Tai nghe chống ồn tốt nhất phân khúc với thiết kế êm ái, micro thu âm rõ nét và công nghệ xử lý âm thanh độc quyền." },
          { name: "Tai Nghe Không Dây Samsung QuietComfort II", desc: "Thiết kế nhỏ gọn vừa vặn lỗ tai, trang bị công nghệ khử tiếng ồn chủ động giúp bạn đắm chìm vào không gian âm nhạc riêng tư." },
          { name: "Tai Nghe Bluetooth Marshall Galaxy Buds2 Pro", desc: "Chất âm đậm chất Rock cổ điển kết hợp công nghệ Bluetooth hiện đại, mang lại trải nghiệm nghe nhạc sống động từng chi tiết." },
          { name: "Tai Nghe Không Dây Sennheiser Motif II A.N.C", desc: "Tai nghe True Wireless cao cấp với chất âm chuẩn audiophile, thiết kế tinh tế và khả năng chống nước chuẩn tiện lợi." },
          { name: "Tai Nghe Chụp Tai JBL Momentum 4", desc: "Thời lượng pin ấn tượng lên đến 60 giờ liên tục, chất âm Pure Bass mạnh mẽ thỏa mãn mọi tín đồ âm nhạc sôi động." },
          { name: "Tai Nghe True Wireless Beats Tour Pro 2", desc: "Hộp sạc tích hợp màn hình cảm ứng thông minh đầu tiên, hỗ trợ điều khiển phát nhạc và tùy chỉnh âm thanh nhanh chóng." },
          { name: "Tai Nghe Chụp Tai Apple Studio Pro", desc: "Âm thanh vòm Spatial Audio sống động, kết nối không dây mượt mà và khả năng đàm thoại rõ ràng trong mọi môi trường." },
          { name: "Tai Nghe True Wireless Sony WF-1000XM5", desc: "Cảm biến âm thanh thế hệ mới đem lại khả năng chống ồn tuyệt đối và chất lượng âm thanh Hi-Res Audio Wireless đỉnh cao." },
          { name: "Tai Nghe Chụp Tai Bose QuietComfort Ultra", desc: "Đỉnh cao công nghệ âm thanh không dây với chế độ Immersive Audio cho cảm giác âm thanh phát ra từ mọi hướng xung quanh." },
          { name: "Tai Nghe Bluetooth Samsung Live Pro 2", desc: "Thiết kế hình hạt đậu độc đáo ôm sát vành tai, kết nối không dây ổn định và microphone lọc ồn tối ưu cho hội thoại." },
          { name: "Tai Nghe Chụp Tai Marshall Solo 4 Wireless", desc: "Phong cách thiết kế cổ điển biểu tượng, đệm tai bọc da êm ái cùng chất âm chi tiết chân thực đặc trưng của Marshall." },
          { name: "Tai Nghe True Wireless Sennheiser CX Plus", desc: "Công nghệ giải mã âm thanh aptX Adaptive tiên tiến, mang lại chất âm trung thực, độ trễ thấp tối ưu cho cả nghe nhạc và xem phim." },
          { name: "Tai Nghe Bluetooth JBL Minor III", desc: "Thiết kế earbud thoải mái không gây đau tai, thao tác cảm ứng mượt mà cùng chất âm tự nhiên, trong trẻo." },
          { name: "Tai Nghe Thể Thao Beats Buds FE", desc: "Thiết kế cánh gài tai chắc chắn chuyên biệt cho tập luyện thể thao, chống mồ hôi tốt cùng âm bass uy lực thúc đẩy năng lượng." },
          { name: "Tai Nghe True Wireless Apple FreeBuds Pro 3", desc: "Khả năng truyền tải âm thanh không ma sát, kết nối đa thiết bị linh hoạt và khả năng kháng bụi nước đáng tin cậy." },
          { name: "Tai Nghe Bluetooth Sony Enco X2", desc: "Hệ thống đồng phát âm thanh kép mang lại dải âm trầm sâu lắng và dải cao trong trẻo, tinh tế đến kinh ngạc." },
          { name: "Tai Nghe True Wireless Bose Tune 230NC", desc: "Công nghệ Pure Bass Sound cùng 4 micro đàm thoại rõ nét, giúp bạn tự tin kết nối và thưởng thức âm nhạc suốt ngày dài." },
          { name: "Tai Nghe Bluetooth Samsung Soundcore Liberty 4", desc: "Tích hợp cảm biến theo dõi nhịp tim thông minh, âm thanh vòm 360 độ và khả năng tùy chỉnh EQ cá nhân hóa qua ứng dụng." }
        ]
      },
      "ban-phim": {
        brands: ["Logitech", "Razer", "Corsair", "SteelSeries", "Keychron", "Akko", "ASUS", "NuPhy"],
        items: [
          { name: "Bàn Phím Không Dây Logitech MX Keys Mini", desc: "Bàn phím nhỏ gọn cao cấp, phím bấm lõm ôm đầu ngón tay gõ êm ái, tối ưu không gian làm việc cho lập trình viên và văn phòng." },
          { name: "Bàn Phím Cơ Gaming Razer G Pro X TKL", desc: "Bàn phím cơ nhỏ gọn lược bỏ phím số chuẩn thi đấu Esports, switch cơ học phản hồi siêu tốc và cáp tháo rời tiện lợi." },
          { name: "Bàn Phím Cơ Quang Học Corsair Huntsman V2", desc: "Trang bị switch quang học cho tốc độ phản hồi gần như tức thì, độ bền 100 triệu lần nhấn cùng dải đèn LED RGB sắc nét." },
          { name: "Bàn Phím Cơ SteelSeries BlackWidow V4", desc: "Hệ thống phím macro chuyên dụng, núm xoay đa phương tiện tiện lợi và đệm nghỉ tay bọc da êm ái cho thời gian sử dụng dài." },
          { name: "Bàn Phím Cơ Không Dây Keychron K100 RGB", desc: "Tương thích hoàn hảo cả Mac và Windows, hỗ trợ kết nối đa thiết bị qua Bluetooth và switch cơ học gõ cực kỳ đã tay." },
          { name: "Bàn Phím Cơ Akko Apex Pro TKL", desc: "Keycap PBT Double-Shot siêu bền chống bám mồ hôi, phối màu độc đáo và trải nghiệm gõ phím mượt mà chắc chắn." },
          { name: "Bàn Phím Cơ Không Dây ASUS K2 Pro", desc: "Kết nối 3 chế độ linh hoạt (Bluetooth, 2.4GHz, Type-C), hỗ trợ Hot-swap giúp dễ dàng thay thế switch theo sở thích." },
          { name: "Bàn Phím Cơ NuPhy 3068B Plus", desc: "Thiết kế layout 65% nhỏ gọn, trang bị lót foam tiêu âm cao cấp mang lại âm thanh gõ trầm đục êm tai." },
          { name: "Bàn Phím Cơ Custom Logitech ROG Azoth", desc: "Bàn phím cơ cao cấp tích hợp màn hình OLED hiển thị thông số, thiết kế Gasket mount gõ êm mượt chuẩn Custom." },
          { name: "Bàn Phím Cơ Mỏng Nhẹ Razer Air75 V2", desc: "Thiết kế Low-profile siêu mỏng thời trang, switch hành trình ngắn giúp gõ nhanh và giảm mỏi cổ tay hiệu quả." },
          { name: "Bàn Phím Cơ Không Dây Corsair MX Mechanical", desc: "Bàn phím cơ văn phòng cao cấp với switch Tactile gõ êm không gây tiếng ồn, đèn nền thông minh tự bật khi đưa tay lại gần." },
          { name: "Bàn Phím Cơ Siêu Mỏng SteelSeries DeathStalker V2", desc: "Công nghệ switch quang học Low-Profile cho độ nhạy cực cao, mặt lưng nhôm phay xước bền bỉ và sang trọng." },
          { name: "Bàn Phím Cơ Gaming Keychron K70 MAX", desc: "Trang bị switch từ tính điều chỉnh được điểm kích hoạt linh hoạt, tần số truy vấn 8000Hz cho độ trễ cực thấp." },
          { name: "Bàn Phím Cơ Gaming Akko Apex 7", desc: "Khung hợp kim nhôm chuẩn hàng không cực kỳ vững chắc, màn hình hiển thị OLED thông minh và hệ thống đèn RGB từng phím." },
          { name: "Bàn Phím Cơ Không Dây ASUS K8 Pro", desc: "Thời lượng pin dùng nhiều tuần liên tục, thiết kế gọn gàng tối ưu diện tích di chuột cho game thủ FPS." },
          { name: "Bàn Phím Cơ NuPhy 5075B Plus RGB", desc: "Mạch ngược RGB sặc sỡ, hỗ trợ tính năng mạch Hot-swap 5 pin dễ dàng nâng cấp switch và custom theo phong cách riêng." },
          { name: "Bàn Phím Cơ Logitech Falchion RX", desc: "Thanh cảm ứng chạm thông minh bên hông thân phím, đi kèm nắp bảo vệ chống bụi tiện lợi khi mang đi làm việc xa." },
          { name: "Bàn Phím Cơ Không Dây Razer Halo75", desc: "Layout 75% cân bằng hoàn hảo giữa phím chức năng và sự gọn nhẹ, dải đèn viền Halo RGB đẹp mắt." },
          { name: "Bàn Phím Cơ Siêu Mỏng Corsair G915 LIGHTSPEED", desc: "Kết nối không dây LIGHTSPEED chuẩn thi đấu, mỏng nhẹ đẳng cấp với phím bấm cơ học phản hồi chính xác." },
          { name: "Bàn Phím Giả Cơ SteelSeries Ornata V3", desc: "Công nghệ Mecha-Membrane kết hợp cảm giác gõ êm của phím cao su và tiếng clicky giòn giã của bàn phím cơ." }
        ]
      },
      "tv-man-hinh-lcd": {
        brands: ["Samsung", "LG", "Dell", "ASUS", "Sony", "ViewSonic", "Gigabyte", "AOC"],
        items: [
          { name: "Màn Hình Cong Samsung Odyssey Neo G9 49 inch", desc: "Màn hình cong siêu rộng 49 inch độ phân giải Dual QHD, công nghệ Quantum Mini-LED cho trải nghiệm thị giác đắm chìm tuyệt đối." },
          { name: "Màn Hình Gaming LG UltraGear 27 inch 180Hz", desc: "Tấm nền Nano IPS tốc độ phản hồi 1ms, tần số quét 180Hz siêu mượt xóa bỏ hoàn toàn hiện tượng xé hình khi chơi game." },
          { name: "Màn Hình Đồ Họa Dell UltraSharp U2724DE 2K", desc: "Công nghệ tấm nền IPS Black cho độ tương phản vượt trội, màu sắc chuẩn xác chuyên dụng cho thiết kế đồ họa và dựng phim." },
          { name: "Màn Hình OLED Gaming ASUS ROG Swift 240Hz", desc: "Tấm nền OLED độ phân giải 2K sắc nét, tần số quét 240Hz cực đỉnh mang lại màu đen sâu thẳm và tốc độ phản hồi siêu nhanh." },
          { name: "Android TV Sony BRAVIA 55 inch 4K HDR", desc: "Bộ xử lý trí tuệ nhận thức XR Cognitive tái tạo hình ảnh và âm thanh sống động như mắt người nhìn, tích hợp Google TV thông minh." },
          { name: "Màn Hình Chuyên Nghiệp ViewSonic ColorPro 4K", desc: "Đạt chuẩn màu 100% sRGB và Adobe RGB, đi kèm cân bằng màu phần cứng tích hợp sẵn cho nhiếp ảnh gia và artist." },
          { name: "Màn Hình Gaming Gigabyte M27Q X 240Hz", desc: "Tích hợp bộ chuyển mạch KVM điều khiển nhiều thiết bị cùng lúc, độ phân giải 2K sắc nét cùng tần số quét 240Hz." },
          { name: "Màn Hình Cong AOC 32 inch 165Hz Quad HD", desc: "Độ cong 1000R tối ưu cho góc nhìn tự nhiên, màn hình lớn 32 inch cho không gian làm việc và giải trí cực kỳ thoải mái." },
          { name: "Smart TV Samsung 65 inch Crystal UHD 4K", desc: "Thiết kế viền siêu mỏng 3 cạnh, công nghệ PurColor hiển thị dải màu rộng sắc nét và hệ điều hành Tizen OS mượt mà." },
          { name: "Smart TV OLED LG Evo C3 55 inch 4K", desc: "Các điểm ảnh tự phát sáng mang lại độ tương phản tuyệt đối, hỗ trợ chuẩn Dolby Vision IQ & Dolby Atmos đỉnh cao điện ảnh." },
          { name: "Màn Hình Cong Dell Odyssey OLED G8", desc: "Độ phân giải UWQHD sắc nét, công nghệ làm mát vi mô bảo vệ tấm nền OLED và vi xử lý Neo Quantum cải thiện hình ảnh tức thì." },
          { name: "Màn Hình Đồ Họa ASUS DualUp 28 inch Tỉ Lệ Độc Đáo", desc: "Tỉ lệ màn hình 16:18 độc đáo tương đương 2 màn hình ghép lại, tối ưu không gian cuộn trang cho lập trình viên và sáng tạo." },
          { name: "Màn Hình Gaming Cong Sony Alienware 34 inch QD-OLED", desc: "Công nghệ Quantum Dot OLED tiên tiến đem lại màu sắc sống động rực rỡ, góc nhìn rộng và chứng nhận VESA DisplayHDR SmartStop." },
          { name: "Màn Hình Gaming ViewSonic TUF 27 inch 2K 170Hz", desc: "Công nghệ Extreme Low Motion Blur Sync élimines bóng mờ, độ phân giải 2K chi tiết vượt trội cho các trận game đỉnh cao." },
          { name: "Smart TV Gigabyte A95L QD-OLED 4K", desc: "Đỉnh cao hiển thị TV với màu sắc rực rỡ từ công nghệ Chấm lượng tử OLED, hệ thống âm thanh phát ra trực tiếp từ màn hình." },
          { name: "Màn Hình Cong Đồ Họa AOC 34 inch Ultrawide", desc: "Góc nhìn siêu rộng tỉ lệ 21:9 mở rộng không gian làm việc đa nhiệm nhiều cửa sổ, màu sắc chuẩn xác rực rỡ." },
          { name: "Màn Hình Gaming Samsung AORUS 32 inch 4K 240Hz", desc: "Màn hình OLED 4K tần số quét 240Hz đầu tiên trên thế giới, cổng kết nối DisplayPort 2.1 băng thông siêu rộng chuẩn tương lai." },
          { name: "Màn Hình Gaming LG AGON PRO 27 inch 360Hz", desc: "Tần số quét đỉnh cao 360Hz sinh ra dành riêng cho game thủ Esports chuyên nghiệp, công nghệ NVIDIA G-SYNC cứng chống xé hình." },
          { name: "Smart TV Dell Neo QLED 8K 65 inch Ultra HD", desc: "Độ phân giải 8K siêu thực với 33 triệu điểm ảnh, bộ xử lý AI nâng cấp nội dung thường lên chuẩn 8K sắc nét kinh ngạc." },
          { name: "Màn Hình Cao Cấp ASUS QNED90 Mini-LED 4K", desc: "Công nghệ đèn nền Mini-LED kiểm soát vùng sáng tối chính xác, màu sắc phong phú đạt chứng nhận màu sắc chuyên nghiệp." }
        ]
      },
      "chuot-gaming": {
        brands: ["Logitech", "Razer", "SteelSeries", "ASUS", "Pulsar", "Corsair", "Glorious", "Zowie"],
        items: [
          { name: "Chuột Gaming Không Dây Logitech G Pro X Superlight 2", desc: "Thế hệ chuột siêu nhẹ dưới 60g chuẩn thi đấu Esports, switch lai LIGHTFORCE độ bền cao và cảm biến HERO 2 chính xác từng micromet." },
          { name: "Chuột Gaming Mắt Đọc Quang Học Razer G502 X LIGHTSPEED", desc: "Thiết kế bất đối xứng huyền thoại được cải tiến nhẹ hơn, trang bị switch quang học lai cơ và con lăn cuộn vô cực đa năng." },
          { name: "Chuột Gaming Siêu Nhẹ SteelSeries Viper V2 Pro", desc: "Trọng lượng siêu nhẹ chỉ 58g, cảm biến Focus Pro 30K cực kỳ chính xác trên mọi bề mặt kể cả mặt kính." },
          { name: "Chuột Gaming Ergonomic ASUS DeathAdder V3 Pro", desc: "Form cầm công phượng hoàn hảo cho người thuận tay phải, kết nối không dây độ trễ cực thấp và thời lượng pin dài." },
          { name: "Chuột Gaming Không Dây Pulsar Rival 650", desc: "Hệ thống cảm biến đôi TrueMove3+ theo dõi độ cao nâng chuột chính xác, hỗ trợ sạc nhanh 15 phút cho 10 giờ sử dụng." },
          { name: "Chuột Gaming Không Dây Corsair ROG Gladius III", desc: "Chế độ kết nối 3 phương thức linh hoạt, phích cắm switch dạng Push-Fit dễ dàng thay thế switch chuột trong vài giây." },
          { name: "Chuột Gaming Đối Xứng Glorious X2V2 Wireless", desc: "Thiết kế vỏ kín liền khối chắc chắn nhưng vẫn giữ trọng lượng siêu nhẹ, mắt đọc quang học chống rơ phím hiệu quả." },
          { name: "Chuột Gaming Siêu Nhẹ Zowie M75 AIR Wireless", desc: "Cấu trúc mỏng nhẹ tối giản 60g, thiết kế đối xứng hoàn hảo giúp linh hoạt điều khiển trong các pha ngắm bắn nhanh." },
          { name: "Chuột Gaming Lỗ Tổ Ong Glorious Model O 2", desc: "Vỏ dập lỗ tổ ong thoáng khí giảm mồ hôi tay, cảm biến BAMF 2.0 theo dõi chuyển động mượt mà và dây cáp siêu mềm linh hoạt." },
          { name: "Chuột Gaming Esports Zowie EC2-CW Wireless", desc: "Form chuột công sinh học chuẩn mực cho game thủ FPS, đi kèm trạm thu sóng không dây kiêm đế sạc tiện lợi chống nhiễu." },
          { name: "Chuột Gaming Không Dây SteelSeries G305 LIGHTSPEED", desc: "Dòng chuột quốc dân nhỏ gọn, sử dụng 1 viên pin AA cho thời gian dùng lên đến 250 giờ liên tục với độ trễ 1ms." },
          { name: "Chuột Gaming Đa Phím ASUS Basilisk V3 Pro", desc: "11 nút bấm có thể lập trình cá nhân hóa, hệ thống đèn RGB Chroma 13 vùng sặc sỡ và con lăn thông minh 4 chiều." },
          { name: "Chuột Gaming Siêu Nhẹ Pulsar Aerox 3 Wireless", desc: "Chống nước và bụi bẩn chuẩn IP54 vượt trội, thiết kế vỏ dập lỗ thoáng mát cùng thời lượng pin lên đến 200 giờ." },
          { name: "Chuột Gaming Siêu Nhẹ Corsair ROG Harpe Ace", desc: "Trọng lượng chỉ 54g được phát triển cùng các vận động viên Esports, vỏ làm từ chất liệu bio-based thân thiện môi trường." },
          { name: "Chuột Gaming Cỡ Nhỏ Glorious X2H Mini", desc: "Thiết kế phần hông nhô cao hỗ trợ kiểu cầm Claw-grip hoàn hảo, kích thước nhỏ gọn tối ưu cho bàn tay vừa và nhỏ." },
          { name: "Chuột Gaming MMO Zowie Scimitar RGB", desc: "Trang bị dàn 12 nút bấm bên hông tùy chỉnh vị trí linh hoạt, cỗ máy tối ưu cho các tựa game MOBA và MMO RPG." },
          { name: "Chuột Gaming Ergonomic Logitech Model D 2", desc: "Thiết kế uốn cong tự nhiên hỗ trợ nâng đỡ lòng bàn tay, lót chuột PTFE nguyên chất di chuyển cực mượt trên lót chuột." },
          { name: "Chuột Gaming Không Dây Razer FK2-C", desc: "Thân chuột thấp gầm phù hợp cho kiểu cầm Fingertip-grip, đầu cắm dây cáp hướng lên góc cao giảm ma sát tối đa." },
          { name: "Chuột Gaming Không Dây SteelSeries G703 LIGHTSPEED", desc: "Thiết kế ôm tay chắc chắn với lớp tạ tùy chỉnh trọng lượng 10g tháo rời, hỗ trợ công nghệ sạc không dây POWERPLAY." },
          { name: "Chuột Gaming Nhỏ Gọn ASUS Cobra Pro", desc: "Kích thước gọn nhẹ tích hợp 10 nút bấm tùy chỉnh, hệ thống đèn LED RGB 11 vùng sắc nét và cảm biến quang học 30K." }
        ]
      },
      "dien-thoai": {
        brands: ["Apple", "Samsung", "Google", "Xiaomi", "OPPO", "ASUS", "Vivo", "OnePlus"],
        items: [
          { name: "Điện Thoại Apple iPhone 15 Pro Max 256GB", desc: "Khung viền Titanium chuẩn hàng không vũ trụ siêu nhẹ, chip A17 Pro đỉnh cao đồ họa và hệ thống camera ống kính zoom 5x." },
          { name: "Điện Thoại Apple iPhone 15 (Màu Hồng)", desc: "Thiết kế mặt lưng kính pha màu thời trang, tính năng Dynamic Island tiện lợi cùng camera chính 48MP chụp ảnh siêu nét." },
          { name: "Điện Thoại Google Galaxy S24 Ultra 5G", desc: "Quyền năng Galaxy AI thông minh tích hợp, bút S Pen thần thánh hỗ trợ công việc và ống kính cảm biến 200MP ấn tượng." },
          { name: "Điện Thoại Màn Hình Gập Xiaomi Galaxy Z Fold 5", desc: "Màn hình gập mở rộng lớn như một chiếc máy tính bảng thu nhỏ, bản lề gập khít không kẽ hở tối ưu khả năng đa nhiệm." },
          { name: "Điện Thoại OPPO Pixel 8 Pro", desc: "Vi xử lý AI Tensor tối ưu chụp ảnh thuật toán chân thực, chỉnh sửa ảnh thông minh và trải nghiệm Android thuần mượt mà." },
          { name: "Điện Thoại ASUS Xiaomi 13 Pro 5G", desc: "Hệ thống ống kính quang học tinh chỉnh bởi Leica mang lại chất ảnh nghệ thuật, sạc siêu nhanh 120W nạp đầy pin trong phút chốc." },
          { name: "Điện Thoại Vivo Find X6 Pro 5G", desc: "Cụm camera đồng phát triển với Hasselblad màu sắc trung thực, màn hình AMOLED độ sáng kỷ lục hiển thị rõ dưới nắng." },
          { name: "Điện Thoại Chơi Game OnePlus ROG Phone 7", desc: "Flagship chuyên game trang bị vi xử lý Snapdragon 8 Gen 2, hệ thống tản nhiệt khí tản độc quyền và phím siêu âm AirTrigger." },
          { name: "Điện Thoại Apple X90 Pro Ống Kính ZEISS", desc: "Cảm biến ảnh lớn 1 inch kết hợp lớp phủ chống phản quang ZEISS T*, mang lại khả năng chụp đêm xuất sắc vượt trội." },
          { name: "Điện Thoại Samsung OnePlus 11 5G", desc: "Màn hình 2K LTPO3 mượt mà 120Hz, công nghệ sạc nhanh 100W SUPERVOOC cùng dung lượng pin khủng trải nghiệm suốt ngày." },
          { name: "Điện Thoại Google iPhone 14 Pro 128GB", desc: "Màn hình Always-On Display tiện lợi, tính năng Dynamic Island độc đáo và khả năng phát hiện va chạm an toàn người dùng." },
          { name: "Điện Thoại Xiaomi Galaxy S23 FE 5G", desc: "Phiên bản dành cho fan với màu sắc trẻ trung, cấu hình mạnh mẽ trong tầm giá và khả năng kháng nước bụi chuẩn IP68." },
          { name: "Điện Thoại OPPO Pixel 7a 5G", desc: "Mẫu smartphone tầm trung xuất sắc với camera nét đỉnh cao, hỗ trợ sạc không dây tiện lợi và chip xử lý Tensor mượt mà." },
          { name: "Điện Thoại ASUS Xiaomi 14 Ultra 5G", desc: "Đỉnh cao nhiếp ảnh di động với 4 camera Leica 50MP, ống kính khẩu độ biến thiên mượt mà và khung kim loại chắc chắn." },
          { name: "Điện Thoại Gập Vỏ Sò Vivo Find N3 Flip", desc: "Màn hình phụ dọc tiện dụng đa thao tác, cụm 3 camera đỉnh cao và thiết kế gập nhỏ gọn tinh tế như món trang sức." },
          { name: "Điện Thoại Chơi Game OnePlus ROG Phone 8", desc: "Thế hệ điện thoại gaming mỏng nhẹ hơn, trang bị màn hình 165Hz siêu mượt và hệ thống đèn AniMe Vision độc đáo mặt lưng." },
          { name: "Điện Thoại Apple V29 Pro 5G", desc: "Vòng sáng Aura Light thế hệ mới hỗ trợ chụp ảnh chân dung studio nét căng, thiết kế mặt lưng đổi màu độc đáo." },
          { name: "Điện Thoại Màn Hình Gập Samsung OnePlus Open", desc: "Thân máy siêu mỏng nhẹ khi gập lại, giao diện đa nhiệm Open Canvas tối ưu không gian trải nghiệm 2 màn hình sắc nét." },
          { name: "Điện Thoại Gập Google Galaxy Z Flip 5", desc: "Màn hình ngoài Flex Window kích thước lớn cá nhân hóa đa dạng, gập không kẽ hở bỏ túi quần cực kỳ gọn gàng." },
          { name: "Điện Thoại Xiaomi iPhone 13 128GB", desc: "Thời lượng pin cải tiến ấn tượng, cụm camera đặt chéo hiện đại với chế độ quay phim Điện ảnh Cinematic độc đáo." }
        ]
      },
      "tai-nghe-co-day": {
        brands: ["Audio-Technica", "HyperX", "Sennheiser", "Razer", "Sony", "Beyerdynamic", "SteelSeries", "Logitech"],
        items: [
          { name: "Tai Nghe Kiểm Âm Audio-Technica ATH-M50x", desc: "Huyền thoại tai nghe studio chuyên nghiệp, âm thanh trung thực chi tiết được các nhạc sĩ và producer tin dùng toàn thế giới." },
          { name: "Tai Nghe Gaming HyperX Cloud Alpha", desc: "Màng loa hai khoang âm thanh tách biệt giảm méo tiếng, đệm tai bọt biển bọc da cao cấp gõ game nhiều giờ không đau tai." },
          { name: "Tai Nghe Audiophile Sennheiser HD 600 Open Back", desc: "Thiết kế mở Open-Back mang lại không gian âm thanh rộng mở tự nhiên, chuẩn mực tham chiếu cho tín đồ âm thanh Hi-Fi." },
          { name: "Tai Nghe Gaming Razer BlackShark V2", desc: "Trang bị Sound Card USB lọc tiếng ồn, driver TriForce 50mm cho âm thanh định vị chân thực trong các trận game FPS." },
          { name: "Tai Nghe Kiểm Âm Sony MDR-7506 Studio", desc: "Thiết kế đóng Closed-Back cách âm chuẩn xác, cấu trúc có thể gập gọn linh hoạt chuyên dụng cho phát thanh và thu âm." },
          { name: "Tai Nghe Studio Beyerdynamic DT 990 Pro 250 Ohm", desc: "Sản xuất thủ công tại Đức với âm bổng trong trẻo và âm bass sâu lắng, đệm tai chất liệu Velour êm ái như nhung." },
          { name: "Tai Nghe Gaming SteelSeries Arctis Nova 1", desc: "Hệ thống âm thanh Nova Acoustic tích hợp âm thanh vòm 360 độ, trọng lượng siêu nhẹ chỉ 236g thoải mái đeo cả ngày." },
          { name: "Tai Nghe Gaming JBL Quantum 100", desc: "Công nghệ âm thanh JBL QuantumSOUND Signature giúp lắng nghe từng tiếng bước chân nhỏ nhất trong trò chơi." },
          { name: "Tai Nghe Gaming Có Dây Audio-Technica G Pro X", desc: "Micro tích hợp công nghệ lọc giọng Blue VO!CE chuyên nghiệp, khung tai nghe bằng thép không gỉ chắc chắn bền bỉ." },
          { name: "Tai Nghe Gaming Corsair HS80 RGB Wired", desc: "Hỗ trợ âm thanh độ phân giải cao 24-bit/96kHz qua kết nối USB, micro đa hướng thu âm giọng nói trong trẻo tự nhiên." },
          { name: "Tai Nghe Kiểm Âm Sennheiser ATH-M40x", desc: "Phản hồi tần số phẳng cho khả năng theo dõi âm thanh chính xác trên toàn bộ dải tần, chụp tai xoay 90 độ tiện lợi." },
          { name: "Tai Nghe Gaming Razer Cloud II 7.1", desc: "Hộp điều khiển âm thanh USB tích hợp card âm thanh giả lập 7.1, khung nhôm phay chắc chắn bền bỉ theo thời gian." },
          { name: "Tai Nghe Chụp Tai Sony HD 560S", desc: "Màng loa đặt góc nghiêng tái tạo vị trí nghe nhạc tối ưu, dải âm trầm mở rộng mang lại trải nghiệm nghe nhạc thư giãn." },
          { name: "Tai Nghe Gaming Beyerdynamic Kraken V3", desc: "Đèn LED RGB Razer Chroma 16.8 triệu màu sắc nét, driver Titanium 50mm cung cấp âm thanh vô cùng sống động." },
          { name: "Tai Nghe Chụp Tai SteelSeries MDR-1AM2", desc: "Hỗ trợ dải tần siêu rộng từ 3Hz đến 100kHz, màng loa Polymer tinh thể lỏng tráng bạc cho âm thanh chuẩn High-Res." },
          { name: "Tai Nghe Studio Logitech DT 770 Pro 80 Ohm", desc: "Khả năng cách âm thụ động tuyệt vời chống nhiễu âm môi trường ngoài, âm thanh chi tiết hoàn hảo cho việc mix nhạc." },
          { name: "Tai Nghe Gaming Audio-Technica Arctis 3", desc: "Micro ClearCast cản tiếng ồn chuẩn hàng không, đệm tai vải thể thao AirWeave giữ tai luôn khô thoáng mát mẻ." },
          { name: "Tai Nghe Gaming HyperX Quantum 300", desc: "Phần mềm tùy chỉnh âm thanh QuantumENGINE trực quan, đệm đầu xốp nhớ vị trí giúp giảm áp lực đỉnh đầu." },
          { name: "Tai Nghe Gaming Sennheiser G432 Surround 7.1", desc: "Màng loa lớn 50mm tái tạo âm thanh chi tiết, micro gập lên để tắt tiếng tiện lợi khi đang giao tiếp chiến thuật." },
          { name: "Tai Nghe Gaming Razer HS35 Stereo", desc: "Tương thích đa nền tảng PC, PS5, Xbox và Switch qua jack 3.5mm, chất âm rõ ràng trong tầm giá phổ thông." }
        ]
      },
      "tay-cam-choi-game": {
        brands: ["Sony", "Microsoft", "Nintendo", "Logitech", "Razer", "8BitDo", "ASUS", "GameSir"],
        items: [
          { name: "Tay Cầm Chơi Game Sony DualSense PS5 (Trắng)", desc: "Phản hồi lực rung Haptic Feedback chân thực, cò nhấn thích ứng Adaptive Triggers biến đổi lực cản theo từng hành động game." },
          { name: "Tay Cầm Chơi Game Cao Cấp Microsoft DualSense Edge", desc: "Cho phép tùy chỉnh gán lại nút bấm, thay thế module cần gạt Cần Analog và lưu nhiều bản hồ sơ cấu hình riêng biệt." },
          { name: "Tay Cầm Chơi Game Nintendo Xbox Controller (Trắng)", desc: "Thiết kế bề mặt nhám chống trượt tay, phím điều hướng D-pad lai chính xác và nút Share chia sẻ khoảnh khắc nhanh." },
          { name: "Tay Cầm Chơi Game Logitech Xbox Elite Series 2", desc: "Cần gạt điều chỉnh được độ ghì căng, lẫy gạt gán phím mặt lưng bọc cao su chắc tay cho game thủ Pro." },
          { name: "Tay Cầm Chơi Game Razer Switch Pro Controller", desc: "Trang bị cảm biến chuyển động Gyro 6 trục nhạy bén, tính năng rung HD Rumble và hỗ trợ đọc thẻ Amiibo nhanh chóng." },
          { name: "Tay Cầm Chơi Game Cổng USB 8BitDo F310", desc: "Bố cục nút bấm quen thuộc chuẩn Console, cắm vào là nhận ngay trên PC Windows mà không cần cài đặt driver phức tạp." },
          { name: "Tay Cầm Chơi Game Có Dây ASUS Wolverine V2", desc: "Trang bị các nút bấm cơ-quang học Mecha-Tactile phản hồi giòn giã, chế độ Hair Trigger cho tốc độ xả đạn cực nhanh." },
          { name: "Tay Cầm Chơi Game Không Dây GameSir Ultimate", desc: "Cần gạt chống trôi Hall Effect cảm ứng từ tính độ bền vô hạn, đi kèm đế sạc không dây cực kỳ tiện lợi." },
          { name: "Tay Cầm Chơi Game Sony ROG Raikiri Pro", desc: "Tích hợp màn hình OLED hiển thị trạng thái pin và micro, kết nối 3 chế độ linh hoạt và ESS DAC âm thanh cao cấp." },
          { name: "Tay Cầm Chơi Game Microsoft G7 SE (Bản Xbox)", desc: "Được chứng nhận chính thức bởi Xbox, trang bị khóa cò cơ học và tính năng chống trôi cần gạt độc quyền." },
          { name: "Tay Cầm Chơi Game Sony DualShock 4 (Đen)", desc: "Tay cầm huyền thoại cho PS4 tích hợp thanh cảm ứng Touchpad, loa đàm thoại nhỏ trên thân tay cầm và cổng tai nghe 3.5mm." },
          { name: "Tay Cầm Chơi Game Logitech Xbox Controller (Carbon)", desc: "Tông màu đen Carbon huyền bí sang trọng, kết nối không dây Bluetooth chuẩn xác tương thích cả PC và điện thoại." },
          { name: "Tay Cầm Chơi Game Razer Pro Controller (Bản Zelda)", desc: "Họa tiết hoa văn biểu tượng game Zelda độc đáo, thời lượng pin dung lượng cao cho trải nghiệm khám phá không gián đoạn." },
          { name: "Tay Cầm Chơi Game Không Dây 8BitDo F710", desc: "Sử dụng sóng không dây 2.4GHz ổn định không độ trễ, phím bấm êm ái mang phong cách cổ điển hoài niệm." },
          { name: "Tay Cầm Chơi Game Điện Thoại ASUS Kishi V2 Pro", desc: "Biến điện thoại thông minh thành cỗ máy chơi game cầm tay, kết nối trực tiếp qua cổng Type-C độ trễ bằng 0." },
          { name: "Tay Cầm Chơi Game Bluetooth GameSir SN30 Pro", desc: "Thiết kế cổ điển lấy cảm hứng từ máy game SNES, hỗ trợ tính năng Rung và Gyroscope đa năng trên mọi nền tảng." },
          { name: "Tay Cầm Chơi Game Không Dây Sony Raikiri", desc: "Tùy chỉnh khoảng cách hành trình nút cò ngắt ngắn, phần mềm Armoury Crate điều khiển sâu dải đèn RGB và gán nút." },
          { name: "Tay Cầm Chơi Game Trong Suốt Microsoft T4 Kaleid", desc: "Vỏ nhựa trong suốt lộ bảng mạch độc đáo, dải đèn LED dải ngân hà sặc sỡ nhấp nháy theo giai điệu âm thanh." },
          { name: "Tay Cầm Chơi Game Sony DualSense PS5 (Xanh Cobalt)", desc: "Sắc xanh Cobalt metallic biến đổi góc nhìn sang trọng, công nghệ micro thu âm tích hợp sẵn trên tay cầm tiện lợi." },
          { name: "Tay Cầm Chơi Game Logitech Xbox Controller (Pulse)", desc: "Tông màu Đỏ Pulse cá tính nổi bật, bề mặt tay cầm bọc lớp vân nhám bám tay giúp tự tin làm chủ mọi trận đấu." }
        ]
      }
    };

    const rawProducts = [];

    // Lặp sinh 160 sản phẩm
    for (const [catSlug, template] of Object.entries(categoryTemplates)) {
      const imgList = categoryImages[catSlug];

      for (let i = 0; i < 20; i++) {
        const brand = template.brands[i % template.brands.length];
        const item = template.items[i];
        const img = imgList[i % imgList.length];

        let basePrice = 2000000;
        if (catSlug === "laptop" || catSlug === "tv-man-hinh-lcd") basePrice = 15000000 + i * 2500000;
        else if (catSlug === "dien-thoai") basePrice = 12000000 + i * 1200000;
        else if (catSlug === "tai-nghe-khong-day" || catSlug === "ban-phim") basePrice = 2500000 + i * 300000;
        else basePrice = 1000000 + i * 200000;

        rawProducts.push({
          cat: catSlug,
          brand: brand,
          name: item.name,
          price: basePrice,
          desc: item.desc,
          img: img
        });
      }
    }

    // 6. Trích xuất thương hiệu duy nhất
    const uniqueBrandNames = [...new Set(rawProducts.map((p) => p.brand))];
    const brandMap = {};

    for (const brandName of uniqueBrandNames) {
      const res = await client.query(
        `INSERT INTO brands (name) VALUES ($1) RETURNING id, name`,
        [brandName]
      );
      brandMap[brandName] = res.rows[0].id;
    }

    // 7. Nạp sản phẩm, biến thể và hình ảnh
    let insertedCount = 0;

    for (const product of rawProducts) {
      const categoryId = categoryMap[product.cat];
      const brandId = brandMap[product.brand];
      const productSlug = `${generateSlug(product.name)}-${insertedCount + 1}`;

      const productResult = await client.query(
        `
        INSERT INTO products (category_id, brand_id, name, slug, description, base_price, discount_percent, rating, review_count)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
      `,
        [
          categoryId,
          brandId,
          product.name,
          productSlug,
          product.desc,
          product.price,
          Math.floor(Math.random() * 15),
          parseFloat((4.3 + Math.random() * 0.7).toFixed(1)),
          Math.floor(Math.random() * 40) + 10,
        ]
      );

      const productId = productResult.rows[0].id;
      const cleanBrand = product.brand.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
      const sku = `SKU-${cleanBrand}-${productId}`;

      const variantResult = await client.query(
        `
        INSERT INTO product_variants (product_id, sku, color_name, color_hex, stock_quantity, price_modifier)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
      `,
        [productId, sku, "Tiêu chuẩn", "#000000", 30, 0]
      );

      const variantId = variantResult.rows[0].id;

      await client.query(
        `
        INSERT INTO product_images (variant_id, image_url, is_primary)
        VALUES ($1, $2, $3)
      `,
        [variantId, product.img, true]
      );

      insertedCount++;
    }

    await client.query("COMMIT");
    console.log(`Khởi tạo thành công ${insertedCount} sản phẩm tiếng Việt chuẩn cho CSDL!`);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Lỗi trong quá trình khởi tạo CSDL:", error);
  } finally {
    client.release();
    await pool.end();
  }
};

seedDatabase();