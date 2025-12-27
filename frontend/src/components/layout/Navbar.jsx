import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { path: '/', label: 'Dashboard', icon: '📊' },
        { path: '/equipment', label: 'Equipment', icon: '🔧' },
        { path: '/requests', label: 'Requests', icon: '📝' },
        { path: '/kanban', label: 'Kanban Board', icon: '📋' },
        { path: '/calendar', label: 'Calendar', icon: '📅' },
        { path: '/teams', label: 'Teams', icon: '👥', roles: ['Manager'] },
    ];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    ⚙️ GearGuard
                </Link>

                <div className="navbar-nav">
                    {menuItems.map((item) => {
                        // Hide menu items based on role
                        if (item.roles && !item.roles.includes(user?.role)) {
                            return null;
                        }

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive ? 'nav-link active' : 'nav-link'
                                }
                                end={item.path === '/'}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-label">{item.label}</span>
                            </NavLink>
                        );
                    })}
                </div>

                <div className="navbar-menu">
                    <span className="navbar-user">
                        {user?.name} <span className="user-role">({user?.role})</span>
                    </span>
                    <button onClick={handleLogout} className="btn-logout">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
