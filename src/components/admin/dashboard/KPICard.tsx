'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { ReactNode } from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
  backgroundColor: string;
  iconColor: string;
}

export default function KPICard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  backgroundColor, 
  iconColor 
}: KPICardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
            <p className="text-sm font-medium text-gray-600 mt-1">{title}</p>
            <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
          </div>
          
          <div 
            className="flex h-16 w-16 items-center justify-center rounded-lg"
            style={{ backgroundColor }}
          >
            <div style={{ color: iconColor }}>
              {icon}
            </div>
          </div>
        </div>
        
        {/* Decorative background pattern */}
        <div className="absolute -bottom-2 -right-2 opacity-5">
          <div style={{ color: iconColor, fontSize: '4rem' }}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
