import React, { useState } from 'react';
import { Receipt } from '../types';
import { 
  FileText, 
  Search, 
  Download, 
  Eye, 
  Printer, 
  CheckCircle2, 
  Calendar, 
  CreditCard, 
  Building2, 
  Store,
  Filter
} from 'lucide-react';

interface ReceiptsViewProps {
  receipts: Receipt[];
  onOpenReceipt: (receiptId: string) => void;
  onShowToast: (message: string) => void;
}

export const ReceiptsView: React.FC<ReceiptsViewProps> = ({
  receipts,
  onOpenReceipt,
  onShowToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [studentFilter, setStudentFilter] = useState<'all' | 'sofia' | 'mateo'>('all');

  const filteredReceipts = receipts.filter((r) => {
    const matchesSearch =
      r.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.date.includes(searchTerm);

    if (studentFilter === 'all') return matchesSearch;
    if (studentFilter === 'sofia') return matchesSearch && r.studentName.toLowerCase().includes('sofía');
    if (studentFilter === 'mateo') return matchesSearch && r.studentName.toLowerCase().includes('mateo');
    return matchesSearch;
  });

  const totalPaidSum = receipts.reduce((acc, curr) => acc + curr.total, 0);

  const handleDownload = (folio: string) => {
    onShowToast(`Recibo #${folio} descargado en formato PDF.`);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
      {/* Title & Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#00142f] tracking-tight">
            Historial de Comprobantes & Facturas
          </h1>
          <p className="text-xs sm:text-sm text-[#44474e] mt-1">
            Consulta y descarga tus comprobantes fiscales digitales y recibos de pago autorizados por la SEP.
          </p>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-[#e5eeff] shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#6cf8bb]/30 text-[#006c49] flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-[#006c49]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#44474e] block">
              Total Acumulado Pagado 2025
            </span>
            <span className="text-lg font-bold text-[#00142f] font-mono">
              ${totalPaidSum.toFixed(2)} USD
            </span>
          </div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#e5eeff] shadow-sm mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por folio, concepto o fecha..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:ring-2 focus:ring-[#00142f] outline-none text-[#0b1c30]"
          />
        </div>

        {/* Student filter buttons */}
        <div className="flex items-center gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setStudentFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              studentFilter === 'all'
                ? 'bg-[#00142f] text-white shadow-sm'
                : 'text-[#44474e] hover:bg-[#eff4ff]'
            }`}
          >
            Todos ({receipts.length})
          </button>
          <button
            onClick={() => setStudentFilter('sofia')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              studentFilter === 'sofia'
                ? 'bg-[#00142f] text-white shadow-sm'
                : 'text-[#44474e] hover:bg-[#eff4ff]'
            }`}
          >
            Sofía Morales
          </button>
          <button
            onClick={() => setStudentFilter('mateo')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              studentFilter === 'mateo'
                ? 'bg-[#00142f] text-white shadow-sm'
                : 'text-[#44474e] hover:bg-[#eff4ff]'
            }`}
          >
            Mateo Morales
          </button>
        </div>

      </div>

      {/* Receipts Table */}
      <div className="bg-white rounded-2xl border border-[#e5eeff] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#eff4ff] text-[#44474e] text-xs font-bold uppercase tracking-wider border-b border-[#dce9ff]">
                <th className="py-3.5 px-6">Folio / Fecha</th>
                <th className="py-3.5 px-4">Concepto Detallado</th>
                <th className="py-3.5 px-4">Estudiante(s)</th>
                <th className="py-3.5 px-4">Método de Pago</th>
                <th className="py-3.5 px-4 text-right">Monto</th>
                <th className="py-3.5 px-4 text-center">Estado</th>
                <th className="py-3.5 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredReceipts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-[#44474e] text-xs">
                    No se encontraron comprobantes con el criterio especificado.
                  </td>
                </tr>
              ) : (
                filteredReceipts.map((rec) => (
                  <tr key={rec.id} className="hover:bg-[#f8f9ff] transition-colors">
                    
                    {/* Folio & Date */}
                    <td className="py-4 px-6">
                      <span className="font-mono text-xs font-bold text-[#00142f] block">
                        #{rec.folio}
                      </span>
                      <span className="text-[11px] text-[#44474e] flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" /> {rec.date}
                      </span>
                    </td>

                    {/* Concept */}
                    <td className="py-4 px-4">
                      <span className="text-xs font-bold text-[#0b1c30] block leading-snug">
                        {rec.concept}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        UUID: {rec.uuidFiscal.substring(0, 16)}...
                      </span>
                    </td>

                    {/* Student */}
                    <td className="py-4 px-4">
                      <span className="text-xs text-[#0b1c30] font-medium block">
                        {rec.studentName}
                      </span>
                      <span className="text-[10px] text-[#44474e]">
                        {rec.studentGrade}
                      </span>
                    </td>

                    {/* Payment Method */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-xs text-[#44474e]">
                        {rec.paymentMethod === 'card' && <CreditCard className="w-3.5 h-3.5 text-[#2563EB]" />}
                        {rec.paymentMethod === 'spei' && <Building2 className="w-3.5 h-3.5 text-[#006c49]" />}
                        {rec.paymentMethod === 'oxxo' && <Store className="w-3.5 h-3.5 text-amber-600" />}
                        <span className="truncate max-w-[140px]">{rec.paymentMethodLabel}</span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-4 text-right">
                      <span className="text-sm font-bold text-[#00142f] tabular-nums font-mono">
                        ${rec.total.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-[#44474e] block">USD</span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#6cf8bb]/40 text-[#006c49] text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        {rec.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenReceipt(rec.id)}
                          className="p-1.5 rounded-lg text-[#00142f] bg-[#eff4ff] hover:bg-[#dce9ff] transition-colors"
                          title="Ver Comprobante Digital"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownload(rec.folio)}
                          className="p-1.5 rounded-lg text-[#006c49] bg-[#6cf8bb]/30 hover:bg-[#6cf8bb]/50 transition-colors"
                          title="Descargar PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
