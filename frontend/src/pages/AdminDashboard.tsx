import React, { useState, useEffect } from 'react';
import {
  Settings, Image, Clock, Heart, MessageSquare, Music, LogOut, ExternalLink,
  Plus, Trash2, CheckCircle2, XCircle, Sparkles, RefreshCw
} from 'lucide-react';
import { api } from '../services/api';
import { BirthdayInfo, Memory, TimelineEvent, Reason, Wish, MusicConfig } from '../types';

interface Props {
  onLogout: () => void;
  onViewLive: () => void;
}

export const AdminDashboard: React.FC<Props> = ({ onLogout, onViewLive }) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'memories' | 'timeline' | 'reasons' | 'wishes' | 'music'>('settings');
  const [birthday, setBirthday] = useState<BirthdayInfo | null>(null);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [music, setMusic] = useState<MusicConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Forms state
  const [newMemory, setNewMemory] = useState<{ title: string; caption: string; description: string; memoryDate: string; file: File | null }>({
    title: '', caption: '', description: '', memoryDate: '', file: null
  });
  const [newTimeline, setNewTimeline] = useState({ title: '', description: '', eventDate: '' });
  const [newReason, setNewReason] = useState({ title: '', description: '', icon: 'heart' });
  const [musicForm, setMusicForm] = useState<{ title: string; enabled: boolean; file: File | null }>({
    title: '', enabled: true, file: null
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [b, m, t, r, w, mu] = await Promise.all([
        api.getBirthday(),
        api.getMemories(),
        api.getTimeline(),
        api.getReasons(),
        api.getAdminWishes(),
        api.getMusic()
      ]);
      setBirthday(b);
      setMemories(m);
      setTimeline(t);
      setReasons(r);
      setWishes(w);
      setMusic(mu);
      if (mu) setMusicForm({ title: mu.title, enabled: mu.enabled, file: null });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showNotification = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // 1. Birthday Settings Save
  const handleSaveBirthday = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthday) return;
    try {
      const updated = await api.updateBirthday(birthday);
      setBirthday(updated);
      showNotification('Birthday settings saved successfully! ✨');
    } catch {
      showNotification('Failed to update birthday settings');
    }
  };

  // 2. Add Memory
  const handleAddMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemory.file) {
      alert('Please select a photo file for the memory');
      return;
    }
    const fd = new FormData();
    fd.append('title', newMemory.title);
    fd.append('caption', newMemory.caption);
    fd.append('description', newMemory.description);
    fd.append('memoryDate', newMemory.memoryDate);
    fd.append('image', newMemory.file);

    try {
      await api.createMemory(fd);
      showNotification('Memory added!');
      setNewMemory({ title: '', caption: '', description: '', memoryDate: '', file: null });
      loadData();
    } catch {
      showNotification('Failed to add memory');
    }
  };

  const handleDeleteMemory = async (id: string) => {
    if (!confirm('Delete this memory?')) return;
    await api.deleteMemory(id);
    showNotification('Memory deleted');
    loadData();
  };

  // 3. Add Timeline
  const handleAddTimeline = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', newTimeline.title);
    fd.append('description', newTimeline.description);
    fd.append('eventDate', newTimeline.eventDate);

    try {
      await api.createTimelineEvent(fd);
      showNotification('Timeline milestone added!');
      setNewTimeline({ title: '', description: '', eventDate: '' });
      loadData();
    } catch {
      showNotification('Failed to add timeline event');
    }
  };

  const handleDeleteTimeline = async (id: string) => {
    if (!confirm('Delete this timeline chapter?')) return;
    await api.deleteTimelineEvent(id);
    showNotification('Milestone deleted');
    loadData();
  };

  // 4. Add Reason
  const handleAddReason = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createReason(newReason);
      showNotification('Reason added!');
      setNewReason({ title: '', description: '', icon: 'heart' });
      loadData();
    } catch {
      showNotification('Failed to add reason');
    }
  };

  const handleDeleteReason = async (id: string) => {
    if (!confirm('Delete this reason?')) return;
    await api.deleteReason(id);
    showNotification('Reason deleted');
    loadData();
  };

  // 5. Wish Moderation
  const handleApproveWish = async (id: string) => {
    await api.approveWish(id);
    showNotification('Wish approved!');
    loadData();
  };

  const handleRejectWish = async (id: string) => {
    await api.rejectWish(id);
    showNotification('Wish rejected');
    loadData();
  };

  const handleDeleteWish = async (id: string) => {
    if (!confirm('Permanently delete wish?')) return;
    await api.deleteWish(id);
    showNotification('Wish deleted');
    loadData();
  };

  // 6. Music Save
  const handleSaveMusic = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', musicForm.title);
    fd.append('enabled', String(musicForm.enabled));
    if (musicForm.file) {
      fd.append('musicFile', musicForm.file);
    }
    try {
      const updated = await api.updateMusic(fd);
      setMusic(updated);
      showNotification('Music settings updated!');
    } catch {
      showNotification('Failed to update music');
    }
  };

  const pendingWishesCount = wishes.filter(w => w.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-midnight-900 text-white flex flex-col">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-midnight-800/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-rose-glow/20 text-rose-glow">
            <Sparkles size={20} />
          </span>
          <div>
            <h1 className="font-serif font-bold text-lg sm:text-xl">
              Vaishnavi's Birthday Admin
            </h1>
            <span className="text-xs text-white/50">Manage dynamic content &amp; guest wishes</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onViewLive}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
          >
            <ExternalLink size={14} />
            <span>View Live Site</span>
          </button>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-semibold border border-red-500/30 transition-all"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Stats Quick Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 max-w-6xl w-full mx-auto">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <span className="text-xs text-white/50 uppercase font-semibold">Sister's Name</span>
          <div className="text-xl sm:text-2xl font-serif font-bold text-rose-soft mt-1">
            {birthday?.sisterName || 'Vaishnavi'}
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <span className="text-xs text-white/50 uppercase font-semibold">Total Memories</span>
          <div className="text-xl sm:text-2xl font-serif font-bold text-gold-warm mt-1">
            {memories.length} Photos
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <span className="text-xs text-white/50 uppercase font-semibold">Approved Wishes</span>
          <div className="text-xl sm:text-2xl font-serif font-bold text-green-400 mt-1">
            {wishes.filter(w => w.status === 'APPROVED').length} Active
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <span className="text-xs text-white/50 uppercase font-semibold">Pending Wishes</span>
          <div className="text-xl sm:text-2xl font-serif font-bold text-orange-400 mt-1">
            {pendingWishesCount} Needs Review
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {saveStatus && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-rose-glow text-white shadow-2xl animate-bounce text-sm font-semibold">
          {saveStatus}
        </div>
      )}

      {/* Main Admin Body */}
      <div className="flex-1 max-w-6xl w-full mx-auto p-6 pt-0 flex flex-col md:flex-row gap-6">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 space-y-1">
          {[
            { id: 'settings', label: 'Birthday Settings', icon: Settings },
            { id: 'memories', label: 'Photo Memories', icon: Image },
            { id: 'timeline', label: 'Our Story Timeline', icon: Clock },
            { id: 'reasons', label: 'Why She Is Special', icon: Heart },
            { id: 'wishes', label: `Wishes (${pendingWishesCount} pending)`, icon: MessageSquare },
            { id: 'music', label: 'Music Settings', icon: Music },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-rose-glow to-violet-mystic text-white shadow-lg'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Box */}
        <div className="flex-1 p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
          {/* TAB 1: Birthday Settings */}
          {activeTab === 'settings' && birthday && (
            <form onSubmit={handleSaveBirthday} className="space-y-5">
              <h2 className="font-serif text-2xl font-bold">Birthday General Settings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-white/70 mb-1">
                    Sister's Name
                  </label>
                  <input
                    type="text"
                    value={birthday.sisterName}
                    onChange={e => setBirthday({ ...birthday, sisterName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-white/70 mb-1">
                    Birthday Date
                  </label>
                  <input
                    type="date"
                    value={birthday.birthdayDate ? new Date(birthday.birthdayDate).toISOString().split('T')[0] : ''}
                    onChange={e => setBirthday({ ...birthday, birthdayDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-white/70 mb-1">
                  Hero Subtitle
                </label>
                <input
                  type="text"
                  value={birthday.heroSubtitle}
                  onChange={e => setBirthday({ ...birthday, heroSubtitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-white/70 mb-1">
                  Personal Emotional Message ("A Message From My Heart")
                </label>
                <textarea
                  rows={6}
                  value={birthday.mainMessage}
                  onChange={e => setBirthday({ ...birthday, mainMessage: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-white/70 mb-1">
                  Final Screen Message
                </label>
                <textarea
                  rows={4}
                  value={birthday.finalMessage}
                  onChange={e => setBirthday({ ...birthday, finalMessage: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-rose-glow text-white font-semibold hover:opacity-90"
              >
                Save Settings
              </button>
            </form>
          )}

          {/* TAB 2: Memories Manager */}
          {activeTab === 'memories' && (
            <div className="space-y-8">
              <h2 className="font-serif text-2xl font-bold">Memory Lane Gallery</h2>

              {/* Add Memory Form */}
              <form onSubmit={handleAddMemory} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h3 className="font-semibold text-sm uppercase text-gold-warm">Upload New Memory</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Memory Title (e.g. Snack Partner)"
                    value={newMemory.title}
                    onChange={e => setNewMemory({ ...newMemory, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Date/Tag (e.g. Childhood Days)"
                    value={newMemory.memoryDate}
                    onChange={e => setNewMemory({ ...newMemory, memoryDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-sm"
                  />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Caption (e.g. Midnight maggi raids!)"
                  value={newMemory.caption}
                  onChange={e => setNewMemory({ ...newMemory, caption: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-sm"
                />
                <textarea
                  placeholder="Optional Story / Description"
                  rows={2}
                  value={newMemory.description}
                  onChange={e => setNewMemory({ ...newMemory, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-sm"
                />
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    required
                    accept="image/*"
                    onChange={e => setNewMemory({ ...newMemory, file: e.target.files?.[0] || null })}
                    className="text-xs text-white/70"
                  />
                  <button type="submit" className="px-5 py-2 rounded-xl bg-rose-glow text-white text-sm font-semibold">
                    Upload Memory
                  </button>
                </div>
              </form>

              {/* Memory List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {memories.map(m => (
                  <div key={m.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-4 items-center justify-between">
                    <img src={m.imageUrl} alt={m.title} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm truncate">{m.title}</h4>
                      <p className="text-xs text-white/60 truncate">"{m.caption}"</p>
                    </div>
                    <button onClick={() => handleDeleteMemory(m.id)} className="p-2 text-red-400 hover:text-red-300">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Timeline Manager */}
          {activeTab === 'timeline' && (
            <div className="space-y-8">
              <h2 className="font-serif text-2xl font-bold">Our Story Timeline</h2>
              <form onSubmit={handleAddTimeline} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h3 className="font-semibold text-sm uppercase text-gold-warm">Add Story Chapter</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Chapter Title (e.g. Chapter 5: College Days)"
                    value={newTimeline.title}
                    onChange={e => setNewTimeline({ ...newTimeline, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-sm"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Date or Era (e.g. 2024 - Present)"
                    value={newTimeline.eventDate}
                    onChange={e => setNewTimeline({ ...newTimeline, eventDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-sm"
                  />
                </div>
                <textarea
                  required
                  rows={3}
                  placeholder="Chapter description..."
                  value={newTimeline.description}
                  onChange={e => setNewTimeline({ ...newTimeline, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-sm"
                />
                <button type="submit" className="px-5 py-2 rounded-xl bg-rose-glow text-white text-sm font-semibold">
                  Add Chapter
                </button>
              </form>

              <div className="space-y-3">
                {timeline.map(t => (
                  <div key={t.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start justify-between">
                    <div>
                      <span className="text-xs text-gold-warm font-semibold">{t.eventDate}</span>
                      <h4 className="font-bold text-sm mt-0.5">{t.title}</h4>
                      <p className="text-xs text-white/70 mt-1">{t.description}</p>
                    </div>
                    <button onClick={() => handleDeleteTimeline(t.id)} className="p-2 text-red-400 hover:text-red-300">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Reasons Manager */}
          {activeTab === 'reasons' && (
            <div className="space-y-8">
              <h2 className="font-serif text-2xl font-bold">Things That Make Her Special</h2>
              <form onSubmit={handleAddReason} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h3 className="font-semibold text-sm uppercase text-gold-warm">Add A Reason</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Title (e.g. Your Pure Smile)"
                    value={newReason.title}
                    onChange={e => setNewReason({ ...newReason, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-sm"
                  />
                  <select
                    value={newReason.icon}
                    onChange={e => setNewReason({ ...newReason, icon: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-midnight-800 border border-white/15 text-sm"
                  >
                    <option value="heart">Heart</option>
                    <option value="smile">Smile</option>
                    <option value="zap">Energy (Zap)</option>
                    <option value="shield">Strength (Shield)</option>
                    <option value="home">Family (Home)</option>
                  </select>
                </div>
                <textarea
                  required
                  rows={2}
                  placeholder="Why this makes her so special..."
                  value={newReason.description}
                  onChange={e => setNewReason({ ...newReason, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-sm"
                />
                <button type="submit" className="px-5 py-2 rounded-xl bg-rose-glow text-white text-sm font-semibold">
                  Add Reason
                </button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reasons.map(r => (
                  <div key={r.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm">{r.title}</h4>
                      <p className="text-xs text-white/70 mt-1">{r.description}</p>
                    </div>
                    <button onClick={() => handleDeleteReason(r.id)} className="p-2 text-red-400 hover:text-red-300">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Wishes Moderation */}
          {activeTab === 'wishes' && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold">Wishes &amp; Guestbook Moderation</h2>
              <div className="space-y-4">
                {wishes.map(w => (
                  <div key={w.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{w.name}</span>
                        <span className="text-xs text-gold-warm">({w.relationship})</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          w.status === 'APPROVED' ? 'bg-green-500/20 text-green-300' :
                          w.status === 'REJECTED' ? 'bg-red-500/20 text-red-300' : 'bg-orange-500/20 text-orange-300'
                        }`}>
                          {w.status}
                        </span>
                      </div>
                      <p className="text-sm text-white/80 mt-1 italic font-serif">"{w.message}"</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {w.status !== 'APPROVED' && (
                        <button
                          onClick={() => handleApproveWish(w.id)}
                          className="px-3 py-1.5 rounded-lg bg-green-500/20 text-green-300 hover:bg-green-500/30 text-xs font-semibold flex items-center gap-1"
                        >
                          <CheckCircle2 size={14} /> Approve
                        </button>
                      )}
                      {w.status !== 'REJECTED' && (
                        <button
                          onClick={() => handleRejectWish(w.id)}
                          className="px-3 py-1.5 rounded-lg bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 text-xs font-semibold flex items-center gap-1"
                        >
                          <XCircle size={14} /> Reject
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteWish(w.id)}
                        className="p-1.5 text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Music Settings */}
          {activeTab === 'music' && (
            <form onSubmit={handleSaveMusic} className="space-y-6">
              <h2 className="font-serif text-2xl font-bold">Background Music Configuration</h2>
              <div>
                <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                  Music Title
                </label>
                <input
                  type="text"
                  value={musicForm.title}
                  onChange={e => setMusicForm({ ...musicForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="enableMusicCheck"
                  checked={musicForm.enabled}
                  onChange={e => setMusicForm({ ...musicForm, enabled: e.target.checked })}
                  className="w-4 h-4 accent-rose-glow"
                />
                <label htmlFor="enableMusicCheck" className="text-sm text-white/90">
                  Enable background music on public website
                </label>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                  Upload Custom MP3 / Audio File (Optional)
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={e => setMusicForm({ ...musicForm, file: e.target.files?.[0] || null })}
                  className="text-xs text-white/70"
                />
                <p className="text-xs text-white/40 mt-1">
                  If left empty, the site automatically plays a sweet music-box Happy Birthday melody synthesized in real-time.
                </p>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-rose-glow text-white font-semibold hover:opacity-90"
              >
                Save Music Configuration
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
