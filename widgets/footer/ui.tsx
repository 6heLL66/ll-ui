import Link from 'next/link';
import { Logo } from '../header/ui';
import { DISCORD_LINK, DOCS_LINK, TWITTER_LINK } from '@/config/links';

const SocialButton = ({ icon, title, className, href, gradientColors }: { 
  icon: React.ReactNode; 
  title: string; 
  className?: string; 
  href: string;
  gradientColors: {
    from: string;
    via: string;
    to: string;
  };
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      className={`group relative flex items-center text-text/60 font-medium gap-2 md:gap-3 rounded-xl p-2 md:p-2.5 
        transition-all duration-300 border border-white/10 backdrop-blur-sm
        before:absolute before:inset-0 before:rounded-xl before:transition-opacity before:opacity-0 
        before:bg-gradient-to-r ${className}`}
      style={{
        '--tw-gradient-from': gradientColors.from,
        '--tw-gradient-via': gradientColors.via,
        '--tw-gradient-to': gradientColors.to,
      } as React.CSSProperties}
      rel="noopener noreferrer"
    >
      <div className="relative z-10 transition-all duration-200 group-hover:scale-110 group-hover:[transition:all_0.2s_ease-out]">
        {icon}
      </div>
      <span className="relative z-10 hidden md:inline transition-all duration-200 group-hover:translate-x-0.5 group-hover:[transition:all_0.2s_ease-out]">
        {title}
      </span>
      <div className="absolute inset-0 rounded-xl bg-black/20 transition-opacity opacity-0 group-hover:opacity-100" />
    </Link>
  );
};

