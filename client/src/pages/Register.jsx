import React, { useState } from "react";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addusers } from "../features/userSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password || !name || !confPassword) {
        toast.error("fill all inputs");
        return;
      }

      if (password.length < 5) {
        toast.error("Password should be at least 5 characters long");
        return;
      }

      // Check if the provided email and password match any user's credentials
      if (password !== confPassword) {
        toast.error("password doen't match");
        return;
      }

      dispatch(addusers({ name, email, password }));
      toast.success("Registered Successfully !!");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="bg-primaryColor">
        <h2 className="m-10 text-xl text-white">
          {" "}
          <span className="font-semibold">Task</span>Manager
        </h2>
        <img className="m-auto mt-20 w-[60%]" src="/Sign up-pana.png" alt="" />
      </div>
      <div>
        <div className="mx-auto my-40 w-[50%]">
          <form onSubmit={handleRegister}>
            <h2 className="text-center text-4xl font-bold">Account Signup</h2>
            <p className="mt-4 text-xl text-slate-400">
              Become a member and enjoy exclusive promotions
            </p>
            <div className="mt-8 space-y-3">
              <Input
                labelName={"Full Name"}
                id={"name"}
                value={name}
                inputType={"text"}
                setValue={setName}
                // placeholder={"task name"}
              />
              <Input
                labelName={"Email Address"}
                id={"email"}
                value={email}
                inputType={"email"}
                setValue={setEmail}
                // placeholder={"task name"}
              />
              <Input
                labelName={"Password"}
                id={"password"}
                value={password}
                inputType={"password"}
                setValue={setPassword}
                // placeholder={"task name"}
              />
              <Input
                labelName={"Confirm Password"}
                id={"confPassword"}
                value={confPassword}
                inputType={"password"}
                setValue={setConfPassword}
                // placeholder={"task name"}
              />
            </div>
            <button className="mb-4 mt-10 w-full rounded-md border bg-primaryColor py-3 text-white hover:bg-blue-600">
              {" "}
              Signup
            </button>
            <Link to={"/login"} className="text-center">
              have an account ?{" "}
              <span className="text-primaryColor hover:text-blue-600">
                {" "}
                Login here
              </span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;