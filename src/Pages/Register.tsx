import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useId } from 'react-id-generator';


const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  lastName: yup.string().required('Last Name is required'),
  gender: yup.string().required('Gender is required'),
  address: yup.string().required('Address is required'),
  phoneNumber: yup.string().matches(/^0\d{10}$/, 'Invalid phone number').required('Phone Number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Repeat Password is required'),
 
});
  
 
  const RegisterForm = () => {
    const navigate = useNavigate();
    const { handleSubmit, control, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
    });
    const [userId] = useId();
    const id=userId;
    const [emailError, setEmailError] = useState('');

    const onSubmit = (data) => {
      const existingUserData = JSON.parse(localStorage.getItem('userData')) || [];
      const emailExists = existingUserData.some(user => user.email === data.email);
  
      if (emailExists) {
        setEmailError('Email already exists. Please use a different email.');
        return;
      }
  
      // Reset the email error if it was previously set
      setEmailError('');

      console.log(data);
      const userData = { ...data, id };
      saveUserData(userData);
  

    navigate('/login');
    };
  
    const saveUserData = (userData) => {

      const existingUserData = JSON.parse(localStorage.getItem('userData')) || [];
    
      const userDataArray = Array.isArray(existingUserData) ? existingUserData : [];
  
      const updatedUserData = [...userDataArray, userData];
   
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
    };
 
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <input {...field} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />}
          />
          <p className="text-red-500 text-xs italic">{errors.name?.message}</p>
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => <input {...field} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />}
          />
          <p className="text-red-500 text-xs italic">{errors.lastName?.message}</p>
        </div>
  
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <select {...field} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          )}
        />
        <p className="text-red-500 text-xs italic">{errors.gender?.message}</p>
      </div>
  
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
        <Controller
          name="address"
          control={control}
          render={({ field }) => <input {...field} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />}
        />
        <p className="text-red-500 text-xs italic">{errors.address?.message}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => <input {...field} placeholder="09179234563" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />}
        />
        <p className="text-red-500 text-xs italic">{errors.phoneNumber?.message}</p>
      </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <input {...field} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />}
          />
          <p className="text-red-500 text-xs italic">{errors.email?.message || emailError}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => <input type="password" {...field} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />}
          />
          <p className="text-red-500 text-xs italic">{errors.password?.message}</p>
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Repeat Password</label>
          <Controller
            name="repeatPassword"
            control={control}
            render={({ field }) => <input type="password" {...field} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />}
          />
          <p className="text-red-500 text-xs italic">{errors.repeatPassword?.message}</p>
        </div>
  
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Submit</button>
      </form>
    );
  };
     
const RegisterPage: FC = () => {
    return (
        RegisterForm() )
}
export default RegisterPage;