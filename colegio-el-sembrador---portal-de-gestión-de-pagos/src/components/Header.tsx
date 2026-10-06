import React, { useState } from 'react';
import { UserAccount } from '../types';
import { SCHOOL_INFO } from '../data/mockData';
import { 
  ShieldCheck, 
  HelpCircle, 
  Bell, 
  LogOut, 
  UserCheck, 
  Menu, 
  X,
  CreditCard,
  FileText,
  LayoutDashboard,
  Settings,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface HeaderProps {
  currentView: 'dashboard' | 'payments' | 'receipts' | 'admin';
  setCurrentView: (view: 'dashboard' | 'payments' | 'receipts' | 'admin') => void;
  currentUser: UserAccount;
  onSwitchUser: () => void;
  onLogout: () => void;
  onOpenHelp: () => void;
  pendingCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  currentUser,
  onSwitchUser,
  onLogout,
  onOpenHelp,
  pendingCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const notifications = [
    {
      id: 'notif-1',
      title: 'Próximo vencimiento colegiatura',
      desc: 'Colegiatura de Mayo vence el 10/05/2025. ¡Aprovecha pronto pago!',
      time: 'Hace 2 horas',
      type: 'warning',
    },
    {
      id: 'notif-2',
      title: 'Boleta Bimestre I Disponible',
      desc: 'Las calificaciones de Sofía y Mateo ya están publicadas.',
      time: 'Ayer',
      type: 'info',
    },
    {
      id: 'notif-3',
      title: 'Pago Aplicado Correctamente',
      desc: 'El recibo #R-8921 fue timbrado con éxito por $180.00 USD.',
      time: '04 Abr',
      type: 'success',
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#e5eeff] shadow-[0_1px_8px_rgba(15,41,74,0.06)] no-print">
      <div className="h-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-4 lg:gap-6">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00142f] rounded-lg p-1"
          >
            <img 
              alt="Colegio El Sembrador Logo" 
              className="h-9 w-auto object-contain" 
              src={SCHOOL_INFO.logoUrl} 
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-[17px] font-bold text-[#00142f] leading-tight tracking-tight">
                Colegio El Sembrador
              </span>
              <span className="text-[10px] font-bold text-[#44474e] uppercase tracking-wider">
                Portal de Gestión & Finanzas
              </span>
            </div>
          </button>
          
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-[#e5eeff] rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
            <span className="text-xs font-semibold text-[#0b1c30]">Ciclo 2025</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'dashboard'
                ? 'bg-[#e5eeff] text-[#00142f]'
                : 'text-[#44474e] hover:bg-[#dce9ff] hover:text-[#0b1c30]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setCurrentView('payments')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 relative ${
              currentView === 'payments'
                ? 'bg-[#e5eeff] text-[#00142f]'
                : 'text-[#44474e] hover:bg-[#dce9ff] hover:text-[#0b1c30]'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Gestión de Pagos</span>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#ba1a1a] text-white rounded-full leading-none">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentView('receipts')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'receipts'
                ? 'bg-[#e5eeff] text-[#00142f]'
                : 'text-[#44474e] hover:bg-[#dce9ff] hover:text-[#0b1c30]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Historial & Comprobantes</span>
          </button>

          <button
            onClick={() => setCurrentView('admin')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'admin'
                ? 'bg-[#e5eeff] text-[#00142f]'
                : 'text-[#44474e] hover:bg-[#dce9ff] hover:text-[#0b1c30]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Panel Administrativo</span>
          </button>
        </nav>

        {/* Right Section: Security Badge, Help, Notifications, User */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* SSL Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-[#6cf8bb]/30 text-[#00714d] rounded-full">
            <ShieldCheck className="w-4 h-4 text-[#006c49]" />
            <span className="text-[11px] font-bold tracking-wide">SSL 256-Bit</span>
          </div>

          {/* Help Button */}
          <button
            onClick={onOpenHelp}
            className="p-2 rounded-full text-[#44474e] hover:bg-[#e5eeff] hover:text-[#0b1c30] transition-colors relative"
            title="Soporte y Ayuda Escolar"
            aria-label="Soporte y Ayuda"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-full text-[#44474e] hover:bg-[#e5eeff] hover:text-[#0b1c30] transition-colors relative"
              title="Notificaciones"
              aria-label="Notificaciones"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-[#e5eeff] py-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 pb-2 border-b border-[#e5eeff] flex items-center justify-between">
                  <span className="text-sm font-bold text-[#00142f]">Notificaciones Institucionales</span>
                  <span className="text-[11px] text-[#006c49] font-semibold bg-[#eff4ff] px-2 py-0.5 rounded-full">3 Nuevas</span>
                </div>
                <div className="divide-y divide-[#eff4ff] max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3.5 hover:bg-[#eff4ff] transition-colors">
                      <div className="flex items-start gap-2.5">
                        {n.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                        {n.type === 'info' && <Calendar className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />}
                        {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#006c49] shrink-0 mt-0.5" />}
                        <div className="flex-1">
                          <p className="text-xs font-bold text-[#0b1c30]">{n.title}</p>
                          <p className="text-[11px] text-[#44474e] mt-0.5 leading-snug">{n.desc}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 pt-2 border-t border-[#e5eeff] text-center">
                  <button 
                    onClick={() => setNotificationsOpen(false)}
                    className="text-xs text-[#00142f] font-semibold hover:underline"
                  >
                    Cerrar notificaciones
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2.5 pl-1.5 py-1 rounded-full hover:bg-[#eff4ff] transition-colors text-left"
            >
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-[#0b1c30] leading-tight">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-[#44474e]">
                  {currentUser.role === 'parent' ? 'Sofía & Mateo' : 'Coordinación'}
                </span>
              </div>
              <img
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#e5eeff]"
                src={currentUser.avatar}
              />
            </button>

            {/* User Dropdown */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#e5eeff] py-2 z-50">
                <div className="px-4 py-2 border-b border-[#e5eeff]">
                  <p className="text-xs font-bold text-[#00142f]">{currentUser.name}</p>
                  <p className="text-[11px] text-[#44474e]">{currentUser.email}</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#00142f]">
                    {currentUser.roleTitle}
                  </span>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      onSwitchUser();
                    }}
                    className="w-full px-4 py-2 text-xs text-left text-[#0b1c30] hover:bg-[#eff4ff] flex items-center gap-2 font-medium"
                  >
                    <UserCheck className="w-4 h-4 text-[#006c49]" />
                    <span>Cambiar de Rol ({currentUser.role === 'parent' ? 'Ir a Administrador' : 'Ir a Familia'})</span>
                  </button>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full px-4 py-2 text-xs text-left text-[#ba1a1a] hover:bg-red-50 flex items-center gap-2 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#0b1c30] hover:bg-[#e5eeff]"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#e5eeff] px-6 py-4 space-y-2">
          <button
            onClick={() => {
              setCurrentView('dashboard');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold ${
              currentView === 'dashboard' ? 'bg-[#e5eeff] text-[#00142f]' : 'text-[#44474e]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => {
              setCurrentView('payments');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold ${
              currentView === 'payments' ? 'bg-[#e5eeff] text-[#00142f]' : 'text-[#44474e]'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Gestión de Pagos</span>
            {pendingCount > 0 && (
              <span className="ml-auto px-2 py-0.5 text-xs font-bold bg-[#ba1a1a] text-white rounded-full">
                {pendingCount}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              setCurrentView('receipts');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold ${
              currentView === 'receipts' ? 'bg-[#e5eeff] text-[#00142f]' : 'text-[#44474e]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Historial & Comprobantes</span>
          </button>
          <button
            onClick={() => {
              setCurrentView('admin');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold ${
              currentView === 'admin' ? 'bg-[#e5eeff] text-[#00142f]' : 'text-[#44474e]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Panel Administrativo</span>
          </button>
          <div className="pt-2 border-t border-[#e5eeff] flex justify-between items-center">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSwitchUser();
              }}
              className="text-xs text-[#006c49] font-bold py-1"
            >
              Cambiar a {currentUser.role === 'parent' ? 'Admin' : 'Familia'}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLogout();
              }}
              className="text-xs text-[#ba1a1a] font-bold py-1"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
