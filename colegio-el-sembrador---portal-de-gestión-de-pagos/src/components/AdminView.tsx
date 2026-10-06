import React, { useState } from 'react';
import { Student } from '../types';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Search, 
  Send, 
  FileSpreadsheet, 
  CreditCard,
  DollarSign,
  GraduationCap,
  Sparkles
} from 'lucide-react';

interface AdminViewProps {
  students: Student[];
  onShowToast: (message: string) => void;
  onManualRegisterPayment: (studentId: string, amount: number, concept: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  students,
  onShowToast,
  onManualRegisterPayment,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [showManualPayModal, setShowManualPayModal] = useState(false);
  const [selectedStudentForPay, setSelectedStudentForPay] = useState(students[0]?.id || '');
  const [manualAmount, setManualAmount] = useState('120.00');
  const [manualConcept, setManualConcept] = useState('Colegiatura Mayo 2025 (Cobro Ventanilla)');
  const [manualMethod, setManualMethod] = useState('Efectivo en Caja');

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.tutor.toLowerCase().includes(searchTerm.toLowerCase());

    if (levelFilter === 'all') return matchesSearch;
    return matchesSearch && s.level === levelFilter;
  });

  const handleSendReminders = () => {
    onShowToast('Se enviaron 42 recordatorios de pago automáticos por WhatsApp y correo a tutores con saldo pendiente.');
  };

  const handleExportReport = () => {
    onShowToast('Reporte consolidado de tesorería "Cobranza_Ciclo_2025_Mayo.xlsx" generado exitosamente.');
  };

  const handleConfirmManualPay = (e: React.FormEvent) => {
    e.preventDefault();
    onManualRegisterPayment(selectedStudentForPay, parseFloat(manualAmount), manualConcept);
    setShowManualPayModal(false);
    onShowToast(`Pago de $${manualAmount} USD registrado en ventanilla para el alumno.`);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
      
      {/* Title & Top Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#eff4ff] text-[#00142f] rounded-full text-xs font-bold mb-2">
            <Building2 className="w-3.5 h-3.5 text-[#006c49]" />
            <span>Módulo de Tesorería & Finanzas Escolares</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#00142f] tracking-tight">
            Panel de Control Administrativo
          </h1>
          <p className="text-xs sm:text-sm text-[#44474e] mt-0.5">
            Monitoreo en tiempo real de recaudación, dispersión y estatus de cobranza del Colegio El Sembrador.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleSendReminders}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#eff4ff] text-[#00142f] hover:bg-[#dce9ff] transition-colors flex items-center gap-1.5 border border-[#dce9ff]"
          >
            <Send className="w-4 h-4 text-[#006c49]" />
            <span>Enviar Recordatorio Masivo</span>
          </button>
          <button
            onClick={handleExportReport}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#eff4ff] text-[#00142f] hover:bg-[#dce9ff] transition-colors flex items-center gap-1.5 border border-[#dce9ff]"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Exportar Excel</span>
          </button>
          <button
            onClick={() => setShowManualPayModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#00142f] text-white hover:bg-[#0f294a] transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Pago en Caja</span>
          </button>
        </div>
      </div>

      {/* KPI Bento Grid: General School Finances */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Total recaudado */}
        <div className="bg-white p-5 rounded-2xl border border-[#e5eeff] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#44474e]">
            <span>Recaudación Acumulada</span>
            <span className="p-2 bg-[#6cf8bb]/30 text-[#006c49] rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#00142f] font-mono">$148,250</span>
            <span className="text-xs text-[#44474e] ml-1 font-bold">USD</span>
            <p className="text-[11px] text-[#006c49] font-bold mt-1">
              +12.4% vs mismo bimestre de 2024
            </p>
          </div>
          <div className="w-full bg-[#eff4ff] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#006c49] h-full w-[78%]"></div>
          </div>
        </div>

        {/* Cumplimiento global */}
        <div className="bg-white p-5 rounded-2xl border border-[#e5eeff] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#44474e]">
            <span>Meta Ciclo Lectivo</span>
            <span className="p-2 bg-[#eff4ff] text-[#00142f] rounded-xl">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#00142f] font-mono">78.0%</span>
            <p className="text-[11px] text-[#44474e] mt-1">
              Meta: $190,000 USD (Presupuesto 2025)
            </p>
          </div>
          <span className="text-[10px] text-slate-400">Restan 5 meses de ciclo</span>
        </div>

        {/* Familias Al Día */}
        <div className="bg-white p-5 rounded-2xl border border-[#e5eeff] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#44474e]">
            <span>Familias al Corriente</span>
            <span className="p-2 bg-[#6cf8bb]/30 text-[#006c49] rounded-xl">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#006c49] font-mono">84.2%</span>
            <p className="text-[11px] text-[#44474e] mt-1">
              219 de 260 familias al día
            </p>
          </div>
          <span className="text-[10px] text-[#006c49] font-semibold">Tasa de morosidad controlada (15.8%)</span>
        </div>

        {/* Domiciliación y Pasarelas */}
        <div className="bg-white p-5 rounded-2xl border border-[#e5eeff] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#44474e]">
            <span>Cobranza Automatizada</span>
            <span className="p-2 bg-[#eff4ff] text-[#2563EB] rounded-xl">
              <CreditCard className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#00142f] font-mono">68.5%</span>
            <p className="text-[11px] text-[#44474e] mt-1">
              Pagos vía SPEI / Tarjeta en Línea
            </p>
          </div>
          <span className="text-[10px] text-slate-400">Ahorro administrativo de 18 hrs/semana</span>
        </div>

      </div>

      {/* Student Accounts Table & Controls */}
      <div className="bg-white rounded-2xl border border-[#e5eeff] shadow-sm overflow-hidden">
        
        {/* Table Toolbar */}
        <div className="p-5 border-b border-[#f1f5f9] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar estudiante o matrícula..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:ring-2 focus:ring-[#00142f] outline-none text-[#0b1c30]"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setLevelFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                levelFilter === 'all'
                  ? 'bg-[#00142f] text-white shadow-sm'
                  : 'text-[#44474e] hover:bg-[#eff4ff]'
              }`}
            >
              Todos los Grados
            </button>
            <button
              onClick={() => setLevelFilter('Primaria')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                levelFilter === 'Primaria'
                  ? 'bg-[#00142f] text-white shadow-sm'
                  : 'text-[#44474e] hover:bg-[#eff4ff]'
              }`}
            >
              Primaria
            </button>
            <button
              onClick={() => setLevelFilter('Secundaria')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                levelFilter === 'Secundaria'
                  ? 'bg-[#00142f] text-white shadow-sm'
                  : 'text-[#44474e] hover:bg-[#eff4ff]'
              }`}
            >
              Secundaria
            </button>
          </div>
        </div>

        {/* Student Records List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#eff4ff] text-[#44474e] text-xs font-bold uppercase tracking-wider border-b border-[#dce9ff]">
                <th className="py-3 px-6">Estudiante / Matrícula</th>
                <th className="py-3 px-4">Grado y Nivel</th>
                <th className="py-3 px-4">Tutor Registrado</th>
                <th className="py-3 px-4 text-center">Estatus Pago</th>
                <th className="py-3 px-4 text-right">Saldo Pendiente</th>
                <th className="py-3 px-6 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredStudents.map((st) => (
                <tr key={st.id} className="hover:bg-[#f8f9ff] transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={st.avatar}
                        alt={st.name}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                      />
                      <div>
                        <span className="text-xs font-bold text-[#0b1c30] block">
                          {st.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {st.matricula}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-xs font-semibold text-[#0b1c30] block">
                      {st.grade}
                    </span>
                    <span className="text-[10px] text-[#44474e]">{st.level}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-xs text-[#0b1c30] font-medium block">
                      {st.tutor}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        st.status === 'Al Día'
                          ? 'bg-[#6cf8bb]/30 text-[#006c49]'
                          : st.status === 'Beca Parcial'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-[#ffdad6] text-[#ba1a1a]'
                      }`}
                    >
                      {st.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span className="text-xs font-bold text-[#00142f] font-mono">
                      {st.status === 'Al Día' ? '$0.00' : '$120.00'} USD
                    </span>
                  </td>

                  <td className="py-3.5 px-6 text-right">
                    <button
                      onClick={() => {
                        setSelectedStudentForPay(st.id);
                        setShowManualPayModal(true);
                      }}
                      className="px-3 py-1 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#00142f] rounded-lg text-xs font-semibold transition-colors"
                    >
                      Cobrar en Caja
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Manual Payment in Cash Modal */}
      {showManualPayModal && (
        <div className="fixed inset-0 z-50 bg-[#00142f]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-[#e5eeff] space-y-4">
            <h3 className="text-base font-bold text-[#00142f]">
              Recepción Manual de Pago en Ventanilla
            </h3>
            <p className="text-xs text-[#44474e]">
              Registra pagos realizados físicamente en caja o transferencias bancarias directas.
            </p>

            <form onSubmit={handleConfirmManualPay} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-[#0b1c30] mb-1">Estudiante</label>
                <select
                  value={selectedStudentForPay}
                  onChange={(e) => setSelectedStudentForPay(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white border border-[#c4c6cf] rounded-xl outline-none"
                >
                  {students.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name} ({st.matricula} - {st.grade})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0b1c30] mb-1">Concepto</label>
                <input
                  type="text"
                  value={manualConcept}
                  onChange={(e) => setManualConcept(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white border border-[#c4c6cf] rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#0b1c30] mb-1">Monto ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={manualAmount}
                    onChange={(e) => setManualAmount(e.target.value)}
                    className="w-full p-2.5 text-xs bg-white border border-[#c4c6cf] rounded-xl outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0b1c30] mb-1">Forma de Pago</label>
                  <select
                    value={manualMethod}
                    onChange={(e) => setManualMethod(e.target.value)}
                    className="w-full p-2.5 text-xs bg-white border border-[#c4c6cf] rounded-xl outline-none"
                  >
                    <option>Efectivo en Caja</option>
                    <option>Terminal TPV Física</option>
                    <option>Transferencia SPEI Verificada</option>
                    <option>Cheque Certificado</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowManualPayModal(false)}
                  className="px-3.5 py-2 text-xs font-bold text-[#44474e] hover:bg-[#eff4ff] rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#006c49] text-white hover:bg-[#005236] rounded-xl shadow-sm"
                >
                  Emitir Recibo y Aplicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
