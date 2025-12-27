const Equipment = require('../models/Equipment');
const MaintenanceRequest = require('../models/MaintenanceRequest');
const MaintenanceTeam = require('../models/MaintenanceTeam');

// @desc    Get dashboard statistics
// @route   GET /api/stats/dashboard
// @access  Private
exports.getDashboardStats = async (req, res) => {
    try {
        // Get total equipment count
        const totalEquipment = await Equipment.countDocuments();

        // Get active requests count (New or In Progress)
        const activeRequests = await MaintenanceRequest.countDocuments({
            status: { $in: ['New', 'In Progress'] }
        });

        // Get completed requests count (Repaired status)
        const completedRequests = await MaintenanceRequest.countDocuments({
            status: 'Repaired'
        });

        // Get total maintenance teams count
        const totalTeams = await MaintenanceTeam.countDocuments({
            isActive: true
        });

        // Return aggregated statistics
        res.json({
            success: true,
            data: {
                totalEquipment,
                activeRequests,
                completedRequests,
                totalTeams
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard statistics',
            error: error.message
        });
    }
};
