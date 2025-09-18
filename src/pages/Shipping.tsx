import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, ExternalLink } from 'lucide-react';

const shipments = [
  {
    id: 'SHP-001',
    issueId: 'ISS-003',
    schoolName: 'Cambridge International School',
    courier: 'DTDC',
    trackingNumber: 'DT123456789',
    partDescription: 'Touch Panel Module',
    status: 'in-transit',
    estimatedDelivery: '2024-03-22',
    lastLocation: 'Mumbai Hub',
    lastUpdate: '2024-03-20 14:30',
  },
  {
    id: 'SHP-002',
    issueId: 'ISS-001',
    schoolName: 'Delhi Public School, Sector 45',
    courier: 'Delhivery B2B',
    trackingNumber: 'DLV987654321',
    partDescription: 'Power Supply Unit',
    status: 'out-for-delivery',
    estimatedDelivery: '2024-03-21',
    lastLocation: 'Gurgaon DC',
    lastUpdate: '2024-03-21 09:15',
  },
  {
    id: 'SHP-003',
    issueId: 'ISS-005',
    schoolName: 'The Heritage School',
    courier: 'SpeedAir',
    trackingNumber: 'SA456789123',
    partDescription: 'Display Controller Board',
    status: 'delivered',
    estimatedDelivery: '2024-03-19',
    lastLocation: 'Delivered',
    lastUpdate: '2024-03-19 16:45',
  },
  {
    id: 'SHP-004',
    issueId: 'ISS-006',
    schoolName: 'Modern Academy',
    courier: 'Safe Express',
    trackingNumber: 'SE789123456',
    partDescription: 'HDMI Cable Set',
    status: 'picked-up',
    estimatedDelivery: '2024-03-24',
    lastLocation: 'Warehouse',
    lastUpdate: '2024-03-20 11:00',
  },
];

const courierLogos: Record<string, string> = {
  'DTDC': '📦',
  'Delhivery B2B': '🚚',
  'Delhivery B2C': '🚚',
  'SpeedAir': '✈️',
  'Safe Express': '🛡️',
  'Rivigo': '🚛',
};

export default function Shipping() {
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-secondary text-secondary-foreground gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case 'picked-up':
        return (
          <Badge className="bg-primary/10 text-primary border-primary/20 gap-1">
            <Package className="h-3 w-3" />
            Picked Up
          </Badge>
        );
      case 'in-transit':
        return (
          <Badge className="bg-warning/10 text-warning border-warning/20 gap-1">
            <Truck className="h-3 w-3" />
            In Transit
          </Badge>
        );
      case 'out-for-delivery':
        return (
          <Badge className="bg-primary text-primary-foreground gap-1">
            <Truck className="h-3 w-3" />
            Out for Delivery
          </Badge>
        );
      case 'delivered':
        return (
          <Badge className="bg-success text-success-foreground gap-1">
            <CheckCircle className="h-3 w-3" />
            Delivered
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredShipments = shipments.filter(
    (shipment) =>
      shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.partDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.issueId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTrackShipment = (courier: string, trackingNumber: string) => {
    // TODO: Implement actual tracking API calls
    console.log(`Tracking ${trackingNumber} with ${courier}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Shipping & Logistics</h1>
        <p className="text-muted-foreground mt-2">
          Track part shipments and manage deliveries
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Shipments</p>
              <p className="text-2xl font-bold text-foreground">24</p>
            </div>
            <Package className="h-8 w-8 text-primary" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">In Transit</p>
              <p className="text-2xl font-bold text-warning">8</p>
            </div>
            <Truck className="h-8 w-8 text-warning" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Out for Delivery</p>
              <p className="text-2xl font-bold text-primary">3</p>
            </div>
            <MapPin className="h-8 w-8 text-primary" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Delivered Today</p>
              <p className="text-2xl font-bold text-success">5</p>
            </div>
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
        </Card>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by tracking number, issue ID, school, or part..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Shipments Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Shipment ID</TableHead>
              <TableHead>Issue ID</TableHead>
              <TableHead>School</TableHead>
              <TableHead>Courier</TableHead>
              <TableHead>Tracking</TableHead>
              <TableHead>Part</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>ETA</TableHead>
              <TableHead>Last Location</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShipments.map((shipment) => (
              <TableRow key={shipment.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{shipment.id}</TableCell>
                <TableCell className="font-medium text-primary">{shipment.issueId}</TableCell>
                <TableCell>{shipment.schoolName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{courierLogos[shipment.courier]}</span>
                    <span className="text-sm font-medium">{shipment.courier}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {shipment.trackingNumber}
                  </code>
                </TableCell>
                <TableCell className="text-sm">{shipment.partDescription}</TableCell>
                <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                <TableCell className="text-sm">{shipment.estimatedDelivery}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="font-medium">{shipment.lastLocation}</div>
                    <div className="text-xs text-muted-foreground">{shipment.lastUpdate}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTrackShipment(shipment.courier, shipment.trackingNumber)}
                    className="gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Track
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Courier Integration Status */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Courier API Integration Status</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {['DTDC', 'Delhivery B2B', 'Delhivery B2C', 'SpeedAir', 'Safe Express', 'Rivigo'].map(
            (courier) => (
              <div key={courier} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{courierLogos[courier] || '📦'}</span>
                  <span className="font-medium">{courier}</span>
                </div>
                <Badge className="bg-muted text-muted-foreground">
                  Pending Setup
                </Badge>
              </div>
            )
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Note: Courier API integrations require Supabase backend setup with API credentials
        </p>
      </Card>
    </div>
  );
}