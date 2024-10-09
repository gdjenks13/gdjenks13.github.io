document.getElementById('contact-form').addEventListener('submit', function(event) {
  const fullName = document.getElementById('full-name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (!/^[A-Za-z\s]+$/.test(fullName)) {
    alert('Full name must contain only letters and spaces.');
    event.preventDefault();
  }

  if (!/.+@.+\..+/.test(email)) {
    alert('Invalid email format.');
    event.preventDefault();
  }

  if (message.length > 1000) {
    alert('Message is too long.');
    event.preventDefault();
  }
});