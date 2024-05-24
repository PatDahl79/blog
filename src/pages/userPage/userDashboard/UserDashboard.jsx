import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../../Components/layout/Layout';
import myContext from '../../../context/myContext';
import { Button } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase/FirebaseConfig';
import { getDoc, doc } from "firebase/firestore";
import { uploadProfile } from "../../../firebase/UpploadProfile"; 

function UserDashboard() {
    const context = useContext(myContext);
    const { mode, getAllBlog } = context;
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        image: '', // Ensure you have an image property in userInfo
        totalBlogs: 0
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserInfo({
                name: user.displayName || 'User',
                profileImage: user.profileImage,
                email: user.email,
                totalBlogs: getAllBlog ? getAllBlog.filter(blog => blog.userId === user.uid).length : 0
            });
        }
    }, [getAllBlog]);

    //* Logout Function 
    const logout = () => {
        auth.signOut().then(() => {
            localStorage.clear();
            navigate('/');
        });
    };

    const fetchUserProfile = async () => {
        const user = auth.currentUser;
        if (user) {
            const docRef = doc(fireDB, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setUserInfo({
                    name: userData.name || 'User',
                    email: userData.email,
                    totalBlogs: userData.totalBlogs || 0
                });
            }
        }
    };

    // Call fetchUserProfile when the component mounts
    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <Layout>
            <div className="py-10">
                <div className="flex flex-wrap justify-start items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
                    <div className="left">
                        <img
                            className="w-40 h-40 object-cover rounded-full border-2 border-pink-600 p-1"
                            src={userInfo.profileImage} 
                            alt="profile"
                        />
                    </div>
                    <div className="right">
                        <h1 className="text-center font-bold text-2xl mb-2" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                            {userInfo.name}
                        </h1>
                        <h2 style={{ color: mode === 'dark' ? 'white' : 'black' }} className="font-semibold">
                            {userInfo.email}
                        </h2>
                        <h2 style={{ color: mode === 'dark' ? 'white' : 'black' }} className="font-semibold">
                            <span>Total Blogs: </span>{userInfo.totalBlogs}
                        </h2>
                        <div className="flex gap-2 mt-2">
                            <Link to="/userCreateProfile">
                                <div className="mb-2">
                                    <Button
                                        style={{
                                            background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                                            color: mode === 'dark' ? 'black' : 'white'
                                        }}
                                        className="px-8 py-2"
                                    >
                                        Update Profile
                                    </Button>
                                </div>
                            </Link>
                            <Link to="/userCreateblog">
                                <div className="mb-2">
                                    <Button
                                        style={{
                                            background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                                            color: mode === 'dark' ? 'black' : 'white'
                                        }}
                                        className="px-8 py-2"
                                    >
                                        Create Blog
                                    </Button>
                                </div>
                            </Link>
                            <div className="mb-2">
                                <Button
                                    onClick={logout}
                                    style={{
                                        background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                                        color: mode === 'dark' ? 'black' : 'white'
                                    }}
                                    className="px-8 py-2"
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Line */}
                <hr className={`border-2 ${mode === 'dark' ? 'border-gray-300' : 'border-gray-400'}`} />

                {/* Table */}
                <div className="container mx-auto px-4 max-w-7xl my-5">
                    {/* Your table code goes here */}
                </div>
            </div>
        </Layout>
    );
}

export default UserDashboard;
