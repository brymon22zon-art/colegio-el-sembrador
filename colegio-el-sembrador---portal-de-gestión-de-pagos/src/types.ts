export interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  level: 'Primaria' | 'Secundaria' | 'Preescolar';
  matricula: string;
  avatar: string;
  initials: string;
  status: 'Al Día' | 'Pendiente' | 'Beca Parcial';
  tutor: string;
  curp?: string;
}

export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'optional';

export interface PaymentItem {
  id: string;
  studentId: string;
  studentName: string;
  studentInitials: string;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  dueNotice: string;
  status: PaymentStatus;
  category: 'tuition' | 'lab' | 'workshop' | 'fee';
  monthIndex?: number; // 1 to 10
  isOptional?: boolean;
}

export interface Receipt {
  id: string;
  folio: string;
  studentId: string;
  studentName: string;
  studentGrade: string;
  studentMatricula: string;
  tutorName: string;
  concept: string;
  items: {
    description: string;
    student: string;
    amount: number;
  }[];
  subtotal: number;
  discount: number;
  total: number;
  date: string;
  time: string;
  paymentMethod: 'card' | 'spei' | 'oxxo' | 'cash';
  paymentMethodLabel: string;
  authCode: string;
  uuidFiscal: string;
  qrCodeUrl: string;
  status: 'Aprobado';
}

export interface UserAccount {
  id: string;
  name: string;
  role: 'parent' | 'admin';
  roleTitle: string;
  email: string;
  avatar: string;
  students?: string[]; // IDs
}
