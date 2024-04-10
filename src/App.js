import logo from './logo.svg';
import './App.css';
import { Formik } from 'formik';
import axios, {isCancel, AxiosError} from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { useDispatch,useSelector} from 'react-redux';
import  {addUser, getAllUsers,deleteUser}  from './store/userSlice';
import { Spinner } from './components/Spinner';
function App() {
  const [data,setData]= useState([])
  const [name,setName]= useState('')
  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')
  const dispatch= useDispatch()
  const users = useSelector(state=> state.users.users)
  const usersDataFectchingStatus = useSelector(state=> state.users.isLoading)
  useEffect(()=>{
    dispatch(getAllUsers())
  },[dispatch])
  const handleEdit = (data) =>{
    setName(data.name)
    setEmail(data.email)
    setPassword(data.password)
  }
  let content
  if(usersDataFectchingStatus == true){
    content = <Spinner text="Loading..."/>
  }else{
    content = <section className='s2'>
    <div className='listView'>
      <table className='react-tbl'>
      <tr className='tbl-row' >
              <th className='tbl-heading' >Name</th>
              <th className='tbl-heading'>Email</th>
              <th className='tbl-heading'>Password</th>
              <th className='tbl-heading'>Action</th>
        </tr>
          {users.map((item,index)=>{return(
            <TableData item={item} editButtonHandler={handleEdit} />
          )})}
      </table>
    </div>
</section>
  } 
  return (
    <div className="App">
    <div className='tbl-top-heading'>
      <p>List Of User Details</p>
        <Formik
        enableReinitialize={true}
        initialValues={{ name:name,email: email, password: password }}
         onSubmit={(values, { setSubmitting,resetForm }) => {
          console.log(values,"values")
          dispatch(addUser(values))
          resetForm()
          setTimeout(() => {
            //alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              className='inputbox'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && errors.name}
            <input
              type="text"
              name="email"
              className='inputbox'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              className='inputbox'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting} className='btn'>
              Add Users
            </button>
          </form>
        )}
        </Formik>
      
    </div>
    {content}
    
    </div>
  );
}
const TableData =({item,editButtonHandler})=>{
  const dispatch= useDispatch()
  return(
    <tr className='tbl-row' key={item._id}>
        <td className='tbl-data' >{item.name}</td>
        <td className='tbl-data' >{item.email}</td>
        <td className='tbl-data'>{item.password}</td>
        <td className='tbl-data'><button className='btn' onClick={()=>{
          dispatch(deleteUser(item._id))
        }}>Delete</button></td>
    </tr>
  )
}
export default App;
