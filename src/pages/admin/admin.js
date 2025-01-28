import React, { useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const Home = () => {
    const [activeMenu, setActiveMenu] = useState(null); // Track active menu
    const navigate = useNavigate();

    const HandleLogout = () => {
        const { logout } = useAuth(); 
        logout();
         // Redirect to login page
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-left">
                    <div className="dropdown">
                        <h4 onClick={() => handleMenuClick('academicInfo')}>
                            Academic Info ▾
                        </h4>
                        {activeMenu === 'academicInfo' && (
                            <div className="dropdown-menu">
                           
                                <div onClick={()=>navigate('/admin/academic-profiles')}>Academic Profiles</div>
                            </div>
                            
                        )}
                    </div>

                    <div className="dropdown">
                        <h4 onClick={() => handleMenuClick('courses')}>
                            Courses ▾
                        </h4>
                        {activeMenu === 'courses' && (
                            <div className="dropdown-menu">
                                <div onClick={()=>navigate('/admin/courses-offered-for-enrollment')} >Courses Offered for Enrollment</div>
                                <div onClick={()=>navigate('/admin/courses-offered-for-offering')}>Courses Available for Offering</div>
                            </div>
                        )}
                    </div>
                
                    
                    <div className="dropdown">
                        <h4 onClick={()=>navigate('/admin/departments')}>
                            Departments
                        </h4>
                    </div>
                    
                </div>

                <button className="logout-button" onClick={HandleLogout}>
                    <FaSignOutAlt size={20} />
                </button>
            </nav>

       
        </div>
    );
}

export default Home;
