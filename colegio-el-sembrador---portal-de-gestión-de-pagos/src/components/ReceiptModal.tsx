import React, { useRef } from 'react';
import { Receipt } from '../types';
import { SCHOOL_INFO } from '../data/mockData';
import { X, Printer, Download, CheckCircle2, QrCode, ShieldCheck, Share2 } from 'lucide-react';

interface ReceiptModalProps {
  receipt: Receipt | null;
  onClose: () => void;
  onShowToast: (message: string) => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  receipt,
  onClose,
  onShowToast,
}) => {
  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    onShowToast(`Comprobante ${receipt.folio} descargado exitosamente en formato PDF oficial.`);
  };

  const handleShare = () => {
    onShowToast(`Enlace seguro de verificación para el recibo ${receipt.folio} copiado al portapapeles.`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#00142f]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-[#e5eeff] overflow-hidden my-auto animate-in fade-in zoom-in-95">
        
        {/* Top action bar (hidden during print) */}
        <div className="px-6 py-4 bg-[#eff4ff] border-b border-[#dce9ff] flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00142f]">
              Comprobante Oficial de Ingreso
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#6cf8bb]/40 text-[#006c49] text-[10px] font-bold">
              Timbrado SEP
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-[#44474e] hover:text-[#00142f] hover:bg-white rounded-lg transition-colors text-xs flex items-center gap-1 font-semibold"
              title="Compartir enlace de verificación"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Compartir</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-2 text-[#00142f] hover:bg-white rounded-lg transition-colors text-xs flex items-center gap-1 font-semibold"
              title="Imprimir Comprobante"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-3 py-1.5 bg-[#006c49] text-white hover:bg-[#005236] rounded-lg transition-colors text-xs flex items-center gap-1.5 font-bold shadow-sm"
              title="Descargar en PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-white transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Receipt Body */}
        <div className="p-6 sm:p-8 space-y-6" id="printable-receipt">
          
          {/* Header Institutional Letterhead */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e5eeff]">
            <div className="flex items-center gap-3">
              <img
                src={SCHOOL_INFO.logoUrl}
                alt="Logo Colegio El Sembrador"
                className="h-12 w-auto object-contain"
              />
              <div>
                <h2 className="text-base font-bold text-[#00142f] leading-tight">
                  {SCHOOL_INFO.legalName}
                </h2>
                <p className="text-[11px] text-[#44474e]">
                  {SCHOOL_INFO.cct} • RFC: {SCHOOL_INFO.rfc}
                </p>
                <p className="text-[10px] text-slate-400">
                  {SCHOOL_INFO.address}
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#44474e] block">
                Folio de Recibo
              </span>
              <span className="text-base font-bold text-[#00142f] font-mono">
                #{receipt.folio}
              </span>
              <span className="text-[10px] text-[#006c49] font-bold block mt-0.5">
                ● Estatus: Aprobado
              </span>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#f8f9ff] p-4 rounded-xl border border-[#e5eeff]">
            <div>
              <span className="text-[10px] text-[#44474e] block font-semibold">Tutor / Pagador:</span>
              <span className="font-bold text-[#0b1c30]">{receipt.tutorName}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#44474e] block font-semibold">Estudiante(s):</span>
              <span className="font-bold text-[#0b1c30]">{receipt.studentName}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#44474e] block font-semibold">Fecha y Hora:</span>
              <span className="font-medium text-[#0b1c30]">{receipt.date} {receipt.time}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#44474e] block font-semibold">Método de Pago:</span>
              <span className="font-medium text-[#0b1c30]">{receipt.paymentMethodLabel}</span>
            </div>
          </div>

          {/* Concepts Table */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00142f] mb-2">
              Desglose de Conceptos Cubiertos
            </h3>
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#eff4ff] text-[#44474e] font-bold border-b border-[#dce9ff]">
                  <th className="py-2 px-3 text-left">Concepto</th>
                  <th className="py-2 px-3 text-left">Estudiante Asignado</th>
                  <th className="py-2 px-3 text-right">Importe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {receipt.items.map((it, idx) => (
                  <tr key={idx} className="hover:bg-[#f8f9ff]">
                    <td className="py-2.5 px-3 font-semibold text-[#0b1c30]">{it.description}</td>
                    <td className="py-2.5 px-3 text-[#44474e]">{it.student}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-[#00142f]">
                      ${it.amount.toFixed(2)} USD
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Summary */}
          <div className="flex justify-end pt-2">
            <div className="w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#44474e]">
                <span>Subtotal:</span>
                <span className="font-mono">${receipt.subtotal.toFixed(2)} USD</span>
              </div>
              {receipt.discount > 0 && (
                <div className="flex justify-between text-[#006c49] font-semibold">
                  <span>Descuento Aplicado:</span>
                  <span className="font-mono">-${receipt.discount.toFixed(2)} USD</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-[#00142f] pt-2 border-t border-[#e5eeff]">
                <span>Total Liquidado:</span>
                <span className="font-mono text-base text-[#006c49]">${receipt.total.toFixed(2)} USD</span>
              </div>
            </div>
          </div>

          {/* Fiscal Stamp & Verification QR */}
          <div className="pt-4 border-t border-[#e5eeff] grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
            <div className="sm:col-span-1 flex justify-center">
              <img
                src={receipt.qrCodeUrl}
                alt="QR Verificación Fiscal"
                className="w-24 h-24 border border-slate-200 rounded-lg p-1 bg-white shadow-sm"
              />
            </div>
            <div className="sm:col-span-3 space-y-1 text-[10px] text-[#44474e]">
              <div className="flex items-center gap-1 text-[#006c49] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Documento Digital con Sello y Firma Electrónica Autorizada</span>
              </div>
              <p className="font-mono text-[9px] break-all text-slate-500">
                Folio Fiscal UUID: {receipt.uuidFiscal}
              </p>
              <p className="font-mono text-[9px] break-all text-slate-500">
                No. Autorización Bancaria: {receipt.authCode}
              </p>
              <p className="text-[9px] text-slate-400">
                Este recibo es emitido electrónicamente de conformidad con el Art. 29 del CFF y las disposiciones oficiales de la Secretaría de Educación Pública.
              </p>
            </div>
          </div>

        </div>

        {/* Modal footer */}
        <div className="px-6 py-3 bg-[#f8f9ff] border-t border-[#e5eeff] flex justify-between items-center no-print">
          <span className="text-[11px] text-[#44474e]">
            {SCHOOL_INFO.name} • Portal de Servicios Financieros 2025
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-[#00142f] bg-white border border-[#c4c6cf] hover:bg-[#eff4ff] rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