export const Footer = () => {
  return (
    <footer className="sm:mt-16 mt-8 bg-gradient-to-b from-transparent to-[#0a0a0a]">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col gap-8 py-8 md:py-12">
          {/* Logo and Description */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-24 justify-between px-4 items-center">
            <div className="flex md:flex-row gap-4 md:gap-6 items-center">
              <Logo />
              <span className="text-text/60 max-w-[300px] text-left md:text-left text-sm md:text-base">
                Empowering the future of DeFi on Berachain
              </span>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 md:gap-6 justify-center items-center">
              <SocialButton 
                icon={<XIcon />} 
                href={TWITTER_LINK}
                className="hover:border-[#1DA1F2]/30 hover:text-[#1DA1F2] hover:before:opacity-100
                  hover:shadow-[0_0_20px_rgba(29,161,242,0.2)]" 
                title="Twitter"
                gradientColors={{
                  from: 'rgba(29,161,242,0.2)',
                  via: 'rgba(29,161,242,0.1)',
                  to: 'rgba(29,161,242,0.05)'
                }}
              />
              <SocialButton 
                icon={<DiscordIcon />} 
                href={DISCORD_LINK} 
                title="Discord" 
                className="hover:border-[#5865F2]/30 hover:text-[#5865F2] hover:before:opacity-100
                  hover:shadow-[0_0_20px_rgba(88,101,242,0.2)]"
                gradientColors={{
                  from: 'rgba(88,101,242,0.2)',
                  via: 'rgba(88,101,242,0.1)',
                  to: 'rgba(88,101,242,0.05)'
                }}
              />
              <SocialButton 
                icon={<GitbookIcon />} 
                href={DOCS_LINK} 
                className="hover:border-[#FF6B6B]/30 hover:text-[#FF6B6B] hover:before:opacity-100
                  hover:shadow-[0_0_20px_rgba(255,107,107,0.2)]"
                title="Docs"
                gradientColors={{
                  from: 'rgba(255,107,107,0.2)',
                  via: 'rgba(255,107,107,0.1)',
                  to: 'rgba(255,107,107,0.05)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 md:py-8 text-sm text-text/60">
            <span className="order-2 md:order-1">Copyright © BeraFlow DAO 2025</span>
            <div className="flex gap-4 md:gap-8 order-1 md:order-2">
              <Link href="/privacy-notice" className="hover:text-white hover:underline transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white hover:underline transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const XIcon = () => {
  return (
    <svg
      enableBackground="new 0 0 32 32"
      height="20"
      width="20"
      className="w-5 h-5 md:w-8 md:h-8"
      id="Layer_1"
      version="1.0"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path
        d="M31.993,6.077C30.816,6.6,29.552,6.953,28.223,7.11c1.355-0.812,2.396-2.098,2.887-3.63  c-1.269,0.751-2.396,1.299-4.168,1.592C25.744,3.797,24.038,3,22.149,3c-3.625,0-6.562,2.938-6.562,6.563  c0,0.514,0.057,1.016,0.169,1.496C10.301,10.785,5.465,8.172,2.227,4.201c-0.564,0.97-0.888,2.097-0.888,3.3  c0,2.278,1.159,4.286,2.919,5.464c-1.075-0.035-2.087-0.329-2.972-0.821c-0.001,0.027-0.001,0.056-0.001,0.082  c0,3.181,2.262,5.834,5.265,6.437c-0.55,0.149-1.13,0.23-1.729,0.23c-0.424,0-0.834-0.041-1.234-0.117  c0.834,2.606,3.259,4.504,6.13,4.558c-2.245,1.76-5.075,2.811-8.15,2.811c-0.53,0-1.053-0.031-1.566-0.092  C2.905,27.913,6.355,29,10.062,29c12.072,0,18.675-10.001,18.675-18.675c0-0.284-0.008-0.568-0.02-0.85  C30,8.55,31.112,7.395,31.993,6.077z"
        fill="currentColor"
      />
    </svg>
  );
};

const DiscordIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-8 md:h-8" viewBox="0 0 48 48">
      <path
        fill="currentColor"
        d="M40.107,12.15c-0.065-0.102-0.139-0.182-0.236-0.255c-0.769-0.578-4.671-3.339-9.665-3.875	c-0.01-0.001-0.048-0.003-0.057-0.003c-0.098,0-0.183,0.057-0.224,0.14l-0.269,0.538c0,0-0.001,0-0.001,0	c-0.017,0.033-0.026,0.071-0.026,0.111c0,0.109,0.07,0.202,0.168,0.236c0.006,0.002,0.048,0.011,0.063,0.014	c4.267,1.028,6.863,2.89,9.149,4.945c-4.047-2.066-8.044-4.001-15.009-4.001s-10.961,1.936-15.009,4.001	c2.286-2.055,4.882-3.917,9.149-4.945c0.015-0.004,0.057-0.012,0.063-0.014c0.098-0.034,0.168-0.127,0.168-0.236	c0-0.04-0.009-0.078-0.026-0.111c0,0-0.001,0-0.001,0l-0.269-0.538c-0.041-0.083-0.125-0.14-0.224-0.14	c-0.009,0-0.048,0.002-0.057,0.003c-4.994,0.536-8.896,3.297-9.665,3.875c-0.097,0.073-0.17,0.153-0.236,0.255	c-0.708,1.107-5.049,8.388-5.892,21.632c-0.009,0.142,0.04,0.289,0.135,0.395c4.592,5.144,11.182,5.752,12.588,5.823	c0.167,0.008,0.327-0.065,0.427-0.199l1.282-1.709c0.1-0.134,0.046-0.322-0.111-0.379c-2.705-0.986-5.717-2.7-8.332-5.706	C11.231,34.457,16.12,37,24,37s12.769-2.543,16.009-4.993c-2.616,3.006-5.627,4.719-8.332,5.706	c-0.157,0.057-0.211,0.245-0.111,0.379l1.282,1.709c0.101,0.134,0.26,0.208,0.427,0.199c1.407-0.072,7.996-0.679,12.588-5.823	c0.095-0.106,0.144-0.253,0.135-0.395C45.156,20.538,40.815,13.257,40.107,12.15z"
      ></path>
      <circle cx="17.5" cy="26" r="3" fill="#000000" />
      <circle cx="30.5" cy="26" r="3" fill="#000000" />
    </svg>
  );
};

const GitbookIcon = () => {
  return (
    <svg fill="currentColor" className="w-5 h-5 md:w-8 md:h-8" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.802 17.77a.703.703 0 1 1-.002 1.406.703.703 0 0 1 .002-1.406m11.024-4.347a.703.703 0 1 1 .001-1.406.703.703 0 0 1-.001 1.406m0-2.876a2.176 2.176 0 0 0-2.174 2.174c0 .233.039.465.115.691l-7.181 3.823a2.165 2.165 0 0 0-1.784-.937c-.829 0-1.584.475-1.95 1.216l-6.451-3.402c-.682-.358-1.192-1.48-1.138-2.502.028-.533.212-.947.493-1.107.178-.1.392-.092.62.027l.042.023c1.71.9 7.304 3.847 7.54 3.956.363.169.565.237 1.185-.057l11.564-6.014c.17-.064.368-.227.368-.474 0-.342-.354-.477-.355-.477-.658-.315-1.669-.788-2.655-1.25-2.108-.987-4.497-2.105-5.546-2.655-.906-.474-1.635-.074-1.765.006l-.252.125C7.78 6.048 1.46 9.178 1.1 9.397.457 9.789.058 10.57.006 11.539c-.08 1.537.703 3.14 1.824 3.727l6.822 3.518a2.175 2.175 0 0 0 2.15 1.862 2.177 2.177 0 0 0 2.173-2.14l7.514-4.073c.38.298.853.461 1.337.461A2.176 2.176 0 0 0 24 12.72a2.176 2.176 0 0 0-2.174-2.174" />
    </svg>
  );
};
