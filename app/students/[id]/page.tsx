'use client';
import { useState, useEffect, useRef } from 'react';
import api from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Lock, FileText, ArrowLeft, Download, Printer } from 'lucide-react';

export default function StudentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  
  // Login State
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    checkAccess();
  }, [id]);

  const checkAccess = async () => {
    try {
      const res = await api.get(`/students/${id}`);
      setStudent(res.data);
      setAuthError(false);
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setAuthError(true);
      } else {
        toast.error('Error fetching student data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const res = await api.post('/students/login', { studentId, password });
      Cookies.set('student_token', res.data.token, { expires: 1 });
      await checkAccess();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading student records...</div>;

  if (authError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-6">
        <div className="max-w-md w-full bg-white border-2 border-gray-100 p-10 space-y-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[#55CF9A]/10 text-[#55CF9A] rounded-full flex items-center justify-center mx-auto">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Restricted Access</h1>
            <p className="text-sm text-gray-500 font-medium">Please enter the Student ID and Password provided by the administration to view this profile.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Student ID</label>
              <input 
                type="text" 
                required 
                value={studentId} 
                onChange={(e) => setStudentId(e.target.value)} 
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 outline-none focus:border-[#55CF9A] font-bold" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 outline-none focus:border-[#55CF9A] font-medium" 
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoggingIn}
              className="w-full bg-[#55CF9A] text-white py-4 font-bold text-sm uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-all"
            >
              {isLoggingIn ? 'Verifying...' : 'Access Records'}
            </button>
          </form>
          
          <button onClick={() => router.push('/students')} className="w-full text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors">
            Return to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-32 bg-white min-h-screen">
      {/* Hide on print */}
      <div className="max-w-6xl mx-auto px-6 print:hidden">
        <button onClick={() => router.push('/students')} className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-12 hover:text-[#55CF9A] transition-colors">
          <ArrowLeft size={16} /> Back to Directory
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6" id="student-report">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b-2 border-gray-100 pb-10">
          <div className="space-y-2">
            <span className="text-[#55CF9A] text-xs font-black uppercase tracking-[0.3em]">{student.std}</span>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase">{student.childName}</h1>
            <p className="text-xl text-gray-500 font-bold">Parent: {student.parentName}</p>
          </div>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-black transition-colors print:hidden"
          >
            <Printer size={16} /> Export PDF / Print
          </button>
        </div>

        {/* Spreadsheet Style Table */}
        <div className="border-2 border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-gray-100">
            <div className="p-8 space-y-4">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Case History</h3>
              <p className="text-gray-800 font-medium leading-relaxed">{student.caseHistory || 'No records available'}</p>
            </div>
            <div className="p-8 space-y-4 bg-gray-50/30">
              <h3 className="text-[10px] font-bold text-[#55CF9A] uppercase tracking-wider">Assessment / Present Condition</h3>
              <p className="text-gray-900 font-bold leading-relaxed whitespace-pre-wrap">{student.assessment || 'Pending assessment'}</p>
            </div>
            <div className="p-8 space-y-4">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Suggestions</h3>
              <p className="text-gray-800 font-medium leading-relaxed whitespace-pre-wrap">{student.suggestions || 'No suggestions recorded'}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-gray-100 border-t-2 border-gray-100">
            <div className="p-8 space-y-4">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Follow up activities</h3>
              <p className="text-gray-800 font-medium leading-relaxed whitespace-pre-wrap">{student.followUp || 'None scheduled'}</p>
            </div>
            <div className="p-8 space-y-4 bg-[#55CF9A]/5">
              <h3 className="text-[10px] font-bold text-[#55CF9A] uppercase tracking-wider">Improvements</h3>
              <p className="text-gray-900 font-black leading-relaxed whitespace-pre-wrap">{student.improvements || 'Tracking in progress'}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 p-8 bg-gray-50 border-2 border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white border border-gray-100 flex items-center justify-center text-[#55CF9A]">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">Last Updated</p>
              <p className="text-sm font-bold text-gray-900 mt-1">{new Date(student.createdAt).toLocaleDateString('en-GB')}</p>
            </div>
          </div>
          <div className="flex items-center gap-6 print:hidden">
            <button onClick={() => { Cookies.remove('student_token'); checkAccess(); }} className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline">
              Logout Profile
            </button>
          </div>
        </div>
        
        {/* Footer for Print Only */}
        <div className="hidden print:block mt-20 pt-10 border-t-2 border-gray-100 text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">EMEA HSS Special Care Center - Official Progress Report</p>
        </div>
      </div>
    </div>
  );
}
