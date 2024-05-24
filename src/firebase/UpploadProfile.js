import { ref, uploadBytes } from "firebase/storage";
import { storage, fireDB, auth } from "./FirebaseConfig"; // Import Firebase configuration
import { updateDoc, doc } from "firebase/firestore";

export const uploadProfile = async (profileImage, name, email) => {
    try {
        // Upload profile image to Firebase Storage
        const storageRef = ref(storage, `profileImages/${profileImage.name}`);
        await uploadBytes(storageRef, profileImage);

        // Update user's profile information in Firestore
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(fireDB, "users", user.uid);
            await updateDoc(userDocRef, {
                name: name,
                email: email,
                currentPassword: currentPassword,
                newPassword: newPassword,
                profileImage: profileImage
            });
        } else {
            throw new Error("User not found");
        }

        return true; // Return true if successful
    } catch (error) {
        console.error("Error uploading profile image:", error);
        return false; // Return false if an error occurred
    }
};
