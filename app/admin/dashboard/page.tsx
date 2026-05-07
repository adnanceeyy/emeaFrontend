'use client';
import { useState, useEffect, useRef } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Users, Image as ImageIcon, FileText, Upload, Trash2, Edit2, Key } from 'lucide-react';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('students');

  // Student Form State
  const [students, setStudents] = useState<any[]>([]);
  const [editingStudent, setEditingStudent] = useState<string | null>(null);
  const [studentForm, setStudentForm] = useState({ 
    childName: '', parentName: '', std: '', caseHistory: '',
    assessment: '', suggestions: '', followUp: '', improvements: '',
    studentId: '', password: ''
  });

  // Content Form State
  const [contentForm, setContentForm] = useState({ aboutText: '' });

  // Gallery Form State
  const [gallery, setGallery] = useState<any[]>([]);
  const [caption, setCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !user) router.push('/admin/login');
    if (user) {
      fetchStudents();
      fetchContent();
      fetchGallery();
    }
  }, [user, loading, router]);

  const fetchStudents = async () => {
    try {
      const res = await api.get('/students');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchContent = async () => {
    try {
      const res = await api.get('/content');
      if (res.data?.homeContent) {
        setContentForm({ aboutText: res.data.homeContent.aboutText });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchGallery = async () => {
    try {
      const res = await api.get('/gallery');
      setGallery(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await api.put(`/students/${editingStudent}`, studentForm);
        toast.success('Student updated successfully');
      } else {
        await api.post('/students', studentForm);
        toast.success('Student added successfully');
      }
      resetStudentForm();
      fetchStudents();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Error processing student');
    }
  };

  const resetStudentForm = () => {
    setStudentForm({ 
      childName: '', parentName: '', std: '', caseHistory: '',
      assessment: '', suggestions: '', followUp: '', improvements: '',
      studentId: '', password: ''
    });
    setEditingStudent(null);
  };

  const handleEditStudent = async (student: any) => {
    try {
      const res = await api.get(`/students/${student._id}`);
      setStudentForm({
        childName: res.data.childName || '',
        parentName: res.data.parentName || '',
        std: res.data.std || '',
        caseHistory: res.data.caseHistory || '',
        assessment: res.data.assessment || '',
        suggestions: res.data.suggestions || '',
        followUp: res.data.followUp || '',
        improvements: res.data.improvements || '',
        studentId: res.data.studentId || '',
        password: '' // Don't show hashed password
      });
      setEditingStudent(student._id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      toast.error('Failed to fetch student details');
    }
  };

  const handleDeleteStudent = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.delete(`/students/${id}`);
      toast.success('Student deleted');
      fetchStudents();
    } catch (err: any) {
      toast.error('Error deleting student');
    }
  };

  const handleUpdateContent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/content', { homeContent: contentForm });
      toast.success('Content updated');
    } catch (err: any) {
      toast.error('Error updating content');
    }
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('caption', caption);

    try {
      await api.post('/gallery/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Media uploaded successfully');
      setCaption('');
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchGallery();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Error uploading media');
    }
  };

  const handleDeleteMedia = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      toast.success('Media deleted');
      fetchGallery();
    } catch (err: any) {
      toast.error('Error deleting media');
    }
  };

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Admin Dashboard</h1>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {user.username}
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-4 mb-12">
          {['students', 'content', 'gallery'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)} 
              className={`px-6 py-2 font-bold text-xs uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#55CF9A] text-white' : 'bg-white text-gray-400 border-2 border-gray-100 hover:border-gray-200'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-white p-10 border-2 border-gray-100">
              <h2 className="text-xl font-bold mb-8 uppercase tracking-tight">{editingStudent ? 'Edit Student Profile' : 'Register New Student'}</h2>
              <form onSubmit={handleStudentSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Child Name</label>
                  <input type="text" required value={studentForm.childName} onChange={(e) => setStudentForm({...studentForm, childName: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 outline-none focus:border-[#55CF9A] font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Parent Name</label>
                  <input type="text" required value={studentForm.parentName} onChange={(e) => setStudentForm({...studentForm, parentName: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 outline-none focus:border-[#55CF9A] font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Standard (STD)</label>
                  <input type="text" required value={studentForm.std} onChange={(e) => setStudentForm({...studentForm, std: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 outline-none focus:border-[#55CF9A] font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Case History</label>
                  <input type="text" value={studentForm.caseHistory} onChange={(e) => setStudentForm({...studentForm, caseHistory: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 outline-none focus:border-[#55CF9A] font-medium" />
                </div>
                
                {/* Details from Spreadsheet */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Assessment / Present Condition</label>
                  <textarea value={studentForm.assessment} onChange={(e) => setStudentForm({...studentForm, assessment: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 outline-none focus:border-[#55CF9A] font-medium" rows={2}></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Suggestions</label>
                  <textarea value={studentForm.suggestions} onChange={(e) => setStudentForm({...studentForm, suggestions: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 outline-none focus:border-[#55CF9A] font-medium" rows={2}></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Follow up activities</label>
                  <textarea value={studentForm.followUp} onChange={(e) => setStudentForm({...studentForm, followUp: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 outline-none focus:border-[#55CF9A] font-medium" rows={2}></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Improvements</label>
                  <textarea value={studentForm.improvements} onChange={(e) => setStudentForm({...studentForm, improvements: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 outline-none focus:border-[#55CF9A] font-medium" rows={2}></textarea>
                </div>

                {/* Credentials */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t-2 border-gray-50">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#55CF9A] uppercase tracking-wider flex items-center gap-2"><Key size={12} /> Student ID</label>
                    <input type="text" required value={studentForm.studentId} onChange={(e) => setStudentForm({...studentForm, studentId: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 outline-none focus:border-[#55CF9A] font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#55CF9A] uppercase tracking-wider flex items-center gap-2"><Key size={12} /> {editingStudent ? 'New Password (Leave blank to keep same)' : 'Password'}</label>
                    <input type="password" required={!editingStudent} value={studentForm.password} onChange={(e) => setStudentForm({...studentForm, password: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 outline-none focus:border-[#55CF9A] font-medium" />
                  </div>
                </div>

                <div className="md:col-span-2 flex gap-4">
                  <button type="submit" className="bg-gray-900 text-white px-10 py-4 font-bold text-sm uppercase tracking-widest hover:bg-black">
                    {editingStudent ? 'Update Profile' : 'Save Profile'}
                  </button>
                  {editingStudent && (
                    <button type="button" onClick={resetStudentForm} className="bg-white border-2 border-gray-100 text-gray-400 px-10 py-4 font-bold text-sm uppercase tracking-widest hover:border-gray-200">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
            
            <div className="bg-white border-2 border-gray-100 overflow-hidden">
              <div className="p-6 border-b-2 border-gray-100">
                <h2 className="text-sm font-black uppercase tracking-widest text-gray-400">Registered Students</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">ID</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">STD</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-gray-100">
                    {students.map((student) => (
                      <tr key={student._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-gray-800">{student.childName}</td>
                        <td className="px-6 py-4 text-xs font-bold text-[#55CF9A]">{student.studentId}</td>
                        <td className="px-6 py-4 text-xs font-bold text-gray-500">{student.std}</td>
                        <td className="px-6 py-4 text-right space-x-4">
                          <button onClick={() => handleEditStudent(student)} className="text-gray-300 hover:text-[#55CF9A] transition-colors"><Edit2 size={16} /></button>
                          <button onClick={() => handleDeleteStudent(student._id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Content & Gallery tabs remain same but with Flat styling... */}
        {activeTab === 'content' && (
          <div className="bg-white p-10 border-2 border-gray-100 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h2 className="text-xl font-bold mb-8 uppercase tracking-tight">Homepage Content</h2>
            <form onSubmit={handleUpdateContent} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">About Us Section</label>
                <textarea 
                  value={contentForm.aboutText} 
                  onChange={(e) => setContentForm({ aboutText: e.target.value })} 
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-50 outline-none focus:border-[#55CF9A]" 
                  rows={8}
                ></textarea>
              </div>
              <button type="submit" className="bg-gray-900 text-white px-10 py-4 font-bold text-sm uppercase tracking-widest">Save Changes</button>
            </form>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-white p-10 border-2 border-gray-100">
              <h2 className="text-xl font-bold mb-8 uppercase tracking-tight">Upload Media</h2>
              <form onSubmit={handleAddMedia} className="space-y-8">
                <div className="relative border-2 border-dashed border-gray-200 p-12 text-center cursor-pointer hover:border-[#55CF9A] transition-colors" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="mx-auto mb-4 text-gray-300" size={32} />
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {selectedFile ? selectedFile.name : 'Click to select media file'}
                  </p>
                  <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)} accept="image/*,video/*" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Caption</label>
                  <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 outline-none focus:border-[#55CF9A]" />
                </div>
                <button type="submit" className="bg-gray-900 text-white px-10 py-4 font-bold text-sm uppercase tracking-widest">Upload to Gallery</button>
              </form>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <div key={item._id} className="relative group aspect-square bg-gray-100 overflow-hidden">
                  <img src={item.mediaUrl} alt={item.caption} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => handleDeleteMedia(item._id)} className="bg-red-500 text-white p-2 hover:bg-red-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
