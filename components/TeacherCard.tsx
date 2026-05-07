import Image from 'next/image';

interface TeacherProps {
  name: string;
  role: string;
  image: string;
}

export default function TeacherCard({ name, role, image }: TeacherProps) {
  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden border-2 border-gray-100 transition-colors group-hover:border-[#55CF9A]">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover"
        />
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-1 uppercase tracking-tight">{name}</h3>
        <div className="inline-block px-3 py-1 bg-gray-50 border border-gray-100 group-hover:border-[#55CF9A] transition-colors">
          <p className="text-[10px] font-black text-[#55CF9A] uppercase tracking-widest">{role}</p>
        </div>
      </div>
    </div>
  );
}
