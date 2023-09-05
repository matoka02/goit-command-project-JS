import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

localStorage.setItem('ui-theme', 'light');

document.querySelector('.themetoggle').addEventListener('click', evt => {
  evt.preventDefault();
  if (localStorage.getItem('settings') === 'dark') {
    localStorage.removeItem('settings');
  } else {
    localStorage.setItem('settings', 'dark');
    // addDarkClassToHTML();
  }
  addDarkClassToHTML();
});

function addDarkClassToHTML() {
  try {
    if (localStorage.getItem('settings') === 'dark') {
      document.querySelector('html').classList.add('dark');
      document.querySelector('.themetoggle span').textContent = 'wb_sunny';
    } else {
      document.querySelector('html').classList.remove('dark');
      document.querySelector('.themetoggle span').textContent = 'dark_mode';
    }
  } catch (error) {
    // console.error(error);
  }
};

addDarkClassToHTML();