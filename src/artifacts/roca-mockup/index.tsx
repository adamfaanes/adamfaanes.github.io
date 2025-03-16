import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Landmark } from 'lucide-react';

const DeviceSelectionPage = () => {
  const [selectedView, setSelectedView] = useState<string | null>(null);

  const handleDeviceSelect = (device: string) => {
    setSelectedView(device);
    // In a real implementation, we would use window.location or react-router
    // to navigate to the appropriate page
    if (device === 'desktop') {
      window.location.href = '/roca-desktop'; // Replace this with the name of your desktop tsx file
    } else {
      window.location.href = '/roca-mobile'; // Replace this with the name of your mobile tsx file
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Landmark className="h-8 w-8 mr-2 text-blue-600" />
            <CardTitle className="text-2xl font-bold">ROCA Bank Dashboard</CardTitle>
          </div>
          <p className="text-gray-500 text-sm">Please select your preferred view</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Button 
              className="h-32 flex flex-col items-center justify-center text-lg" 
              onClick={() => handleDeviceSelect('desktop')}
            >
              <span className="text-3xl mb-2">💻</span>
              Desktop
            </Button>
            <Button 
              className="h-32 flex flex-col items-center justify-center text-lg"
              onClick={() => handleDeviceSelect('mobile')}
              variant="outline"
            >
              <span className="text-3xl mb-2">📱</span>
              Mobile
            </Button>
          </div>
          <p className="text-xs text-center mt-6 text-gray-500">
            Choose the view that best matches your current device for optimal experience
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceSelectionPage;