# AIMS Portal - Academic Management System

AIMS Portal is a comprehensive **Academic Management System** designed to streamline faculty and student interactions, manage courses, and facilitate administration through an easy-to-use interface.

## Tech Stack

- **Frontend**: React, Axios
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB
- **Authentication**: Email-based OTP verification (OTP is printed on the console)

## Features

- **Admin Dashboard**: Manage users, courses, and faculty. Admins can add new students and faculties, approve courses, and create departments.
- **Faculty Panel**: Faculty can create new courses and offer approved courses. They also review and approve student enrollments alongside faculty advisors.
- **Student Panel**: Students can enroll in courses they are eligible for, which must be approved first by the instructor and then by the faculty advisor. They can also track their academic progress and communicate with faculty.

---

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB

### Clone the Repository

```bash
git clone https://github.com/sahusneha2004/AIMS_PORTAL.git
cd AIMS_PORTAL
```

### Frontend Setup

```bash
npm install  # Install dependencies
npm start    # Start the frontend development server
```

### Backend Setup

```bash
cd backend
npm install  # Install dependencies
```

1. Start MongoDB server
2. Run the backend server:

```bash
node server.js
```

---

## Login Credentials

### Admin Login

- Email: `sahusneha031@gmail.com+admin2@gmail.com`
- OTP: Printed on the console

### Faculty Login

- Email: `2022csb1105@iitrpr.ac.in`
- OTP: Printed on the console

### Student Login

- Email: `2022csb1105+stud1@iitrpr.ac.in`
- OTP: Printed on the console

---
Feel free to fork the repository and contribute!

## License

MIT License

## Contact

For any issues or queries, contact **Sneha Sahu** at `sahusneha031@gmail.com`.
