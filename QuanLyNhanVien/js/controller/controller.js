function getDataFromForm() {
  var taiKhoan = getEle("#tknv").value;
  var hoTen = getEle("#name").value;
  var email = getEle("#email").value;
  var matKhau = getEle("#password").value;
  var ngayLam = getEle("#datepicker").value;
  var luongCoBan = getEle("#luongCB").value;
  var chucVu = getEle("#chucvu").value;
  var gioLamTrongThang = getEle("#gioLam").value;

  return new NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLamTrongThang
  );
}

function showDataInForm(nv) {
  getEle("#tknv").value = nv.taiKhoan;
  getEle("#name").value = nv.hoTen;
  getEle("#email").value = nv.email;
  getEle("#password").value = nv.matKhau;
  getEle("#datepicker").value = nv.ngayLam;
  getEle("#luongCB").value = nv.luongCoBan;
  getEle("#chucvu").value = nv.chucVu;
  getEle("#gioLam").value = nv.gioLamTrongThang;
}

function resetForm(id) {
  getEle(id).reset();
  getEle("#tbTKNV").innerHTML = "";
  displayField("#tbTKNV", "none");
  getEle("#tbTen").innerHTML = "";
  displayField("#tbTen", "none");
  getEle("#tbEmail").innerHTML = "";
  displayField("#tbEmail", "none");
  getEle("#tbMatKhau").innerHTML = "";
  displayField("#tbMatKhau", "none");
  getEle("#tbNgay").innerHTML = "";
  displayField("#tbNgay", "none");
  getEle("#tbLuongCB").innerHTML = "";
  displayField("#tbLuongCB", "none");
  getEle("#tbChucVu").innerHTML = "";
  displayField("#tbChucVu", "none");
  getEle("#tbGiolam").innerHTML = "";
  displayField("#tbGiolam", "none");
}

function displayField(id, value) {
  getEle(id).style.display = value;
}

function processFreezeField(id, isFreeze) {
  getEle(id).readOnly = isFreeze;
}

let lengthNV = 0;

function renderDSNV(dsnv) {
  var contentHTML = "";

  lengthNV = dsnv.length;

  for (var i = 0; i < lengthNV; i++) {
    var nv = dsnv[i];

    var contentTr = `
        <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.getTongLuong()}</td>
            <td>Nhân viên ${nv.getLoaiNhanVien()}</td>
            <td>
                <button class="btn btn-warning mb-2 w-100" data-toggle="modal" data-target="#myModal" onclick="editNV('${
                  nv.taiKhoan
                }')">Sửa</button>
                <button class="btn btn-danger w-100" onclick="removeNV('${
                  nv.taiKhoan
                }')">Xóa</button>
            </td>
        </tr>
    `;

    contentHTML += contentTr;
  }

  getEle("#tableDanhSach").innerHTML = contentHTML;
  showPage(0);
}

const itemsPerPage = 5;
let page = 0;
let indexFirst = 0;

function showPage(index) {
  const table = getEle(".myTable");
  const rows = table.tBodies[0].rows;

  var numberDivison = Math.floor(lengthNV / itemsPerPage);

  if (index < 0) {
    page = indexFirst = 0;
  } else if (index >= numberDivison) {
    page = numberDivison;
    if (lengthNV / itemsPerPage === numberDivison) {
      page = numberDivison - 1;
    }
    indexFirst = page * 5;
  } else {
    page = index;
    indexFirst = page * 5;
  }

  for (let i = 0; i < rows.length; i++) {
    if (i >= indexFirst && i < indexFirst + itemsPerPage) {
      rows[i].style.display = "table-row";
    } else {
      rows[i].style.display = "none";
    }
  }
}

function showArrMessErr(mess, isShow, idMess) {
  var messErr = "";
  for (let i = 0; i < mess.length; i++) {
    if (mess[i] !== "") {
      messErr += (messErr !== "" ? "<br />" : "") + mess[i];
    }
  }

  displayField(idMess, isShow ? "block" : "none");
  showErrMessage(isShow, idMess, messErr);
}

function isTaiKhoanUnique(dsnv, taikhoan) {
  for (let i = 0; i < dsnv.length; i++) {
    if (dsnv[i].taiKhoan === taikhoan) {
      return true;
    }
  }

  return false;
}

