import { useState } from 'react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { 
  BookOpen, 
  Search,
  Download,
  ExternalLink,
  FileText,
  Video
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'guide' | 'video' | 'template' | 'checklist';
  category: string;
  description: string;
  tags: string[];
  downloadUrl?: string;
  externalUrl?: string;
}

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Classroom Management Quick Reference',
      type: 'guide',
      category: 'Classroom Management',
      description: 'Quick-reference guide for effective classroom management strategies and de-escalation techniques.',
      tags: ['Management', 'Strategies', 'Quick Reference'],
      downloadUrl: '#'
    },
    {
      id: '2',
      title: 'Incident Documentation Best Practices',
      type: 'guide',
      category: 'Documentation',
      description: 'Step-by-step guide for thorough and objective incident documentation.',
      tags: ['Documentation', 'Incidents', 'Best Practices'],
      downloadUrl: '#'
    },
    {
      id: '3',
      title: 'De-escalation Techniques Video',
      type: 'video',
      category: 'Training',
      description: '15-minute training video on effective de-escalation strategies for elementary students.',
      tags: ['De-escalation', 'Training', 'Video'],
      externalUrl: '#'
    },
    {
      id: '4',
      title: 'Behavior Tracking Sheet Template',
      type: 'template',
      category: 'Templates',
      description: 'Printable behavior tracking sheet for monitoring student patterns throughout the day.',
      tags: ['Tracking', 'Template', 'Monitoring'],
      downloadUrl: '#'
    },
    {
      id: '5',
      title: 'Parent Communication Templates',
      type: 'template',
      category: 'Communication',
      description: 'Email and phone call templates for communicating behavioral concerns with parents.',
      tags: ['Parent Communication', 'Templates'],
      downloadUrl: '#'
    },
    {
      id: '6',
      title: 'When to Escalate Checklist',
      type: 'checklist',
      category: 'Escalation',
      description: 'Decision-making checklist to help determine when to escalate behavioral concerns to experts.',
      tags: ['Escalation', 'Decision Support'],
      downloadUrl: '#'
    },
    {
      id: '7',
      title: 'Understanding ADHD in Elementary Students',
      type: 'guide',
      category: 'Special Needs',
      description: 'Overview of ADHD characteristics and classroom accommodation strategies.',
      tags: ['ADHD', 'Accommodations', 'Special Needs'],
      downloadUrl: '#'
    },
    {
      id: '8',
      title: 'Positive Reinforcement Strategies',
      type: 'guide',
      category: 'Intervention Strategies',
      description: 'Evidence-based positive reinforcement techniques for elementary classrooms.',
      tags: ['Positive Reinforcement', 'Strategies'],
      downloadUrl: '#'
    }
  ];

  const categories = ['all', 'Classroom Management', 'Documentation', 'Training', 'Templates', 'Communication', 'Escalation', 'Special Needs', 'Intervention Strategies'];

  const getTypeIcon = (type: Resource['type']) => {
    switch (type) {
      case 'guide':
        return <BookOpen className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'template':
      case 'checklist':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = filterCategory === 'all' || resource.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <TeacherLayout>
      <div className="max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl text-[#1A1A1A] mb-2 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Teacher Resources
          </h1>
          <p className="text-[#757575]">
            Helpful guides, templates, and tools for classroom behavior management
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6 border-[#D0D0D0]">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#757575]" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-[#D0D0D0] text-[#1A1A1A]"
                />
              </div>

              <div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full border border-[#D0D0D0] rounded-md px-3 py-2 text-[#1A1A1A]"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredResources.length === 0 ? (
            <div className="col-span-2">
              <Card className="border-[#D0D0D0]">
                <CardContent className="p-12 text-center">
                  <BookOpen className="w-12 h-12 text-[#D0D0D0] mx-auto mb-4" />
                  <p className="text-[#757575]">No resources match your search</p>
                </CardContent>
              </Card>
            </div>
          ) : (
            filteredResources.map((resource) => (
              <Card key={resource.id} className="border-[#D0D0D0] hover:border-[#9E9E9E] transition-colors">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#F5F5F5] rounded border border-[#E0E0E0]">
                      {getTypeIcon(resource.type)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base text-[#1A1A1A] mb-1">
                        {resource.title}
                      </CardTitle>
                      <Badge variant="outline" className="border-[#9E9E9E] text-[#757575] text-xs">
                        {resource.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#4A4A4A] mb-3">
                    {resource.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {resource.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="border-[#D0D0D0] text-[#757575] text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-end pt-3 border-t border-[#E0E0E0]">
                    {resource.downloadUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    )}
                    {resource.externalUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Watch
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </TeacherLayout>
  );
}
