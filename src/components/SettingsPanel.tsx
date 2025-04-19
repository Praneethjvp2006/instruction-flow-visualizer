
import React, { useState, useEffect } from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface SettingsData {
  [key: string]: boolean;
}

const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState<SettingsData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, we'd fetch from the actual file
    // Here we'll simulate fetching the JSON data
    const fetchSettings = async () => {
      try {
        // Simulated data - in real world this would come from web2.txt
        const mockData = {
          "knob1": true,
          "knob2": false,
          "knob3": true,
          "knob4": true,
          "knob5": false,
          "knob6": true
        };
        
        setSettings(mockData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching settings:", err);
        setError("Failed to load settings. Please try again.");
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleToggle = (key: string) => {
    setSettings(prevSettings => {
      const newSettings = {
        ...prevSettings,
        [key]: !prevSettings[key]
      };
      
      // In a real app, we would save these changes back to the server
      toast({
        title: "Setting updated",
        description: `${key} is now ${newSettings[key] ? 'enabled' : 'disabled'}`,
      });
      
      return newSettings;
    });
  };

  if (loading) {
    return <div className="p-8 flex justify-center items-center">Loading settings...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-custom-darkgray">Pipeline Configuration</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(settings).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div>
              <Label htmlFor={key} className="text-lg font-medium capitalize">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </Label>
              <p className="text-sm text-gray-500">
                {value ? 'Enabled' : 'Disabled'}
              </p>
            </div>
            <Switch 
              id={key} 
              checked={value} 
              onCheckedChange={() => handleToggle(key)}
              className="data-[state=checked]:bg-custom-teal"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPanel;
