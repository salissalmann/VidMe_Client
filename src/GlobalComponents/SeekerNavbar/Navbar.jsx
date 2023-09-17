import React from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExploreIcon from '@mui/icons-material/Explore';
import SettingsIcon from '@mui/icons-material/Settings';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Tooltip } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';


export default function Main(props) {
  const Navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem('token');
    Navigate('/')
  }

  console.log(props.id);
  return (
    <>
      <div className={styles.DashboardNav}>
        <div className={styles.DashboardNavLeft}>
          <h3>VidMe</h3>
          <div className={styles.NavLinks}>
            <div className={styles.NavLink} onClick={() => Navigate('/dashboard')}>
              <Tooltip
              placement="bottom"
              title="Home"
                color="black"
                className={styles.NavTooltip}
              >
                <HomeRoundedIcon className={styles.NavIcon} />
              </Tooltip>
            </div>
            <div className={styles.NavLink} onClick={() => Navigate('/explore')}>
              <Tooltip
              placement="bottom"
              title="Explore"
                color="black"
                className={styles.NavTooltip}
              >
                <ExploreIcon className={styles.NavIcon} />
              </Tooltip>
            </div>
            <div className={styles.NavLink} onClick={() => Navigate('/spaces')}>
              <Tooltip
              placement="bottom"
              title="Spaces"
                color="black"
                className={styles.NavTooltip}
              >
                <WorkspacesIcon className={styles.NavIcon} style={{
                  marginTop: "-0.3rem"
                }}
                />
              </Tooltip>
            </div>
            <input className={styles.SearchBox}
              type="text"
              placeholder="Search"
            />
          </div>

        </div>
        <div className={styles.NavRight}>
          <div className={styles.NavLink2} onClick={() => Navigate('/notifications')}>
            <Tooltip
              placement="bottom"
              title="Notifications"
              color="black"
              className={styles.NavTooltip}
            >
              <NotificationsNoneIcon className={styles.NavIcon} />
            </Tooltip>
          </div>
          <div className={styles.NavLink2} onClick={() => Navigate(`/Chat/${props.id}`)}>
            <Tooltip
              placement="bottom"
              title="Messages"
              color="black"
              className={styles.NavTooltip}
            >
              <ChatBubbleOutlineIcon className={styles.NavIcon} />
            </Tooltip>
          </div>
          <div className={styles.NavLink2} onClick={() => Navigate('/settings')}>
            <Tooltip
              placement="bottom"
              title="Settings"
              color="black"
              className={styles.NavTooltip}
            >
              <SettingsIcon className={styles.NavIcon} />
            </Tooltip>
          </div>

          <img src="/StaticImages/MockProfile.jpeg" alt="profile" className='NavProfileImage'
            onClick={Logout} />
        </div>
      </div>
    </>
  )
}
