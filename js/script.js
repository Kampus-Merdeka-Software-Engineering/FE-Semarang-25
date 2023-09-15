let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

  // Array untuk menyimpan daftar janji temu
  var appointments = [];

  // Fungsi Read (Baca Janji)
  function displayAppointments() {
    // Mengambil elemen dengan id appointment-list
    var appointmentList = document.getElementById("appointment-list");

    // Menghapus konten sebelumnya
    appointmentList.innerHTML = "";

    // Menampilkan setiap janji temu dalam database (array appointments)
    for (var i = 0; i < appointments.length; i++) {
      var appointment = appointments[i];

      // Membuat elemen untuk menampilkan informasi janji temu
      var appointmentInfo = document.createElement("div");
      appointmentInfo.innerHTML = "<h3>Janji Temu " + (i + 1) + "</h3>" +
        "<p>Nama: " + appointment.name + "</p>" +
        "<p>Nomor Telepon: " + appointment.number + "</p>" +
        "<p>Email: " + appointment.email + "</p>" +
        "<p>Spesialisasi: " + appointment.specialization + "</p>" +
        "<p>Tanggal: " + appointment.date + "</p>";

      // Menambahkan elemen ke dalam appointmentList
      appointmentList.appendChild(appointmentInfo);
    }
  }

  // Fungsi untuk menangani submit form
  function handleFormSubmit(event) {
    event.preventDefault();

    // Mendapatkan nilai-nilai input dari form
    var name = document.querySelector('input[name="name"]').value;
    var number = document.querySelector('input[name="number"]').value;
    var email = document.querySelector('input[name="email"]').value;
    var specialization = document.querySelector('select[name="specialization"]').value;
    var date = document.querySelector('input[name="date"]').value;

    // Membuat objek janji temu baru
    var newAppointment = {
      name: name,
      number: number,
      email: email,
      specialization: specialization,
      date: date
    };

    // Menambahkan janji temu baru ke dalam array appointments
    appointments.push(newAppointment);

    // Menampilkan daftar janji temu yang diperbarui
    displayAppointments();

    // Mengosongkan nilai-nilai input form
    document.querySelector('input[name="name"]').value = "";
    document.querySelector('input[name="number"]').value = "";
    document.querySelector('input[name="email"]').value = "";
    document.querySelector('select[name="specialization"]').value = "";
    document.querySelector('input[name="date"]').value = "";

    // Menampilkan pesan sukses
    var message = document.querySelector('.message');
    message.innerHTML = "Janji temu berhasil dibuat!";
  }

  // Menambahkan event listener pada form submit
  var form = document.getElementById("appointment-form");
  form.addEventListener("submit", handleFormSubmit);

  // Memanggil fungsi displayAppointments() saat halaman dimuat
  displayAppointments();

  // Fungsi Update (Perbarui Janji)
function updateAppointment(index) {
  // Mengambil janji temu berdasarkan indeks dalam array appointments
  var appointment = appointments[index];

  // Mengisi nilai input dengan informasi janji temu yang akan diperbarui
  document.getElementById("name").value = appointment.name;
  document.getElementById("number").value = appointment.number;
  document.getElementById("email").value = appointment.email;
  document.getElementById("specialization").value = appointment.specialization;
  document.getElementById("date").value = appointment.date;

  // Menghapus janji temu yang akan diperbarui dari array appointments
  appointments.splice(index, 1);

  // Menampilkan pesan bahwa janji temu sedang diperbarui
  document.querySelector(".message").innerHTML = "Silakan perbarui janji temu.";

  // Menampilkan kembali daftar janji temu setelah menghapus yang akan diperbarui
  displayAppointments();
}

// Fungsi Delete (Hapus Janji)
function deleteAppointment(index) {
  // Menghapus janji temu berdasarkan indeks dalam array appointments
  appointments.splice(index, 1);

  // Menampilkan pesan bahwa janji temu telah dihapus
  document.querySelector(".message").innerHTML = "Janji temu telah dihapus.";

  // Menampilkan kembali daftar janji temu setelah menghapus
  displayAppointments();
}

