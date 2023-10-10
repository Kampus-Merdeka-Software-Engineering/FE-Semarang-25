let menu = document.querySelector("#menu-btn");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
};

// Mendapatkan referensi ke elemen formulir
const form = document.getElementById("appointment-form");

// Menangani pengiriman formulir ketika formulir disubmit
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Menghentikan perilaku bawaan submit

  // Mendapatkan nilai-nilai dari elemen formulir
//   const registrationNumber = form.querySelector('[name="registrationNumber"]').value;
  const name = form.querySelector('[name="name"]').value;
  const number = form.querySelector('[name="number"]').value;
  const email = form.querySelector('[name="email"]').value;
  const gender = form.querySelector('[name="gender"]').value;
  const specialization = form.querySelector('[name="specialization"]').value;
  const date = form.querySelector('[name="date"]').value;

  // Membuat objek data yang akan dikirim ke server
  const dataToSend = {
    // registrationNumber,
    name,
    number,
    email,
    gender,
    specialization,
    date,
  };

  // URL endpoint untuk mengirim permintaan POST
  const url = "https://be-semarang-25-production.up.railway.app/appointment"; // Ganti dengan URL server Anda

  // Mengirim permintaan POST menggunakan fetch
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Menguraikan respons JSON jika berhasil
      } else {
        throw new Error("Permintaan gagal"); // Mengangkat kesalahan jika permintaan gagal
      }
    })
    .then((data) => {
    if (data.message) {
        // Menampilkan pesan dari server dengan nomor registrasi
        const registrationNumber = data.message.split(" ").pop();
        const successMessage = document.getElementById("success-message");
        const registrationNumberSpan = document.getElementById("registration-number");
  
        registrationNumberSpan.textContent = registrationNumber;
        successMessage.classList.remove("hidden");
        // Di sini Anda bisa menangani respons dari server
      } else {
        throw new Error("Pesan tidak ditemukan dalam respons");
      }
    })
    .catch((error) => {
      console.error("Terjadi kesalahan:", error);
      // Di sini Anda bisa menangani kesalahan jika permintaan gagal
    });
});

// Mendapatkan referensi ke elemen input pencarian
const searchInput = document.getElementById("search-input");

// Mendapatkan referensi ke elemen form pencarian
const searchForm = document.getElementById("search-form");

// Mendapatkan referensi ke elemen daftar janji temu
const appointmentList = document.getElementById("appointment-list");

// Menangani pencarian ketika form pencarian disubmit
searchForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Menghentikan perilaku bawaan submit

  // Mendapatkan nilai dari elemen input pencarian
  const registrationNumber = searchInput.value;

  // URL endpoint untuk melakukan pencarian berdasarkan registrationNumber
  const searchUrl = `https://be-semarang-25-production.up.railway.app/appointment/${registrationNumber}`;

  // Mengirim permintaan GET menggunakan fetch
  fetch(searchUrl)
    .then((response) => {
      if (response.ok) {
        return response.json(); // Menguraikan respons JSON jika berhasil
      } else {
        throw new Error("Pencarian gagal"); // Mengangkat kesalahan jika pencarian gagal
      }
    })
    .then((data) => {
      if (data.appointment) {
        // Menampilkan data janji temu yang ditemukan
        const appointmentData = data.appointment;

        // Membuat elemen untuk menampilkan data janji temu
        const appointmentElement = document.createElement("div");
        appointmentElement.classList.add("appointment-data");

        // Menambahkan informasi data janji temu ke dalam elemen
        appointmentElement.innerHTML = `
          <h1>Data Janji Temu</h1>
          <p>Nomor Registrasi: ${appointmentData.registrationNumber}</p>
          <p>Nama: ${appointmentData.name}</p>
          <p>Nomor Telepon: ${appointmentData.number}</p>
          <p>Email: ${appointmentData.email}</p>
          <p>Jenis Kelamin: ${appointmentData.gender}</p>
          <p>Spesialisasi: ${appointmentData.specialization}</p>
          <p>Tanggal: ${appointmentData.date}</p>
        `;

        // Menghapus konten sebelumnya dan menambahkan elemen data janji temu ke dalam daftar
        appointmentList.innerHTML = "";
        appointmentList.appendChild(appointmentElement);
      } else {
        throw new Error("Janji temu tidak ditemukan");
      }
    })
    .catch((error) => {
      console.error("Terjadi kesalahan:", error);
      // Di sini Anda bisa menangani kesalahan jika pencarian gagal
    });
});

