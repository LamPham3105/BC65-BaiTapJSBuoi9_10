var DSNV = [
  new NhanVien(
    "1000",
    "Nguyễn Văn Dũng",
    "dung@gmail.com",
    "Pass123*",
    "12-03-2024",
    1000000,
    "Nhân viên",
    176
  ),
  new NhanVien(
    "1001",
    "Trinh Kim Quang",
    "quang@gmail.com",
    "PassQ123*",
    "12-12-2024",
    1000000,
    "Giám đốc",
    160
  ),
  new NhanVien(
    "1003",
    "Văn Thái Hòa",
    "hoa@gmail.com",
    "PassD123*",
    "12-03-2024",
    1000000,
    "Trưởng phòng",
    145
  ),
  new NhanVien(
    "1004",
    "Trinh Kim Y",
    "kimY@gmail.com",
    "PassY123*",
    "12-12-2024",
    1000000,
    "Nhân viên",
    195
  ),
  new NhanVien(
    "1005",
    "Nguyễn Thành Dũng",
    "dungT@gmail.com",
    "PassTD123*",
    "12-03-2024",
    1000000,
    "Nhân viên",
    123
  ),
  new NhanVien(
    "1006",
    "Kim Quang Bình",
    "binhquang@gmail.com",
    "Pass123*",
    "12-12-2024",
    1000000,
    "Nhân viên",
    120
  ),
  new NhanVien(
    "1008",
    "Kim Quang Bình",
    "binhquang@gmail.com",
    "Pass123*",
    "12-12-2024",
    2000000,
    "Nhân viên",
    120
  ),
];

renderDSNV(DSNV);

function showForm() {
  processForm(true);
}

function processForm(isAdded) {
  resetForm("#formQLNV");
  getEle("#btnCapNhat").style.display = isAdded ? "none" : "block";
  getEle("#btnThemNV").style.display = isAdded ? "block" : "none";
  getEle("#header-title").innerHTML = isAdded
    ? "Thêm nhân viên"
    : "Sửa nhân viên";

  processFreezeField("#tknv", isAdded ? false : true);
}

function isQualifiedForm(nv, isAdded) {
  var isInValidTaiKhoanInput = checkTaiKhoanInput(DSNV, nv, isAdded);

  var isInValidTenNhanVienInput = checkTenNhanVienInput(nv);

  var isInValidEmailInput = checkEmailInput(nv);

  var isInValidPassInput = checkPassInput(nv);

  var isInValidNgayLamInput = checkNgayLamInput(nv);

  var isInValidLuongInput = checkLuongInput(nv);

  var isInValidChucVuInput = checkChucVuInput(nv);

  var isInValidGioLamInput = checkGioLamInput(nv);

  var isInValidForm =
    isInValidTaiKhoanInput ||
    isInValidTenNhanVienInput ||
    isInValidEmailInput ||
    isInValidPassInput ||
    isInValidNgayLamInput ||
    isInValidLuongInput ||
    isInValidChucVuInput ||
    isInValidGioLamInput;

  return !isInValidForm;
}

function addNV() {
  var nv = getDataFromForm();
  var isValidForm = isQualifiedForm(nv, true);

  if (isValidForm) {
    DSNV.push(nv);
    renderDSNV(DSNV);
    resetForm("#formQLNV");
    alert("Thêm nhân viên thành công");
  }
}

getEle("#btnThemNV").onclick = function () {
  addNV();
};

function editNV(taiKhoan) {
  processForm(false);

  var position = DSNV.findIndex(function (nv) {
    return nv.taiKhoan === taiKhoan;
  });

  showDataInForm(DSNV[position]);
}

function updateNV() {
  var nvUpdate = getDataFromForm();

  var isValidForm = isQualifiedForm(nvUpdate, false);

  if (isValidForm) {
    var position = DSNV.findIndex(function (nv) {
      return nv.taiKhoan === nvUpdate.taiKhoan;
    });

    DSNV[position] = nvUpdate;
    renderDSNV(DSNV);
    showDataInForm(nvUpdate);
    alert("Sửa nhân viên thành công");
  }
}

getEle("#btnCapNhat").onclick = function () {
  updateNV();
};

function removeNV(taiKhoan) {
  var position = GetPositionNV(DSNV, taiKhoan);

  if (position !== -1) {
    DSNV.splice(position, 1);
    renderDSNV(DSNV);
  }
}

function getTextMormal(value) {
  return value
    .trim()
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

getEle("#btnTimNV").onclick = function () {
  var textSearch = getTextMormal(getEle("#searchName").value);

  var resultSearch = [];

  if (textSearch.length > 0) {
    resultSearch = DSNV.filter(function (nv) {
      return getTextMormal(nv.getLoaiNhanVien()).includes(textSearch);
    });

    renderDSNV(resultSearch);
  } else {
    renderDSNV(DSNV);
  }
};
