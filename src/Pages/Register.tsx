import React, {type FC} from "react";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    lastName: yup.string().required('Last Name is required'),
    age: yup.number().positive('Age must be a positive number').required('Age is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Repeat Password is required'),
  });
  
  const RegisterForm = () => {
    const { handleSubmit, control, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
    });
  
    const onSubmit = (data) => {
      // Handle form submission
      console.log(data);
      localStorage.setItem('userData', JSON.stringify(data));
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
          <Controller
            name="age"
            control={control}
            render={({ field }) => <input type="number" {...field} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />}
          />
          <p className="text-red-500 text-xs italic">{errors.age?.message}</p>
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <input {...field} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />}
          />
          <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
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