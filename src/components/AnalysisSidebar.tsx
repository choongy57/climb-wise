import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  MessageSquare,
  Clock,
  Target,
  Activity
} from 'lucide-react';

interface FeedbackItem {
  timestamp: string;
  issue: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
}

interface MoveCompletion {
  timestamp: string;
  completed: boolean;
  confidence: number;
}

interface AnalysisSidebarProps {
  isAnalyzing: boolean;
  efficiencyScore: number;
  feedbackItems: FeedbackItem[];
  moveCompletions: MoveCompletion[];
  coachingAdvice: string;
}

export const AnalysisSidebar = ({
  isAnalyzing,
  efficiencyScore,
  feedbackItems,
  moveCompletions,
  coachingAdvice
}: AnalysisSidebarProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="w-80 bg-card border-l border-border p-4 space-y-4 overflow-y-auto">
      {/* Efficiency Score */}
      <Card className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-accent rounded-lg">
            <TrendingUp className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">Efficiency Score</h3>
            <p className="text-sm text-muted-foreground">Overall performance</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">
              <span className={getScoreColor(efficiencyScore)}>
                {isAnalyzing ? '...' : `${efficiencyScore}%`}
              </span>
            </span>
            <Badge variant={efficiencyScore >= 80 ? 'default' : 'secondary'}>
              {efficiencyScore >= 80 ? 'Excellent' : efficiencyScore >= 60 ? 'Good' : 'Improving'}
            </Badge>
          </div>
          <Progress value={isAnalyzing ? 0 : efficiencyScore} className="h-2" />
        </div>
      </Card>

      {/* Move Completions */}
      <Card className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-success rounded-lg">
            <Target className="h-5 w-5 text-success-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">Move Analysis</h3>
            <p className="text-sm text-muted-foreground">Success predictions</p>
          </div>
        </div>

        <div className="space-y-2">
          {isAnalyzing ? (
            <div className="text-center py-4 text-muted-foreground">
              Analyzing moves...
            </div>
          ) : moveCompletions.length > 0 ? (
            moveCompletions.map((move, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  {move.completed ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                  <span className="text-sm font-medium">{move.timestamp}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {Math.round(move.confidence * 100)}%
                </Badge>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No moves detected yet
            </p>
          )}
        </div>
      </Card>

      {/* Feedback Items */}
      <Card className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">Technique Feedback</h3>
            <p className="text-sm text-muted-foreground">Areas for improvement</p>
          </div>
        </div>

        <div className="space-y-2">
          {isAnalyzing ? (
            <div className="text-center py-4 text-muted-foreground">
              Analyzing technique...
            </div>
          ) : feedbackItems.length > 0 ? (
            feedbackItems.map((item, index) => (
              <div key={index} className="p-3 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs font-mono">{item.timestamp}</span>
                  </div>
                  <Badge variant={getSeverityColor(item.severity) as any} className="text-xs">
                    {item.severity}
                  </Badge>
                </div>
                <p className="text-sm font-medium mb-1">{item.issue}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No issues detected
            </p>
          )}
        </div>
      </Card>

      {/* AI Coaching */}
      <Card className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-accent rounded-lg">
            <MessageSquare className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">AI Coach</h3>
            <p className="text-sm text-muted-foreground">Personalized advice</p>
          </div>
        </div>

        {isAnalyzing ? (
          <div className="text-center py-4 text-muted-foreground">
            Generating coaching advice...
          </div>
        ) : coachingAdvice ? (
          <div className="space-y-3">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm leading-relaxed">{coachingAdvice}</p>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Ask the Coach Again
            </Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            Upload a video to get personalized coaching advice
          </p>
        )}
      </Card>
    </div>
  );
};