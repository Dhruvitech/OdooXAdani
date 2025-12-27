import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1 style={{ marginBottom: '24px', fontSize: '28px' }}>
                Welcome, {user?.name}! 👋
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                <Card>
                    <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '8px' }}>
                        Total Equipment
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary)' }}>
                        0
                    </div>
                </Card>

                <Card>
                    <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '8px' }}>
                        Active Requests
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning)' }}>
                        0
                    </div>
                </Card>

                <Card>
                    <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '8px' }}>
                        Completed
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success)' }}>
                        0
                    </div>
                </Card>

                <Card>
                    <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '8px' }}>
                        Maintenance Teams
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--secondary)' }}>
                        0
                    </div>
                </Card>
            </div>

            <Card title="Quick Actions">
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button className="btn btn-primary">+ New Equipment</button>
                    <button className="btn btn-primary">+ New Request</button>
                    <button className="btn btn-secondary">View Calendar</button>
                    <button className="btn btn-secondary">View Kanban</button>
                </div>
            </Card>

            <div style={{ marginTop: '32px' }}>
                <Card title="Recent Activity">
                    <div style={{ color: 'var(--text-light)', textAlign: 'center', padding: '40px 0' }}>
                        No recent activity
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
