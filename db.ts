import Dexie, { Table } from 'dexie';
import { Product, Order, Category } from './types';

// 1. Criamos um tipo que garante que o campo 'orderId' exista e seja usado como chave
// Usamos o Omit para evitar conflitos se a interface Order original já tiver um id diferente
export type DexieOrder = Order & {
  orderId: string | number;
};

export class MyDatabase extends Dexie {
  products!: Table<Product>;
  orders!: Table<DexieOrder>; 
  categories!: Table<Category>;
  users!: Table<any>;

  constructor() {
    super('AppleHubDB');
    
    this.version(1).stores({
      products: 'id, name, category',
      // Removi os colchetes do user.cpf para compatibilidade padrão do Dexie 3.x+
      orders: 'orderId, date, status, user.cpf', 
      categories: 'id, name',
      users: 'id, email'
    });
  }
}

export const db = new MyDatabase();