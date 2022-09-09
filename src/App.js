import './App.css';
import React, {useEffect, useState} from 'react';
import NavBar from './NavBar';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import jwt from 'jsonwebtoken'
import JoblyApi from './api/Api'
import LocalStorage from './helpers/LocalStorage';
import Homepage from './Homepage';
import UserContext from './auth/UserContext';
import SignupForm from './auth/SignupForm';
import LoginForm from './auth/LoginForm';
import CompanyPage from './companies/CompanyPage';
import JobPage from './jobs/JobPage';
import ProfileForm from './profiles/ProfileForm';
import CompanyDetail from './companies/CompanyDetail';

export const TOKEN_STORAGE_ID = 'jobly-token'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = LocalStorage(TOKEN_STORAGE_ID)
  const [applicationIds, setApplicationIds] = useState(new Set([]))

  useEffect(function loadCurrentUserInfo() {
    async function getCurrentUser() {
      if(token) {
        try{
          let { username } = jwt.decode(token)
          JoblyApi.token = token
          let currentUser = await JoblyApi.getCurrentUser(username)
          setCurrentUser(currentUser)
        } catch(err) {
          console.error('Can not load current user info', err)
          setCurrentUser(null)
        }
      }
    }
    getCurrentUser()
  }, [token])

  async function signup(data) {
    try{
      let token = await JoblyApi.signup(data)
      setToken(token)
      return { success: true }
    } catch(errors) {
      console.error('signup failed', errors)
      return { success: false, errors}
    }
  }

  async function login(data) {
    try{
      let token = await JoblyApi.login(data)
      setToken(token)
      return { success: true }
    } catch(errors) {
      console.error('login failed', errors)
      return { success: false, errors}
    }
  }

  function logout() {
    setCurrentUser(null)
    setToken(null)
  }

  function hasAppliedToJob(id) {
    return applicationIds.has(id)
  }

  function applyToJob(id) {
    if (hasAppliedToJob(id)) return 
    JoblyApi.applyToJob(currentUser.username, id)
    setApplicationIds(new Set([...applicationIds, id]))
  }

  return (
      <BrowserRouter>
        <UserContext.Provider
          value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}
        >
          <div className="App">
            <NavBar logout={logout}/>
            <div className='pt-5'>
              <Routes>
                <Route exact path='/' element={<Homepage />} />
                <Route exact path='/signup' element={<SignupForm signup={signup}/>} />
                <Route exact path='/login' element={<LoginForm login={login}/>} />
                <Route exact path='/companies' element={<CompanyPage />} />
                <Route exact path='/companies/:handle' element={<CompanyDetail />} />
                <Route exact path='/jobs' element={<JobPage />} />
                <Route exact path='/profile' element={<ProfileForm />} />
              </Routes>
            </div>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
