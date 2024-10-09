from flask import Flask, render_template, request, redirect, flash
from flask_mail import Mail, Message
import re

app = Flask(__name__)
app.secret_key = 'bobcatcroopjenkinshughes'

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'gdjenks13@gmail.com'
app.config['MAIL_PASSWORD'] = 'sytj ryaq fwnu jaqf'
app.config['MAIL_DEFAULT_SENDER'] = 'gdjenks13@gmail.com'
app.config['WTF_CSRF_ENABLED'] = False

mail = Mail(app)

@app.route('/')
def contact_form():
    return render_template('index.html')

@app.route('/submit-form', methods=['POST'])
def submit_form():
    full_name = request.form['full-name']
    email = request.form['email']
    message = request.form['message']

    if not re.match("^[A-Za-z\s]+$", full_name):
        flash("Full name must contain only letters and spaces.")
        return redirect('/')
    
    if not re.match(r'[^@]+@[^@]+\.[^@]+', email):
        flash("Invalid email format.")
        return redirect('/')
    
    if len(message) > 1000:
        flash("Message is too long.")
        return redirect('/')

    try:
        msg = Message("New Contact Message", recipients=["gdjenks13@gmail.com"])
        msg.body = f"Full Name: {full_name}\nEmail: {email}\nMessage: {message}"
        mail.send(msg)
        flash("Message sent successfully!")
    except Exception as e:
        flash(f"Failed to send message: {str(e)}")

    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