function checkTaiKhoanInput(dsnv, nhanVien, isAdded) {
  var idMess = "#tbTKNV",
    mess = [],
    isShow = false;

  if (isEmpty(nhanVien.taiKhoan)) {
    mess.push("Tài khoản không thể để trống");
    isShow = true;
  }

  if (!isNumber(nhanVien.taiKhoan)) {
    mess.push("Tài khoản chỉ có thể là số");
    isShow = true;
  }

  if (!isInRange(nhanVien.taiKhoan?.length, 4, 6)) {
    mess.push("Tài khoản chỉ được từ 4 tới 6 số");
    isShow = true;
  }

  if (isAdded && isTaiKhoanUnique(dsnv, nhanVien.taiKhoan)) {
    mess.push("Tài khoản đã tồn tại");
    isShow = true;
  }

  showArrMessErr(mess, isShow, idMess);
  return isShow;
}

function checkTenNhanVienInput(nhanVien) {
  var idMess = "#tbTen",
    mess = [],
    isShow = false;

  if (isEmpty(nhanVien.hoTen)) {
    mess.push("Tên nhân viên không thể để trống");
    isShow = true;
  }

  if (!isWord(nhanVien.hoTen)) {
    mess.push("Tên nhân viên chỉ có thể là chữ");
    isShow = true;
  }

  showArrMessErr(mess, isShow, idMess);
  return isShow;
}

function checkEmailInput(nhanVien) {
  var idMess = "#tbEmail",
    mess = [],
    isShow = false;
  if (isEmpty(nhanVien.email)) {
    mess.push("Email không thể để trống");
    isShow = true;
  }

  if (!isEmail(nhanVien.email)) {
    mess.push("Email không đúng định dạng");
    isShow = true;
  }

  showArrMessErr(mess, isShow, idMess);
  return isShow;
}

function checkPassInput(nhanVien) {
  var idMess = "#tbMatKhau",
    mess = [],
    isShow = false;
  if (isEmpty(nhanVien.matKhau)) {
    mess.push("Mật khẩu không thể để trống");
    isShow = true;
  }

  if (!isPassWord(nhanVien.matKhau)) {
    mess.push(
      "Mật khẩu phải có 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
    );
    isShow = true;
  }

  showArrMessErr(mess, isShow, idMess);
  return isShow;
}

function checkNgayLamInput(nhanVien) {
  var idMess = "#tbNgay",
    mess = [],
    isShow = false;
  if (isEmpty(nhanVien.ngayLam)) {
    mess.push("Ngày làm không thể để trống");
    isShow = true;
  }

  showArrMessErr(mess, isShow, idMess);
  return isShow;
}

function checkLuongInput(nhanVien) {
  var idMess = "#tbLuongCB",
    mess = [],
    isShow = false;

  if (isEmpty(nhanVien.luongCoBan)) {
    mess.push("Lương không thể để trống");
    isShow = true;
  }

  var isValidLuong = isNumber(nhanVien.luongCoBan);
  if (!isValidLuong) {
    mess.push("Lương chỉ có thể là số");
    isShow = true;
  }

  if (
    !isInRange(
      !isValidLuong ? "" : Number.parseFloat(nhanVien.luongCoBan),
      1000000,
      20000000
    )
  ) {
    mess.push("Lương chỉ được từ 1 000 000 tới 20 000 000");
    isShow = true;
  }

  showArrMessErr(mess, isShow, idMess);
  return isShow;
}

function checkChucVuInput(nhanVien) {
  var idMess = "#tbChucVu",
    mess = [],
    isShow = false;
  if (isEmpty(nhanVien.chucVu)) {
    mess.push("Chức vụ không thể để trống");
    isShow = true;
  }

  showArrMessErr(mess, isShow, idMess);
  return isShow;
}

function checkGioLamInput(nhanVien) {
  var idMess = "#tbGiolam",
    mess = [],
    isShow = false;

  if (isEmpty(nhanVien.gioLamTrongThang)) {
    mess.push("Giờ làm không thể để trống");
    isShow = true;
  }

  var isValidGioLam = isNumber(nhanVien.gioLamTrongThang);
  if (!isNumber(nhanVien.gioLamTrongThang)) {
    mess.push("Giờ làm chỉ có thể là số");
    isShow = true;
  }

  if (
    !isInRange(
      !isValidGioLam ? "" : Number.parseFloat(nhanVien.gioLamTrongThang),
      80,
      200
    )
  ) {
    mess.push("Giờ làm chỉ được từ 80 tới 200 giờ");
    isShow = true;
  }

  showArrMessErr(mess, isShow, idMess);
  return isShow;
}

function GetPositionNV(DSNV, taiKhoan) {
  var position = -1;
  for (var i = 0; i < DSNV.length; i++) {
    if (DSNV[i].taiKhoan === taiKhoan) {
      position = i;
    }
  }

  return position;
}
