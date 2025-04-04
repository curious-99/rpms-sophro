import { Link } from 'react-router-dom';
import DarkModeToggle from '../DarkModeToggle';
import SophroSyneLogo from '../../assets/logo/sophrosyne-logo.svg';
import Organisation from '../../assets/icons/hospital.svg';
import Hospital from '../../assets/icons/pharmacy-cross-square.svg';

const Header = () => {
  return (
    <header className="w-full bg-white px-[42px] shadow-[0px_1px_0px_0px_rgba(18,32,59,0.09)]">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-[6px]">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img
              src={SophroSyneLogo}
              alt="Sophrosyne Logo"
              className="w-14 h-14 cursor-pointer hover:opacity-80 transition-opacity"
            />
            <span className="text-[#14B8A6] text-3xl font-semibold font-lato leading-[44px]">
              Sophrosyne
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            {/* Organization Label */}
            <label className="absolute -top-2 left-4 bg-white px-1 text-gray-500 text-xs">
              Organization
            </label>
            <img
              src={Organisation}
              alt="Organization Icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
            <select className="w-[203px] h-[50px] rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm text-gray-900">
              <option value="sophro_platform_1">Sophro Platform 1</option>
              <option value="sophro_platform_2">Sophro Platform 2</option>
            </select>
          </div>

          <div className="relative">
            {/* Hospital Label */}
            <label className="absolute -top-2 left-4 bg-white px-1 text-gray-500 text-xs">
              Hospital
            </label>
            <img
              src={Hospital}
              alt="Hospital Icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
            <select className="w-[203px] h-[50px] rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm text-gray-900">
              <option value="sophro_hospital_1">Sophro Hospital 1</option>
              <option value="sophro_hospital_2">Sophro Hospital 2</option>
            </select>
          </div>
          <DarkModeToggle />

          {/* User Info & Avatar */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col text-right">
              <span className="text-gray-900 text-sm font-medium">
                System Admin
              </span>
              <span className="text-gray-800 text-xs">Org Admin</span>
            </div>

            {/* User Avatar */}
            <img
              src={SophroSyneLogo}
              alt="Admin Avatar"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
