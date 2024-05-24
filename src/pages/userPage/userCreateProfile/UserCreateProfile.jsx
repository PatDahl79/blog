import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router";
import { storage, } from "../../../firebase/FirebaseConfig"; // Firebase storage
import { ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";

function UserCreateProfile() {
    const [profileImage, setProfileImage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'profileImage') {
            setProfileImage(e.target.files[0]);
        } else {
            switch (name) {
                case 'name':
                    setName(value);
                    break;
                case 'email':
                    setEmail(value);
                    break;
                case 'currentPassword':
                    setCurrentPassword(value);
                    break;
                case 'newPassword':
                    setNewPassword(value);
                    break;
                case 'confirmNewPassword':
                    setConfirmNewPassword(value);
                    break;
                default:
                    break;
            }
        }
    };

    const uploadProfile = async () => {
        if (!name || !email || !currentPassword || !newPassword || !confirmNewPassword || !profileImage) {
            return toast.error("Please fill all required fields.");
        }

        if (newPassword !== confirmNewPassword) {
            return toast.error("New password and confirm password do not match.");
        }

        try {
            // Upload profile image to Firebase Storage
            const storageRef = ref(storage, `profileImages/${profileImage.name}`);
            await uploadBytes(storageRef, profileImage);

            // Now you can add your logic to update the user's profile details in your database
            // For example, you can use Firestore to update the user's profile information

            toast.success("Profile created/updated successfully!");
            navigate('/userdashboard'); // Redirect to user dashboard
        } catch (error) {
            console.error("Error uploading profile image:", error);
            toast.error("An error occurred while uploading the profile image.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-[24rem]">
                <CardHeader color="blue" floated={false} shadow={false} className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center">
                    <h1 className="text-2xl font-bold">Create Profile</h1>
                </CardHeader>
                <CardBody>
                    <div className="flex flex-col gap-4">
                        <Input type="text" label="Name" name="name" value={name} onChange={handleInputChange} />
                        <Input type="email" label="Email" name="email" value={email} onChange={handleInputChange} />
                        <Input type="password" label="Current Password" name="currentPassword" value={currentPassword} onChange={handleInputChange} />
                        <Input type="password" label="New Password" name="newPassword" value={newPassword} onChange={handleInputChange} />
                        <Input type="password" label="Confirm New Password" name="confirmNewPassword" value={confirmNewPassword} onChange={handleInputChange} />
                        <Input type="file" label="Profile Image" name="profileImage" onChange={handleInputChange} />
                        <Button onClick={uploadProfile}>Save Profile</Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default UserCreateProfile;
