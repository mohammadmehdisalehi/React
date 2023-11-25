import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [userDataList, setUserDataList] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState('');
  const [userx, setUsers] = useState([]);

  const fetchDataAndSaveToLocalStorage = useCallback(async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const users = response.data;
      setUserDataList(users);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);

  const deleteUserById = () => {
    // Ensure deleteUserId is not empty
    if (!deleteUserId) {
      alert('Please enter a valid user ID to delete.');
      return;
    }

    // Retrieve existing user data from local storage
    const existingUserData = JSON.parse(localStorage.getItem('userData')) || [];

    // Check if the user with the specified userId exists
    const userToDelete = existingUserData.find((user) => user.id === deleteUserId);

    if (!userToDelete) {
      alert('User with the specified ID not found.');
      return;
    }

    // Filter out the user with the specified userId
    const updatedUserData = existingUserData.filter((user) => user.idd !== deleteUserId);

    // Save the updated user data array back to local storage
    localStorage.setItem('userData', JSON.stringify(updatedUserData));

    // Update the state to re-render the component with the new user data
    setUserDataList(updatedUserData);

    // Clear the deleteUserId input
    setDeleteUserId('');
  };

  const showUserList = useCallback(() => {
    const users = JSON.parse(localStorage.getItem('userData')) || [];
    
    console.log(userDataList);
    setUsers(users);
    console.log(userx);
  }, [userDataList]);

  useEffect(() => {
    fetchDataAndSaveToLocalStorage();
  }, [fetchDataAndSaveToLocalStorage]);

  return (
    <div>
      <h1 className=' font-bold '>Home Page</h1>
      
      <div>
        <label htmlFor="deleteUserId">Delete User ID :</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="deleteUserId"
          value={deleteUserId}
          onChange={(e) => setDeleteUserId(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-700 mt-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" onClick={deleteUserById}>Delete User</button>
      </div>
      <div className='flex flex-col justify-center'>
      <button className=" bg-blue-500 hover:bg-blue-700 text-white mt-5  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " onClick={showUserList}>Show User List</button>
      {userDataList.map((user) => (
        <div className='border border-solid' key={user.id}>
          <p>{user.username}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default HomePage;