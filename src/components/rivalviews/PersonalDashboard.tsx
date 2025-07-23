import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Target, TrendingUp, Users, DollarSign, Clock, Phone, Mail, CheckCircle, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client.ts';

interface PersonalStats {
  assigned_businesses: number;
  active_deals: number;
  total_estimated_value: number;
  this_month_actions: number;
  conversion_rate: number;
  avg_response_time: number;
  upcoming_follow_ups: number;
  overdue_follow_ups: number;
}

interface RecentActivity {
  id: string;
  business_name: string;
  action_type: string;
  description: string;
  created_at: string;
  outcome: string | null;
}

interface UpcomingTask {
  id: string;
  business_name: string;
  next_follow_up: string;
  priority_level: number;
  crm_status: string;
  estimated_deal_value: number;
}

const PersonalDashboard: React.FC = () => {
  const [stats, setStats] = useState<PersonalStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<UpcomingTask[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        await fetchPersonalStats(user.id);
        await fetchRecentActivity(user.id);
        await fetchUpcomingTasks(user.id);
      }
    };

    getCurrentUser();
  }, []);

  const fetchPersonalStats = async (userId: string) => {
    try {
      // Get assigned businesses count
      const { data: businessesData } = await supabase
        .from('businesses')
        .select('id, crm_status, estimated_deal_value, conversion_probability')
        .eq('assigned_to', userId);

      if (!businessesData) return;

      // Get actions count for this month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data: actionsData } = await supabase
        .from('crm_actions')
        .select('id, created_at')
        .eq('user_id', userId)
        .gte('created_at', startOfMonth.toISOString());

      // Get upcoming follow-ups
      const { data: followUpsData } = await supabase
        .from('businesses')
        .select('next_follow_up')
        .eq('assigned_to', userId)
        .not('next_follow_up', 'is', null);

      const now = new Date();
      const upcomingCount = followUpsData?.filter(b => {
        if (!b.next_follow_up) return false;
        const followUpDate = new Date(b.next_follow_up);
        return followUpDate > now && followUpDate <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      }).length || 0;

      const overdueCount = followUpsData?.filter(b => {
        if (!b.next_follow_up) return false;
        return new Date(b.next_follow_up) < now;
      }).length || 0;

      const activeDeals = businessesData.filter(b => 
        ['contacted', 'meeting_scheduled', 'meeting_completed', 'proposal_sent', 'negotiation'].includes(b.crm_status)
      ).length;

      const totalEstimatedValue = businessesData.reduce((sum, b) => sum + (b.estimated_deal_value || 0), 0);

      const conversionRate = businessesData.length > 0 
        ? (businessesData.filter(b => b.crm_status === 'client').length / businessesData.length) * 100 
        : 0;

      setStats({
        assigned_businesses: businessesData.length,
        active_deals: activeDeals,
        total_estimated_value: totalEstimatedValue,
        this_month_actions: actionsData?.length || 0,
        conversion_rate: Math.round(conversionRate * 100) / 100,
        avg_response_time: 24, // Mock data - would need more complex calculation
        upcoming_follow_ups: upcomingCount,
        overdue_follow_ups: overdueCount
      });
    } catch (error) {
      console.error('Error fetching personal stats:', error);
    }
  };

  const fetchRecentActivity = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('crm_actions')
        .select(`
          id,
          action_type,
          description,
          created_at,
          outcome,
          businesses!crm_actions_business_id_fkey(name)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (data) {
        const formattedData = data.map(action => ({
          id: action.id,
          business_name: (action.businesses as any)?.name || 'N/A',
          action_type: action.action_type,
          description: action.description,
          created_at: action.created_at,
          outcome: action.outcome
        }));
        setRecentActivity(formattedData);
      }
    } catch (error) {
      console.error('Error fetching recent activity:', error);
    }
  };

  const fetchUpcomingTasks = async (userId: string) => {
    try {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);

      const { data } = await supabase
        .from('businesses')
        .select('id, name, next_follow_up, priority_level, crm_status, estimated_deal_value')
        .eq('assigned_to', userId)
        .not('next_follow_up', 'is', null)
        .lte('next_follow_up', nextWeek.toISOString())
        .order('next_follow_up', { ascending: true })
        .limit(10);

      if (data) {
        const formattedData = data.map(task => ({
          id: task.id,
          business_name: task.name,
          next_follow_up: task.next_follow_up!,
          priority_level: task.priority_level || 1,
          crm_status: task.crm_status || 'prospect',
          estimated_deal_value: task.estimated_deal_value || 0
        }));
        setUpcomingTasks(formattedData);
      }
    } catch (error) {
      console.error('Error fetching upcoming tasks:', error);
    }
  };

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'meeting': return <Calendar className="h-4 w-4" />;
      case 'status_change': return <TrendingUp className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (level: number) => {
    switch (level) {
      case 5: return 'bg-red-500';
      case 4: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 2: return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTimeUntilTask = (taskDate: string) => {
    const now = new Date();
    const task = new Date(taskDate);
    const diffInHours = Math.ceil((task.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 0) return `En retard de ${Math.abs(diffInHours)}h`;
    if (diffInHours < 24) return `Dans ${diffInHours}h`;
    if (diffInHours < 48) return `Demain`;
    return `Dans ${Math.ceil(diffInHours / 24)} jours`;
  };

  if (!stats) {
    return <div className="flex items-center justify-center h-64">Chargement de votre tableau de bord...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entreprises assignées</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.assigned_businesses}</div>
            <p className="text-xs text-muted-foreground">
              {stats.active_deals} deals actifs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valeur potentielle</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_estimated_value.toLocaleString()}$</div>
            <p className="text-xs text-muted-foreground">
              Pipeline total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversion_rate}%</div>
            <Progress value={stats.conversion_rate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actions ce mois</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.this_month_actions}</div>
            <p className="text-xs text-muted-foreground">
              Moyenne: {Math.round(stats.this_month_actions / new Date().getDate())} par jour
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {(stats.overdue_follow_ups > 0 || stats.upcoming_follow_ups > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.overdue_follow_ups > 0 && (
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Suivis en retard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">{stats.overdue_follow_ups}</div>
                <p className="text-sm text-muted-foreground">Entreprises nécessitant un suivi urgent</p>
              </CardContent>
            </Card>
          )}

          {stats.upcoming_follow_ups > 0 && (
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-600 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Suivis prochains
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">{stats.upcoming_follow_ups}</div>
                <p className="text-sm text-muted-foreground">À traiter dans les 7 prochains jours</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Tâches à venir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.length === 0 ? (
                <p className="text-muted-foreground">Aucune tâche prévue</p>
              ) : (
                upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{task.business_name}</span>
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority_level)}`} />
                        <Badge variant="outline" className="text-xs">
                          {task.crm_status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{getTimeUntilTask(task.next_follow_up)}</span>
                        {task.estimated_deal_value > 0 && (
                          <span>{task.estimated_deal_value.toLocaleString()}$</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Activité récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.length === 0 ? (
                <p className="text-muted-foreground">Aucune activité récente</p>
              ) : (
                recentActivity.slice(0, 8).map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="mt-0.5">
                      {getActionIcon(activity.action_type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{activity.business_name}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(activity.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {activity.description}
                      </p>
                      {activity.outcome && (
                        <p className="text-xs text-green-600 mt-1">
                          ✓ {activity.outcome}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalDashboard;