import React from 'react';
import { SCHOOL_INFO } from '../data/mockData';
import { X, Printer, Download, Award, CheckCircle2, QrCode, FileText } from 'lucide-react';

interface DocumentModalProps {
  docType: 'constancia' | 'calificaciones' | 'paz_y_salvo' | null;
  onClose: () => void;
  onShowToast: (message: string) => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  docType,
  onClose,
  onShowToast,
}) => {
  if (!docType) return null;

  const handleDownload = () => {
    onShowToast('Documento digital generado con firma y sello oficial descargado en PDF.');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#00142f]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-[#e5eeff] overflow-hidden my-auto animate-in fade-in zoom-in-95">
        
        {/* Top bar */}
        <div className="px-6 py-4 bg-[#eff4ff] border-b border-[#dce9ff] flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#006c49]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#00142f]">
              {docType === 'constancia' && 'Constancia Oficial de Estudios'}
              {docType === 'calificaciones' && 'Boleta Evaluativa - Bimestre I'}
              {docType === 'paz_y_salvo' && 'Certificado de Paz y Salvo Financiero'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 text-[#00142f] hover:bg-white rounded-lg transition-colors text-xs flex items-center gap-1 font-semibold"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-[#006c49] text-white hover:bg-[#005236] rounded-lg transition-colors text-xs flex items-center gap-1.5 font-bold shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Letterhead */}
          <div className="flex items-center justify-between pb-6 border-b border-[#e5eeff]">
            <div className="flex items-center gap-3">
              <img
                src={SCHOOL_INFO.logoUrl}
                alt="Logo Colegio El Sembrador"
                className="h-12 w-auto object-contain"
              />
              <div>
                <h2 className="text-base font-bold text-[#00142f] leading-tight">
                  {SCHOOL_INFO.name}
                </h2>
                <p className="text-[11px] text-[#44474e]">
                  Dirección General de Servicios Educativos e Incorporación Escolar
                </p>
                <p className="text-[10px] text-slate-400">
                  {SCHOOL_INFO.cct} • Ciclo Escolar 2024 - 2025
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 block">
                FOLIO DOC-2025-0981
              </span>
              <span className="text-xs font-semibold text-[#006c49] block">
                Vigencia: Ciclo Activo
              </span>
            </div>
          </div>

          {/* Body per docType */}
          {docType === 'constancia' && (
            <div className="space-y-4 text-xs text-[#0b1c30] leading-relaxed">
              <p className="font-bold text-center uppercase tracking-wide text-sm text-[#00142f] my-2">
                A QUIEN CORRESPONDA:
              </p>
              <p>
                La Dirección Técnica del <strong className="text-[#00142f]">{SCHOOL_INFO.legalName}</strong>, con Clave de Centro de Trabajo <strong>{SCHOOL_INFO.cct}</strong>, hace constar por medio de la presente que la alumna:
              </p>
              <div className="p-4 bg-[#f8f9ff] rounded-xl border border-[#e5eeff] space-y-1">
                <p className="text-sm font-bold text-[#00142f]">SOFÍA MORALES MÉNDEZ</p>
                <p className="text-xs text-[#44474e]">Matrícula Oficial: #SEM-50291 • CURP: MOMS140321MDFRN04</p>
                <p className="text-xs text-[#44474e]">Nivel: Primaria • Grado: 5to Grado • Grupo: B</p>
              </div>
              <p>
                Se encuentra debidamente inscrita y cursando con regularidad académica las asignaturas del plan de estudios oficial para el ciclo lectivo 2024–2025, manteniendo un promedio destacado y sin adeudo de documentación administrativa.
              </p>
              <p>
                Se expide la presente a petición de la parte interesada para los fines legales que al interesado convengan.
              </p>
            </div>
          )}

          {docType === 'calificaciones' && (
            <div className="space-y-4 text-xs text-[#0b1c30]">
              <div className="p-3 bg-[#f8f9ff] rounded-xl border border-[#e5eeff] flex justify-between items-center">
                <div>
                  <span className="font-bold text-sm block">Sofía Morales Méndez</span>
                  <span className="text-[11px] text-[#44474e]">5to de Primaria 'B' • Bimestre I (Enero - Marzo 2025)</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#44474e] block">Promedio Bimestral:</span>
                  <span className="text-base font-bold text-[#006c49]">9.8 / 10.0</span>
                </div>
              </div>

              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#eff4ff] text-[#44474e] font-bold border-b border-[#dce9ff]">
                    <th className="py-2 px-3 text-left">Asignatura</th>
                    <th className="py-2 px-3 text-center">Evaluación Continua</th>
                    <th className="py-2 px-3 text-center">Examen Bimestral</th>
                    <th className="py-2 px-3 text-right">Calificación Final</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {[
                    { mat: 'Matemáticas y Razonamiento Lógico', ec: '10.0', ex: '9.6', fin: '9.8' },
                    { mat: 'Lengua Española y Literatura', ec: '9.8', ex: '10.0', fin: '9.9' },
                    { mat: 'Ciencias Naturales & Ecología', ec: '10.0', ex: '9.5', fin: '9.8' },
                    { mat: 'Geografía e Historia Universal', ec: '9.5', ex: '9.8', fin: '9.7' },
                    { mat: 'Inglés Avanzado (Nivel B1)', ec: '10.0', ex: '10.0', fin: '10.0' },
                    { mat: 'Robótica y Tecnología Aplicada', ec: '10.0', ex: '9.8', fin: '9.9' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-[#f8f9ff]">
                      <td className="py-2 px-3 font-semibold text-[#0b1c30]">{row.mat}</td>
                      <td className="py-2 px-3 text-center text-[#44474e]">{row.ec}</td>
                      <td className="py-2 px-3 text-center text-[#44474e]">{row.ex}</td>
                      <td className="py-2 px-3 text-right font-bold text-[#00142f] font-mono">{row.fin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {docType === 'paz_y_salvo' && (
            <div className="space-y-4 text-xs text-[#0b1c30] leading-relaxed">
              <p className="font-bold text-center uppercase tracking-wide text-sm text-[#00142f] my-2">
                CONSTANCIA DE NO ADEUDO / PAZ Y SALVO FINANCIERO
              </p>
              <div className="p-4 bg-[#eff4ff] rounded-xl border border-[#dce9ff] flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#44474e]">Cuenta Familiar:</p>
                  <p className="text-sm font-bold text-[#00142f]">FAMILIA MORALES MÉNDEZ</p>
                  <p className="text-[11px] text-[#44474e]">Alumnos: Sofía Morales (5to Primaria) y Mateo Morales (2do Secundaria)</p>
                </div>
                <div className="px-3 py-1 bg-[#6cf8bb]/40 text-[#006c49] rounded-full font-bold text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>CUENTA AL DÍA</span>
                </div>
              </div>
              <p>
                El Departamento de Tesorería Escolar del <strong>{SCHOOL_INFO.name}</strong> certifica que la cuenta familiar se encuentra al corriente de sus obligaciones financieras al día de hoy, habiendo liquidado puntualmente las mensualidades del ciclo 2025 correspondientes al periodo evaluado.
              </p>
              <p className="text-[11px] text-slate-400">
                Válido para reinscripciones, trámites de becas o expedición de certificados finales de grado.
              </p>
            </div>
          )}

          {/* Official Signatures & QR */}
          <div className="pt-6 border-t border-[#e5eeff] grid grid-cols-2 gap-4 text-center text-[10px] text-[#44474e]">
            <div>
              <div className="h-12 flex items-end justify-center pb-1">
                <span className="font-serif italic text-sm text-slate-600">Mtra. Guadalupe Ramos P.</span>
              </div>
              <div className="w-48 border-t border-slate-300 mx-auto pt-1">
                <p className="font-bold text-[#00142f]">Dirección Técnica Escolar</p>
                <p>Colegio El Sembrador</p>
              </div>
            </div>

            <div>
              <div className="h-12 flex items-end justify-center pb-1">
                <span className="font-serif italic text-sm text-slate-600">Lic. Roberto Aldana</span>
              </div>
              <div className="w-48 border-t border-slate-300 mx-auto pt-1">
                <p className="font-bold text-[#00142f]">Tesorería & Control Escolar</p>
                <p>Colegio El Sembrador</p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal footer */}
        <div className="px-6 py-3 bg-[#f8f9ff] border-t border-[#e5eeff] flex justify-between items-center no-print">
          <span className="text-[11px] text-[#44474e]">
            Sello Digital Institucional Verificado con Firma C.C.T. {SCHOOL_INFO.cct}
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
