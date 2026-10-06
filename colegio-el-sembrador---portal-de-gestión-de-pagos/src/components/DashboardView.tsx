import React, { useState } from 'react';
import { PaymentItem, Receipt, Student } from '../types';
import { 
  Check, 
  CreditCard, 
  Download, 
  ArrowRight, 
  Plus, 
  FileCheck2, 
  Award, 
  ShieldCheck, 
  ChevronRight, 
  Wallet, 
  CalendarDays, 
  Receipt as ReceiptIcon, 
  Percent, 
  GraduationCap, 
  Info,
  ExternalLink,
  Bot
} from 'lucide-react';

interface DashboardViewProps {
  students: Student[];
  paymentItems: PaymentItem[];
  latestReceipt: Receipt;
  onPayItems: (selectedItemIds: string[]) => void;
  onOpenReceipt: (receiptId: string) => void;
  onOpenDocument: (type: 'constancia' | 'calificaciones' | 'paz_y_salvo') => void;
  onToggleOptionalItem: (itemId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  students,
  paymentItems,
  latestReceipt,
  onPayItems,
  onOpenReceipt,
  onOpenDocument,
  onToggleOptionalItem,
}) => {
  const [selectedStudentFilter, setSelectedStudentFilter] = useState<'all' | 'sofia' | 'mateo'>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>(['pay-sofia-mayo', 'pay-mateo-mayo']);

  // Filter payment items according to selected tab
  const displayedItems = paymentItems.filter((item) => {
    if (selectedStudentFilter === 'all') return true;
    return item.studentId === selectedStudentFilter;
  });

  // Calculate pending items and total
  const pendingItems = displayedItems.filter((item) => item.status === 'pending');
  const totalPendingAmount = pendingItems.reduce((acc, curr) => acc + curr.amount, 0);

  // Selected total for checkout
  const selectedItemsToPay = displayedItems.filter((item) => selectedIds.includes(item.id));
  const selectedTotalAmount = selectedItemsToPay.reduce((acc, curr) => acc + curr.amount, 0);

  // Toggle selection for a single item
  const handleToggleCheck = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle select all visible items
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allVisibleIds = displayedItems.map((item) => item.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...allVisibleIds])));
    } else {
      const visibleIds = new Set(displayedItems.map((item) => item.id));
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.has(id)));
    }
  };

  const allVisibleSelected =
    displayedItems.length > 0 &&
    displayedItems.every((item) => selectedIds.includes(item.id));

  // Count covered payments (months)
  const coveredCount = 4 + (paymentItems.some(p => p.monthIndex === 5 && p.status === 'paid') ? 1 : 0);
  const coveredPercentage = (coveredCount / 10) * 100;

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-12 py-8 flex flex-col gap-8">
        
        {/* Welcome Header */}
        <section className="relative overflow-hidden rounded-2xl bg-[#eff4ff] p-6 lg:p-10 shadow-sm border border-[#dce9ff]">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#dce9ff]/60 blur-3xl pointer-events-none"></div>
          <div className="absolute right-12 bottom-0 w-48 h-48 rounded-full bg-[#6cf8bb]/20 blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#e5eeff] rounded-full text-[#00142f]">
                <ShieldCheck className="w-4 h-4 text-[#006c49]" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Portal Financiero Familiar
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#00142f] tracking-tight leading-tight">
                ¡Bienvenido(a), Familia Morales Méndez!
              </h1>
              <p className="text-sm text-[#44474e]">
                Ciclo Lectivo 2025 • Estudiantes inscritos:{' '}
                <span className="font-semibold text-[#0b1c30]">Sofía Morales</span> (5to Primaria) y{' '}
                <span className="font-semibold text-[#0b1c30]">Mateo Morales</span> (2do Secundaria).
              </p>
            </div>

            {/* Student Selector Tabs */}
            <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-xl shadow-sm border border-[#e5eeff] self-start lg:self-auto">
              <button
                type="button"
                onClick={() => setSelectedStudentFilter('all')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedStudentFilter === 'all'
                    ? 'bg-[#00142f] text-white shadow-sm'
                    : 'text-[#44474e] hover:text-[#0b1c30] hover:bg-[#eff4ff]'
                }`}
              >
                Vista Consolidada
              </button>
              <button
                type="button"
                onClick={() => setSelectedStudentFilter('sofia')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedStudentFilter === 'sofia'
                    ? 'bg-[#00142f] text-white shadow-sm'
                    : 'text-[#44474e] hover:text-[#0b1c30] hover:bg-[#eff4ff]'
                }`}
              >
                Sofía (5to)
              </button>
              <button
                type="button"
                onClick={() => setSelectedStudentFilter('mateo')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedStudentFilter === 'mateo'
                    ? 'bg-[#00142f] text-white shadow-sm'
                    : 'text-[#44474e] hover:text-[#0b1c30] hover:bg-[#eff4ff]'
                }`}
              >
                Mateo (2do Sec)
              </button>
            </div>
          </div>
        </section>

        {/* Quick Financial Health KPI Bento Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* KPI 1: Total Pending Balance */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e5eeff] flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <span className="text-xs font-bold text-[#44474e] uppercase tracking-wider">
                Total Pendiente
              </span>
              <span className="p-2 rounded-xl bg-[#eff4ff] text-[#00142f]">
                <Wallet className="w-5 h-5" />
              </span>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl lg:text-[34px] font-bold text-[#00142f] tracking-tight tabular-nums">
                  ${totalPendingAmount.toFixed(2)}
                </span>
                <span className="text-xs text-[#44474e] font-bold">USD</span>
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span>
                <span className="text-[11px] font-bold">
                  {totalPendingAmount > 0 ? 'Vencimiento: 10 de Mayo' : '¡Sin pagos pendientes!'}
                </span>
              </div>
            </div>
            <div className="w-full bg-[#e5eeff] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#00142f] h-full rounded-full transition-all"
                style={{ width: totalPendingAmount > 0 ? '65%' : '100%' }}
              ></div>
            </div>
          </div>

          {/* KPI 2: Next Expiration */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e5eeff] flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <span className="text-xs font-bold text-[#44474e] uppercase tracking-wider">
                Próximo Vencimiento
              </span>
              <span className="p-2 rounded-xl bg-[#eff4ff] text-[#006c49]">
                <CalendarDays className="w-5 h-5" />
              </span>
            </div>
            <div className="my-2">
              <span className="text-base font-bold text-[#0b1c30] line-clamp-1">
                Cuota Mayo 2025
              </span>
              <p className="text-xs text-[#44474e] mt-0.5">
                Sofía Morales • Primaria
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="text-xl font-bold text-[#00142f] tabular-nums">$120.00</span>
                <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#0b1c30] text-[11px] font-semibold">
                  En 8 días
                </span>
              </div>
            </div>
            <a
              href="#obligaciones"
              className="text-xs text-[#006c49] font-bold inline-flex items-center gap-1 hover:text-[#00714d] transition-colors"
            >
              <span>Revisar desglose</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* KPI 3: Last Recorded Payment */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e5eeff] flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <span className="text-xs font-bold text-[#44474e] uppercase tracking-wider">
                Último Pago
              </span>
              <span className="p-2 rounded-xl bg-[#eff4ff] text-[#2563EB]">
                <ReceiptIcon className="w-5 h-5" />
              </span>
            </div>
            <div className="my-2">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-[#0b1c30] tracking-tight tabular-nums">
                  ${latestReceipt.total.toFixed(2)}
                </span>
                <span className="text-xs text-[#44474e]">USD</span>
              </div>
              <p className="text-xs text-[#006c49] font-semibold mt-1 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Mensualidad Abril 2025
              </p>
            </div>
            <button
              onClick={() => onOpenReceipt(latestReceipt.id)}
              className="inline-flex items-center justify-between w-full px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#00142f] text-xs font-semibold hover:bg-[#dce9ff] transition-colors"
            >
              <span>Ver Recibo #{latestReceipt.folio}</span>
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* KPI 4: Financial Standing */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e5eeff] flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <span className="text-xs font-bold text-[#44474e] uppercase tracking-wider">
                Estatus de Cuenta
              </span>
              <span className="p-2 rounded-xl bg-[#6cf8bb]/40 text-[#006c49]">
                <ShieldCheck className="w-5 h-5" />
              </span>
            </div>
            <div className="my-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#6cf8bb]/30 text-[#005236] rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
                <span className="text-xs font-bold">Al Día</span>
              </div>
              <p className="text-xs text-[#44474e] mt-2">
                1 Pago Programado por débito directo bancario SPEI.
              </p>
            </div>
            <span className="text-[11px] text-[#44474e]">
              Paz y salvo vigente hasta: <span className="font-semibold text-[#0b1c30]">10/05/2025</span>
            </span>
          </div>

        </section>

        {/* Institutional Alerts & Notices Bar */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Alert 1: Pronto Pago */}
          <div className="rounded-2xl p-4 bg-[#eff4ff] border border-[#dce9ff] flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#6cf8bb]/40 text-[#006c49] flex items-center justify-center shrink-0">
              <Percent className="w-6 h-6" />
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-[#d3e4fe] text-[#00142f]">
                  Beneficio
                </span>
                <span className="text-sm font-bold text-[#00142f]">
                  5% Descuento por Pronto Pago
                </span>
              </div>
              <p className="text-xs text-[#44474e] truncate mt-0.5">
                Aplica automáticamente liquidando la colegiatura antes del día 5 de cada mes.
              </p>
            </div>
          </div>

          {/* Alert 2: Academic report cards */}
          <div className="rounded-2xl p-4 bg-[#dce9ff]/70 border border-[#b0c8f1] flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#00142f] text-white flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-white text-[#00142f]">
                  Secretaría
                </span>
                <span className="text-sm font-bold text-[#00142f]">
                  Calificaciones Bimestre I
                </span>
              </div>
              <p className="text-xs text-[#44474e] truncate mt-0.5">
                Ya están publicadas las boletas evaluativas correspondientes al primer periodo.
              </p>
            </div>
            <button
              onClick={() => onOpenDocument('calificaciones')}
              className="shrink-0 p-2.5 rounded-xl bg-white text-[#00142f] hover:bg-[#00142f] hover:text-white transition-all shadow-sm"
              title="Descargar Boleta Evaluativa"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Main Content Grid: Ledger & Aside */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="obligaciones">
          
          {/* Left 8 Cols: Payments Table & Timeline */}
          <section className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Table Container */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e5eeff] overflow-hidden flex flex-col">
              
              {/* Header / Controls */}
              <div className="p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#f1f5f9]">
                <div>
                  <h2 className="text-lg font-bold text-[#00142f]">
                    Obligaciones y Pagos del Ciclo
                  </h2>
                  <p className="text-xs text-[#44474e] mt-0.5">
                    Selecciona los conceptos que deseas abonar o procesar en línea.
                  </p>
                </div>
                
                <button
                  onClick={() => onPayItems(selectedIds)}
                  disabled={selectedIds.length === 0}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 ${
                    selectedIds.length > 0
                      ? 'bg-[#006c49] text-white hover:bg-[#005236]'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>
                    {selectedIds.length > 0
                      ? `Pagar Seleccionados ($${selectedTotalAmount.toFixed(2)})`
                      : 'Selecciona conceptos'}
                  </span>
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#eff4ff] text-[#44474e] text-xs font-bold uppercase tracking-wider">
                      <th className="py-3 px-6 w-12 text-center">
                        <input
                          type="checkbox"
                          checked={allVisibleSelected}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="w-4 h-4 rounded text-[#00142f] focus:ring-0 cursor-pointer accent-[#00142f]"
                          title="Seleccionar todo"
                        />
                      </th>
                      <th className="py-3 px-4">Concepto / Estudiante</th>
                      <th className="py-3 px-4">Vencimiento</th>
                      <th className="py-3 px-4 text-right">Monto</th>
                      <th className="py-3 px-4 text-center">Estado</th>
                      <th className="py-3 px-6 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f5f9]">
                    {displayedItems.map((item) => {
                      const isChecked = selectedIds.includes(item.id);
                      const isPaid = item.status === 'paid';

                      return (
                        <tr
                          key={item.id}
                          className={`hover:bg-[#f8f9ff] transition-colors ${
                            isPaid ? 'opacity-70 bg-emerald-50/30' : ''
                          }`}
                        >
                          <td className="py-4 px-6 text-center">
                            {!isPaid && (
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggleCheck(item.id)}
                                className="w-4 h-4 rounded cursor-pointer accent-[#00142f]"
                              />
                            )}
                            {isPaid && (
                              <span className="w-5 h-5 rounded-full bg-[#6cf8bb]/50 text-[#006c49] inline-flex items-center justify-center">
                                <Check className="w-3 h-3" />
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#00142f] font-bold text-xs shrink-0">
                                {item.studentInitials}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-[#0b1c30] block leading-tight">
                                    {item.title}
                                  </span>
                                  {item.isOptional && (
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#44474e]">
                                      Opcional
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs text-[#44474e]">
                                  {item.description}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-xs text-[#0b1c30] font-semibold block">
                              {item.dueDate}
                            </span>
                            <span
                              className={`text-[11px] font-semibold ${
                                isPaid
                                  ? 'text-[#006c49]'
                                  : 'text-[#ba1a1a]'
                              }`}
                            >
                              {isPaid ? 'Liquidado' : item.dueNotice}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <span className="text-sm font-bold text-[#00142f] tabular-nums">
                              ${item.amount.toFixed(2)}
                            </span>
                            <span className="text-[11px] text-[#44474e] block">USD</span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            {isPaid ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#6cf8bb]/40 text-[#006c49] text-[11px] font-bold">
                                Pagado
                              </span>
                            ) : item.isOptional && item.status === 'optional' ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#eff4ff] text-[#44474e] text-[11px] font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                                No Asignado
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#eff4ff] text-[#0b1c30] text-[11px] font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                Pendiente
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-right">
                            {isPaid ? (
                              <button
                                onClick={() => onOpenReceipt(latestReceipt.id)}
                                className="px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#00142f] text-xs font-semibold hover:bg-[#dce9ff] transition-colors"
                              >
                                Ver Recibo
                              </button>
                            ) : item.isOptional && item.status === 'optional' ? (
                              <button
                                onClick={() => {
                                  onToggleOptionalItem(item.id);
                                  handleToggleCheck(item.id);
                                }}
                                className="px-3.5 py-1.5 rounded-lg bg-[#eff4ff] text-[#00142f] text-xs font-semibold hover:bg-[#dce9ff] transition-colors flex items-center gap-1 ml-auto"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Agregar</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => onPayItems([item.id])}
                                className="px-3.5 py-1.5 rounded-lg bg-[#00142f] text-white text-xs font-semibold hover:bg-[#0f294a] transition-colors shadow-sm"
                              >
                                Pagar Ahora
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Bottom Bar */}
              <div className="p-4 bg-[#eff4ff] flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#dce9ff]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#006c49] shrink-0" />
                  <span className="text-xs text-[#44474e]">
                    Métodos habilitados: Tarjeta Débito/Crédito Visa, Mastercard, Transferencia SPEI y OXXO Pay.
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#00142f] uppercase tracking-wider shrink-0">
                  Sin Comisiones Escolares
                </span>
              </div>
            </div>

            {/* Visual Timeline: School Year Payment Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e5eeff] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#00142f]">
                  Progreso de Colegiaturas Ciclo 2025
                </h3>
                <span className="text-xs font-bold text-[#006c49]">
                  {coveredCount} de 10 Cuotas Cubiertas ({coveredPercentage}%)
                </span>
              </div>

              {/* Multi-segment progress bar */}
              <div className="w-full bg-[#eff4ff] h-3 rounded-full overflow-hidden flex border border-[#e5eeff]">
                <div
                  className="bg-[#006c49] h-full transition-all duration-500"
                  style={{ width: `${coveredPercentage}%` }}
                  title="Meses pagados"
                ></div>
                {coveredCount < 5 && (
                  <div
                    className="bg-[#00142f] h-full w-[10%] animate-pulse"
                    title="Mes corriente Mayo"
                  ></div>
                )}
              </div>

              {/* 10 Months Badges */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 text-center pt-2">
                {[
                  { name: 'Ene', num: 1, done: true },
                  { name: 'Feb', num: 2, done: true },
                  { name: 'Mar', num: 3, done: true },
                  { name: 'Abr', num: 4, done: true },
                  { name: 'May', num: 5, done: coveredCount >= 5 },
                  { name: 'Jun', num: 6, done: false },
                  { name: 'Jul', num: 7, done: false },
                  { name: 'Ago', num: 8, done: false },
                  { name: 'Sep', num: 9, done: false },
                  { name: 'Oct', num: 10, done: false },
                ].map((m) => (
                  <div key={m.name} className="flex flex-col items-center">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        m.done
                          ? 'bg-[#6cf8bb]/40 text-[#006c49]'
                          : m.num === 5 && coveredCount < 5
                          ? 'bg-[#00142f] text-white shadow-sm ring-2 ring-[#e5eeff]'
                          : 'bg-[#eff4ff] text-[#44474e]'
                      }`}
                    >
                      {m.done ? '✓' : m.num}
                    </span>
                    <span
                      className={`text-[11px] mt-1 font-medium ${
                        m.num === 5 && coveredCount < 5 ? 'text-[#00142f] font-bold' : 'text-[#44474e]'
                      }`}
                    >
                      {m.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Right 4 Cols: Sidebar (Certificados & Estudiantes) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Quick Self-Service Paperwork Widget */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e5eeff] flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#eff4ff] text-[#00142f]">
                  <Award className="w-5 h-5 text-[#0f294a]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#00142f]">
                    Trámites y Certificados
                  </h3>
                  <p className="text-xs text-[#44474e]">
                    Expedición digital e inmediata con firma electrónica
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                {/* Trámite 1 */}
                <button
                  onClick={() => onOpenDocument('constancia')}
                  className="p-3 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] transition-all flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-3">
                    <FileCheck2 className="w-5 h-5 text-[#00142f] group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-xs font-bold text-[#0b1c30] block">
                        Constancia de Estudio Vigente
                      </span>
                      <span className="text-[11px] text-[#44474e]">
                        Con sello oficial SEP y QR
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#00142f] transition-colors" />
                </button>

                {/* Trámite 2 */}
                <button
                  onClick={() => onOpenDocument('calificaciones')}
                  className="p-3 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] transition-all flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-[#00142f] group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-xs font-bold text-[#0b1c30] block">
                        Certificado de Notas Parciales
                      </span>
                      <span className="text-[11px] text-[#44474e]">
                        Periodos 2024 - 2025
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#00142f] transition-colors" />
                </button>

                {/* Trámite 3 */}
                <button
                  onClick={() => onOpenDocument('paz_y_salvo')}
                  className="p-3 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] transition-all flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#006c49] group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-xs font-bold text-[#0b1c30] block">
                        Paz y Salvo Financiero
                      </span>
                      <span className="text-[11px] text-[#44474e]">
                        Descarga directa en PDF
                      </span>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-[#006c49] transition-colors" />
                </button>
              </div>

              <div className="p-3 rounded-xl bg-[#f8f9ff] text-[#44474e] text-[11px] flex items-center gap-2 border border-[#e5eeff]">
                <Info className="w-4 h-4 text-[#00142f] shrink-0" />
                <span>Documentos con validez oficial sin necesidad de acudir a la ventanilla escolar.</span>
              </div>
            </div>

            {/* Student Profiles Snapshot */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e5eeff] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#00142f]">
                  Estudiantes Asignados
                </h3>
                <span className="text-xs font-semibold text-[#44474e]">
                  {students.length} Alumnos
                </span>
              </div>

              {students.map((student) => (
                <div
                  key={student.id}
                  className="p-3 rounded-xl bg-[#eff4ff] flex items-center gap-3 border border-[#dce9ff]/60"
                >
                  <img
                    className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-white"
                    alt={student.name}
                    src={student.avatar}
                  />
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0b1c30] truncate">
                        {student.name}
                      </span>
                      <span className="text-[10px] font-bold text-[#006c49] bg-[#6cf8bb]/30 px-2 py-0.5 rounded-full">
                        {student.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#44474e] mt-0.5">
                      Matrícula: {student.matricula} • {student.grade}
                    </p>
                  </div>
                </div>
              ))}

              {/* Direct Payment Auto-Debit Box */}
              <div className="mt-2 p-4 rounded-xl bg-[#00142f] text-white flex flex-col gap-2.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#6cf8bb]" />
                    <span className="text-xs font-bold text-white">
                      Domiciliación Automática
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#6cf8bb] text-[#002113] font-bold">
                    Activo
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-snug">
                  Cobro automático en tu cuenta Clabe •••• 4019 el día 5 de cada mes con 5% de pronto pago aplicado.
                </p>
                <button 
                  onClick={() => alert('Método de cargo domiciliado actual: Santander Clabe terminación 4019. Próximo cargo programado: 05 de Mayo de 2025.')}
                  className="text-xs text-[#6cf8bb] hover:underline inline-flex items-center gap-1 self-start font-semibold mt-1"
                >
                  <span>Gestionar método de cargo</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

          </aside>
        </div>

      </div>
    </div>
  );
};
