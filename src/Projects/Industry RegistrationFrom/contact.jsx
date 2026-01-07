import { useState } from "react";
import { IoIosContact } from "react-icons/io";

export function Contactfrom() {
  const [show,setShow]=useState(true)
  const[submit,setSubmit]=useState(false)
  const [user, setUser] = useState({
    yourname: "",
    phone: "",
    email: "",
    companyname: "",
  });
  const handel = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    
  };
  const handelSubmit = (e) => {
     e.preventDefault();
    console.log(user);
    
  };

  const handelShow = ()=>{
    setShow(!show)
    setSubmit(!submit)
    alert("Are you sure you want to submit?");
    setUser({
    yourname: "",
    phone: "",
    email: "",
    companyname: "",
  });
  }
  const submitButton = ()=>{
     setSubmit(!submit)
     setShow(true)
     
    
  }
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center ">
      <div className="  p-10 bg-white w-100 h-fit mt-10 shadow-2xl transitio duration-1000 ease-in-out rounded-2xl">
        <div className="flex justify-center text-2xl font-bold border-l-4 hover:bg-pink-600 transition ease-in-out duration-500 bg-black mb-2 text-white rounded-[3px] ">
          <h1>Contact From </h1>
          <h1 className="text-4xl text-sky-500">
            <IoIosContact />
          </h1>
        </div>
        <form onSubmit={handelSubmit}>
          <label className="font-bold font-serif" htmlFor="">
            Your Name
          </label>
          <input
            onChange={handel}
            value={user.yourname}
            className="w-80 bg-gray-100 p-1 mb-2"
            type="text"
            name="yourname"
            required
          />
          <label className={` ${user.yourname==="" ?"hidden":"block"} font-bold font-serif`} htmlFor="">
            Phone No
          </label>
          <input
            onChange={handel}
            value={user.phone}
            className={` ${user.yourname==="" ?"hidden":"block"} w-80 bg-gray-100 p-1 mb-2`}
            type="number"
            name="phone"
             minLength={10}
            maxLength={10}
            
          />
          <label className={` ${user.phone==="" ?"hidden":"block"} font-bold font-serif`} htmlFor="">
            Email
          </label>
          <input
            onChange={handel}
            value={user.email}
            className={`${user.phone==="" ?"hidden":"block"}  w-80 bg-gray-100 p-1 mb-2`}
            type="email"
            name="email"
            required
           
          />
          <label className={` ${user.email==="" ?"hidden":"block"} font-bold font-serif`}htmlFor="">
            Company Name
          </label>
          <input
            onChange={handel}
            value={user.companyname}
            className={` ${user.email==="" ?"hidden":"block"} font w-80 bg-gray-100 p-1 mb-2`}
            type="text"
            name="companyname"
            required
          />

          <button onClick={submitButton}  className={`${user.companyname==="" ?"hidden":"block"} bg-blue-500 hover:bg-blue-600 text-white font-semibold w-full p-1 rounded-[5px]`}>
             {submit ? "Edit Details" : "Preview Submission"}
          </button>
        </form>
        
         <div className={`${submit===true?"flex flex-col":"hidden"} mt-5  text-[20px] bg-gray-100 p-2 rounded-xs w-fit `}>
          <h1 className="font-bold ">Check Your Data</h1>
          <div>Name: {user.yourname}</div>
          <div>Email:{user.email} </div>
          <div>Phone No :{user.phone}</div>
          <div>Compnay:{user.companyname}</div>
          <button onClick={handelShow}  className={`${show===false ?"hidden":"block"} bg-red-500 hover:bg-red-600 text-white font-semibold w-full p-1 mt-5 rounded-[5px] `}>
            Final-Submit
          </button>
        </div>
      </div>
   
    </div>
  );
}
