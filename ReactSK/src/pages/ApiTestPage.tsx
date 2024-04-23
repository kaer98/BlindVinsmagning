// import { useEffect, useState } from "react";
// import { Button } from "reactstrap";
// import axios from "axios";

// function ApiTestPage() {
//     const [displayNameInput, setDisplayNameInput] = useState('');
//     const [userNameInput, setUserNameInput] = useState('');
//     const [users, setUsers] = useState([]);
//     const [error, setError] = useState('');

//     // Function to handle POST request to create a new user

//     //Helt væk og skal fixes
//     const postUser = () => {
//         axios.post("http://localhost:3000/api/users/", {
        
//         })
//         .then(response => {
//             console.log("User created successfully:", response.data);
//             // Optionally, you can update the games state with the newly created user
//             // setUsers(prevGames => [...prevGames, response.data]);
//         })
//         .catch(error => {
//             console.error("Error creating user:", error);
//             setError("An error occurred while creating the user.");
//         });
        
//     };
//     function deleteUser(userId) {
//         axios.delete(`http://localhost:3000/users/remove/${userId}`)
//             .then(response => {
//                 console.log('User deleted successfully');

//                 //Fetch new updated list from API
//                 axios.get(`http://localhost:3000/users`)
//                 .then(response => {
//                     setUsers(response.data);
//                 });

//             })
//             .catch(error => {
//                 console.error('Error deleting user:', error);
//             });
//     }
    

//     // Fetch games data on component mount
//     useEffect(() => {
//         axios.get("http://localhost:3000/users")
//             .then(res => {
//                 // Ensure that the data received is an array
//                 if (Array.isArray(res.data)) {
//                     setUsers(res.data);
//                 } else {
//                     setError("Received data is not an array.");
//                 }
//             })
//             .catch(error => {
//                 console.error("Error fetching data:", error);
//                 setError("An error occurred while fetching data.");
//             });
//     }, []);

//     return (
//         <div className="flex flex-col justify-center items-center">
//             <h1 className="text-3xl mt-2">Velkommen til API Tests 😁</h1>
//             {/* Other JSX code */}
//             <h1>API Testing</h1>
//             <input
//                 type="text"
//                 value={displayNameInput}
//                 onChange={(e) => setDisplayNameInput(e.target.value)}
//                 placeholder="Enter Display Name"
//             />
//             <input
//                 type="text"
//                 value={userNameInput}
//                 onChange={(e) => setUserNameInput(e.target.value)}
//                 placeholder="Enter User Name"
//             />
//             <Button onClick={postUser}>Fetch</Button>
//             <ul className="grid grid-cols-3">
//                 {error && <p>{error}</p>}

//                 {users.map(user => (
//                     <li key={user._id} >
//                         <div className=" bg-orange-300 m-1 rounded-2xl">
//                         <strong>Username:</strong> {user.userName}<br />
//                         <strong>Display Name:</strong> {user.displayName}<br /><br />
//                         <Button className="m-2" onClick={() => deleteUser(user.id)}>Delete</Button>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default ApiTestPage;
