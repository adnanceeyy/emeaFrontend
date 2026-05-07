'use client';
import { useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { username, password });
      showNotification('Login successful!', 'success');
      login(res.data.token, res.data.user);
    } catch (err: any) {
      showNotification(err.response?.data?.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-10 bg-white p-12 border-2 border-gray-100">
        <div className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 bg-[#55CF9A]/10 text-[#55CF9A] rounded-full flex items-center justify-center">
            <Lock size={32} />
          </div>
          <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Admin Login</h2>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Secure Access Point</p>
        </div>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Username</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 outline-none focus:border-[#55CF9A] font-medium"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 outline-none focus:border-[#55CF9A] font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-4 font-bold text-xs uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
