import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ selectedPatients, onBulkAction, onClearSelection }) => {
  const [showBulkMenu, setShowBulkMenu] = useState(false);
  const [bulkAction, setBulkAction] = useState('');

  const bulkActionOptions = [
    { value: '', label: 'Select bulk action...' },
    { value: 'export', label: 'Export Selected Patients' },
    { value: 'generate-reports', label: 'Generate Reports' },
    { value: 'send-reminders', label: 'Send Follow-up Reminders' },
    { value: 'update-status', label: 'Update Status' },
    { value: 'schedule-appointments', label: 'Schedule Appointments' },
    { value: 'archive', label: 'Archive Patients' },
    { value: 'delete', label: 'Delete Patients' }
  ];

  const handleBulkAction = () => {
    if (bulkAction && selectedPatients?.length > 0) {
      onBulkAction(bulkAction, selectedPatients);
      setBulkAction('');
      setShowBulkMenu(false);
    }
  };

  const exportOptions = [
    { value: 'csv', label: 'Export as CSV', icon: 'FileSpreadsheet' },
    { value: 'excel', label: 'Export as Excel', icon: 'FileSpreadsheet' },
    { value: 'pdf', label: 'Export as PDF', icon: 'FileText' }
  ];

  if (selectedPatients?.length === 0) {
    return null;
  }

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-medium text-sm">
              {selectedPatients?.length}
            </span>
          </div>
          <div>
            <p className="font-body font-medium text-sm text-foreground">
              {selectedPatients?.length} patient{selectedPatients?.length !== 1 ? 's' : ''} selected
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              Choose an action to apply to selected patients
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
            className="text-muted-foreground hover:text-foreground"
          >
            Clear selection
          </Button>

          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBulkMenu(!showBulkMenu)}
              iconName="ChevronDown"
              iconPosition="right"
            >
              Bulk Actions
            </Button>

            {showBulkMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-soft-lg z-50 animate-fade-in">
                <div className="p-2">
                  <div className="space-y-1">
                    {/* Quick Export Options */}
                    <div className="px-2 py-1">
                      <p className="font-caption text-xs text-muted-foreground uppercase tracking-wide">
                        Quick Export
                      </p>
                    </div>
                    {exportOptions?.map((option) => (
                      <button
                        key={option?.value}
                        onClick={() => {
                          onBulkAction(`export-${option?.value}`, selectedPatients);
                          setShowBulkMenu(false);
                        }}
                        className="w-full px-2 py-2 text-left hover:bg-muted rounded-md transition-colors duration-200 flex items-center space-x-2"
                      >
                        <Icon name={option?.icon} size={16} className="text-muted-foreground" />
                        <span className="font-body text-sm text-foreground">{option?.label}</span>
                      </button>
                    ))}

                    <div className="border-t border-border my-1"></div>

                    {/* Other Actions */}
                    <div className="px-2 py-1">
                      <p className="font-caption text-xs text-muted-foreground uppercase tracking-wide">
                        Actions
                      </p>
                    </div>
                    
                    <button
                      onClick={() => {
                        onBulkAction('generate-reports', selectedPatients);
                        setShowBulkMenu(false);
                      }}
                      className="w-full px-2 py-2 text-left hover:bg-muted rounded-md transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Icon name="FileText" size={16} className="text-muted-foreground" />
                      <span className="font-body text-sm text-foreground">Generate Reports</span>
                    </button>

                    <button
                      onClick={() => {
                        onBulkAction('send-reminders', selectedPatients);
                        setShowBulkMenu(false);
                      }}
                      className="w-full px-2 py-2 text-left hover:bg-muted rounded-md transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Icon name="Bell" size={16} className="text-muted-foreground" />
                      <span className="font-body text-sm text-foreground">Send Follow-up Reminders</span>
                    </button>

                    <button
                      onClick={() => {
                        onBulkAction('schedule-appointments', selectedPatients);
                        setShowBulkMenu(false);
                      }}
                      className="w-full px-2 py-2 text-left hover:bg-muted rounded-md transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Icon name="Calendar" size={16} className="text-muted-foreground" />
                      <span className="font-body text-sm text-foreground">Schedule Appointments</span>
                    </button>

                    <div className="border-t border-border my-1"></div>

                    {/* Destructive Actions */}
                    <button
                      onClick={() => {
                        onBulkAction('archive', selectedPatients);
                        setShowBulkMenu(false);
                      }}
                      className="w-full px-2 py-2 text-left hover:bg-muted rounded-md transition-colors duration-200 flex items-center space-x-2 text-warning"
                    >
                      <Icon name="Archive" size={16} />
                      <span className="font-body text-sm">Archive Patients</span>
                    </button>

                    <button
                      onClick={() => {
                        onBulkAction('delete', selectedPatients);
                        setShowBulkMenu(false);
                      }}
                      className="w-full px-2 py-2 text-left hover:bg-muted rounded-md transition-colors duration-200 flex items-center space-x-2 text-error"
                    >
                      <Icon name="Trash2" size={16} />
                      <span className="font-body text-sm">Delete Patients</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Action Confirmation */}
      {bulkAction && (
        <div className="mt-4 p-3 bg-muted/50 rounded-md flex items-center justify-between">
          <div>
            <p className="font-body text-sm text-foreground">
              Apply "{bulkActionOptions?.find(opt => opt?.value === bulkAction)?.label}" to {selectedPatients?.length} patient{selectedPatients?.length !== 1 ? 's' : ''}?
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setBulkAction('')}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleBulkAction}
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
      {/* Click outside to close menu */}
      {showBulkMenu && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowBulkMenu(false)}
        />
      )}
    </div>
  );
};

export default BulkActions;