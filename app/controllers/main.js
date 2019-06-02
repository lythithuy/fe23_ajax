$(document).ready(function() {
  var danhSachNguoiDung = new DanhSachNguoiDung();

  layDanhSachNguoiDung();

  function layDanhSachNguoiDung() {
    danhSachNguoiDung
      .layDanhSachNguoiDung()
      .done(function(result) {
        localStorage.setItem("DSND", JSON.stringify(result));
        taoBang(result);
      })
      .fail(function(err) {
        console.log(err);
      });
  }

  function test(){}
  function taoBranch(){}
  function timKiem(){}
  function taoBang(mangNguoiDung) {
    var tblBody = $("#tblDanhSachNguoiDung");
    var content = "";
    mangNguoiDung.map(function(item, index) {
      content += `
              <tr>
                  <td>${index + 1}</td>
                  <td>${item.TaiKhoan}</td>
                  <td>${item.MatKhau}</td>
                  <td>${item.HoTen}</td>
                  <td>${item.Email}</td>
                  <td>${item.SoDT}</td>
                  <td>${item.TenLoaiNguoiDung}</td>
                  <td>
                      <button class="btn btn-primary btnSua" data-taikhoan="${
                        item.TaiKhoan
                      }" data-toggle="modal" data-target="#myModal">Sửa</button>
                      <button class="btn btn-danger btnXoa" data-taikhoan="${
                        item.TaiKhoan
                      }">Xóa</button>
                  </td>
              </tr>
          `;
    });
    tblBody.html(content);
  }

  function showPopup(title, titleButton, idBtn) {
    var title = title;
    var footer = `
        <button id="${idBtn}" class="btn btn-success">${titleButton}</button>
        <button class="btn btn-danger" data-dismiss="modal">Đóng</button>
    `;

    $(".modal-title").html(title);
    $(".modal-footer").html(footer);
  }

  $("#btnThemNguoiDung").click(function() {
    showPopup("Thêm người dùng", "Thêm", "btnThem");
    $("#TaiKhoan").removeAttr("disabled");
  });

  $("body").delegate(".btnSua", "click", function() {
    showPopup("Sửa người dùng", "Cập nhật", "btnCapNhat");
  });

  $("body").delegate("#btnThem", "click", function() {
    var taiKhoan = $("#TaiKhoan").val();
    var hoTen = $("#HoTen").val();
    var matKhau = $("#MatKhau").val();
    var email = $("#Email").val();
    var soDT = $("#SoDienThoai").val();
    var loaiNguoiDung = $("#loaiNguoiDung").val();

    var nguoiDung = new NguoiDung(
      taiKhoan,
      hoTen,
      matKhau,
      email,
      soDT,
      loaiNguoiDung
    );

    danhSachNguoiDung.themNguoiDung(nguoiDung);
  });

  $("body").delegate(".btnXoa", "click", function() {
    var taiKhoan = $(this).data("taikhoan");

    danhSachNguoiDung.xoaNguoiDung(taiKhoan);
  });

  $("body").delegate(".btnSua", "click", function() {
    var taiKhoan = $(this).data("taikhoan");

    var nguoiDung = danhSachNguoiDung.layThongTinNguoiDung(taiKhoan);

    $("#TaiKhoan").val(nguoiDung.TaiKhoan);

    $("#TaiKhoan").attr("disabled", true);

    $("#HoTen").val(nguoiDung.HoTen);
    $("#MatKhau").val(nguoiDung.MatKhau);
    $("#Email").val(nguoiDung.Email);
    $("#SoDienThoai").val(nguoiDung.SoDT);
    $("#loaiNguoiDung").val(nguoiDung.MaLoaiNguoiDung);
  });

  $("body").delegate("#btnCapNhat", "click", function() {
    //Viết cập nhật dùng
    //Lấy thông tin từ 6 ô input
    var taiKhoan = $("#TaiKhoan").val();
    var hoTen = $("#HoTen").val();
    var matKhau = $("#MatKhau").val();
    var email = $("#Email").val();
    var sodt = $("#SoDienThoai").val();
    var loaiNguoiDung = $("#loaiNguoiDung").val();
    // var nguoiDung = new NguoiDung();
    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, sodt, loaiNguoiDung);
    // danhSachNguoiDung.capNhatNguoiDung(nguoiDung);
    danhSachNguoiDung.capNhatNguoiDung(nguoiDung);
  });


  $("#searchname").keyup(function(){
    var text = $("#searchname").val();
    var kq = danhSachNguoiDung.timKiemNguoiDung(text);
    taoBang(kq);
  })


});
