import { Card } from '@/components/ui/card';
import { School, AlertCircle, Package, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const stats = [
  {
    title: 'Total Schools',
    value: '247',
    change: '+12',
    changeLabel: 'from last month',
    icon: School,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    title: 'Open Issues',
    value: '38',
    change: '-5',
    changeLabel: 'from last week',
    icon: AlertCircle,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
  },
  {
    title: 'In Shipping',
    value: '15',
    change: '+3',
    changeLabel: 'pending delivery',
    icon: Package,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    title: 'Resolved Today',
    value: '12',
    change: '+8',
    changeLabel: 'issues resolved',
    icon: CheckCircle,
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
];

const recentIssues = [
  {
    id: 'ISS-001',
    school: 'Delhi Public School, Sector 45',
    type: 'hardware',
    priority: 'high',
    status: 'in-progress',
    aging: 2,
  },
  {
    id: 'ISS-002',
    school: 'St. Xavier\'s High School',
    type: 'software',
    priority: 'medium',
    status: 'open',
    aging: 1,
  },
  {
    id: 'ISS-003',
    school: 'Cambridge International School',
    type: 'hardware',
    priority: 'critical',
    status: 'in-progress',
    aging: 5,
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-destructive text-destructive-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      case 'medium':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'open':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <CheckCircle className="h-4 w-4 text-success" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Monitor school equipment status and track issues in real-time
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}>
                    {stat.change}
                  </span>{' '}
                  {stat.changeLabel}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Issues */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Recent Issues</h2>
          <Button onClick={() => navigate('/issues')}>View All Issues</Button>
        </div>
        <div className="space-y-4">
          {recentIssues.map((issue) => (
            <div
              key={issue.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors cursor-pointer"
              onClick={() => navigate(`/issues/${issue.id}`)}
            >
              <div className="flex items-center gap-4">
                {getStatusIcon(issue.status)}
                <div>
                  <p className="font-medium text-foreground">{issue.id}</p>
                  <p className="text-sm text-muted-foreground">{issue.school}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                    issue.priority
                  )}`}
                >
                  {issue.priority}
                </span>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground capitalize">
                    {issue.type}
                  </p>
                  <p className="text-xs text-muted-foreground">{issue.aging} days old</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer bg-gradient-primary text-primary-foreground"
              onClick={() => navigate('/schools/new')}>
          <School className="h-8 w-8 mb-3" />
          <h3 className="font-semibold text-lg">Add New School</h3>
          <p className="text-sm opacity-90 mt-1">Register a new school in the system</p>
        </Card>
        <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer bg-gradient-warning text-warning-foreground"
              onClick={() => navigate('/issues/new')}>
          <AlertCircle className="h-8 w-8 mb-3" />
          <h3 className="font-semibold text-lg">Report Issue</h3>
          <p className="text-sm opacity-90 mt-1">Create a new support ticket</p>
        </Card>
        <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer bg-gradient-success text-success-foreground"
              onClick={() => navigate('/shipping')}>
          <Package className="h-8 w-8 mb-3" />
          <h3 className="font-semibold text-lg">Track Shipment</h3>
          <p className="text-sm opacity-90 mt-1">Monitor part deliveries</p>
        </Card>
      </div>
    </div>
  );
}