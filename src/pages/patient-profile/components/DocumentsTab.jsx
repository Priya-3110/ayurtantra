import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DocumentsTab = ({ patient, onSave }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    category: 'lab-report',
    description: '',
    file: null
  });

  const documents = [
    {
      id: 1,
      title: 'Initial Consultation Report',
      category: 'consultation',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      uploadedBy: 'Dr. Rajesh Kumar',
      description: 'Comprehensive initial assessment and Prakriti evaluation report',
      url: '#',
      tags: ['Initial Assessment', 'Prakriti', 'Constitution']
    },
    {
      id: 2,
      title: 'Blood Test Results - Complete Panel',
      category: 'lab-report',
      type: 'PDF',
      size: '1.8 MB',
      uploadDate: '2024-01-10',
      uploadedBy: 'Lab Technician',
      description: 'Complete blood count, lipid profile, and vitamin levels',
      url: '#',
      tags: ['Blood Test', 'Lab Results', 'Health Screening']
    },
    {
      id: 3,
      title: 'Personalized Diet Chart - January',
      category: 'diet-chart',
      type: 'PDF',
      size: '1.2 MB',
      uploadDate: '2024-01-20',
      uploadedBy: 'Dr. Rajesh Kumar',
      description: 'Customized Vata-Pitta balancing diet plan for 3 months',
      url: '#',
      tags: ['Diet Plan', 'Nutrition', 'Ayurvedic']
    },
    {
      id: 4,
      title: 'Progress Photos - Week 4',
      category: 'progress',
      type: 'JPG',
      size: '3.2 MB',
      uploadDate: '2024-02-15',
      uploadedBy: 'Patient',
      description: 'Physical progress documentation after 4 weeks of treatment',
      url: '#',
      tags: ['Progress', 'Photos', 'Tracking']
    },
    {
      id: 5,
      title: 'Herbal Prescription - February',
      category: 'prescription',
      type: 'PDF',
      size: '0.8 MB',
      uploadDate: '2024-02-01',
      uploadedBy: 'Dr. Rajesh Kumar',
      description: 'Updated herbal medicine prescription with dosage instructions',
      url: '#',
      tags: ['Prescription', 'Herbal Medicine', 'Dosage']
    },
    {
      id: 6,
      title: 'Food Sensitivity Test Results',
      category: 'lab-report',
      type: 'PDF',
      size: '2.1 MB',
      uploadDate: '2023-12-20',
      uploadedBy: 'Allergy Specialist',
      description: 'Comprehensive food sensitivity and allergy test results',
      url: '#',
      tags: ['Allergy Test', 'Food Sensitivity', 'Dietary Restrictions']
    },
    {
      id: 7,
      title: 'Yoga & Exercise Routine',
      category: 'lifestyle',
      type: 'PDF',
      size: '1.5 MB',
      uploadDate: '2024-01-25',
      uploadedBy: 'Yoga Instructor',
      description: 'Customized yoga sequence and exercise routine for constitution',
      url: '#',
      tags: ['Yoga', 'Exercise', 'Lifestyle', 'Constitution']
    },
    {
      id: 8,
      title: 'Monthly Progress Report - February',
      category: 'progress',
      type: 'PDF',
      size: '1.9 MB',
      uploadDate: '2024-02-28',
      uploadedBy: 'Dr. Rajesh Kumar',
      description: 'Comprehensive monthly progress evaluation and recommendations',
      url: '#',
      tags: ['Progress Report', 'Monthly Review', 'Recommendations']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Documents', count: documents?.length },
    { id: 'consultation', label: 'Consultations', count: documents?.filter(d => d?.category === 'consultation')?.length },
    { id: 'lab-report', label: 'Lab Reports', count: documents?.filter(d => d?.category === 'lab-report')?.length },
    { id: 'diet-chart', label: 'Diet Charts', count: documents?.filter(d => d?.category === 'diet-chart')?.length },
    { id: 'prescription', label: 'Prescriptions', count: documents?.filter(d => d?.category === 'prescription')?.length },
    { id: 'progress', label: 'Progress', count: documents?.filter(d => d?.category === 'progress')?.length },
    { id: 'lifestyle', label: 'Lifestyle', count: documents?.filter(d => d?.category === 'lifestyle')?.length }
  ];

  const filteredDocuments = documents?.filter(doc => {
    const matchesSearch = doc?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         doc?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         doc?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'consultation': return 'Stethoscope';
      case 'lab-report': return 'FlaskConical';
      case 'diet-chart': return 'FileText';
      case 'prescription': return 'Pill';
      case 'progress': return 'TrendingUp';
      case 'lifestyle': return 'Activity';
      default: return 'File';
    }
  };

  const getFileIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf': return 'FileText';
      case 'jpg': case'jpeg': case'png': return 'Image';
      case 'doc': case'docx': return 'FileText';
      default: return 'File';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'consultation': return 'text-primary';
      case 'lab-report': return 'text-error';
      case 'diet-chart': return 'text-success';
      case 'prescription': return 'text-secondary';
      case 'progress': return 'text-warning';
      case 'lifestyle': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const handleUpload = () => {
    // Handle file upload logic
    console.log('Uploading document:', uploadData);
    setShowUploadForm(false);
    setUploadData({
      title: '',
      category: 'lab-report',
      description: '',
      file: null
    });
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setUploadData(prev => ({ ...prev, file }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Patient Documents
          </h3>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Secure storage for medical records and reports
          </p>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={() => setShowUploadForm(true)}
          iconName="Upload"
          iconPosition="left"
        >
          Upload Document
        </Button>
      </div>
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex-1 relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Filter">
            Filter
          </Button>
          <Button variant="outline" size="sm" iconName="Download">
            Export All
          </Button>
        </div>
      </div>
      {/* Category Tabs */}
      <div className="border-b border-border">
        <div className="flex space-x-0 overflow-x-auto">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`flex items-center space-x-2 px-4 py-3 font-body font-medium text-sm border-b-2 transition-colors duration-200 whitespace-nowrap ${
                selectedCategory === category?.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={getCategoryIcon(category?.id)} size={16} />
              <span>{category?.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-caption ${
                selectedCategory === category?.id ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
              }`}>
                {category?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-heading font-medium text-base text-foreground">
              Upload New Document
            </h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowUploadForm(false)}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Document Title"
              type="text"
              value={uploadData?.title}
              onChange={(e) => setUploadData(prev => ({ ...prev, title: e?.target?.value }))}
              placeholder="Enter document title"
              required
            />
            
            <div>
              <label className="block font-body font-medium text-sm text-foreground mb-2">
                Category
              </label>
              <select
                value={uploadData?.category}
                onChange={(e) => setUploadData(prev => ({ ...prev, category: e?.target?.value }))}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              >
                <option value="consultation">Consultation</option>
                <option value="lab-report">Lab Report</option>
                <option value="diet-chart">Diet Chart</option>
                <option value="prescription">Prescription</option>
                <option value="progress">Progress</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block font-body font-medium text-sm text-foreground mb-2">
                Description
              </label>
              <textarea
                value={uploadData?.description}
                onChange={(e) => setUploadData(prev => ({ ...prev, description: e?.target?.value }))}
                placeholder="Brief description of the document..."
                rows={3}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block font-body font-medium text-sm text-foreground mb-2">
                Select File
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Icon name="Upload" size={32} className="mx-auto text-muted-foreground mb-2" />
                <p className="font-body text-sm text-foreground mb-2">
                  Drag and drop your file here, or click to browse
                </p>
                <p className="font-caption text-xs text-muted-foreground mb-4">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                </p>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" size="sm" asChild>
                    <span>Choose File</span>
                  </Button>
                </label>
                {uploadData?.file && (
                  <p className="font-caption text-sm text-foreground mt-2">
                    Selected: {uploadData?.file?.name}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowUploadForm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleUpload}
              iconName="Upload"
              iconPosition="left"
              disabled={!uploadData?.title || !uploadData?.file}
            >
              Upload Document
            </Button>
          </div>
        </div>
      )}
      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments?.map((doc) => (
          <div key={doc?.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-shadow duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getFileIcon(doc?.type)} 
                  size={20} 
                  className={getCategoryColor(doc?.category)}
                />
                <span className={`px-2 py-1 rounded-md font-caption text-xs ${getCategoryColor(doc?.category)} bg-current/10`}>
                  {doc?.category?.replace('-', ' ')?.toUpperCase()}
                </span>
              </div>
              <Button variant="ghost" size="icon">
                <Icon name="MoreVertical" size={16} />
              </Button>
            </div>

            <h4 className="font-body font-medium text-sm text-foreground mb-2 line-clamp-2">
              {doc?.title}
            </h4>
            
            <p className="font-caption text-xs text-muted-foreground mb-3 line-clamp-2">
              {doc?.description}
            </p>

            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <span>{doc?.type} • {doc?.size}</span>
              <span>{new Date(doc.uploadDate)?.toLocaleDateString('en-IN')}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Icon name="User" size={12} />
                <span className="font-caption text-xs text-muted-foreground truncate">
                  {doc?.uploadedBy}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Icon name="Eye" size={12} />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Icon name="Download" size={12} />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Icon name="Share" size={12} />
                </Button>
              </div>
            </div>

            {/* Tags */}
            {doc?.tags && doc?.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {doc?.tags?.slice(0, 2)?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-muted-foreground font-caption text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
                {doc?.tags?.length > 2 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground font-caption text-xs rounded-md">
                    +{doc?.tags?.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Empty State */}
      {filteredDocuments?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h4 className="font-heading font-medium text-base text-foreground mb-2">
            No documents found
          </h4>
          <p className="font-body text-sm text-muted-foreground mb-4">
            {searchQuery ? 'Try adjusting your search terms' : 'Start by uploading the first document'}
          </p>
          {!searchQuery && (
            <Button
              variant="default"
              onClick={() => setShowUploadForm(true)}
              iconName="Upload"
              iconPosition="left"
            >
              Upload First Document
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentsTab;