import "./globals.css";
import { Routes, Route } from "react-router-dom";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "./components/ui/toaster";
import {
    Home,
    Explore,
    Saved,
    CreatePost,
    Profile,
    EditPost,
    PostDetails,
    UpdateProfile,
    AllUsers,
  } from "@/_root/pages";

const App = () => {
    return (
        <main className="flex h-screen bg-dark-1">
            <Routes>
                {/* Public Routes */}
                <Route element={<AuthLayout />}>
                    <Route path="sign-in" element={<SigninForm />} />
                    <Route path="sign-up" element={<SignupForm />} />
                </Route>
                {/* Private Routes */}
                <Route element={<RootLayout />}>
                    <Route index element={<Home />}/>
                    <Route path="/explore" element={<Explore/>}/>
                    <Route path="/saved" element={<Saved/>}/>
                    <Route path="/all-users" element={<AllUsers/>}/>
                    <Route path="/create-post" element={<CreatePost/>}/>
                    <Route path="/update-post/:id" element={<EditPost/>}/>
                    <Route path="/posts/:id" element={<PostDetails/>}/>
                    <Route path="/profie/:id" element={<Profile/>}/>
                    <Route path="/update-profile/:id" element={<UpdateProfile/>}/>
                </Route>
            </Routes>
            <Toaster/>
        </main>
    )
}

export default App
