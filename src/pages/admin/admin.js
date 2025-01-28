import React, { useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

function Home() {
    const [activeMenu, setActiveMenu] = useState(null); // Track active menu
    const navigate = useNavigate();
    const { logout } = useAuth(); // Get logout function from AuthContext
    const { token, role,email} = useAuth();
      
      console.log(role);
      console.log(email);
    function HandleLogout() {
        logout(); // Perform logout
        navigate('/'); // Redirect to login page
    }

    function handleMenuClick(menu) {
        setActiveMenu(activeMenu === menu ? null : menu); // Toggle menu state
    }

    return (
        <div>
            <div className="navbar">
                <div className="navbar-left">
                    <div className="admin-dropdown">
                        <h4 onClick={() => handleMenuClick('academicInfo')}>
                            Academic Info ▾
                        </h4>
                        {activeMenu === 'academicInfo' && (
                            <div className="dropdown-menu">
                                <div onClick={() => navigate('/admin/academic-profiles')}>Academic Profiles</div>
                            </div>
                        )}
                    </div>

                    <div className="admin-dropdown">
                        <h4 onClick={() => handleMenuClick('courses')}>
                            Courses ▾
                        </h4>
                        {activeMenu === 'courses' && (
                            <div className="dropdown-menu">
                                <div onClick={() => navigate('/admin/courses')}>Courses</div>
                                <div onClick={() => navigate('/admin/offerings')}>Offerings</div>
                            </div>
                        )}
                    </div>

                    <div className="admin-dropdown">
                        <h4 onClick={() => navigate('/admin/departments')}>
                            Departments
                        </h4>
                    </div>
                </div>

                <button className="logout-button" onClick={HandleLogout}>
                    <FaSignOutAlt size={20} />
                </button>
            </div>
        </div>
    );
}

export default Home;
