import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import PatientsIcon from '../../assets/icons/Patients.svg';
import NotificationsIcon from '../../assets/icons/Notification.svg';
import SettingsIcon from '../../assets/icons/Settings.svg';
import HelpIcon from '../../assets/icons/Help.svg';

const Sidebar = () => {
  return (
    <aside className="bg-white h-full border-b shadow-sm flex flex-col">
      <div className="flex-1 px-5 py-6">
        <nav className="grid gap-1">
          <NavLink
            to="/dashboard/patients"
            className={({ isActive }) =>
              `flex items-center rounded-md px-4 py-3 text-lg font-medium transition-colors ${
                isActive
                  ? 'bg-[#14B8A6] text-white rounded-[8px]'
                  : 'hover:bg-accent/50 bg-accent/20 text-primary'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={PatientsIcon}
                  alt="Patients"
                  className={`mr-3 h-5 w-5 ${isActive ? 'filter invert' : ''}`}
                />
                Patients
              </>
            )}
          </NavLink>

          <NavLink
            to="/dashboard/notifications"
            className={({ isActive }) =>
              `flex items-center rounded-md px-4 py-3 text-lg font-medium transition-colors ${
                isActive
                  ? 'bg-[#14B8A6] text-white rounded-[8px]'
                  : 'hover:bg-accent/50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={NotificationsIcon}
                  alt="Notifications"
                  className={`mr-3 h-5 w-5 ${isActive ? 'filter invert' : ''}`}
                />
                Notifications
                <span className={`ml-auto rounded-full px-2 py-1 text-xs ${
                    isActive ? 'bg-white text-black' : 'bg-primary text-primary-foreground'
                  }`}
                >
                  4
                </span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center rounded-md px-4 py-3 text-lg font-medium transition-colors ${
                isActive
                  ? 'bg-[#14B8A6] text-white rounded-[8px]'
                  : 'hover:bg-accent/50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={SettingsIcon}
                  alt="Settings"
                  className={`mr-3 h-5 w-5 ${isActive ? 'filter invert' : ''}`}
                />
                Settings
              </>
            )}
          </NavLink>

          <NavLink
            to="/dashboard/help"
            className={({ isActive }) =>
              `flex items-center rounded-md px-4 py-3 text-lg font-medium transition-colors ${
                isActive
                  ? 'bg-[#14B8A6] text-white rounded-[8px]'
                  : 'hover:bg-accent/50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={HelpIcon}
                  alt="Help"
                  className={`mr-3 h-5 w-5 ${isActive ? 'filter invert' : ''}`}
                />
                Help
              </>
            )}
          </NavLink>
        </nav>
      </div>
      <div className="border-t px-4 py-4">
        <Button variant="primary" className="h-auto py-3">
          <NavLink
            to="/logout"
            className="flex flex-row items-center w-full gap-3"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-lg font-medium">Logout</span>
          </NavLink>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
