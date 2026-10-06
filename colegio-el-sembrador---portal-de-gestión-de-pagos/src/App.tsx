import React, { useState } from 'react';
import { UserAccount, Student, PaymentItem, Receipt } from './types';
import { 
  PARENT_USER, 
  ADMIN_USER, 
  STUDENTS_DATA, 
  INITIAL_PAYMENT_ITEMS, 
  INITIAL_RECEIPTS 
} from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoginView } from './components/LoginView';
import { DashboardView } from './components/DashboardView';
import { PaymentView } from './components/PaymentView';
import { ReceiptsView } from './components/ReceiptsView';
import { AdminView } from './components/AdminView';
import { ReceiptModal } from './components/ReceiptModal';
import { DocumentModal } from './components/DocumentModal';
import { InfoModal } from './components/InfoModal';
import { NotificationToast } from './components/NotificationToast';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserAccount>(PARENT_USER);
  const [currentView, setCurrentView] = useState<'dashboard' | 'payments' | 'receipts' | 'admin'>('dashboard');
  
  // Data State
  const [students, setStudents] = useState<Student[]>(STUDENTS_DATA);
  const [paymentItems, setPaymentItems] = useState<PaymentItem[]>(INITIAL_PAYMENT_ITEMS);
  const [receipts, setReceipts] = useState<Receipt[]>(INITIAL_RECEIPTS);

  // Modals & Popups State
  const [selectedReceiptForModal, setSelectedReceiptForModal] = useState<Receipt | null>(null);
  const [activeDocument, setActiveDocument] = useState<'constancia' | 'calificaciones' | 'paz_y_salvo' | null>(null);
  const [infoModalData, setInfoModalData] = useState<{ title: string; content: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [paymentPreselectedIds, setPaymentPreselectedIds] = useState<string[]>([]);

  // Count pending obligations for badge
  const pendingCount = paymentItems.filter((i) => i.status === 'pending').length;

  // Handle Switch User (Parent <-> Admin)
  const handleSwitchUser = () => {
    if (currentUser.role === 'parent') {
      setCurrentUser(ADMIN_USER);
      setCurrentView('admin');
      showToast('Sesión cambiada a Coordinación Administrativa (Lic. Roberto Aldana)');
    } else {
      setCurrentUser(PARENT_USER);
      setCurrentView('dashboard');
      showToast('Sesión cambiada a Tutor Familiar (Familia Morales Méndez)');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    showToast('Sesión cerrada correctamente.');
  };

  const handleLoginAsParent = () => {
    setCurrentUser(PARENT_USER);
    setIsLoggedIn(true);
    setCurrentView('dashboard');
    showToast('¡Bienvenido(a), Familia Morales Méndez!');
  };

  const handleLoginAsAdmin = () => {
    setCurrentUser(ADMIN_USER);
    setIsLoggedIn(true);
    setCurrentView('admin');
    showToast('¡Bienvenido, Lic. Roberto Aldana (Tesorería Escolar)!');
  };

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  // Trigger Payment Flow from Dashboard
  const handlePayItems = (selectedItemIds: string[]) => {
    setPaymentPreselectedIds(selectedItemIds);
    setCurrentView('payments');
  };

  // Payment completed callback
  const handlePaymentSuccess = (newReceipt: Receipt, paidItemIds: string[]) => {
    // 1. Mark items as paid
    setPaymentItems((prev) =>
      prev.map((item) =>
        paidItemIds.includes(item.id)
          ? { ...item, status: 'paid', dueNotice: 'Liquidado' }
          : item
      )
    );

    // 2. Add receipt to list
    setReceipts((prev) => [newReceipt, ...prev]);

    // 3. Open receipt modal and show toast
    setSelectedReceiptForModal(newReceipt);
    showToast(`¡Pago exitoso! Se generó el Comprobante Oficial #${newReceipt.folio} por $${newReceipt.total.toFixed(2)} USD.`);
    setCurrentView('dashboard');
  };

  // Toggle optional workshop or lab items
  const handleToggleOptionalItem = (itemId: string) => {
    setPaymentItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, status: item.status === 'optional' ? 'pending' : 'optional' }
          : item
      )
    );
    showToast('Concepto curricular actualizado en tu estado de cuenta.');
  };

  // Manual payment registered by admin
  const handleManualRegisterPayment = (studentId: string, amount: number, concept: string) => {
    const student = students.find((s) => s.id === studentId) || students[0];
    const now = new Date();
    const randomFolioNum = Math.floor(1000 + Math.random() * 9000);
    const folio = `R-${randomFolioNum}`;

    const newReceipt: Receipt = {
      id: `rec-${randomFolioNum}`,
      folio: folio,
      studentId: student.id,
      studentName: student.name,
      studentGrade: student.grade,
      studentMatricula: student.matricula,
      tutorName: student.tutor,
      concept: concept,
      items: [
        {
          description: concept,
          student: student.name,
          amount: amount,
        },
      ],
      subtotal: amount,
      discount: 0,
      total: amount,
      date: `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`,
      time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} hrs`,
      paymentMethod: 'cash',
      paymentMethodLabel: 'Cobro Manual en Ventanilla / Caja Escolar',
      authCode: `CAJA-${Math.floor(100000 + Math.random() * 900000)}`,
      uuidFiscal: `${Math.random().toString(36).substring(2, 10).toUpperCase()}-9F01-${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=COLEGIO-SEM-${folio}-${amount}USD`,
      status: 'Aprobado',
    };

    setReceipts((prev) => [newReceipt, ...prev]);

    // Update student status to 'Al Día'
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, status: 'Al Día' } : s))
    );

    // If the student has pending payments matching, mark them paid
    setPaymentItems((prev) =>
      prev.map((item) =>
        item.studentId === studentId && item.status === 'pending'
          ? { ...item, status: 'paid', dueNotice: 'Liquidado' }
          : item
      )
    );
  };

  const handleOpenHelp = () => {
    setInfoModalData({
      title: 'Centro de Ayuda & Preguntas Frecuentes',
      content:
        'Bienvenido al Centro de Asistencia Escolar. Recuerda que los pagos de colegiatura se reciben dentro de los primeros 10 días de cada mes. Para acceder al 5% de descuento por pronto pago, efectúa tu transacción antes del día 5. Las transferencias SPEI quedan acreditadas de forma automática en un lapso de 1 a 5 minutos. Ante cualquier duda contáctanos a soporte@colegiosembrador.edu o al teléfono (+52) 55 4122 8900 Ext. 104.',
    });
  };

  const handleOpenInfoModal = (title: string, content: string) => {
    setInfoModalData({ title, content });
  };

  // If user is logged out, show login screen
  if (!isLoggedIn) {
    return (
      <LoginView
        onLoginAsParent={handleLoginAsParent}
        onLoginAsAdmin={handleLoginAsAdmin}
      />
    );
  }

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] min-h-screen flex flex-col justify-between font-sans">
      
      {/* Institutional Navigation Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
        onLogout={handleLogout}
        onOpenHelp={handleOpenHelp}
        pendingCount={pendingCount}
      />

      {/* Main View Router */}
      <main className="w-full pt-20 flex-grow">
        {currentView === 'dashboard' && (
          <DashboardView
            students={students.filter((s) => currentUser.students?.includes(s.id) ?? true)}
            paymentItems={paymentItems}
            latestReceipt={receipts[0]}
            onPayItems={handlePayItems}
            onOpenReceipt={(receiptId) => {
              const rec = receipts.find((r) => r.id === receiptId) || receipts[0];
              setSelectedReceiptForModal(rec);
            }}
            onOpenDocument={(type) => setActiveDocument(type)}
            onToggleOptionalItem={handleToggleOptionalItem}
          />
        )}

        {currentView === 'payments' && (
          <PaymentView
            allPendingItems={paymentItems.filter((i) => i.status !== 'paid')}
            preSelectedIds={paymentPreselectedIds}
            onBackToDashboard={() => setCurrentView('dashboard')}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        {currentView === 'receipts' && (
          <ReceiptsView
            receipts={receipts}
            onOpenReceipt={(receiptId) => {
              const rec = receipts.find((r) => r.id === receiptId) || receipts[0];
              setSelectedReceiptForModal(rec);
            }}
            onShowToast={showToast}
          />
        )}

        {currentView === 'admin' && (
          <AdminView
            students={students}
            onShowToast={showToast}
            onManualRegisterPayment={handleManualRegisterPayment}
          />
        )}
      </main>

      {/* Institutional Footer */}
      <Footer
        onOpenHelp={handleOpenHelp}
        onOpenInfoModal={handleOpenInfoModal}
      />

      {/* Modal: Official Receipt CFDI */}
      <ReceiptModal
        receipt={selectedReceiptForModal}
        onClose={() => setSelectedReceiptForModal(null)}
        onShowToast={showToast}
      />

      {/* Modal: Academic Certificates (Constancias, Notas, Paz y Salvo) */}
      <DocumentModal
        docType={activeDocument}
        onClose={() => setActiveDocument(null)}
        onShowToast={showToast}
      />

      {/* Modal: Generic Info / Help */}
      <InfoModal
        title={infoModalData?.title || null}
        content={infoModalData?.content || null}
        onClose={() => setInfoModalData(null)}
      />

      {/* Toast Notification Banner */}
      <NotificationToast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
}
