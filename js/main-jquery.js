$(document).ready(function () {
    $('#lblNgayHienTai').text(new Date().toLocaleDateString('en-GB'));

    // 0. Common
    let hoTen = ""
    let soDienThoai = ""
    let email = ""
    let ngaySinh = null
    let gioiTinh = ""
    let dsNgonNgu = []
    let khoaHoc = ""
    let hocPhi = ""
    let tenAnhDaiDien = "default-avatar.png"

    function clearValues() {
        hoTen = ""
        soDienThoai = ""
        email = ""
        ngaySinh = null
        gioiTinh = ""
        dsNgonNgu = []
        khoaHoc = ""
        hocPhi = ""
        tenAnhDaiDien = "default-avatar.png"
    }

    function clearErrorById(errId) {
        $('#' + errId).text("")
        return true
    }

    function showErrorById(errId, msg) {
        $('#' + errId).text(msg)
        return false
    }

    // 1. Save field data to table
    let count = 1
    const myData = $('#myData')

    $('#btnLuu').on('click', saveData)
    function saveData() {
        // check
        let isValid = true
        if (!validateHoTen()) isValid = false
        if (!validateNgaySinh()) isValid = false
        if (!validateSoDienThoai()) isValid = false
        if (!validateEmail()) isValid = false
        if (!validateKhoaHoc()) isValid = false
        if (!validateAnhDaiDien()) isValid = false

        if (gioiTinh === "") {
            showErrorById("errGioiTinh", "Not Checked!")
            isValid = false
        }

        if (dsNgonNgu.length <= 0) {
            showErrorById("errNgonNgu", "Not Checked!")
            isValid = false
        }

        if (!isValid) return

        // add new row
        const newRow = `
<tr>
    <td>${++count}</td>
    <td>${hoTen}</td>
    <td>${ngaySinh.toLocaleDateString('en-GB')}</td>
    <td>${gioiTinh}</td>
    <td>${dsNgonNgu.join(', ')}</td>
    <td>${soDienThoai}</td>
    <td>${email}</td>
    <td>${khoaHoc}</td>
    <td>${hocPhi}</td>
    <td class="text-center">
        <img src="../images/${tenAnhDaiDien}" alt="" class="rounded-circle"
            style="width: 50px; height: 50px;">
    </td>
</tr>
`
        myData.append(newRow)

        // clear
        clearForm()

        // hide modal
        bootstrap.Modal.getOrCreateInstance('#myModal').hide()
    }

    // 2. Reset
    $('#btnXoa').on('click', clearForm)
    function clearForm() {
        $('#myForm').trigger('reset')
        clearValues()
        $('#lblTuoi').text("--");
        clearErrorById('errHoTen')
        clearErrorById('errSoDienThoai')
        clearErrorById('errEmail')
        clearErrorById('errGioiTinh')
        clearErrorById('errNgaySinh')
        clearErrorById('errNgonNgu')
        clearErrorById('errKhoaHoc')
        clearErrorById('errAnhDaiDien')
    }

    // 3. Event

    $('#txtHoTen').on('blur', validateHoTen)
    function validateHoTen() {
        const inputValue = $('#txtHoTen').val()
        const errId = 'errHoTen'
        if (inputValue === "") {
            return showErrorById(errId, "Không được bỏ trống")
        }
        const regex = /^[\p{L}\s]+$/u
        if (!regex.test(inputValue)) {
            return showErrorById(errId, "Không hợp lệ")
        }
        hoTen = inputValue
        return clearErrorById(errId)
    }


    $('#txtSoDienThoai').on('blur', validateSoDienThoai)
    function validateSoDienThoai() {
        const inputValue = $('#txtSoDienThoai').val()
        const errId = 'errSoDienThoai'
        if (inputValue === "") {
            return showErrorById(errId, "Không được bỏ trống")
        }
        const regex = /^(03|05|07|08|09)\d{8}$/
        if (!regex.test(inputValue)) {
            return showErrorById(errId, "Không hợp lệ")
        }
        soDienThoai = inputValue
        return clearErrorById(errId)
    }


    $('#txtEmail').on('blur', validateEmail)
    function validateEmail() {
        const inputValue = $('#txtEmail').val()
        const errId = 'errEmail'
        if (inputValue === "") {
            return showErrorById(errId, "Không được bỏ trống")
        }
        const regex = /^[a-zA-Z.-][0-9a-zA-Z.-]{5,}@gmail\.com$/i
        if (!regex.test(inputValue)) {
            return showErrorById(errId, "Không hợp lệ")
        }
        email = inputValue
        return clearErrorById(errId)
    }


    // date
    $('#txtNgaySinh').on('blur', validateNgaySinh)
    function validateNgaySinh() {
        const inputValue = $('#txtNgaySinh').val()
        const errId = 'errNgaySinh'
        if (inputValue === "") {
            $('#lblTuoi').text("--"); // Reset số tuổi nếu để trống
            return showErrorById(errId, "Date not selected or invalid!")
        }
        ngaySinh = new Date(inputValue)
        const age = new Date().getFullYear() - ngaySinh.getFullYear()
        
        // Đẩy số tuổi ra màn hình hiển thị
        $('#lblTuoi').text(age);

        if (age < 18) {
            return showErrorById(errId, "Must be at least 18 years old!")
        }
        return clearErrorById(errId)
    }


    // radio
    $('input[name="gioiTinh"]').on('change', function () {
        gioiTinh = $('input[name="gioiTinh"]:checked').val()
        clearErrorById("errGioiTinh")
    })


    // checkbox
    $('input[name="ngonNgu"]').on('change', function () {
        const arr = []
        $('input[name="ngonNgu"]:checked').each(function () {
            arr.push($(this).next().text())
        })
        dsNgonNgu = arr
        clearErrorById("errNgonNgu")
    })


    // select
    $('#sltKhoaHoc').on('change', validateKhoaHoc)
    function validateKhoaHoc() {
        const inputValue = $('#sltKhoaHoc').val()
        const errId = 'errKhoaHoc'
        if (inputValue === "") {
            return showErrorById(errId, "Not selected!")
        }
        switch (inputValue) {
            case "1":
                khoaHoc = "Trí tuệ nhân tạo"
                hocPhi = "4,000,000"
                break
            case "2":
                khoaHoc = "Học máy"
                hocPhi = "3,500,000"
                break
            case "3":
                khoaHoc = "Học sâu"
                hocPhi = "3,000,000"
                break
            case "4":
                khoaHoc = "Dữ liệu lớn"
                hocPhi = "2,500,000"
                break
        }
        $('#txtHocPhi').val(hocPhi)
        return clearErrorById(errId)
    }


    // file
    $('#fileAnhDaiDien').on('change', validateAnhDaiDien)
    function validateAnhDaiDien() {
        const inputValue = $('#fileAnhDaiDien').val()
        const errId = 'errAnhDaiDien'
        if (inputValue === "") {
            return showErrorById(errId, "Not selected!")
        }
        const name = inputValue.split("\\").pop()
        const regex = /.{1,}\.(jpg|png)$/i
        if (!regex.test(name)) {
            return showErrorById(errId, "Format not supported!")
        }
        tenAnhDaiDien = name
        return clearErrorById(errId)
    }

});