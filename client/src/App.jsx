import { Suspense } from 'react';
import './App.css';
import './marginPadding.css';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import Search from './components/Search';
import { useSearch } from './contexts/searchContext';
import Notification from './components/Notification';
import { useNotification } from './contexts/notificationContext';
import Upload from './components/Upload';
import { useUpload } from './contexts/uploadContext';
import More from './components/More';
import { useMore } from './contexts/moreContext';
import BlurBox from './components/BlurBox';
import { useSwitch } from './contexts/switchContext';
import LoginBox from './components/LoginBox';

function App() {
  const [isNotoficationVisible] = useNotification()
  const [isSerachVisible] = useSearch()
  const [isCreatVisible, setIsCreatVisible] = useUpload()
  const [more] = useMore()
  const [isSwitch, setIsSwitch] = useSwitch()
  return (
    <div className="mainContaner">
      <Sidebar />
      <Suspense>
        <Outlet />
      </Suspense>
      {isSerachVisible && <Search/>}
      {isNotoficationVisible && <Notification/>}
      {isCreatVisible && <BlurBox fun={()=>setIsCreatVisible((v)=>!v)}><Upload/></BlurBox>}
      {more && <More/>}
      {isSwitch && <BlurBox fun={()=>setIsSwitch((v)=>!v)}> <LoginBox/> </BlurBox>}
    </div>
  )
}

export default App
