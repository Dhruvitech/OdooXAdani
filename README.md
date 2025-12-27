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

## 📁 Project Structure

### Backend
```
backend/
├── config/
│   ├── db.js              # MongoDB connection
│   └── jwt.js             # JWT utilities
├── models/
│   ├── User.js            # User model with roles
│   ├── Equipment.js       # Equipment tracking
│   ├── MaintenanceTeam.js # Team management
│   └── MaintenanceRequest.js # Request lifecycle
├── controllers/
│   ├── authController.js
│   ├── equipmentController.js
│   ├── teamController.js
│   └── requestController.js
├── routes/
│   ├── auth.js
│   ├── equipment.js
│   ├── team.js
│   └── request.js
├── middleware/
│   ├── auth.js            # JWT & role verification
│   └── errorHandler.js    # Error handling
├── server.js              # Express server
└── package.json
```

### Frontend
```
frontend/
├── src/
│   ├── components/
│   │   ├── common/         # Reusable components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   └── layout/         # Layout components
│   │       ├── Navbar.jsx
│   │       ├── Sidebar.jsx
│   │       └── Layout.jsx
│   ├── pages/
│   │   ├── auth/           # Authentication
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── equipment/      # Equipment management
│   │   │   ├── EquipmentList.jsx
│   │   │   ├── EquipmentForm.jsx
│   │   │   └── EquipmentDetail.jsx
│   │   ├── requests/       # Maintenance requests
│   │   │   ├── RequestList.jsx
│   │   │   ├── RequestForm.jsx
│   │   │   ├── KanbanBoard.jsx
│   │   │   └── CalendarView.jsx
│   │   ├── teams/          # Team management
│   │   │   ├── TeamList.jsx
│   │   │   └── TeamForm.jsx
│   │   └── Dashboard.jsx
│   ├── services/           # API services
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── equipmentService.js
│   │   ├── teamService.js
│   │   └── requestService.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

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

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)
- `GET /api/auth/users` - Get all users (Manager only)

### Equipment
- `GET /api/equipment` - Get all equipment (Protected)
- `GET /api/equipment/:id` - Get single equipment (Protected)
- `POST /api/equipment` - Create equipment (Protected)
- `PUT /api/equipment/:id` - Update equipment (Protected)
- `DELETE /api/equipment/:id` - Delete equipment (Manager only)
- `PUT /api/equipment/:id/scrap` - Mark as scrap (Protected)
- `GET /api/equipment/:id/requests` - Get related requests (Protected)

### Maintenance Teams
- `GET /api/teams` - Get all teams (Protected)
- `GET /api/teams/:id` - Get single team (Protected)
- `POST /api/teams` - Create team (Manager only)
- `PUT /api/teams/:id` - Update team (Manager only)
- `DELETE /api/teams/:id` - Delete team (Manager only)
- `PUT /api/teams/:id/members` - Add team member (Manager only)
- `DELETE /api/teams/:id/members/:userId` - Remove member (Manager only)

### Maintenance Requests
- `GET /api/requests` - Get all requests (Protected)
- `GET /api/requests/:id` - Get single request (Protected)
- `POST /api/requests` - Create request (Protected)
- `PUT /api/requests/:id` - Update request (Protected)
- `DELETE /api/requests/:id` - Delete request (Manager only)
- `GET /api/requests/kanban` - Get Kanban board data (Protected)
- `GET /api/requests/calendar` - Get calendar events (Protected)

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

## 🚀 Deployment

### Backend Deployment (e.g., Heroku, Railway)
1. Set environment variables
2. Update `MONGODB_URI` with production database
3. Update `CLIENT_URL` with frontend URL
4. Deploy using platform-specific commands

### Frontend Deployment (e.g., Vercel, Netlify)
1. Build the project: `npm run build`
2. Set `VITE_API_URL` to production backend URL
3. Deploy the `dist` folder

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Protected API routes
- Token expiration handling
- CORS configuration

## 📝 License

MIT License - feel free to use this project for hackathons, learning, or production!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Support

For issues and questions, please open an issue in the repository.

---

**Built with ❤️ for Hackathons** 🚀
