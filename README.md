# 🗓️ Appointment Calendar App

A responsive appointment booking system built using **React**, **Tailwind CSS**, and **React Big Calendar**. This app allows clinic staff to schedule, manage, and view patient appointments efficiently, with features like persistent local storage, time-slot disabling, and mock login functionality.

---

## 🌟 Features

✅ **Mock Authentication**  
- Login with hardcoded credentials:  
  `email: staff@clinic.com`  
  `password: 123456`

✅ **Appointment Booking**  
- Click on a calendar date to open a form.
- Enter patient name, select a doctor, and choose an appointment time.
- Each appointment lasts 15 minutes.

✅ **Event Management**  
- View scheduled appointments on the calendar.
- Edit existing appointments by clicking on an event.
- Delete appointments as needed.

✅ **Time Slot Restrictions**  
- Prevents booking in past dates.
- Prevents selecting days from previous/next months shown in gray.
- Prevents booking a time slot already taken for the selected day.

✅ **Responsive Design**  
- Calendar adapts to screen size.
- On mobile: shows one day at a time.
- Date picker on mobile to jump between days.

✅ **Local Storage Persistence**  
- All appointments are saved in `localStorage`.
- No backend needed.

---

## 🚀 Getting Started

### 📦 Clone the Repository

```bash
git clone https://github.com/Mohammad-Imran786/Appointment-Calendar-App.git
cd Appointment-Calendar-App

🛠️ Install Dependencies
Make sure you have Node.js and npm installed, then run:
npm install

🏃‍♂️ Start the Development Server
npm run dev

The app will open in your browser at:
http://localhost:5173

🧪 Mock Credentials
Use these credentials to log in:

Email	Password
staff@clinic.com	123456



🛠️ Tech Stack
⚛️ React

🎨 Tailwind CSS

📅 React Big Calendar

🧠 Moment.js (for date formatting)

🗄️ localStorage (no backend required)

🔐 Mock login using controlled form


🙋‍♂️ Future Improvements
Backend support (Firebase or Node.js)

Real user auth (JWT or OAuth)

Role-based access (doctors vs staff)

Notifications/reminders

Search and filter appointments