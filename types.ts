export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  technicalSpecs: { [key: string]: string };
  price: number;
  promoPrice?: number;
  stock: number;
  condition: 'Novo' | 'Seminovo';
  storage: string;
  availableColors: {
    name: string;
    image: string;
    hex: string;
  }[];
  defaultImage: string;
  category: string;
  tags: string[];
  salesCount?: number;
  isOfficial?: boolean;
  freeShipping?: boolean;
  warranty: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: {
    name: string;
    image: string;
    hex: string;
  };
  cartId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  dob: string;
  password?: string;
}

// --- NOVAS INTERFACES PARA O FLUXO DE PAGAMENTO ---

export interface Installment {
  number: number;
  value: number;
  dueDate: string;
  status: 'pendente' | 'pago' | 'vencido';
  barcode: string;       // Linha digitável do boleto
  downloadUrl: string;   // Link direto para o PDF/Google
}

// 1. Ajuste o status para aceitar maiúsculas ou minúsculas
export type OrderStatus = "pendente" | "aprovado" | "reprovado" | "Aprovado" | "Pendente";

export interface Order {
  orderId: string;
  items: CartItem[];
  total: number;
  date: string;
  shippingInfo: {
    name: string;
    cpf: string;
    email: string;
    address?: string;
    trackingCode?: string;
  };
  // 2. Adicione os outros métodos aqui para o TS aceitar
  paymentMethod: 'boleto' | 'pix' | 'card'; 
  
  // Mantenha opcional com "?" para não dar erro quando for PIX ou Cartão
  boletoPaymentType?: "avista" | "parcelado";
  installmentsDetails?: Installment[]; 
  entryFeePaid?: boolean; 
  installments?: number;
  
  status: OrderStatus;
  couponCode?: string; // Adicione este campo que estava faltando na interface
}

// --- RESTANTE DAS INTERFACES ---

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  expiryDate: string;
  maxUses: number;
  usedCount: number;
  minOrderValue?: number;
}

export type StaffRole = 'Admin' | 'Suporte';

export interface Staff {
  id: string;
  email: string;
  password: string;
  role: StaffRole;
}