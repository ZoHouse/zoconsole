/**
 * DataListDisplay Component
 * Renders structured data lists with icons, labels, and copy functionality
 */

import React, { useState } from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { cn } from './utils';

export interface DataListItem {
  id: string;
  content: string | React.ReactNode | undefined;
  icon: React.ReactNode;
  link?: string;
  copyText?: string;
  isHidden?: boolean;
  label?: string;
  onClick?: () => void;
}

export interface DataList {
  id: string;
  title?: string;
  data: DataListItem[];
  isHidden?: boolean;
}

interface DataListDisplayProps {
  className?: string;
  data: DataList[];
  isLoading?: boolean;
}

const DataListDisplay: React.FC<DataListDisplayProps> = ({
  className,
  data,
  isLoading,
}) => {
  const [copied, setCopied] = useState<string>('');

  const handleCopy = (copyText: string) => {
    navigator.clipboard.writeText(copyText);
    setCopied(copyText);
    setTimeout(() => setCopied(''), 2000);
  };

  if (isLoading) {
    return (
      <div className={cn('w-full space-y-6', className)}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
            {[1, 2, 3].map((j) => (
              <div key={j} className="flex items-center gap-3">
                <div className="h-5 w-5 bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-48 bg-zinc-800 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      {data
        .filter((list) => !list.isHidden)
        .map((list) => (
          <div key={list.id} className="py-4 first:pt-0">
            {list.title && (
              <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">
                {list.title}
              </h4>
            )}
            <div className="space-y-3">
              {list.data
                .filter((item) => !item.isHidden && item.content != null)
                .map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="h-5 w-5 flex-shrink-0 text-zinc-500">
                      {item.icon}
                    </div>
                    
                    {item.label && (
                      <span className="text-sm text-zinc-400 whitespace-nowrap">
                        {item.label}:
                      </span>
                    )}

                    <div className="flex-1 min-w-0">
                      {item.content && typeof item.content !== 'string' ? (
                        item.content
                      ) : item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#9ae600] hover:underline inline-flex items-center gap-1"
                        >
                          <span className="truncate">{item.content}</span>
                          <ExternalLink className="h-3 w-3 flex-shrink-0" />
                        </a>
                      ) : (
                        <span className="text-sm text-white">{item.content}</span>
                      )}
                    </div>

                    {item.onClick && (
                      <button
                        onClick={item.onClick}
                        className="text-[#9ae600] hover:text-[#8bd500] text-sm ml-auto"
                      >
                        Add
                      </button>
                    )}

                    {item.copyText && (
                      <button
                        onClick={() => handleCopy(item.copyText!)}
                        className="p-1 hover:bg-zinc-800 rounded transition-colors ml-auto"
                        title={copied === item.copyText ? 'Copied!' : 'Copy'}
                      >
                        {copied === item.copyText ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4 text-zinc-500" />
                        )}
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default DataListDisplay;
