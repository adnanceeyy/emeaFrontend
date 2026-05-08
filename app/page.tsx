import Image from 'next/image';
import Link from 'next/link';
import TeacherCard from '@/components/TeacherCard';
import { MessageCircle, ArrowRight } from 'lucide-react';

async function getContent() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/content`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const content = await getContent();

  const teachers = [
    { name: 'K. Sham', role: 'Principal', image: '/assets/shamk.png' },
    { name: 'Rohini KS', role: 'Headmaster', image: '/assets/rohini.jpeg' },
    { name: 'Rashid Pazheri', role: 'Educator', image: '/assets/rashidP.png' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Flat Hero */}
      <section style={{ backgroundImage: "url('../assets/bg.png')" }} className="bg-cover bg-center py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-7xl font-black text-white leading-none tracking-tight uppercase">
            EMEA HSS <br /> SPECIAL CARE
          </h1>
          <p className="text-base md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed">
            Nurturing potential through specialized education. Simple, effective, and compassionate care for every child.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/services" className="bg-white text-[#55CF9A] px-10 py-4 font-bold text-sm md:text-lg hover:bg-gray-100 transition-colors uppercase tracking-widest">
              Our Services
            </Link>
            <Link href="/gallery" className="border-2 border-white text-white px-10 py-4 font-bold text-sm md:text-lg hover:bg-white hover:text-[#55CF9A] transition-colors uppercase tracking-widest">
              Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal About */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="inline-block px-4 py-1 bg-[#55CF9A]/10 border border-[#55CF9A]/20">
            <span className="text-[10px] font-black text-[#55CF9A] uppercase tracking-[0.4em]">Our Mission</span>
          </div>
          <p className="text-xl md:text-3xl text-gray-900 font-bold leading-tight">
            {content?.homeContent?.aboutText || "We provide specialized care and education for children, ensuring their holistic development and well-being. Our expert team focuses on individual needs to help every child thrive."}
          </p>
        </div>
      </section>

      {/* School Leadership Section */}
      <section id="leadership" className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-[10px] font-black text-[#55CF9A] uppercase tracking-[0.5em]">School Management</h2>
            <p className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase">School Leadership</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-24">
            <TeacherCard name="Sayyid Basheer Ali Shihab Thangal" role="President" image="/assets/basheeraliThangal.jpg" />
            <TeacherCard name="P. K. Basheer" role="Secretary" image="/assets/P.K. Basheer.jpg" />
            <TeacherCard name="Balathil Bappu" role="Manager" image="/assets/bappu.png" />
          </div>
        </div>
      </section>

      {/* Flat Quick Links / Contact Section */}
      <section id="contact" className="bg-white py-24 md:py-32 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-[1.1] tracking-tighter uppercase">
              Empowering every <br /> child with the <br /> care they deserve.
            </h2>
            <Link href="/services" className="inline-flex items-center gap-2 font-bold text-sm text-[#55CF9A] group uppercase tracking-widest">
              Explore our programs <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          <div className="bg-gray-900 p-8 md:p-16 text-white rounded-none">
            <h3 className="text-2xl font-bold mb-6 uppercase tracking-tight">Get in Touch</h3>
            <p className="mb-10 text-white/70 font-medium text-base leading-relaxed">Have questions about our admissions or programs? Our team is here to help you.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/919947941701" className="bg-[#55CF9A] text-white px-8 py-4 font-bold text-xs text-center uppercase tracking-widest hover:opacity-90 transition-opacity">Message Us</a>
              <a href="tel:+919947941701" className="border-2 border-white/20 text-white px-8 py-4 font-bold text-xs text-center uppercase tracking-widest hover:bg-white hover:text-gray-900 transition-all">Call Support</a>
            </div>
          </div>
        </div>
      </section>

      {/* Improved Teachers Section */}
      <section id="teachers" className="py-24 md:py-32 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-[10px] font-black text-[#55CF9A] uppercase tracking-[0.5em]">Academic Team</h2>
            <p className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase">Academic Leadership</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-24">
            {teachers.map((teacher, idx) => (
              <TeacherCard key={idx} {...teacher} />
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/919947941701"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] rounded-full text-white p-3 shadow-xl hover:scale-110 transition-transform animate-[bounce_2s_infinite]"
      >
        <img src="/assets/whatsapp.png" alt="WhatsApp" className="w-8 h-8 object-contain" />
      </a>
    </div>
  );
}
