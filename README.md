# Team Detail
1. Dhruvi Patel - dhruvimpatel777@gmail.com
2. Vaza Preeti - preetivaza@gmail.com
3. Savitri Gamit - savitrigamit123456@gmail.com


# GearGuard – The Ultimate Maintenance Tracker

A comprehensive MERN stack maintenance management system inspired by Odoo's Maintenance module. Perfect for hackathons and production deployments.

## 🚀 Features

### Core Modules

- **Equipment Management**: Track equipment by department, employee, serial number, warranty, location, and maintenance team
- **Maintenance Teams**: Organize teams like Mechanics, Electricians, IT Support with assigned technicians
- **Maintenance Requests**: Handle both Corrective (breakdown) and Preventive (scheduled) maintenance
- **Kanban Board**: Drag & drop interface for request status management (New → In Progress → Repaired → Scrap)
- **Calendar View**: Visual scheduling for preventive maintenance

### Smart Features

- **Auto-fill Maintenance Team**: Automatically populates team when equipment is selected
- **Smart Equipment Button**: View all related maintenance requests from equipment details page
- **Scrap Logic**: Mark equipment as unusable with automatic status updates
- **Role-based Access**: User, Technician, and Manager roles with appropriate permissions

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/gearguard
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

5. Start the server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`



## 👥 User Roles

### User
- View equipment and requests
- Create maintenance requests
- View Kanban and Calendar

### Technician
- All User permissions
- Update request status
- View assigned tasks

### Manager
- All Technician permissions
- Manage teams
- Manage equipment
- Delete requests
- Access all administrative features

## 🎨 Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications


## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Protected API routes
- Token expiration handling
- CORS configuration

This is our GearGuard project.

#Thank You Odoo Team.
