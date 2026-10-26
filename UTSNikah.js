document.addEventListener("DOMContentLoaded", () => {
    // =========================================================================
    // 1. INISIALISASI ELEMEN UTAMA DARI DOM
    // =========================================================================
    // Mengambil elemen tombol "Buka Undangan", section overlay penerima, 
    // container konten utama, serta teks penampung nama penerima berdasarkan ID.
    const btnBuka = document.getElementById("btn-buka");
    const penerimaSection = document.getElementById("penerima");
    const kontenUtama = document.getElementById("konten-utama");
    const namaPenerima = document.getElementById("nama-penerima");

    // =========================================================================
    // 2. INISIALISASI ELEMEN AUDIO & TOMBOL MUSIK FLOATING
    // =========================================================================
    // Mengambil elemen <audio>, tombol musik melayang, dan ikon piringan hitam.
    // Variabel status 'isPlaying' digunakan untuk melacak apakah musik sedang diputar atau di-pause.
    const bgMusic = document.getElementById("bg-music");
    const btnMusic = document.getElementById("btn-music");
    const musicIcon = document.getElementById("music-icon");
    let isPlaying = false;

    // =========================================================================
    // FUNGSI 1: toggleMusic()
    // Penjelasan Presentasi:
    // Fungsi ini bertugas mengontrol play/pause audio secara manual. 
    // Jika musik sedang menyala (isPlaying = true), maka musik akan di-pause 
    // dan animasi ikon piringan hitam dihentikan (ditambahi class 'paused'). 
    // Sebaliknya, jika sedang berhenti, musik diputar dan animasi dijalankan kembali.
    // =========================================================================
    function toggleMusic() {
        if (isPlaying) {
            bgMusic.pause();
            musicIcon.classList.add("paused"); // Menghentikan animasi putar piringan hitam
        } else {
            bgMusic.play();
            musicIcon.classList.remove("paused"); // Menjalankan animasi putar piringan hitam
        }
        isPlaying = !isPlaying; // Membalikkan status boolean isPlaying
    }

    // Menambahkan Event Listener "click" pada tombol musik floating di pojok kanan bawah
    if (btnMusic) {
        btnMusic.addEventListener("click", toggleMusic);
    }

    // =========================================================================
    // 3. FITUR NAMA TAMU DINAMIS DARI URL PARAMS (?to=NamaTamu)
    // Penjelasan Presentasi:
    // Fitur ini mengambil parameter "to" dari URL browser (contoh: ?to=Budi).
    // Jika parameter tersebut ditemukan, nama tamu di halaman awal akan 
    // secara otomatis berubah sesuai dengan nama yang ada di URL.
    // =========================================================================
    const urlParams = new URLSearchParams(window.location.search);
    const namaTamu = urlParams.get("to");
    if (namaTamu) {
        namaPenerima.textContent = namaTamu;
    }

    // =========================================================================
    // FUNGSI 2: EVENT LISTENER TOMBOL "BUKA UNDANGAN"
    // Penjelasan Presentasi:
    // Ketika tamu mengklik tombol "Buka Undangan":
    // 1. Musik latar lagu 'Beautiful in White' langsung terputar otomatis (autoplay dipicu oleh interaksi user).
    // 2. Efek transisi fade-out (opacity = 0) dijalankan pada overlay sampul depan.
    // 3. Setelah 500ms (0.5 detik), overlay depan disembunyikan (d-none) dan konten utama undangan ditampilkan.
    // =========================================================================
    if (btnBuka) {
        btnBuka.addEventListener("click", () => {
            // Memutar musik otomatis saat tombol diklik
            if (bgMusic) {
                bgMusic.play().then(() => {
                    isPlaying = true;
                    if (musicIcon) musicIcon.classList.remove("paused");
                }).catch(error => {
                    console.log("Autoplay terhalang oleh kebijakan browser:", error);
                });
            }

            // Memberi efek fade-out pada section penerima
            penerimaSection.style.opacity = "0";
            
            // Menunggu transisi opacity selesai (500 milidetik), lalu menyembunyikan overlay depan
            setTimeout(() => {
                penerimaSection.classList.add("d-none");
                kontenUtama.classList.remove("d-none");
            }, 500);
        });
    }

    // =========================================================================
    // FUNGSI 3: LOGIKA NAVIGASI TAB NAVBAR BAWAH (SINGLE PAGE APPLICATION)
    // Penjelasan Presentasi:
    // Fungsi ini menangani sistem navigasi antar-section tanpa melakukan scroll halaman.
    // 1. Mengambil seluruh link navigasi (.nav-link) dan seluruh section menu (.menu-section).
    // 2. Menghentikan aksi default tag link <a> menggunakan e.preventDefault().
    // 3. Sembunyikan semua section dengan menambahkan class Bootstrap 'd-none'.
    // 4. Tampilkan HANYA section yang memiliki ID sesuai atribut 'data-target' dari link yang diklik.
    // 5. Perbarui warna indikator tab aktif di navbar bawah.
    // =========================================================================
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const menuSections = document.querySelectorAll(".menu-section");

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Mencegah pindah halaman atau scroll otomatis

            // Ambil ID target section dari atribut data-target (contoh: "mempelai", "acara", "peta")
            const targetId = link.getAttribute("data-target");

            // Sembunyikan seluruh section menu yang ada
            menuSections.forEach((section) => {
                section.classList.add("d-none");
            });

            // Tampilkan hanya section target yang dipilih pengguna
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove("d-none");
            }

            // Atur class 'active' agar ikon/teks navbar yang sedang dibuka berwarna emas
            navLinks.forEach((nav) => nav.classList.remove("active"));
            link.classList.add("active");
        });
    });
});