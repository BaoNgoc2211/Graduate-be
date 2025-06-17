export interface IThread {
  userId: string;
  assignedTo?: string;
  status: 'pending' | 'assigned' | 'closed';
  createdAt: Date;
}