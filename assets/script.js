// Function to show the blurred background and login popup
function showLoginPopup() {
  Swal.fire({
    title: 'Login',
    html:
      '<input id="swal-input-username" class="swal2-input" type="text" placeholder="Username" required>' +
      '<input id="swal-input-password" class="swal2-input" type="password" placeholder="Password" required>',
    showCancelButton: true,
    confirmButtonText: 'Log in',
    focusConfirm: false,
    customClass: {
      popup: 'custom-swal-theme'
    },
    didOpen: () => {
      Swal.getFocusableElements().forEach((element) => {
        element.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            Swal.clickConfirm();
          }
        });
      });
    },
    preConfirm: () => {
      const username = Swal.getPopup().querySelector('#swal-input-username').value;
      const password = Swal.getPopup().querySelector('#swal-input-password').value;

      if (!username || !password) {
        Swal.showValidationMessage('Please enter both username and password');
        return false; // Prevent closing the popup
      }

      // You can add your own logic here to validate the credentials
      // For this example, we're just displaying an alert with the entered values
      Swal.fire({
        icon: 'success',
        title: 'Logged in!',
        html: `Welcome ${username}`
      });
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.cancel) {
      // Handle cancel button click if needed
      // For this example, we're not doing anything
    }
  });

  blurBackground.style.display = "block";
}

// Wait for 2 seconds and then show the login popup
setTimeout(showLoginPopup, 2000);

const pianoKeys = document.querySelectorAll(".piano-keys .key"),
  volumeSlider = document.querySelector(".volume-slider input"),
  keysCheckbox = document.querySelector(".keys-checkbox input")

let allKeys = [],
  audio = new Audio("/assets/tunes/a.wav"); //default

//calling the playtunefunction with data key valueas an argument
pianoKeys.forEach(key => {
  allKeys.push(key.dataset.key); // adding data key values to the all key array
  key.addEventListener("click", () => playTune(key.dataset.key));

});

const playTune = (key) => {
  audio.src = `tunes/${key}.wav`
  audio.play(); //play audio

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active"); // adding the active class to the clicked key element
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);

}

const handleVolume = (e) => {
  audio.volume = e.target.value; // slider value as an audio value
}

const showHideKeys = () => {
  pianoKeys.forEach(key => key.classList.toggle("hide"));
}

const pressedKey = (e) => {
  if (allKeys.includes(e.key)) playTune(e.key);// this function is called only if pressed key is present in allKey array
}



volumeSlider.addEventListener("input", handleVolume);
keysCheckbox.addEventListener("click", showHideKeys);
document.addEventListener("keydown", pressedKey);

