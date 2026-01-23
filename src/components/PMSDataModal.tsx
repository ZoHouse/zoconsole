import { useState, useEffect } from 'react';
import { X, Calendar, Filter, FileJson, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { zoServer } from '../services/dashboard';
import { format, subDays, isAfter, parseISO } from 'date-fns';

interface PMSDataModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface PMSResponse {
    tranunkid: string;
    trandate?: string;
    arrivaldate?: string;
    departuredate?: string;
    guestname?: string;
    total?: number;
    paid?: number;
    balance?: number;
    created_at?: string;
    // Keep these just in case mixed data
    target_date?: string;
    status?: string;
    response_data?: string;
    booking_count?: string;
    id?: string;
}

type DateRange = '1d' | '3d' | '7d' | '15d' | '1m';

export function PMSDataModal({ isOpen, onClose }: PMSDataModalProps) {
    const [data, setData] = useState<PMSResponse[]>([]);
    const [filteredData, setFilteredData] = useState<PMSResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedRange, setSelectedRange] = useState<DateRange>('1d');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    useEffect(() => {
        filterData();
    }, [data, selectedRange]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch all data and filter client-side since API filter is single date
            // The response is now a list of bookings
            const response = await zoServer.get('/pms-bookings');
            const responseData = response.data;

            let items: PMSResponse[] = [];
            if (Array.isArray(responseData)) {
                items = responseData;
            } else if (responseData && Array.isArray(responseData.data)) {
                items = responseData.data;
            }

            console.log('PMS Bookings Data (Sample):', items[0]);

            // Sort by arrivaldate descending (per user request)
            items.sort((a, b) => {
                const dateAStr = a.arrivaldate || a.trandate || a.created_at || new Date().toISOString();
                const dateBStr = b.arrivaldate || b.trandate || b.created_at || new Date().toISOString();
                const dateA = new Date(dateAStr).getTime();
                const dateB = new Date(dateBStr).getTime();
                return dateB - dateA;
            });

            setData(items);
        } catch (err) {
            console.error("Failed to fetch PMS data:", err);
            setError("Failed to load PMS data");
        } finally {
            setLoading(false);
        }
    };

    const filterData = () => {
        const now = new Date();
        let cutoffDate = now;

        switch (selectedRange) {
            case '1d':
                cutoffDate = subDays(now, 1);
                break;
            case '3d':
                cutoffDate = subDays(now, 3);
                break;
            case '7d':
                cutoffDate = subDays(now, 7);
                break;
            case '15d':
                cutoffDate = subDays(now, 15);
                break;
            case '1m':
                cutoffDate = subDays(now, 30);
                break;
        }

        const filtered = data.filter(item => {
            // Use arrivaldate as the primary date for filtering
            const dateStr = item.arrivaldate || item.trandate || item.created_at;
            if (!dateStr) return false;

            try {
                const date = parseISO(dateStr);
                return isAfter(date, cutoffDate);
            } catch (e) {
                return false;
            }
        });

        setFilteredData(filtered);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#09090b] border border-[#27272a] rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#27272a]">
                    <div>
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-[#9ae600]" />
                            PMS Profitability Data
                        </h2>
                        <p className="text-sm text-[#9f9fa9]">API responses and booking metrics</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[#27272a] rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar - Filters */}
                    <div className="w-48 bg-[#18181b] border-r border-[#27272a] p-4 flex flex-col gap-2 overflow-y-auto">
                        <h3 className="text-xs font-semibold text-[#9f9fa9] mb-2 uppercase tracking-wider">Date Range</h3>
                        {[
                            { id: '1d', label: 'Last 1 Day' },
                            { id: '3d', label: 'Last 3 Days' },
                            { id: '7d', label: 'Last 7 Days' },
                            { id: '15d', label: 'Last 15 Days' },
                            { id: '1m', label: 'Last 1 Month' },
                        ].map((range) => (
                            <button
                                key={range.id}
                                onClick={() => setSelectedRange(range.id as DateRange)}
                                className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedRange === range.id
                                    ? 'bg-[#9ae600] text-black font-medium'
                                    : 'text-[#d4d4d8] hover:bg-[#27272a]'
                                    }`}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>

                    {/* Main Content - List */}
                    <div className="flex-1 overflow-y-auto p-6 bg-[#09090b]">
                        {loading ? (
                            <div className="flex items-center justify-center h-full text-[#9f9fa9]">
                                Loading data...
                            </div>
                        ) : error ? (
                            <div className="flex flex-col items-center justify-center h-full text-[#fb2c36]">
                                <AlertCircle className="w-8 h-8 mb-2" />
                                <p>{error}</p>
                                <button
                                    onClick={fetchData}
                                    className="mt-4 px-4 py-2 bg-[#27272a] text-white rounded hover:bg-[#3f3f46] text-sm"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : filteredData.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-[#9f9fa9]">
                                <Calendar className="w-12 h-12 mb-3 opacity-20" />
                                <p>No data found for the selected range.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm text-[#9f9fa9] pb-2 border-b border-[#27272a]">
                                    <span>Showing {filteredData.length} records</span>
                                    <span>Target Date</span>
                                </div>

                                {filteredData.map((item, index) => {
                                    const isPaid = (item.balance || 0) <= 0;
                                    const dateStr = item.arrivaldate || item.trandate || item.created_at;
                                    const itemId = item.tranunkid || item.id || index.toString();

                                    return (
                                        <div
                                            key={itemId}
                                            className="bg-[#18181b] border border-[#27272a] rounded-lg overflow-hidden hover:border-[#71717b] transition-all"
                                        >
                                            <div
                                                className="p-4 flex items-center justify-between cursor-pointer"
                                                onClick={() => setExpandedId(expandedId === itemId ? null : itemId)}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-2 rounded-full ${isPaid ? 'bg-[#9ae600]/10 text-[#9ae600]' : 'bg-[#f0b100]/10 text-[#f0b100]'
                                                        }`}>
                                                        {isPaid ? (
                                                            <CheckCircle className="w-4 h-4" />
                                                        ) : (
                                                            <AlertCircle className="w-4 h-4" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-[#d4d4d8]">
                                                            {item.guestname || 'Unknown Guest'}
                                                        </div>
                                                        <div className="text-xs text-[#9f9fa9] mt-1">
                                                            Total: <span className="text-[#d4d4d8]">₹{(item.total || 0).toLocaleString()}</span>
                                                            <span className="mx-2">•</span>
                                                            Paid: <span className="text-[#9ae600]">₹{(item.paid || 0).toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <div className="text-sm font-medium text-[#9ae600]">
                                                        {dateStr ? format(parseISO(dateStr), 'MMM d, yyyy') : 'No Date'}
                                                    </div>
                                                    <div className="text-xs text-[#9f9fa9] mt-1 flex items-center justify-end gap-1">
                                                        <FileJson className="w-3 h-3" />
                                                        Details
                                                    </div>
                                                </div>
                                            </div>

                                            {expandedId === itemId && (
                                                <div className="bg-[#000000]/50 p-4 border-t border-[#27272a]">
                                                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                                                        <div>
                                                            <div className="text-[#9f9fa9] text-xs mb-1">Arrival Date</div>
                                                            <div>{item.arrivaldate ? format(parseISO(item.arrivaldate), 'PP p') : '-'}</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-[#9f9fa9] text-xs mb-1">Departure Date</div>
                                                            <div>{item.departuredate ? format(parseISO(item.departuredate), 'PP p') : '-'}</div>
                                                        </div>
                                                    </div>

                                                    <h4 className="text-xs font-semibold text-[#9f9fa9] mb-2 uppercase border-t border-[#27272a] pt-3">Raw Data</h4>
                                                    <pre className="text-xs text-[#d4d4d8] font-mono whitespace-pre-wrap bg-[#1a1a1a] p-3 rounded border border-[#27272a] overflow-x-auto max-h-60">
                                                        {JSON.stringify(item, null, 2)}
                                                    </pre>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function tryPrettyPrint(jsonString: string) {
    try {
        const obj = JSON.parse(jsonString);
        return JSON.stringify(obj, null, 2);
    } catch (e) {
        return jsonString;
    }
}
