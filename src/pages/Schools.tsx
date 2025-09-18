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
import { Search, Plus, Edit, Eye, MapPin, User, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const schools = [
  {
    id: '1',
    dealId: 'DEAL-2024-001',
    name: 'Delhi Public School, Sector 45',
    city: 'Gurgaon',
    state: 'Haryana',
    status: 'active',
    tvIfpSupplied: 25,
    ordersDelivered: 25,
    installationDate: '2024-01-15',
    spocName: 'Rajesh Kumar',
  },
  {
    id: '2',
    dealId: 'DEAL-2024-002',
    name: 'St. Xavier\'s High School',
    city: 'Mumbai',
    state: 'Maharashtra',
    status: 'pending',
    tvIfpSupplied: 30,
    ordersDelivered: 28,
    installationDate: '2024-02-20',
    spocName: 'Priya Sharma',
  },
  {
    id: '3',
    dealId: 'DEAL-2024-003',
    name: 'Cambridge International School',
    city: 'Bangalore',
    state: 'Karnataka',
    status: 'active',
    tvIfpSupplied: 40,
    ordersDelivered: 40,
    installationDate: '2024-01-10',
    spocName: 'Amit Patel',
  },
  {
    id: '4',
    dealId: 'DEAL-2024-004',
    name: 'The Heritage School',
    city: 'Kolkata',
    state: 'West Bengal',
    status: 'inactive',
    tvIfpSupplied: 20,
    ordersDelivered: 18,
    installationDate: '2023-12-05',
    spocName: 'Sneha Roy',
  },
];

export default function Schools() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success text-success-foreground">Active</Badge>;
      case 'pending':
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case 'inactive':
        return <Badge className="bg-muted text-muted-foreground">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.dealId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Schools</h1>
          <p className="text-muted-foreground mt-2">
            Manage school information and equipment details
          </p>
        </div>
        <Button onClick={() => navigate('/schools/new')} className="gap-2">
          <Plus className="h-4 w-4" />
          Add School
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by school name, deal ID, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Schools Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Deal ID</TableHead>
              <TableHead>School Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>SPOC</TableHead>
              <TableHead>Equipment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Installation</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSchools.map((school) => (
              <TableRow key={school.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{school.dealId}</TableCell>
                <TableCell>
                  <div className="font-medium">{school.name}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="h-3 w-3" />
                    {school.city}, {school.state}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <User className="h-3 w-3" />
                    {school.spocName}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <Package className="h-3 w-3" />
                    {school.ordersDelivered}/{school.tvIfpSupplied}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(school.status)}</TableCell>
                <TableCell className="text-sm">{school.installationDate}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/schools/${school.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/schools/${school.id}/edit`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}