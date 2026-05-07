import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t-2 border-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image src="/assets/emeaLogo.png" alt="Logo" fill className="object-contain" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight uppercase">EMEA HSS <br /><span className="text-[#55CF9A]">Special Care Center</span></h3>
          </div>
          <p className="text-gray-500 font-medium leading-relaxed max-w-xs">
            Providing specialized care and education for children since 2005.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Explore</h4>
          <ul className="space-y-4 font-bold text-gray-600">
            <li><Link href="/" className="hover:text-[#55CF9A]">Home</Link></li>
            <li><Link href="/services" className="hover:text-[#55CF9A]">Our Services</Link></li>
            <li><Link href="/gallery" className="hover:text-[#55CF9A]">Gallery</Link></li>
            <li><Link href="/students" className="hover:text-[#55CF9A]">Student Profile</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Contact</h4>
          <ul className="space-y-4 font-bold text-gray-600">
            <li>Kondotty, Malappuram</li>
            <li>+91 9947941701</li>
            <li>info@emeahss.edu.in</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t-2 border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-400 font-bold text-[10px] tracking-widest uppercase">&copy; {new Date().getFullYear()} EMEA HSS</p>
        <Link href="/admin/login" className="text-[10px] font-bold text-gray-300 hover:text-[#55CF9A] uppercase tracking-widest">Admin Access</Link>
      </div>
    </footer>
  );
}
