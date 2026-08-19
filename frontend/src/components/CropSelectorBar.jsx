import React from 'react';

const CROPS = [
  { id: 'TOMATO', label: 'Tomato', icon: '🍅' },
  { id: 'POTATO', label: 'Potato', icon: '🥔' },
  { id: 'CORN', label: 'Corn', icon: '🌽' },
  { id: 'WHEAT', label: 'Wheat', icon: '🌾' },
  { id: 'RICE', label: 'Rice', icon: '🍚' }
];

export default function CropSelectorBar({ selectedCrop, onSelectCrop }) {
  return (
    <div className="px-6 py-2">
      <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
        {CROPS.map((crop) => {
          const isSelected = selectedCrop === crop.id;
          return (
            <button
              key={crop.id}
              onClick={() => onSelectCrop(crop.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-200 shadow-sm whitespace-nowrap ${
                isSelected
                  ? 'bg-slate-900 text-white scale-105 shadow-slate-300'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-100'
              }`}
            >
              <span className="text-base">{crop.icon}</span>
              <span>{crop.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
