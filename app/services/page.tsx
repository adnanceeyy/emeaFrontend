import { LayoutGrid } from 'lucide-react';

async function getServices() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/content`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.servicesContent || [];
  } catch (error) {
    return [];
  }
}

export default async function ServicesPage() {
  const fetchedServices = await getServices();
  
  const baseServices = [
    'Remadical Teaching',
    'OSS',
    'Screening',
    'Assessment and Identification',
    'Medical Camp',
    'Special education',
    'One to One session',
    'Group Theraphy',
    'Parental Counselling'
  ];

  const fetchedTitles = fetchedServices.map((s: any) => s.title);
  const allServices = Array.from(new Set([...baseServices, ...fetchedTitles]));

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#55CF9A]/10 text-[#55CF9A] border border-[#55CF9A]/20">
            <LayoutGrid size={12} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Our Expertise</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight uppercase leading-tight">
            Specialized Services
          </h1>
          <p className="text-lg text-gray-400 font-bold max-w-xl">
            Professional support systems for student growth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allServices.map((title, index) => (
            <div key={index} className="p-8 bg-white border-2 border-gray-50 hover:border-[#55CF9A] transition-all group flex items-center gap-6 min-h-[90px]">
              <span className="text-[10px] font-bold text-[#55CF9A] tracking-widest opacity-40 group-hover:opacity-100 transition-opacity shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-sm md:text-base font-bold text-gray-900 tracking-tight uppercase group-hover:text-[#55CF9A] transition-colors leading-snug">
                {title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
