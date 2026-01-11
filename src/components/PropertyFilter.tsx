import { ChevronDown } from 'lucide-react';

interface PropertyFilterProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
  showLabel?: boolean;
}

export function PropertyFilter({ selectedProperty, onPropertyChange, showLabel = true }: PropertyFilterProps) {
  const properties = [
    { id: 'blr-zo', name: 'BLRxZo' },
    { id: 'wtf-zo', name: 'WTFxZo' },
    { id: 'sfo-zo', name: 'SFOxZo' },
    { id: 'dxb-zo', name: 'DXBxZo' },
    { id: 'sgp-zo', name: 'SGPxZo' },
  ];

  const selectedPropertyName = properties.find(p => p.id === selectedProperty)?.name || 'BLRxZo';

  return (
    <div className="relative w-full">
      <select
        value={selectedProperty}
        onChange={(e) => onPropertyChange(e.target.value)}
        className="appearance-none w-full flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#18181b] border border-[#27272a] rounded cursor-pointer hover:bg-[#27272a] text-xs sm:text-sm text-white focus:outline-none focus:border-[#71717b] pr-10"
      >
        {properties.map((property) => (
          <option key={property.id} value={property.id} className="bg-[#18181b]">
            {property.name}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-white" />
    </div>
  );
}