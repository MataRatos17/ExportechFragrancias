import React, { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff, ArrowRight, CheckCircle, Package, Heart, Settings, LogOut, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useToast } from '../hooks/use-toast';

/* ── auth state mock ── */
const MOCK_USER = { name: 'Mock-UP', email: 'Mock@exemplo.pt', since: 'Abril 2025' };

/* ── sub-components ── */
const InputField = ({ label, name, type = 'text', value, onChange, icon: Icon, placeholder, extra }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  return (
    <div>
      <label className="block text-[11px] tracking-[0.22em] font-bold uppercase text-[#C0C0C0] mb-2">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]">
            <Icon size={16} />
          </div>
        )}
        <input
          type={isPassword && show ? 'text' : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-[#0a0a0a] border border-[#C0C0C0]/15 ${Icon ? 'pl-11' : 'pl-4'} ${isPassword ? 'pr-12' : 'pr-4'} py-3 text-[14px] text-[#C0C0C0] placeholder-white/25 focus:outline-none focus:border-[#C0C0C0]/60 transition-colors`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#C0C0C0] transition-colors"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {extra && <p className="mt-1.5 text-[12px] text-[#888888]">{extra}</p>}
    </div>
  );
};

/* ── Login form ── */
const LoginForm = ({ onSuccess, onSwitch }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast({ title: 'Preencha todos os campos', variant: 'destructive' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(MOCK_USER);
      toast({ title: 'Bem-vindo de volta!', description: `Olá, ${MOCK_USER.name}` });
    }, 900);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-[#C0C0C0]/10 border border-[#C0C0C0]/20 rounded-full flex items-center justify-center mx-auto mb-5">
          <User size={28} className="text-[#C0C0C0]" />
        </div>
        <h2 className="font-display text-[#C0C0C0] text-[32px] font-black uppercase tracking-tight mb-2">
          Entrar na conta
        </h2>
        {/* Correção aplicada ao Login */}
        <div className="flex items-center justify-center gap-1.5">
          <p className="text-[#888888] text-[14px]">Aceda à sua conta</p>
          <span className="text-[#D8AF73] text-[14px] font-bold">InfinityAir</span>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-5">
        <InputField label="Email" name="email" type="email" value={form.email} onChange={handle} icon={Mail} placeholder="o-seu@email.pt" />
        <InputField label="Palavra-passe" name="password" type="password" value={form.password} onChange={handle} icon={Lock} placeholder="••••••••" />

        <div className="flex items-center justify-between text-[13px]">
          <label className="flex items-center gap-2 cursor-pointer text-[#888888] hover:text-[#C0C0C0] transition-colors">
            <input type="checkbox" className="accent-[#C0C0C0]" />
            Manter sessão iniciada
          </label>
          <button type="button" className="text-[#C0C0C0] hover:text-[#C0C0C0] transition-colors font-semibold">
            Esqueceu a senha?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-3 bg-[#C0C0C0] hover:bg-[#B49838] text-[#0a0a0a] py-4 text-[12px] tracking-[0.25em] font-bold uppercase transition-all group disabled:opacity-60"
        >
          {loading ? 'A entrar...' : 'Entrar'}
          {!loading && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
        </button>
      </form>

      <div className="mt-8 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#C0C0C0]/10" />
          </div>
          <span className="relative bg-[#141414] px-4 text-[12px] text-[#888888] uppercase tracking-wider">ou</span>
        </div>
        <p className="text-[#888888] text-[14px]">
          Ainda não tem conta?{' '}
          <button onClick={onSwitch} className="text-[#C0C0C0] hover:text-[#C0C0C0] font-bold transition-colors">
            Criar conta grátis
          </button>
        </p>
      </div>
    </div>
  );
};

/* ── Register form ── */
const RegisterForm = ({ onSuccess, onSwitch }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const strength = (pw) => {
    if (!pw) return 0;
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };
  const str = strength(form.password);
  const strLabel = ['', 'Fraca', 'Razoável', 'Boa', 'Forte'][str];
  const strColor = ['', '#B49838', '#D8AF73', '#C0C0C0', '#D8AF73'][str];

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast({ title: 'Preencha todos os campos', variant: 'destructive' }); return;
    }
    if (form.password !== form.confirm) {
      toast({ title: 'As senhas não coincidem', variant: 'destructive' }); return;
    }
    if (str < 2) {
      toast({ title: 'Senha demasiado fraca', description: 'Use pelo menos 8 caracteres.', variant: 'destructive' }); return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1000);
  };

  if (done) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-10">
        <div className="w-20 h-20 bg-[#C0C0C0]/10 border border-[#C0C0C0]/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={36} className="text-[#C0C0C0]" />
        </div>
        <h2 className="font-display text-[#C0C0C0] text-[28px] font-black uppercase tracking-tight mb-3">Conta criada!</h2>
        <p className="text-[#888888] text-[15px] leading-relaxed mb-8 max-w-xs mx-auto">
          A sua conta foi criada com sucesso. Verifique o seu email para confirmar o registo.
        </p>
        <button
          onClick={() => { setDone(false); onSwitch(); }}
          className="inline-flex items-center gap-2 bg-[#C0C0C0] hover:bg-[#B49838] text-[#0a0a0a] px-8 py-3 text-[12px] tracking-[0.22em] font-bold uppercase transition-colors"
        >
          Entrar na conta <ArrowRight size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-[#C0C0C0]/10 border border-[#C0C0C0]/20 rounded-full flex items-center justify-center mx-auto mb-5">
          <User size={28} className="text-[#C0C0C0]" />
        </div>
        <h2 className="font-display text-[#C0C0C0] text-[32px] font-black uppercase tracking-tight mb-2">
          Criar conta
        </h2>
        {/* Correção aplicada ao Registo */}
        <div className="flex items-center justify-center gap-1.5">
          <p className="text-[#888888] text-[14px]">Junte-se à comunidade</p>
          <span className="text-[#D8AF73] text-[14px] font-bold">InfinityAir</span>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-5">
        <InputField label="Nome completo" name="name" value={form.name} onChange={handle} icon={User} placeholder="O seu nome" />
        <InputField label="Email" name="email" type="email" value={form.email} onChange={handle} icon={Mail} placeholder="o-seu@email.pt" />
        <div>
          <InputField label="Palavra-passe" name="password" type="password" value={form.password} onChange={handle} icon={Lock} placeholder="Min. 8 caracteres" />
          {form.password && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-1 flex-1 rounded-full transition-colors" style={{ background: i <= str ? strColor : '#141414' }} />
                ))}
              </div>
              <p className="text-[12px]" style={{ color: strColor }}>Força: {strLabel}</p>
            </div>
          )}
        </div>
        <InputField label="Confirmar senha" name="confirm" type="password" value={form.confirm} onChange={handle} icon={Lock} placeholder="Repita a palavra-passe" />

        <label className="flex items-start gap-3 cursor-pointer group">
          <input type="checkbox" required className="mt-0.5 accent-[#C0C0C0]" />
          <span className="text-[13px] text-[#888888] leading-relaxed group-hover:text-[#C0C0C0] transition-colors">
            Aceito os{' '}
            <button type="button" className="text-[#C0C0C0] hover:text-[#C0C0C0] font-semibold">Termos e Condições</button>
            {' '}e a{' '}
            <button type="button" className="text-[#C0C0C0] hover:text-[#C0C0C0] font-semibold">Política de Privacidade</button>
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-3 bg-[#C0C0C0] hover:bg-[#B49838] text-[#0a0a0a] py-4 text-[12px] tracking-[0.25em] font-bold uppercase transition-all group disabled:opacity-60"
        >
          {loading ? 'A criar conta...' : 'Criar Conta'}
          {!loading && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-[#888888] text-[14px]">
          Já tem conta?{' '}
          <button onClick={onSwitch} className="text-[#C0C0C0] hover:text-[#C0C0C0] font-bold transition-colors">
            Entrar
          </button>
        </p>
      </div>
    </div>
  );
};

/* ── Dashboard ── */
const Dashboard = ({ user, onLogout }) => {
  const [tab, setTab] = useState('orders');
  const { toast } = useToast();

  const mockOrders = [
    { id: '#INF-2041', date: '14 Abr 2025', status: 'Entregue', items: 'Difusor Infinity Pro', total: '€349,00' },
    { id: '#INF-1987', date: '02 Mar 2025', status: 'Entregue', items: 'Fragrância Royal Oud × 2', total: '€178,00' },
    { id: '#INF-1843', date: '18 Jan 2025', status: 'Entregue', items: 'Kit Amenities Premium', total: '€129,00' },
  ];

  const mockWishlist = [
    { name: 'Essência Madeira & Âmbar', price: '€69,00', cat: 'Fragrâncias' },
    { name: 'Difusor Compact X', price: '€199,00', cat: 'Difusores' },
  ];

  const statusColor = { 'Entregue': '#D8AF73', 'Em trânsito': '#B49838', 'Processando': '#888888' };

  const tabs = [
    { id: 'orders', label: 'Encomendas', Icon: Package },
    { id: 'wishlist', label: 'Lista de Desejos', Icon: Heart },
    { id: 'settings', label: 'Definições', Icon: Settings },
  ];

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-16">
      <div className="bg-[#141414] border border-[#C0C0C0]/10 p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="w-20 h-20 bg-gradient-to-br from-[#C0C0C0]/20 to-[#C0C0C0]/5 border border-[#C0C0C0]/20 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-[28px] font-black text-[#C0C0C0]">
            {user.name.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <h2 className="font-display text-[#C0C0C0] text-[26px] font-black uppercase tracking-tight mb-1">{user.name}</h2>
          <p className="text-[#888888] text-[14px]">{user.email}</p>
          <p className="text-[#C0C0C0]/60 text-[12px] tracking-[0.15em] uppercase mt-1">Membro desde {user.since}</p>
        </div>
        <button
          onClick={() => { onLogout(); toast({ title: 'Sessão terminada', description: 'Até logo!' }); }}
          className="flex items-center gap-2 text-[#888888] hover:text-[#C0C0C0] border border-[#C0C0C0]/15 hover:border-[#C0C0C0]/40 px-5 py-2.5 text-[12px] tracking-[0.15em] font-bold uppercase transition-colors"
        >
          <LogOut size={15} />
          Sair
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-1">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`w-full flex items-center justify-between px-5 py-3.5 text-[13px] tracking-wider font-bold uppercase transition-all ${
                tab === id
                  ? 'bg-[#C0C0C0] text-[#0a0a0a]'
                  : 'text-[#888888] hover:text-[#C0C0C0] hover:bg-[#141414] border border-[#C0C0C0]/10'
              }`}
            >
              <span className="flex items-center gap-3"><Icon size={15} />{label}</span>
              <ChevronRight size={14} />
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 bg-[#141414] border border-[#C0C0C0]/10 p-8">
          {tab === 'orders' && (
            <div>
              <h3 className="font-display text-[#C0C0C0] text-[20px] font-black uppercase tracking-tight mb-6">As minhas encomendas</h3>
              <div className="space-y-4">
                {mockOrders.map((o) => (
                  <div key={o.id} className="bg-[#0a0a0a] border border-[#C0C0C0]/10 p-5 hover:border-[#C0C0C0]/25 transition-colors">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="text-[#C0C0C0] font-bold text-[15px]">{o.id}</p>
                        <p className="text-[#888888] text-[13px]">{o.date}</p>
                      </div>
                      <span className="text-[11px] tracking-[0.15em] font-bold uppercase px-3 py-1 rounded-full" style={{ color: statusColor[o.status], background: `${statusColor[o.status]}18` }}>
                        {o.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[#C0C0C0] text-[14px]">{o.items}</p>
                      <p className="text-[#C0C0C0] font-black text-[16px]">{o.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'wishlist' && (
            <div>
              <h3 className="font-display text-[#C0C0C0] text-[20px] font-black uppercase tracking-tight mb-6">Lista de desejos</h3>
              <div className="space-y-4">
                {mockWishlist.map((w) => (
                  <div key={w.name} className="bg-[#0a0a0a] border border-[#C0C0C0]/10 p-5 flex items-center justify-between hover:border-[#C0C0C0]/25 transition-colors">
                    <div>
                      <p className="text-[#C0C0C0] text-[10px] tracking-[0.22em] font-bold uppercase mb-1">{w.cat}</p>
                      <p className="text-[#C0C0C0] font-bold text-[15px]">{w.name}</p>
                      <p className="text-[#C0C0C0] font-black text-[16px] mt-1">{w.price}</p>
                    </div>
                    <button className="bg-[#C0C0C0] hover:bg-[#B49838] text-[#0a0a0a] px-5 py-2.5 text-[11px] tracking-[0.2em] font-bold uppercase transition-colors">
                      Adicionar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'settings' && (
            <div>
              <h3 className="font-display text-[#C0C0C0] text-[20px] font-black uppercase tracking-tight mb-6">Definições da conta</h3>
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] tracking-[0.22em] font-bold uppercase text-[#888888] mb-2">Nome</label>
                    <input defaultValue={user.name} className="w-full bg-[#0a0a0a] border border-[#C0C0C0]/15 px-4 py-3 text-[14px] text-[#C0C0C0] focus:outline-none focus:border-[#C0C0C0]/50" />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-[0.22em] font-bold uppercase text-[#888888] mb-2">Email</label>
                    <input defaultValue={user.email} className="w-full bg-[#0a0a0a] border border-[#C0C0C0]/15 px-4 py-3 text-[14px] text-[#C0C0C0] focus:outline-none focus:border-[#C0C0C0]/50" />
                  </div>
                </div>
                <button className="bg-[#C0C0C0] text-[#0a0a0a] px-8 py-3 text-[12px] font-bold uppercase tracking-[0.2em]">Guardar</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Main page ── */
const Perfil = () => {
  const [mode, setMode] = useState('login');
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      {!user ? (
        <>
          <section className="bg-[#050505] pt-44 pb-10 px-6 border-b border-[#C0C0C0]/10 text-center">
            <p className="text-[#C0C0C0] text-[13px] tracking-[0.3em] font-bold uppercase mb-4">Área Reservada</p>
            <h1 className="font-display text-[#C0C0C0] text-[40px] md:text-[58px] font-black uppercase tracking-tight">A sua conta</h1>
            <div className="max-w-xs mx-auto mt-8 grid grid-cols-2 border border-[#C0C0C0]/15">
              <button onClick={() => setMode('login')} className={`py-3 text-[12px] tracking-[0.2em] font-bold uppercase transition-colors ${mode === 'login' ? 'bg-[#C0C0C0] text-[#0a0a0a]' : 'text-[#888888]'}`}>Entrar</button>
              <button onClick={() => setMode('register')} className={`py-3 text-[12px] tracking-[0.2em] font-bold uppercase transition-colors ${mode === 'register' ? 'bg-[#C0C0C0] text-[#0a0a0a]' : 'text-[#888888]'}`}>Registar</button>
            </div>
          </section>
          <section className="py-16 px-6">
            <div className="bg-[#141414] border border-[#C0C0C0]/10 max-w-lg mx-auto p-10 md:p-14">
              {mode === 'login' ? <LoginForm onSuccess={setUser} onSwitch={() => setMode('register')} /> : <RegisterForm onSuccess={setUser} onSwitch={() => setMode('login')} />}
            </div>
          </section>
        </>
      ) : (
        <div className="pt-32"><Dashboard user={user} onLogout={() => setUser(null)} /></div>
      )}
      <Footer />
    </div>
  );
};

export default Perfil;