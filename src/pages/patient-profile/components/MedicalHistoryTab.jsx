import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MedicalHistoryTab = ({ patient, onSave }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    type: 'consultation',
    date: '',
    title: '',
    description: '',
    practitioner: 'Dr. Rajesh Kumar'
  });

  const medicalHistory = [
    {
      id: 1,
      type: 'consultation',
      date: '2024-01-15',
      title: 'Initial Ayurvedic Consultation',
      description: `Comprehensive Prakriti assessment conducted. Patient shows Vata-Pitta constitution with mild digestive imbalance. Recommended dietary modifications and lifestyle changes.\n\nKey findings:\n- Irregular meal timings affecting digestion\n- High stress levels impacting sleep quality\n- Preference for spicy and fried foods\n\nTreatment plan:\n- Customized diet chart with warm, cooked foods\n- Stress management techniques\n- Regular meal timing protocol`,
      practitioner: 'Dr. Rajesh Kumar',
      tags: ['Initial Assessment', 'Prakriti', 'Diet Plan']
    },
    {
      id: 2,
      type: 'condition',
      date: '2024-01-10',
      title: 'Chronic Digestive Issues',
      description: `Patient reports recurring digestive problems including bloating, gas, and irregular bowel movements. Symptoms worsen during stressful periods.\n\nSymptoms:\n- Bloating after meals (especially evening)\n- Excessive gas formation\n- Alternating constipation and loose stools\n- Reduced appetite in morning\n\nDuration: 6 months\nTriggers: Stress, irregular eating, spicy foods`,
      practitioner: 'Dr. Rajesh Kumar',
      tags: ['Digestive Health', 'Chronic Condition']
    },
    {
      id: 3,
      type: 'allergy',
      date: '2023-12-20',
      title: 'Food Sensitivity Assessment',
      description: `Identified sensitivities to certain food groups through elimination diet protocol.\n\nConfirmed sensitivities:\n- Dairy products (mild lactose intolerance)\n- Excessive spicy foods\n- Raw vegetables in evening\n\nRecommendations:\n- Avoid dairy or use lactose-free alternatives\n- Limit spice levels in meals\n- Consume raw foods during daytime only`,
      practitioner: 'Dr. Rajesh Kumar',
      tags: ['Food Sensitivity', 'Dietary Restrictions']
    },
    {
      id: 4,
      type: 'medication',
      date: '2024-01-20',
      title: 'Herbal Supplement Protocol',
      description: `Prescribed Ayurvedic herbal formulations to support digestive health and overall constitution balance.\n\nCurrent medications:\n- Triphala Churna: 1 tsp with warm water before bed\n- Hingvastak Churna: 1/2 tsp after meals\n- Brahmi tablets: 1 tablet twice daily for stress\n\nDuration: 3 months with monthly review\nMonitoring: Weekly check-ins for first month`,
      practitioner: 'Dr. Rajesh Kumar',
      tags: ['Herbal Medicine', 'Digestive Support', 'Stress Management']
    },
    {
      id: 5,
      type: 'followup',
      date: '2024-02-15',
      title: 'One Month Follow-up',
      description: `Patient shows significant improvement in digestive symptoms. Reports better energy levels and improved sleep quality.\n\nProgress notes:\n- 70% reduction in bloating episodes\n- Regular bowel movements established\n- Improved appetite, especially morning\n- Better stress management\n\nAdjustments made:\n- Reduced Hingvastak dosage to 1/4 tsp\n- Added gentle yoga recommendations\n- Modified diet chart for seasonal changes`,
      practitioner: 'Dr. Rajesh Kumar',
      tags: ['Follow-up', 'Progress Review', 'Treatment Adjustment']
    }
  ];

  const filteredHistory = medicalHistory?.filter(entry =>
    entry?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    entry?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    entry?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
  );

  const getTypeIcon = (type) => {
    switch (type) {
      case 'consultation': return 'Stethoscope';
      case 'condition': return 'AlertCircle';
      case 'allergy': return 'AlertTriangle';
      case 'medication': return 'Pill';
      case 'followup': return 'RotateCcw';
      default: return 'FileText';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'consultation': return 'text-primary';
      case 'condition': return 'text-error';
      case 'allergy': return 'text-warning';
      case 'medication': return 'text-secondary';
      case 'followup': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getTypeBg = (type) => {
    switch (type) {
      case 'consultation': return 'bg-primary/10';
      case 'condition': return 'bg-error/10';
      case 'allergy': return 'bg-warning/10';
      case 'medication': return 'bg-secondary/10';
      case 'followup': return 'bg-success/10';
      default: return 'bg-muted';
    }
  };

  const handleAddEntry = () => {
    const entry = {
      ...newEntry,
      id: Date.now(),
      tags: []
    };
    // Add to medical history
    console.log('Adding new entry:', entry);
    setShowAddForm(false);
    setNewEntry({
      type: 'consultation',
      date: '',
      title: '',
      description: '',
      practitioner: 'Dr. Rajesh Kumar'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Medical History
          </h3>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Comprehensive health records and consultation history
          </p>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={() => setShowAddForm(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Add Entry
        </Button>
      </div>
      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search medical history..."
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
            Export
          </Button>
        </div>
      </div>
      {/* Add Entry Form */}
      {showAddForm && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-heading font-medium text-base text-foreground">
              Add Medical History Entry
            </h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAddForm(false)}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Entry Type"
              type="text"
              value={newEntry?.type}
              onChange={(e) => setNewEntry(prev => ({ ...prev, type: e?.target?.value }))}
              placeholder="consultation, condition, allergy, etc."
            />
            <Input
              label="Date"
              type="date"
              value={newEntry?.date}
              onChange={(e) => setNewEntry(prev => ({ ...prev, date: e?.target?.value }))}
            />
          </div>
          
          <div className="space-y-4">
            <Input
              label="Title"
              type="text"
              value={newEntry?.title}
              onChange={(e) => setNewEntry(prev => ({ ...prev, title: e?.target?.value }))}
              placeholder="Brief title for this entry"
            />
            
            <div>
              <label className="block font-body font-medium text-sm text-foreground mb-2">
                Description
              </label>
              <textarea
                value={newEntry?.description}
                onChange={(e) => setNewEntry(prev => ({ ...prev, description: e?.target?.value }))}
                placeholder="Detailed description of the consultation, condition, or treatment..."
                rows={4}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleAddEntry}
              iconName="Save"
              iconPosition="left"
            >
              Save Entry
            </Button>
          </div>
        </div>
      )}
      {/* Medical History Timeline */}
      <div className="space-y-4">
        {filteredHistory?.map((entry, index) => (
          <div key={entry?.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-soft transition-shadow duration-200">
            <div className="flex items-start space-x-4">
              {/* Timeline Indicator */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full ${getTypeBg(entry?.type)} flex items-center justify-center`}>
                  <Icon 
                    name={getTypeIcon(entry?.type)} 
                    size={18} 
                    className={getTypeColor(entry?.type)}
                  />
                </div>
                {index < filteredHistory?.length - 1 && (
                  <div className="w-px h-16 bg-border mt-4" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-heading font-medium text-base text-foreground">
                      {entry?.title}
                    </h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="font-caption text-xs text-muted-foreground">
                        {new Date(entry.date)?.toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="font-caption text-xs text-muted-foreground">
                        by {entry?.practitioner}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Icon name="MoreVertical" size={16} />
                  </Button>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <p className="font-body text-sm text-foreground whitespace-pre-line">
                    {entry?.description}
                  </p>
                </div>

                {/* Tags */}
                {entry?.tags && entry?.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry?.tags?.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-muted text-muted-foreground font-caption text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {filteredHistory?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h4 className="font-heading font-medium text-base text-foreground mb-2">
            No medical history found
          </h4>
          <p className="font-body text-sm text-muted-foreground mb-4">
            {searchQuery ? 'Try adjusting your search terms' : 'Start by adding the first medical history entry'}
          </p>
          {!searchQuery && (
            <Button
              variant="default"
              onClick={() => setShowAddForm(true)}
              iconName="Plus"
              iconPosition="left"
            >
              Add First Entry
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicalHistoryTab;