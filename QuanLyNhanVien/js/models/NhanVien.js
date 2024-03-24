function NhanVien(
  _taiKhoan,
  _hoTen,
  _email,
  _matKhau,
  _ngayLam,
  _luongCoBan,
  _chucVu,
  _gioLamTrongThang
) {
  this.taiKhoan = _taiKhoan;
  this.hoTen = _hoTen;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngayLam = _ngayLam;
  this.luongCoBan = _luongCoBan;
  this.chucVu = _chucVu;
  this.gioLamTrongThang = _gioLamTrongThang;

  this.getLoaiNhanVien = function () {
    if (this.gioLamTrongThang < 160) {
      return "trung bình";
    } else if (this.gioLamTrongThang < 176) {
      return "khá";
    } else if (this.gioLamTrongThang < 192) {
      return "giỏi";
    } else {
      return "xuất sắc";
    }
  };

  this.getTongLuong = function () {
    switch (this.chucVu) {
      case "Giám đốc":
        return this.luongCoBan * 3;
      case "Trưởng phòng":
        return this.luongCoBan * 2;
      case "Nhân viên":
        return this.luongCoBan;
      default:
        return 0;
    }
  };
}
