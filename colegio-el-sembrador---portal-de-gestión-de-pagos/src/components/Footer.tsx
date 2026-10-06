import React from 'react';
import { Lock, Phone, Mail, Clock, Headphones, MessageSquare } from 'lucide-react';
import { SCHOOL_INFO } from '../data/mockData';

interface FooterProps {
  onOpenHelp: () => void;
  onOpenInfoModal: (title: string, content: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenHelp, onOpenInfoModal }) => {
  return (
    <footer className="w-full bg-white shadow-[0_-1px_8px_rgba(15,41,74,0.03)] mt-16 border-t border-[#e5eeff] no-print">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
          
          {/* Col 1: Institución */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#00142f]">
                {SCHOOL_INFO.name}
              </span>
            </div>
            <p className="text-xs text-[#44474e] leading-relaxed">
              Formando con excelencia académica y valores institucionales. Plataforma oficial y segura de servicios educativos, colegiaturas y recaudación escolar.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eff4ff] rounded-full text-[#0b1c30]">
              <Lock className="w-3.5 h-3.5 text-[#006c49]" />
              <span className="text-[11px] font-semibold text-[#006c49]">
                Transacciones Bancarias Seguras
              </span>
            </div>
          </div>

          {/* Col 2: Enlaces Institucionales */}
          <div className="space-y-2">
            <span className="text-sm font-bold text-[#0b1c30] block mb-3">
              Enlaces Institucionales
            </span>
            <nav className="flex flex-col space-y-2">
              <button 
                onClick={() => onOpenInfoModal('Calendario Escolar Ciclo 2025', 'El ciclo lectivo comprende del 8 de enero al 12 de diciembre de 2025. Los días de corte de colegiatura son los primeros 10 días naturales de cada mes. Fechas de evaluación trimestral: Marzo, Junio y Octubre.')}
                className="text-xs text-[#44474e] hover:text-[#00142f] transition-colors text-left"
              >
                Calendario Escolar 2025
              </button>
              <button 
                onClick={() => onOpenInfoModal('Reglamento de Pagos y Becas', 'De acuerdo con las disposiciones escolares, el descuento por pronto pago del 5% aplica al liquidar antes del día 5 de cada mes. Las familias con 2 o más estudiantes inscritos gozan de descuento por hermandad preferencial. Las becas socioeconómicas se renuevan anualmente.')}
                className="text-xs text-[#44474e] hover:text-[#00142f] transition-colors text-left"
              >
                Reglamento de Pagos y Becas
              </button>
              <button 
                onClick={() => onOpenInfoModal('Trámites y Constancias Escolares', 'Los documentos digitales emitidos en este portal cuentan con firma electrónica del Directorio Escolar y código QR de validación con validez oficial ante SEP y colegios homólogos.')}
                className="text-xs text-[#44474e] hover:text-[#00142f] transition-colors text-left"
              >
                Trámites y Constancias
              </button>
              <button 
                onClick={() => onOpenInfoModal('Admisiones & Reinscripción 2025 - 2026', 'El periodo de fichas para el siguiente ciclo escolar dará inicio en Septiembre de 2025. Alumnos activos tienen pase directo reservando su lugar con pago de matrícula antes de Julio.')}
                className="text-xs text-[#44474e] hover:text-[#00142f] transition-colors text-left"
              >
                Admisiones & Reinscripción
              </button>
            </nav>
          </div>

          {/* Col 3: Contacto y Secretaría */}
          <div className="space-y-2">
            <span className="text-sm font-bold text-[#0b1c30] block mb-3">
              Contacto y Secretaría
            </span>
            <div className="flex items-start gap-2 text-[#44474e]">
              <Phone className="w-4 h-4 text-[#00142f] shrink-0 mt-0.5" />
              <span className="text-xs">{SCHOOL_INFO.phone}</span>
            </div>
            <div className="flex items-start gap-2 text-[#44474e]">
              <Mail className="w-4 h-4 text-[#00142f] shrink-0 mt-0.5" />
              <span className="text-xs">{SCHOOL_INFO.email}</span>
            </div>
            <div className="flex items-start gap-2 text-[#44474e]">
              <Clock className="w-4 h-4 text-[#00142f] shrink-0 mt-0.5" />
              <span className="text-xs">{SCHOOL_INFO.schedule}</span>
            </div>
          </div>

          {/* Col 4: Soporte Técnico */}
          <div className="space-y-2">
            <span className="text-sm font-bold text-[#0b1c30] block mb-3">
              Soporte Técnico Portal
            </span>
            <p className="text-xs text-[#44474e] leading-relaxed">
              ¿Dudas con tu factura CFDI o pasarela de pagos SPEI/Tarjeta?
            </p>
            <div className="flex items-start gap-2 text-[#44474e]">
              <Headphones className="w-4 h-4 text-[#006c49] shrink-0 mt-0.5" />
              <span className="text-xs">{SCHOOL_INFO.soporteEmail}</span>
            </div>
            <div className="mt-3 pt-1">
              <button
                onClick={onOpenHelp}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0f294a] text-white text-xs font-semibold rounded-lg hover:bg-[#00142f] transition-colors shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Centro de Ayuda</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-6 border-t border-[#e5eeff] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#44474e]">
            © 2025 {SCHOOL_INFO.legalName}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => onOpenInfoModal('Aviso de Privacidad', 'En cumplimiento con la Ley de Protección de Datos Personales, la información financiera y académica de los estudiantes y sus tutores es procesada de manera confidencial y protegida mediante encriptación bancaria SSL 256-Bit.')}
              className="text-xs text-[#44474e] hover:text-[#00142f] transition-colors"
            >
              Aviso de Privacidad
            </button>
            <button 
              onClick={() => onOpenInfoModal('Términos del Servicio', 'El uso de este portal escolar constituye la aceptación de las condiciones de liquidación de cuotas escolares y emisión digital de comprobantes fiscales timbrados autorizados por la secretaría de educación.')}
              className="text-xs text-[#44474e] hover:text-[#00142f] transition-colors"
            >
              Términos del Servicio
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
