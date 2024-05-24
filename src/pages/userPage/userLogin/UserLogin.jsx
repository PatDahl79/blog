import React, { useContext, useState } from "react";
import { Card, CardHeader, CardBody, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/FirebaseConfig";
import myContext from "../../../context/myContext";

export default function UserLogin() {
    const context = useContext(myContext);
    const { mode } = context;
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = userData;

    const changeInputHandle = (e) => {
        setUserData(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        });
    };

    //* Login Function
    const login = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return toast.error("Fill all required fields");
        }
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success('Login Success');
            localStorage.setItem('admin', JSON.stringify(result));
            navigate('/userdashboard');
        } catch (error) {
            toast.error('Login Failed');
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
                            <img src="https://cdn-icons-png.flaticon.com/128/727/727399.png" className="h-20 w-20" alt="login icon" />
                        </div>
                    </div>

                    {/* Top Heading  */}
                    <Typography variant="h4" style={{
                        color: mode === 'dark'
                            ? 'rgb(30, 41, 59)'
                            : 'rgb(226, 232, 240)'
                    }}>
                        Login
                    </Typography>
                </CardHeader>

                {/* CardBody */}
                <CardBody>
                    <form className="flex flex-col gap-4" onSubmit={login}>
                        {/* First Input  */}
                        <div>
                            <Input
                                type="email"
                                label="Email"
                                name="email"
                                value={email}
                                onChange={changeInputHandle}
                            />
                        </div>
                        {/* Second Input  */}
                        <div>
                            <Input
                                type="password"
                                label="Password"
                                name="password"
                                value={password}
                                onChange={changeInputHandle}
                            />
                        </div>
                        {/* Login Button  */}
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
                            Login
                        </Button>
                    </form>

                    <small>Don't have an account? <Link to={'/userRegister'}>Register</Link></small>
                </CardBody>
            </Card>
        </div>
    );
}
