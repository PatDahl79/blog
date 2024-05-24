import React, { useContext, useState } from "react";
import { Card, CardHeader, CardBody, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/FirebaseConfig";
import myContext from "../../../context/myContext";

export default function UserRegister() {
    const context = useContext(myContext);
    const { mode } = context;
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { email, password, confirmPassword } = userData;

    const changeInputHandle = (e) => {
        setUserData(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        });
    };

    //* Register Function
    const register = async (e) => {
        e.preventDefault();
        if (!email || !password || !confirmPassword) {
            return toast.error("Fill all required fields");
        }
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            toast.success('Registration Success');
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/userdashboard');
        } catch (error) {
            toast.error('Registration Failed');
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            {/* Card  */}
            <Card
                className="w-full max-w-[24rem]"
                style={{
                    background: mode === 'dark'
                        ? 'rgb(30, 41, 59)'
                        : 'rgb(226, 232, 240)'
                }}
            >
                {/* CardHeader */}
                <CardHeader
                    color="blue"
                    floated={false}
                    shadow={false}
                    className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                    style={{
                        background: mode === 'dark'
                            ? 'rgb(226, 232, 240)'
                            : 'rgb(30, 41, 59)'
                    }}
                >
                    <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-2 text-white">
                        <div className="flex justify-center">
                            {/* Image  */}
                            <img src="https://cdn-icons-png.flaticon.com/128/149/149071.png" className="h-20 w-20" alt="register icon" />
                        </div>
                    </div>

                    {/* Top Heading  */}
                    <Typography variant="h4" style={{
                        color: mode === 'dark'
                            ? 'rgb(30, 41, 59)'
                            : 'rgb(226, 232, 240)'
                    }}>
                        Register
                    </Typography>
                </CardHeader>

                {/* CardBody */}
                <CardBody>
                    <form className="flex flex-col gap-4" onSubmit={register}>
                        {/* Email Input  */}
                        <div>
                            <Input
                                type="email"
                                label="Email"
                                name="email"
                                value={email}
                                onChange={changeInputHandle}
                            />
                        </div>
                        {/* Password Input  */}
                        <div>
                            <Input
                                type="password"
                                label="Password"
                                name="password"
                                value={password}
                                onChange={changeInputHandle}
                            />
                        </div>
                        {/* Confirm Password Input */}
                        <div>
                            <Input
                                type="password"
                                label="Confirm Password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={changeInputHandle}
                            />
                        </div>
                        {/* Register Button  */}
                        <Button
                            type="submit"
                            style={{
                                background: mode === 'dark'
                                    ? 'rgb(226, 232, 240)'
                                    : 'rgb(30, 41, 59)',
                                color: mode === 'dark'
                                    ? 'rgb(30, 41, 59)'
                                    : 'rgb(226, 232, 240)'
                            }}>
                            Register
                        </Button>
                    </form>

                    <small>Already have an account? <Link to={'/userLogin'}>Login</Link></small>
                </CardBody>
            </Card>
        </div>
    );
}
