import React, { useState } from 'react';
import { SCHOOL_INFO } from '../data/mockData';
import { ShieldCheck, Lock, User, KeyRound, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';

interface LoginViewProps {
  onLoginAsParent: () => void;
  onLoginAsAdmin: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginAsParent,
  onLoginAsAdmin,
}) => {
  const [identifier, setIdentifier] = useState('familia.morales@gmail.com');
  const [password, setPassword] = useState('••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState<'parent' | 'admin'>('parent');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'parent') {
      onLoginAsParent();
    } else {
      onLoginAsAdmin();
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col justify-between relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#dce9ff]/70 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#6cf8bb]/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header bar */}
      <header className="px-6 lg:px-12 py-5 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <img
            alt="Colegio El Sembrador Logo"
            className="h-9 w-auto object-contain"
            src={SCHOOL_INFO.logoUrl}
          />
          <div>
            <h1 className="text-base font-bold text-[#00142f] leading-none">
              {SCHOOL_INFO.name}
            </h1>
            <span className="text-[10px] font-bold text-[#44474e] uppercase tracking-wider">
              Portal de Pagos & Servicios Escolares
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-[#6cf8bb]/30 text-[#00714d] rounded-full text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#006c49]" />
          <span>Servidor Seguro 256-Bit</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 z-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgba(15,41,74,0.08)] border border-[#e5eeff] p-6 sm:p-8">
          
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-[#eff4ff] text-[#00142f] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Lock className="w-7 h-7 text-[#0f294a]" />
            </div>
            <h2 className="text-2xl font-bold text-[#00142f] tracking-tight">
              Iniciar Sesión
            </h2>
            <p className="text-xs text-[#44474e] mt-1">
              Ingresa con tu correo institucional o matrícula escolar
            </p>
          </div>

          {/* Role selector tab */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-[#f1f5f9] rounded-xl mb-6">
            <button
              type="button"
              onClick={() => {
                setSelectedRole('parent');
                setIdentifier('familia.morales@gmail.com');
              }}
              className={`py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                selectedRole === 'parent'
                  ? 'bg-white text-[#00142f] shadow-sm'
                  : 'text-[#44474e] hover:text-[#00142f]'
              }`}
            >
              Padre / Tutor
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedRole('admin');
                setIdentifier('finanzas@colegiosembrador.edu');
              }}
              className={`py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                selectedRole === 'admin'
                  ? 'bg-white text-[#00142f] shadow-sm'
                  : 'text-[#44474e] hover:text-[#00142f]'
              }`}
            >
              Administración
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0b1c30] mb-1.5 uppercase tracking-wider">
                {selectedRole === 'parent' ? 'Correo o Matrícula Escolar' : 'Usuario Administrativo'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="ej. familia.morales@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00142f] focus:border-transparent text-[#0b1c30]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#0b1c30] uppercase tracking-wider">
                  Contraseña
                </label>
                <a
                  href="#recuperar"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Para restablecer tu contraseña, un código de confirmación se enviará a tu correo registrado o comunícate a Secretaría al (+52) 55 4122 8900.');
                  }}
                  className="text-[11px] font-semibold text-[#006c49] hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00142f] focus:border-transparent text-[#0b1c30]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#00142f] focus:ring-0 cursor-pointer accent-[#00142f]"
                />
                <span className="text-[#44474e]">Recordar este equipo</span>
              </label>
              <span className="text-[11px] text-[#006c49] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Sesión encriptada
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#00142f] hover:bg-[#0f294a] text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-2"
            >
              <span>Ingresar al Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick 1-Click Demo Profiles for University Presentation */}
          <div className="mt-6 pt-5 border-t border-[#e5eeff]">
            <p className="text-[11px] font-bold text-center text-[#44474e] uppercase tracking-wider mb-2.5">
              Acceso Rápido para Presentación Universitaria
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onLoginAsParent}
                className="p-2.5 rounded-xl border border-[#b0c8f1] bg-[#eff4ff] hover:bg-[#dce9ff] text-left transition-all group"
              >
                <span className="text-[11px] font-bold text-[#00142f] block leading-tight group-hover:underline">
                  Familia Morales
                </span>
                <span className="text-[10px] text-[#44474e]">
                  Tutor (Sofía & Mateo)
                </span>
              </button>

              <button
                type="button"
                onClick={onLoginAsAdmin}
                className="p-2.5 rounded-xl border border-[#c4c6cf] bg-white hover:bg-[#f8f9ff] text-left transition-all group"
              >
                <span className="text-[11px] font-bold text-[#00142f] block leading-tight group-hover:underline">
                  Lic. R. Aldana
                </span>
                <span className="text-[10px] text-[#44474e]">
                  Tesorería & Cobranza
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-[#44474e] z-10 border-t border-[#e5eeff]/60">
        © 2025 Colegio El Sembrador S.C. • Proyecto de Innovación Tecnológica en Cobranza Escolar
      </footer>
    </div>
  );
};
