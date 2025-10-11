'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Fried Dishes', value: 61, color: '#ef4444' },
  { name: 'BBQ', value: 22, color: '#10b981' },
  { name: 'Hot Pot', value: 17, color: '#3b82f6' },
];

const RADIAN = Math.PI / 180;

interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: LabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize="14"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function TopicsChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-900">Biểu đồ chủ đề</CardTitle>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="chart" className="rounded" defaultChecked />
            <label htmlFor="chart" className="text-gray-600">Chart</label>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
            <span className="text-gray-600">Show Value</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Pie Charts */}
          <div className="col-span-1 xl:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-6">
              {data.map((item, index) => (
                <div key={item.name} className="text-center px-2">
                  <div className="relative h-28 w-28 lg:h-24 lg:w-24 xl:h-28 xl:w-28 mx-auto mb-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { value: item.value },
                            { value: 100 - item.value }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={28}
                          outerRadius={45}
                          startAngle={90}
                          endAngle={-270}
                          dataKey="value"
                        >
                          <Cell fill={item.color} />
                          <Cell fill="#f3f4f6" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-base lg:text-lg font-bold text-gray-900">{item.value}%</span>
                    </div>
                  </div>
                  <p className="text-sm lg:text-base font-medium text-gray-900">{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-4 lg:space-y-3">
            {data.map((item) => (
              <div key={item.name} className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm lg:text-base text-gray-700">{item.name}</span>
                </div>
                <span className="text-sm lg:text-base font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
