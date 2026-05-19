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
    document.getElementById(errId).innerText = ""
    return true
}

function showErrorById(errId, msg) {
    document.getElementById(errId).innerText = msg
    return false
}

// 1. Save field data to table

let count = 1
document.querySelector('#btnLuu').addEventListener('click', saveData)
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
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
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
    document.querySelector('#myData').append(newRow)

    // clear
    clearForm()

    // hide modal
    bootstrap.Modal.getOrCreateInstance('#myModal').hide()
}


// 2. Reset

document.querySelector('#btnXoa').addEventListener('click', clearForm)
function clearForm() {
    document.querySelector('#myForm').reset()
    clearValues()
    document.getElementById('lblTuoi').innerText = "--";
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

document.querySelector('#txtHoTen').addEventListener('blur', validateHoTen)
function validateHoTen() {
    const inputValue = document.querySelector('#txtHoTen').value
    const errId = 'errHoTen'
    if (inputValue === "") {
        return showErrorById(errId, "Không được bỏ trống")
    }
    // Example: Y La
    const regex = /^[\p{L}\s]+$/u
    if (!regex.test(inputValue)) {
        return showErrorById(errId, "Không hợp lệ")
    }
    hoTen = inputValue
    return clearErrorById(errId)
}


document.querySelector('#txtSoDienThoai').addEventListener('blur', validateSoDienThoai)
function validateSoDienThoai() {
    const inputValue = document.querySelector('#txtSoDienThoai').value
    const errId = 'errSoDienThoai'
    if (inputValue === "") {
        return showErrorById(errId, "Không được bỏ trống")
    }
    // Example: 0399.123.456
    const regex = /^(03|05|07|08|09)\d{8}$/
    if (!regex.test(inputValue)) {
        return showErrorById(errId, "Không hợp lệ")
    }
    soDienThoai = inputValue
    return clearErrorById(errId)
}


document.querySelector('#txtEmail').addEventListener('blur', validateEmail)
function validateEmail() {
    const inputValue = document.querySelector('#txtEmail').value
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
document.querySelector('#txtNgaySinh').addEventListener('blur', validateNgaySinh)
function validateNgaySinh() {
    const inputValue = document.querySelector('#txtNgaySinh').value
    const errId = 'errNgaySinh'
    if (inputValue === "") {
        document.getElementById('lblTuoi').innerText = "--"; 
        return showErrorById(errId, "Date not selected or invalid!")
    }
    ngaySinh = new Date(inputValue)
    const age = new Date().getFullYear() - ngaySinh.getFullYear()
    
    document.getElementById('lblTuoi').innerText = age;

    if (age < 18) {
        return showErrorById(errId, "Must be at least 18 years old!")
    }
    return clearErrorById(errId)
}


document.querySelectorAll('input[name="gioiTinh"]').forEach(radio => {
    radio.addEventListener('change', () => {
        gioiTinh = document.querySelector('input[name="gioiTinh"]:checked').value
        clearErrorById("errGioiTinh")
    })
})


// checkbox
document.querySelectorAll('input[name="ngonNgu"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const arr = []
        document.querySelectorAll('input[name="ngonNgu"]:checked').forEach(element => {
            arr.push(element.nextElementSibling.textContent)
        })
        dsNgonNgu = arr
        clearErrorById("errNgonNgu")
    })
})


document.querySelector('#sltKhoaHoc').addEventListener('change', validateKhoaHoc)
function validateKhoaHoc() {
    const inputValue = document.querySelector('#sltKhoaHoc').value
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
    document.querySelector('#txtHocPhi').value = hocPhi
    return clearErrorById(errId)
}


document.querySelector('#fileAnhDaiDien').addEventListener('change', validateAnhDaiDien)
function validateAnhDaiDien() {
    const inputValue = document.querySelector('#fileAnhDaiDien').value
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
document.getElementById('lblNgayHienTai').innerText = new Date().toLocaleDateString('en-GB');