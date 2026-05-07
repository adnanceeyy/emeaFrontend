interface ServiceProps {
  title: string;
  description: string;
}

export default function ServiceCard({ title, description }: ServiceProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1 border border-gray-50 h-full flex flex-col">
      <div className="w-12 h-12 bg-[#4DA8DA]/10 rounded-xl flex items-center justify-center mb-6">
        <div className="w-6 h-6 bg-[#4DA8DA] rounded-full opacity-80"></div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed flex-grow">{description}</p>
    </div>
  );
}
