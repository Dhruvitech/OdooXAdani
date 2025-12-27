import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { teamService } from '../../services/teamService';
import { authService } from '../../services/authService';
import Card from '../../components/common/Card';
import toast from 'react-hot-toast';

const TeamForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        name: '',
        type: 'Mechanics',
        description: '',
        teamLead: '',
        members: [],
        specialization: '',
    });

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Mapping of team types to relevant departments
    const teamTypeDepartmentMapping = {
        'Mechanics': ['Maintenance', 'Mechanical', 'Manufacturing', 'Production'],
        'Electricians': ['Electrical', 'Maintenance', 'Manufacturing'],
        'IT Support': ['IT', 'IT Support', 'Technology'],
        'HVAC': ['HVAC', 'Facilities', 'Maintenance'],
        'Plumbing': ['Plumbing', 'Facilities', 'Maintenance'],
        'General': ['Maintenance', 'Facilities', 'General'],
        'Other': [] // Shows all technicians
    };

    useEffect(() => {
        fetchUsers();
        if (isEdit) {
            fetchTeam();
        }
    }, [id]);

    // Filter users when team type changes
    useEffect(() => {
        filterUsersByTeamType();
    }, [formData.type, users]);

    const fetchTeam = async () => {
        try {
            const data = await teamService.getById(id);
            setFormData({
                name: data.name,
                type: data.type,
                description: data.description || '',
                teamLead: data.teamLead?._id || '',
                members: data.members?.map((m) => m._id) || [],
                specialization: data.specialization?.join(', ') || '',
            });
        } catch (error) {
            toast.error('Failed to fetch team');
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await authService.getUsers();
            const technicians = data.filter((u) => u.role === 'Technician' || u.role === 'Manager');
            setUsers(technicians);
        } catch (error) {
            console.error('Failed to fetch users');
        }
    };

    const filterUsersByTeamType = () => {
        const relevantDepartments = teamTypeDepartmentMapping[formData.type] || [];

        if (relevantDepartments.length === 0) {
            // For 'Other' type, show all technicians
            setFilteredUsers(users);
        } else {
            // Filter users by departments that match the team type
            const filtered = users.filter(user =>
                relevantDepartments.some(dept =>
                    user.department && user.department.toLowerCase().includes(dept.toLowerCase())
                )
            );
            setFilteredUsers(filtered);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => {
            const updated = { ...prev, [name]: value };

            // Reset members when team type changes
            if (name === 'type') {
                updated.members = [];
                updated.teamLead = '';
            }

            return updated;
        });
    };

    const handleMemberToggle = (userId) => {
        setFormData(prev => {
            const isSelected = prev.members.includes(userId);
            return {
                ...prev,
                members: isSelected
                    ? prev.members.filter(id => id !== userId)
                    : [...prev.members, userId]
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const submitData = {
            ...formData,
            specialization: formData.specialization
                .split(',')
                .map((s) => s.trim())
                .filter((s) => s),
        };

        try {
            if (isEdit) {
                await teamService.update(id, submitData);
                toast.success('Team updated successfully');
            } else {
                await teamService.create(submitData);
                toast.success('Team created successfully');
            }
            navigate('/teams');
        } catch (error) {
            console.error('Team operation error:', error);
            console.error('Error response:', error.response);

            const errorMessage = error.response?.data?.message || error.message || 'Operation failed';
            toast.error(errorMessage);

            // Show additional alert for debugging authorization issues
            if (error.response?.status === 403) {
                alert(`Permission Denied: ${errorMessage}\n\nPlease login as a Manager to create or edit teams.`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 style={{ marginBottom: '24px', fontSize: '28px' }}>
                {isEdit ? 'Edit Team' : 'Add New Team'}
            </h1>

            <Card>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                        <div className="form-group">
                            <label htmlFor="name">Team Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="type">Team Type *</label>
                            <select
                                id="type"
                                name="type"
                                className="form-control"
                                value={formData.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="Mechanics">Mechanics</option>
                                <option value="Electricians">Electricians</option>
                                <option value="IT Support">IT Support</option>
                                <option value="HVAC">HVAC</option>
                                <option value="Plumbing">Plumbing</option>
                                <option value="General">General</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="teamLead">Team Lead</label>
                            <select
                                id="teamLead"
                                name="teamLead"
                                className="form-control"
                                value={formData.teamLead}
                                onChange={handleChange}
                            >
                                <option value="">No Lead</option>
                                {filteredUsers.map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {user.name} ({user.role}) - {user.department || 'No Dept'}
                                    </option>
                                ))}
                            </select>
                            {filteredUsers.length === 0 && (
                                <small style={{ color: '#856404', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                    No matched technicians available for this team type
                                </small>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="specialization">Specializations (comma-separated)</label>
                            <input
                                type="text"
                                id="specialization"
                                name="specialization"
                                className="form-control"
                                value={formData.specialization}
                                onChange={handleChange}
                                placeholder="e.g., Welding, AC Repair, Network Setup"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className="form-control"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600' }}>
                            Team Members ({formData.members.length} selected)
                            <span style={{ fontSize: '12px', fontWeight: 'normal', marginLeft: '8px', color: '#666' }}>
                                {filteredUsers.length > 0
                                    ? `Showing ${filteredUsers.length} matched technician(s) for ${formData.type}`
                                    : 'No matching technicians found for this team type'}
                            </span>
                        </label>

                        {filteredUsers.length === 0 ? (
                            <div style={{
                                padding: '20px',
                                backgroundColor: '#fff3cd',
                                border: '1px solid #ffc107',
                                borderRadius: '4px',
                                color: '#856404'
                            }}>
                                <strong>No matching technicians found.</strong>
                                <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
                                    There are no users with departments matching "{formData.type}".
                                    You can either:
                                </p>
                                <ul style={{ margin: '8px 0 0 20px', fontSize: '14px' }}>
                                    <li>Change the team type to match available departments</li>
                                    <li>Add users with relevant departments first</li>
                                    <li>Select "Other" team type to see all technicians</li>
                                </ul>
                            </div>
                        ) : (
                            <div style={{
                                maxHeight: '300px',
                                overflowY: 'auto',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                padding: '12px',
                                backgroundColor: '#f8f9fa'
                            }}>
                                {filteredUsers.map((user) => (
                                    <div
                                        key={user._id}
                                        style={{
                                            padding: '10px 12px',
                                            marginBottom: '8px',
                                            backgroundColor: formData.members.includes(user._id) ? '#e7f3ff' : 'white',
                                            border: '1px solid',
                                            borderColor: formData.members.includes(user._id) ? '#2196F3' : '#ddd',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px'
                                        }}
                                        onClick={() => handleMemberToggle(user._id)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.members.includes(user._id)}
                                            onChange={() => handleMemberToggle(user._id)}
                                            style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: '600', color: '#333' }}>
                                                {user.name}
                                            </div>
                                            <div style={{ fontSize: '13px', color: '#666', marginTop: '2px' }}>
                                                <span style={{
                                                    display: 'inline-block',
                                                    padding: '2px 8px',
                                                    backgroundColor: user.role === 'Manager' ? '#4CAF50' : '#2196F3',
                                                    color: 'white',
                                                    borderRadius: '3px',
                                                    marginRight: '8px',
                                                    fontSize: '11px'
                                                }}>
                                                    {user.role}
                                                </span>
                                                {user.department && (
                                                    <span>
                                                        📁 {user.department}
                                                    </span>
                                                )}
                                                {user.phone && (
                                                    <span style={{ marginLeft: '8px' }}>
                                                        📞 {user.phone}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : isEdit ? 'Update Team' : 'Create Team'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/teams')}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default TeamForm;
