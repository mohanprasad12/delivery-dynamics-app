export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'operator';
  createdAt: Date;
  updatedAt: Date;
}

export interface School {
  id: string;
  dealId: string;
  name: string;
  spocDetails: {
    name: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  tvIfpSupplied: number;
  ordersDelivered: number;
  currentStatus: 'active' | 'inactive' | 'pending';
  productType: string;
  segment: string;
  serialNumbers: Array<{
    number: string;
    size: string;
  }>;
  dispatchDate?: Date;
  installationDate?: Date;
  vendorName?: string;
  brand?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Issue {
  id: string;
  schoolId: string;
  hubspotTicketId?: string;
  issueType: 'hardware' | 'software';
  issueDescription: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  dateReported: Date;
  dateClosed?: Date;
  resolutionProvided?: string;
  latestUpdate?: string;
  ticketAging: number;
  hardwareDetails?: {
    partType?: string;
    replacementRequired: boolean;
    shippingStatus?: ShippingStatus;
    partInstallationStatus?: 'pending' | 'scheduled' | 'completed';
    engineerDetails?: {
      name: string;
      contact: string;
      alignedDate?: Date;
    };
  };
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShippingStatus {
  id: string;
  issueId: string;
  courier: 'dtdc' | 'delhivery-b2b' | 'delhivery-b2c' | 'speedair' | 'safe-express' | 'rivigo';
  trackingNumber: string;
  status: 'pending' | 'picked-up' | 'in-transit' | 'out-for-delivery' | 'delivered';
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  lastUpdate: Date;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLog {
  id: string;
  entityType: 'school' | 'issue' | 'shipping';
  entityId: string;
  action: 'create' | 'update' | 'delete';
  changes: Record<string, any>;
  userId: string;
  userName: string;
  timestamp: Date;
}