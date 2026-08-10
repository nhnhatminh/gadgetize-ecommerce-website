import "../../styles/components/blog_section.css";

export default function BlogSection({ navigate }) {
  const blogs = [
    {
      id: 1,
      image: "/images/blog-1.png",
      date: "24 Tháng 07, 2025",
      title: "Headphone Heroes: Nâng Tầm Trải Nghiệm Nghe Với Âm Thanh...",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur. Eget iaculis sed mauris auctor viverra augue porttitor. Lacus pharetra...",
    },
    {
      id: 2,
      image: "/images/blog-2.png",
      date: "24 Tháng 07, 2025",
      title: "Headphone Heroes: Nâng Tầm Trải Nghiệm Nghe Với Âm Thanh...",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur. Eget iaculis sed mauris auctor viverra augue porttitor. Lacus pharetra...",
    },
    {
      id: 3,
      image: "/images/blog-3.png",
      date: "24 Tháng 07, 2025",
      title: "Headphone Heroes: Nâng Tầm Trải Nghiệm Nghe Với Âm Thanh...",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur. Eget iaculis sed mauris auctor viverra augue porttitor. Lacus pharetra...",
    },
    {
      id: 4,
      image: "/images/blog-4.png",
      date: "24 Tháng 07, 2025",
      title: "Headphone Heroes: Nâng Tầm Trải Nghiệm Nghe Với Âm Thanh...",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur. Eget iaculis sed mauris auctor viverra augue porttitor. Lacus pharetra...",
    },
  ];

  return (
    <section className="blog-section">
      <div className="container">
        <div className="blog-header-bar">
          <h3 className="blog-header-title">Bài Viết Mới Nhất</h3>
          <button
            type="button"
            className="blog-view-all-btn"
            onClick={() => navigate && navigate("shop")}
          >
            Hiển Thị Tất Cả <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>

        <div className="row g-4">
          {blogs.map((blog) => (
            <div className="col-lg-3 col-md-6 col-12" key={blog.id}>
              <div className="blog-card">
                <div className="blog-card-img-box">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="blog-card-img"
                  />
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-date-row">
                    <i className="fa-regular fa-calendar-days blog-date-icon"></i>
                    <span className="blog-date-text">{blog.date}</span>
                  </div>
                  <h5 className="blog-card-title">{blog.title}</h5>
                  <p className="blog-card-excerpt">{blog.excerpt}</p>
                  <span className="blog-read-more">
                    Xem thêm <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}