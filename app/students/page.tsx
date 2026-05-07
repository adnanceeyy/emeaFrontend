'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import { ChevronRight, Search } from 'lucide-react';

export default function StudentListPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get('/students');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(s => 
    s.childName.toLowerCase().includes(search.toLowerCase()) || 
    s.std.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-32 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16 space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">Student Registry.</h1>
          <p className="text-xl text-gray-500 font-medium">Search for a student to view their progress reports and records.</p>
        </div>

        <div className="mb-12 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or standard..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-gray-50 outline-none focus:border-[#55CF9A] font-bold text-lg"
          />
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-50 animate-pulse border-2 border-gray-50"></div>
            ))}
          </div>
        ) : (
          <div className="border-2 border-gray-100 divide-y-2 divide-gray-100">
            {filteredStudents.length > 0 ? filteredStudents.map((student) => (
              <Link 
                key={student._id} 
                href={`/students/${student._id}`}
                className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">{student.childName}</h3>
                  <p className="text-xs font-bold text-[#55CF9A] uppercase tracking-widest mt-1">{student.std}</p>
                </div>
                <div className="w-10 h-10 border-2 border-gray-100 flex items-center justify-center text-gray-300 group-hover:border-[#55CF9A] group-hover:text-[#55CF9A] transition-all">
                  <ChevronRight size={20} />
                </div>
              </Link>
            )) : (
              <div className="p-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                No students found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
