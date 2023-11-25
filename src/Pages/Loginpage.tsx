import React, {type FC} from "react";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Homepage from "./Homepage";

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm = ({ onLogin }) => {
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // const onSubmit = (data) => {
  //   // Check login credentials in local storage
  //   const existingUserData = JSON.parse(localStorage.getItem('userData')) ;
  //   const [uData]=existingUserData;
  //   if (existingUserData && uData.email == data.email && uData.password == data.password) {
      
  //     onLogin(); 
      
  //     // Redirect to home page or perform other actions on successful login
  //   } else {
  //     // Display error if login fails
  //     alert('Invalid email or password');
  //   }
  // };
// const [loginError, setLoginError] = React.useState('');
const [loginError, setLoginError]= React.useState({
emailError:"",
passwordError:""
})
  const onSubmit = (data) => {
   
    const existingUserData = JSON.parse(localStorage.getItem('userData'))  ;
    const uData = existingUserData.map(user => user.email);
    const pData= existingUserData.map(user => user.password);
    if(existingUserData && uData.includes(data.email) && pData.includes(data.password)) {
      onLogin(); 
    } else if(!uData.includes(data.email)) {

      setLoginError({
        ...loginError,
        emailError:"Invalid Email",
      });
    }else if(!pData.includes(data.password)) {
       
        setLoginError({
            ...loginError,
        passwordError:"Invalid password"});
      }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <input {...field} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />}
        />
        <p className="text-red-500 text-xs italic">{errors.email?.message || loginError.emailError}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => <input type="password" {...field} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />}
        />
        <p className="text-red-500 text-xs italic">{errors.password?.message || loginError.passwordError}</p>
      </div>

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Login</button>
    </form>
  );
};
const LoginPage: FC = () => {
    const [isLoggedIn, setLoggedIn] = React.useState(false);
    const handleLogin = () => {
      setLoggedIn(true);
    };
    return (
<div>
{!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : ( <Homepage />
      )}
</div>

    )
}
export default LoginPage;
