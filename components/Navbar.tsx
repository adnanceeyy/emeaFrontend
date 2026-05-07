'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Student Profile', path: '/students' },
  ];

  const isAdminPage = pathname.startsWith('/admin');

  return (
    <nav className="bg-white border-b-2 border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image 
              src="/assets/emeaLogo.png" 
              alt="EMEA Logo" 
              fill 
              className="object-contain"
            />
          </div>
          <span className="text-lg font-bold text-gray-900 tracking-tight uppercase">EMEA HSS</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = link.path === '/' ? pathname === '/' : pathname.startsWith(link.path);
            return (
              <Link 
                key={link.name} 
                href={link.path} 
                className={`text-sm font-bold transition-colors ${
                  isActive ? 'text-[#55CF9A]' : 'text-gray-500 hover:text-[#55CF9A]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          {(user && user.role === 'admin') ? (
            <Link 
              href="/admin/dashboard" 
              className={`px-6 py-2.5 font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-colors ${
                isAdminPage 
                  ? 'bg-[#55CF9A] text-white shadow-lg shadow-[#55CF9A]/20' 
                  : 'bg-gray-900 text-white hover:bg-black'
              }`}
            >
              <LayoutDashboard size={14} /> Dashboard
            </Link>
          ) : (
            <Link href="/#contact" className="bg-[#55CF9A] text-white px-6 py-2.5 font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">
              Contact
            </Link>
          )}

          {user && (
            <button onClick={logout} className="text-xs font-black text-red-500 uppercase tracking-widest hover:underline">Logout</button>
          )}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-900">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t-2 border-gray-100 p-6 space-y-4">
          {navLinks.map((link) => {
            const isActive = link.path === '/' ? pathname === '/' : pathname.startsWith(link.path);
            return (
              <Link 
                key={link.name} 
                href={link.path} 
                className={`block text-sm font-bold ${
                  isActive ? 'text-[#55CF9A]' : 'text-gray-500'
                }`} 
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          {(user && user.role === 'admin') ? (
            <Link 
              href="/admin/dashboard" 
              className={`block w-full text-center py-3 font-bold text-xs uppercase tracking-widest ${
                isAdminPage ? 'bg-[#55CF9A] text-white' : 'bg-gray-900 text-white'
              }`} 
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          ) : (
            <Link href="/#contact" className="block w-full text-center bg-[#55CF9A] text-white py-3 font-bold text-xs uppercase tracking-widest" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          )}
          {user && (
            <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-center text-xs font-black text-red-500 uppercase tracking-widest pt-2">Logout</button>
          )}
        </div>
      )}
    </nav>
  );
}
