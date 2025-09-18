import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Plus, Eye, Edit, Clock, AlertCircle, CheckCircle, Wrench, Monitor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const issues = [
  {
    id: 'ISS-001',
    schoolName: 'Delhi Public School, Sector 45',
    hubspotTicketId: 'HUB-12345',
    type: 'hardware',
    description: 'IFP display not turning on',
    status: 'in-progress',
    priority: 'high',
    dateReported: '2024-03-18',
    aging: 2,
    lastUpdate: 'Technician scheduled for visit',
  },
  {
    id: 'ISS-002',
    schoolName: 'St. Xavier\'s High School',
    hubspotTicketId: 'HUB-12346',
    type: 'software',
    description: 'Software update failure',
    status: 'open',
    priority: 'medium',
    dateReported: '2024-03-19',
    aging: 1,
    lastUpdate: 'Awaiting remote diagnosis',
  },
  {
    id: 'ISS-003',
    schoolName: 'Cambridge International School',
    hubspotTicketId: 'HUB-12347',
    type: 'hardware',
    description: 'Touch panel not responsive',
    status: 'in-progress',
    priority: 'critical',
    dateReported: '2024-03-15',
    aging: 5,
    lastUpdate: 'Part shipped for replacement',
  },
  {
    id: 'ISS-004',
    schoolName: 'The Heritage School',
    hubspotTicketId: 'HUB-12348',
    type: 'software',
    description: 'Application crash on startup',
    status: 'resolved',
    priority: 'low',
    dateReported: '2024-03-17',
    aging: 3,
    lastUpdate: 'Issue resolved via remote update',
  },
];

export default function Issues() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20 gap-1">
            <AlertCircle className="h-3 w-3" />
            Open
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge className="bg-warning/10 text-warning border-warning/20 gap-1">
            <Clock className="h-3 w-3" />
            In Progress
          </Badge>
        );
      case 'resolved':
        return (
          <Badge className="bg-success/10 text-success border-success/20 gap-1">
            <CheckCircle className="h-3 w-3" />
            Resolved
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Badge className="bg-destructive text-destructive-foreground">Critical</Badge>;
      case 'high':
        return <Badge className="bg-warning text-warning-foreground">High</Badge>;
      case 'medium':
        return <Badge className="bg-primary text-primary-foreground">Medium</Badge>;
      case 'low':
        return <Badge className="bg-secondary text-secondary-foreground">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'hardware' ? (
      <Wrench className="h-4 w-4 text-muted-foreground" />
    ) : (
      <Monitor className="h-4 w-4 text-muted-foreground" />
    );
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || issue.type === filterType;
    const matchesStatus = filterStatus === 'all' || issue.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || issue.priority === filterPriority;
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Issues</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage hardware and software issues
          </p>
        </div>
        <Button onClick={() => navigate('/issues/new')} className="gap-2">
          <Plus className="h-4 w-4" />
          Report Issue
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by issue ID, school, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="hardware">Hardware</SelectItem>
                <SelectItem value="software">Software</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Issues Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Issue ID</TableHead>
              <TableHead>School</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Aging</TableHead>
              <TableHead>Last Update</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIssues.map((issue) => (
              <TableRow key={issue.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="font-medium">{issue.id}</div>
                  <div className="text-xs text-muted-foreground">{issue.hubspotTicketId}</div>
                </TableCell>
                <TableCell>{issue.schoolName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(issue.type)}
                    <span className="capitalize">{issue.type}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">{issue.description}</TableCell>
                <TableCell>{getStatusBadge(issue.status)}</TableCell>
                <TableCell>{getPriorityBadge(issue.priority)}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="font-medium">{issue.aging} days</div>
                    <div className="text-xs text-muted-foreground">{issue.dateReported}</div>
                  </div>
                </TableCell>
                <TableCell className="max-w-[150px] truncate text-sm">
                  {issue.lastUpdate}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/issues/${issue.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/issues/${issue.id}/edit`)}
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