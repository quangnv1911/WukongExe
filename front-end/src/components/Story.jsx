import React from "react";
import { FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import banana from "../assets/banana.png";
import apple from "../assets/apple.png";
import { FormControl } from "react-bootstrap";
import ListCarousel from "./ListCarousel";

function Story() {
  return (
    <div className="row d-flex py-4" style={{ height: "auto" }}>
      <div className="col-lg-6 col-md-6 col-sm-12 col-12">
        <div className="row h-100">
          <div className="col-lg-3 col-md-3 col-sm-3 col-3 position-relative px-0">
            <div className="w-100" style={{ height: "80%" }}>
              <div
                className="rounded-end-pill position-absolute"
                style={{
                  backgroundColor: "#ffcb03",
                  height: "20vh",
                  width: "150%",
                  transform: "rotate(-30deg)",
                  top: "20%",
                  left: "-60%",
                }}
              ></div>
            </div>
            <div
              style={{ height: "20%" }}
              className="row d-flex justify-content-center align-items-center"
            >
              <div className="w-100 h-100 p-1">
                <button
                  className="d-flex align-items-center p-1 pe-2 rounded-5"
                  style={{
                    width: "auto",
                    fontSize: "15px",
                    border: "1px solid #ffcb03",
                    backgroundColor: "#ffcb03",
                  }}
                >
                  <FaFacebook className="mx-2" style={{ color: "black" }} />
                  <label className="fw-semibold" style={{ color: "black" }}>
                    <a
                      style={{
                        color: "black",
                        textDecoration: "none",
                      }}
                      href="https://www.facebook.com/profile.php?id=61565933736328"
                      target="_blank"
                    >
                      Chat Facebook
                    </a>
                  </label>
                </button>
                <button
                  className="d-flex align-items-center p-1 pe-2 my-2 rounded-5"
                  style={{
                    width: "auto",
                    fontSize: "15px",
                    border: "1px solid #ffcb03",
                    backgroundColor: "#ffcb03",
                  }}
                >
                  <SiZalo className="mx-2" style={{ color: "black" }} />
                  <label className="fw-semibold" style={{ color: "black" }}>
                    081 825 1203
                  </label>
                </button>
                <button
                  className="d-flex align-items-center p-1 pe-2 rounded-5"
                  style={{
                    width: "auto",
                    fontSize: "15px",
                    border: "1px solid #ffcb03",
                    backgroundColor: "#ffcb03",
                  }}
                >
                  <FaPhoneAlt className="mx-2" style={{ color: "black" }} />
                  <label className="fw-semibold" style={{ color: "black" }}>
                    081 825 1203
                  </label>
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-9 col-sm-9 col-9 h-100">
            <div>
              <h1 style={{ width: "70%" }}>
                Hành trình <span style={{ color: "#ffcb03" }}>TÌM KIẾM </span>
                <span>
                  ĐỒ ĂN VẶT{" "}
                  <img
                    src={banana}
                    alt="Banana"
                    style={{ width: "80px", height: "auto" }}
                  />
                  <span> </span>
                  <img
                    src={apple}
                    alt="Apple"
                    style={{ width: "80px", height: "auto" }}
                  />
                </span>
                <span style={{ color: "#ffcb03" }}> cùng Wukong Food</span>
              </h1>
              <p className="my-4">
                Wukong - Tôn Ngộ Không, với chiếc gậy như ý và "vali thần kỳ"
                đầy ắp đồ ăn vặt tuyệt hảo, nay trở thành một "
                <strong>đại sứ ẩm thực</strong>". Khi đến Việt Nam, chú khỉ tinh
                nghịch này mang theo hương vị độc đáo từ chiếc "
                <strong>vali thần kỳ</strong>", chứa đựng cả tinh hoa ẩm thực và
                văn hóa Trung Hoa. Khám phá "
                <strong>Thiên đường đồ ăn vặt của Wukong</strong>" với những món
                ngon truyền thống và hiện đại, từ bánh Trung Thu đến kẹo sữa dê
                Tây Tạng, mở ra hành trình vị giác đầy thú vị!{" "}
              </p>

              <br />
              <h5 className="fw-bold">DỊCH VỤ</h5>
              <p>
                <span className="text-secondary">Giao Hàng Nhanh</span>
                <span
                  title="Đảm bảo rằng thông tin về người gửi và nội dung bên trong gói hàng không bị lộ ra ngoài. "
                  className="mx-2"
                  style={{ color: "#FC8019" }}
                >
                  {" "}
                  Giao Hàng Bí Mật
                </span>
                <span className="text-secondary">
                  Đa Dạng Phương Thức Thanh Toán
                </span>
                <span className="mx-2" style={{ color: "#FC8019" }}>
                  {" "}
                  COMBO đồ ăn
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12 col-12">
        <div className="my-4">
          <ListCarousel />
        </div>
      </div>
    </div>
  );
}

export default Story;
