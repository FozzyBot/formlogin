const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const welcomeSection = document.getElementById('welcome');
const welcomeMsg = document.getElementById('welcome-msg');
const audio = document.getElementById('bg-music');
const toggleMusicBtn = document.getElementById('toggle-music');

let users = JSON.parse(localStorage.getItem('users') || '{}');

loginTab.addEventListener('click', () => {
  loginTab.classList.add('active');
  registerTab.classList.remove('active');
  loginForm.style.display = 'block';
  registerForm.style.display = 'none';
});

registerTab.addEventListener('click', () => {
  registerTab.classList.add('active');
  loginTab.classList.remove('active');
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;

  if (users[username] === password) {
    loginSuccess(username);
  } else {
    alert('Username atau password salah!');
  }
});

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('register-username').value.trim();
  const password = document.getElementById('register-password').value;

  if (users[username]) {
    alert('Username sudah terdaftar!');
  } else {
    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Berhasil mendaftar! Silakan login.');
    loginTab.click();
  }
});

function loginSuccess(username) {
  document.querySelector('.tab-container').style.display = 'none';
  welcomeSection.style.display = 'block';
  welcomeMsg.innerText = `Selamat Datang ${username}`;
  audio.play();
}

toggleMusicBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    toggleMusicBtn.textContent = '⏸';
  } else {
    audio.pause();
    toggleMusicBtn.textContent = '▶';
  }
});
document.getElementById('back-to-login').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('.tab-container').style.display = 'block';
  document.getElementById('welcome').style.display = 'none';
  audio.pause();
  audio.currentTime = 0;
});
