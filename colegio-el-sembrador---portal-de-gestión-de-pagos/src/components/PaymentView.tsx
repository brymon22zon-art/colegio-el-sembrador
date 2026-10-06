import React, { useState } from 'react';
import { PaymentItem, Receipt } from '../types';
import { 
  CreditCard, 
  Building2, 
  Store, 
  ShieldCheck, 
  Copy, 
  Check, 
  ArrowLeft, 
  Lock, 
  Sparkles, 
  AlertCircle,
  FileCheck2,
  Calendar,
  Percent,
  Barcode
} from 'lucide-react';

interface PaymentViewProps {
  allPendingItems: PaymentItem[];
  preSelectedIds: string[];
  onBackToDashboard: () => void;
  onPaymentSuccess: (newReceipt: Receipt, paidItemIds: string[]) => void;
}

export const PaymentView: React.FC<PaymentViewProps> = ({
  allPendingItems,
  preSelectedIds,
  onBackToDashboard,
  onPaymentSuccess,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    preSelectedIds.length > 0 ? preSelectedIds : allPendingItems.map(i => i.id)
  );

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'spei' | 'oxxo'>('card');
  const [copiedClabe, setCopiedClabe] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  
  // Card form states
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 4019');
  const [cardHolder, setCardHolder] = useState('FAMILIA MORALES MENDEZ');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('842');
  const [applyEarlyDiscount, setApplyEarlyDiscount] = useState(true);

  // Selected items calculation
  const selectedItems = allPendingItems.filter(item => selectedIds.includes(item.id));
  const subtotal = selectedItems.reduce((acc, curr) => acc + curr.amount, 0);
  const discount = applyEarlyDiscount && subtotal > 0 ? Number((subtotal * 0.05).toFixed(2)) : 0;
  const totalToPay = Math.max(0, subtotal - discount);

  const speiClabe = '646180123456789012';
  const speiReference = 'SEM-2025-05-9014';
  const oxxoBarcode = '9382 1049 5820 1849';

  const toggleItem = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const fillTestCard = () => {
    setCardNumber('4152 8201 9402 4019');
    setCardHolder('SOFIA MENDEZ DE MORALES');
    setCardExpiry('11/27');
    setCardCvv('319');
  };

  const handleCopy = (text: string, type: 'clabe' | 'ref') => {
    navigator.clipboard.writeText(text);
    if (type === 'clabe') {
      setCopiedClabe(true);
      setTimeout(() => setCopiedClabe(false), 2000);
    } else {
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const handleProcessPayment = () => {
    if (selectedItems.length === 0) return;

    setIsProcessing(true);
    setProcessingStep('Iniciando túnel de pago encriptado SSL 256-Bit...');

    setTimeout(() => {
      setProcessingStep('Validando fondos y autorización bancaria 3D Secure...');
    }, 900);

    setTimeout(() => {
      setProcessingStep('Emitiendo Comprobante Fiscal Digital y timbrado SEP...');
    }, 1800);

    setTimeout(() => {
      // Build new receipt
      const now = new Date();
      const randomFolioNum = Math.floor(1000 + Math.random() * 9000);
      const folio = `R-${randomFolioNum}`;
      
      const newReceipt: Receipt = {
        id: `rec-${randomFolioNum}`,
        folio: folio,
        studentId: selectedItems[0]?.studentId || 'sofia',
        studentName: selectedItems.map(i => i.studentName).filter((v, i, a) => a.indexOf(v) === i).join(' & '),
        studentGrade: 'Primaria / Secundaria',
        studentMatricula: '#SEM-50291 / #SEM-20412',
        tutorName: 'Familia Morales Méndez',
        concept: selectedItems.map(i => i.title).join(' + '),
        items: selectedItems.map(i => ({
          description: i.title,
          student: i.studentName,
          amount: i.amount,
        })),
        subtotal: subtotal,
        discount: discount,
        total: totalToPay,
        date: `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`,
        time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} hrs`,
        paymentMethod: paymentMethod,
        paymentMethodLabel: 
          paymentMethod === 'card' 
            ? `Tarjeta de Crédito / Débito (•••• ${cardNumber.slice(-4)})` 
            : paymentMethod === 'spei' 
            ? 'Transferencia Directa SPEI (Ref: ' + speiReference + ')' 
            : 'Pago en Ventanilla Comercial OXXO Pay',
        authCode: `AUTH-${Math.floor(100000 + Math.random() * 900000)}`,
        uuidFiscal: `${Math.random().toString(36).substring(2, 10).toUpperCase()}-7B12-4DF8-9F01-${Math.random().toString(36).substring(2, 14).toUpperCase()}`,
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=COLEGIO-SEM-${folio}-${totalToPay}USD`,
        status: 'Aprobado',
      };

      setIsProcessing(false);
      onPaymentSuccess(newReceipt, selectedIds);
    }, 2800);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
      {/* Top breadcrumb & back button */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#00142f] hover:text-[#006c49] transition-colors bg-white px-3 py-2 rounded-xl border border-[#e5eeff] shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Dashboard</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#006c49] font-bold bg-[#6cf8bb]/30 px-3 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4 text-[#006c49]" />
          <span>Pasarela Protegida • Banco Santander & STP</span>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#00142f] tracking-tight">
          Pasarela Institucional de Pagos
        </h1>
        <p className="text-xs sm:text-sm text-[#44474e] mt-1">
          Liquida colegiaturas, talleres extracurriculares y derechos escolares en segundos con confirmación inmediata.
        </p>
      </div>

      {/* Main Grid: 7 cols payment configuration + 5 cols breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Section: Select concepts & Choose Payment Method */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Concept selection cards */}
          <div className="bg-white rounded-2xl p-6 border border-[#e5eeff] shadow-sm">
            <h2 className="text-sm font-bold text-[#00142f] uppercase tracking-wider mb-3">
              1. Selecciona los Conceptos a Liquidar
            </h2>

            {allPendingItems.length === 0 ? (
              <div className="p-6 text-center text-[#44474e] bg-[#f8f9ff] rounded-xl border border-dashed border-[#c4c6cf]">
                <FileCheck2 className="w-8 h-8 text-[#006c49] mx-auto mb-2" />
                <p className="text-sm font-bold text-[#0b1c30]">¡Excelente! No tienes colegiaturas pendientes</p>
                <p className="text-xs mt-1">Tu cuenta familiar se encuentra al corriente para el ciclo actual.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {allPendingItems.map((item) => {
                  const isChecked = selectedIds.includes(item.id);
                  return (
                    <label
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'border-[#00142f] bg-[#eff4ff] shadow-sm'
                          : 'border-[#e5eeff] hover:bg-[#f8f9ff]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // handled by parent label
                          className="w-4 h-4 rounded text-[#00142f] cursor-pointer accent-[#00142f]"
                        />
                        <div>
                          <span className="text-xs font-bold text-[#0b1c30] block">
                            {item.title}
                          </span>
                          <span className="text-[11px] text-[#44474e]">
                            {item.description} • {item.dueDate}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-[#00142f] tabular-nums">
                          ${item.amount.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-[#44474e] block">USD</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white rounded-2xl p-6 border border-[#e5eeff] shadow-sm">
            <h2 className="text-sm font-bold text-[#00142f] uppercase tracking-wider mb-4">
              2. Método de Pago
            </h2>

            <div className="grid grid-cols-3 gap-2.5 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center ${
                  paymentMethod === 'card'
                    ? 'border-[#00142f] bg-[#00142f] text-white shadow-md'
                    : 'border-[#e5eeff] text-[#44474e] hover:bg-[#f8f9ff]'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-xs font-bold leading-tight">Tarjeta Débito / Crédito</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('spei')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center ${
                  paymentMethod === 'spei'
                    ? 'border-[#00142f] bg-[#00142f] text-white shadow-md'
                    : 'border-[#e5eeff] text-[#44474e] hover:bg-[#f8f9ff]'
                }`}
              >
                <Building2 className="w-5 h-5" />
                <span className="text-xs font-bold leading-tight">Transferencia SPEI</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('oxxo')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center ${
                  paymentMethod === 'oxxo'
                    ? 'border-[#00142f] bg-[#00142f] text-white shadow-md'
                    : 'border-[#e5eeff] text-[#44474e] hover:bg-[#f8f9ff]'
                }`}
              >
                <Store className="w-5 h-5" />
                <span className="text-xs font-bold leading-tight">OXXO Pay / Tienda</span>
              </button>
            </div>

            {/* Sub-view: Credit Card */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                {/* Visual Card representation */}
                <div className="p-5 rounded-2xl bg-gradient-to-tr from-[#00142f] via-[#0f294a] to-[#2563eb] text-white shadow-lg relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-44 h-44 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-6 bg-amber-400 rounded-md shadow-inner flex items-center justify-center">
                        <div className="w-5 h-3 border border-amber-600/50 rounded-sm"></div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                        Débito Familiar
                      </span>
                    </div>
                    <span className="text-xs font-bold tracking-wider text-slate-200">
                      Colegio El Sembrador
                    </span>
                  </div>

                  <div className="text-lg sm:text-xl font-mono tracking-widest mb-4">
                    {cardNumber || '•••• •••• •••• ••••'}
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Titular</span>
                      <span className="text-xs font-semibold tracking-wide">{cardHolder || 'NOMBRE TITULAR'}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Vence</span>
                      <span className="text-xs font-semibold tracking-wide">{cardExpiry || 'MM/AA'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={fillTestCard}
                    className="text-xs text-[#006c49] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Llenar con tarjeta de prueba familiar</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#0b1c30] mb-1">Número de Tarjeta</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="16 dígitos de la tarjeta"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#c4c6cf] rounded-xl focus:ring-2 focus:ring-[#00142f] outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#0b1c30] mb-1">Nombre en la Tarjeta</label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Nombre tal como aparece"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#c4c6cf] rounded-xl focus:ring-2 focus:ring-[#00142f] outline-none uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0b1c30] mb-1">Vencimiento (MM/AA)</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/AA"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#c4c6cf] rounded-xl focus:ring-2 focus:ring-[#00142f] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0b1c30] mb-1">CVV / CVC</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="3 o 4 dígitos"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#c4c6cf] rounded-xl focus:ring-2 focus:ring-[#00142f] outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Sub-view: SPEI */}
            {paymentMethod === 'spei' && (
              <div className="space-y-4 bg-[#eff4ff] p-5 rounded-2xl border border-[#dce9ff]">
                <div className="flex items-center gap-2 text-[#006c49] font-bold text-xs">
                  <Check className="w-4 h-4" />
                  <span>Acreditación instantánea 24/7 sin comisión</span>
                </div>

                <div className="space-y-3">
                  <div className="bg-white p-3.5 rounded-xl border border-[#e5eeff]">
                    <span className="text-[10px] uppercase font-bold text-[#44474e] block">CLABE Interbancaria Única</span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-mono font-bold text-[#00142f] tracking-wider">{speiClabe}</span>
                      <button
                        onClick={() => handleCopy(speiClabe, 'clabe')}
                        className="px-2.5 py-1 text-xs font-semibold bg-[#eff4ff] text-[#00142f] hover:bg-[#dce9ff] rounded-lg transition-colors flex items-center gap-1"
                      >
                        {copiedClabe ? <Check className="w-3.5 h-3.5 text-[#006c49]" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedClabe ? '¡Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-[#e5eeff]">
                    <span className="text-[10px] uppercase font-bold text-[#44474e] block">Referencia Alfanumérica Obligatoria</span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-mono font-bold text-[#00142f]">{speiReference}</span>
                      <button
                        onClick={() => handleCopy(speiReference, 'ref')}
                        className="px-2.5 py-1 text-xs font-semibold bg-[#eff4ff] text-[#00142f] hover:bg-[#dce9ff] rounded-lg transition-colors flex items-center gap-1"
                      >
                        {copiedRef ? <Check className="w-3.5 h-3.5 text-[#006c49]" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedRef ? '¡Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-white rounded-lg border border-[#e5eeff]">
                      <span className="text-[10px] text-[#44474e] block">Banco Receptor</span>
                      <span className="font-bold text-[#00142f]">STP / Santander</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-[#e5eeff]">
                      <span className="text-[10px] text-[#44474e] block">Beneficiario</span>
                      <span className="font-bold text-[#00142f]">Colegio El Sembrador S.C.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-view: OXXO */}
            {paymentMethod === 'oxxo' && (
              <div className="space-y-4 bg-[#eff4ff] p-5 rounded-2xl border border-[#dce9ff]">
                <div className="text-center">
                  <span className="text-xs font-bold text-[#00142f] block">
                    Ficha Digital de Depósito OXXO Pay
                  </span>
                  <p className="text-[11px] text-[#44474e] mt-0.5">
                    Presenta este código al cajero. El pago se reflejará de inmediato en el portal escolar.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#e5eeff] flex flex-col items-center">
                  <Barcode className="w-48 h-12 text-[#00142f]" />
                  <span className="font-mono text-sm font-bold tracking-widest text-[#00142f] mt-1">
                    {oxxoBarcode}
                  </span>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>OXXO cobra una comisión fija de $15.00 MXN en ventanilla por recepción de servicios.</span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Section: Order summary breakdown */}
        <div className="lg:col-span-5 flex flex-col gap-5 sticky top-28">
          <div className="bg-white rounded-2xl p-6 border border-[#e5eeff] shadow-sm">
            <h3 className="text-sm font-bold text-[#00142f] uppercase tracking-wider mb-4">
              Resumen de la Transacción
            </h3>

            {/* Concepts list */}
            <div className="divide-y divide-[#f1f5f9] max-h-56 overflow-y-auto pr-1 mb-4">
              {selectedItems.length === 0 ? (
                <p className="text-xs text-[#44474e] py-3 text-center">
                  Selecciona al menos un concepto a pagar.
                </p>
              ) : (
                selectedItems.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-[#0b1c30] block leading-tight">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-[#44474e]">
                        {item.studentName}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#00142f] tabular-nums shrink-0">
                      ${item.amount.toFixed(2)} USD
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Pronto pago toggle */}
            <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-[#006c49]" />
                <div>
                  <span className="text-xs font-bold text-[#00142f] block leading-none">
                    Pronto Pago (5%)
                  </span>
                  <span className="text-[10px] text-[#44474e]">
                    Vigente antes del 5 de Mayo
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={applyEarlyDiscount}
                onChange={(e) => setApplyEarlyDiscount(e.target.checked)}
                className="w-4 h-4 rounded text-[#006c49] cursor-pointer accent-[#006c49]"
              />
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-2 border-t border-[#f1f5f9] text-xs">
              <div className="flex justify-between text-[#44474e]">
                <span>Subtotal ({selectedItems.length} conceptos)</span>
                <span className="font-semibold text-[#0b1c30] tabular-nums">${subtotal.toFixed(2)} USD</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-[#006c49] font-semibold">
                  <span>Descuento Pronto Pago (5%)</span>
                  <span className="tabular-nums">-${discount.toFixed(2)} USD</span>
                </div>
              )}

              <div className="flex justify-between text-base font-bold text-[#00142f] pt-2 border-t border-[#e5eeff]">
                <span>Total a Pagar</span>
                <span className="text-xl text-[#006c49] tabular-nums">${totalToPay.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              type="button"
              onClick={handleProcessPayment}
              disabled={selectedItems.length === 0 || isProcessing}
              className={`w-full mt-6 py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
                selectedItems.length > 0 && !isProcessing
                  ? 'bg-[#006c49] hover:bg-[#005236] text-white cursor-pointer hover:shadow-lg'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>
                {isProcessing 
                  ? 'Procesando Pago Seguro...' 
                  : `Confirmar y Pagar $${totalToPay.toFixed(2)} USD`}
              </span>
            </button>

            <p className="text-[10px] text-center text-[#44474e] mt-3 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#006c49]" />
              <span>Emisión inmediata de CFDI timbrado ante la SEP</span>
            </p>
          </div>
        </div>

      </div>

      {/* Processing Modal Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-[#00142f]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center space-y-4 border border-[#e5eeff]">
            <div className="w-16 h-16 rounded-full bg-[#eff4ff] text-[#006c49] flex items-center justify-center mx-auto animate-spin">
              <ShieldCheck className="w-8 h-8 text-[#006c49]" />
            </div>
            <h3 className="text-lg font-bold text-[#00142f]">
              Procesando Pago Institucional
            </h3>
            <p className="text-xs text-[#44474e] animate-pulse font-medium">
              {processingStep}
            </p>
            <div className="w-full bg-[#e5eeff] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#006c49] h-full w-2/3 animate-pulse"></div>
            </div>
            <p className="text-[10px] text-slate-400">
              No cierres ni recargues la ventana durante la emisión del comprobante.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
