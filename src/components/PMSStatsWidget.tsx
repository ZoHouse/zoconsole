import { useState, useEffect } from 'react';
import { zoServer } from '../services/dashboard';
import { format, subDays, isAfter, parseISO } from 'date-fns';
import { ChevronDown, ExternalLink, Loader2 } from 'lucide-react';

interface PMSStatsWidgetProps {
    onOpenModal: () => void;
}

interface PMSBooking {
    total?: number;
    paid?: number;
    arrivaldate?: string;
    trandate?: string;
    created_at?: string;
}

type DateRange = '1d' | '3d' | '7d' | '15d' | '1m';

export function PMSStatsWidget({ onOpenModal }: PMSStatsWidgetProps) {
    const [data, setData] = useState<PMSBooking[]>([]);
    const [filteredTotal, setFilteredTotal] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [selectedRange, setSelectedRange] = useState<DateRange>('1d');

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        calculateTotal();
    }, [data, selectedRange]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await zoServer.get('/pms-bookings');
            const responseData = response.data;

            let items: PMSBooking[] = [];
            if (Array.isArray(responseData)) {
                items = responseData;
            } else if (responseData && Array.isArray(responseData.data)) {
                items = responseData.data;
            }
            setData(items);
        } catch (err) {
            console.error("Failed to fetch PMS stats:", err);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = () => {
        const now = new Date();
        let cutoffDate = now;

        switch (selectedRange) {
            case '1d': cutoffDate = subDays(now, 1); break;
            case '3d': cutoffDate = subDays(now, 3); break;
            case '7d': cutoffDate = subDays(now, 7); break;
            case '15d': cutoffDate = subDays(now, 15); break;
            case '1m': cutoffDate = subDays(now, 30); break;
        }

        const total = data.reduce((sum, item) => {
            // Use arrivaldate as primary, same as Modal
            const dateStr = item.arrivaldate || item.trandate || item.created_at;
            if (!dateStr) return sum;

            try {
                const date = parseISO(dateStr);
                if (isAfter(date, cutoffDate)) {
                    // User asked for "total aggregated cost", usually meaning Revenue in this context (bookings).
                    // Assuming 'paid' is the realized revenue, or 'total' is the booking value.
                    // Profitability tab usually tracks Revenue. I'll use 'total' (Booking Value) or 'paid'.
                    // Let's use 'total' as it represents the filtered booking value.
                    // Actually, earlier data showed 'paid' == 'total'. I'll stick to 'total' as "Revenue".
                    return sum + (item.total || 0);
                }
            } catch (e) {
                // ignore invalid dates
            }
            return sum;
        }, 0);

        setFilteredTotal(total);
    };

    return (
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg">PMS Booking Revenue</h3>
                    <button onClick={onOpenModal} className="text-[#9f9fa9] hover:text-[#9ae600] transition-colors" title="View Details">
                        <ExternalLink className="w-4 h-4" />
                    </button>
                </div>

                <div className="relative">
                    <select
                        value={selectedRange}
                        onChange={(e) => setSelectedRange(e.target.value as DateRange)}
                        className="appearance-none bg-[#18181b] border border-[#27272a] text-[#d4d4d8] text-xs px-3 py-1.5 rounded cursor-pointer hover:bg-[#27272a] focus:outline-none focus:border-[#9ae600] pr-8"
                    >
                        <option value="1d">Last 24 Hours</option>
                        <option value="3d">Last 3 Days</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="15d">Last 15 Days</option>
                        <option value="1m">Last 1 Month</option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-[#9f9fa9] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
            </div>

            <div className="flex items-baseline gap-2">
                {loading ? (
                    <div className="flex items-center gap-2 text-[#9f9fa9]">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-2xl">Loading...</span>
                    </div>
                ) : (
                    <>
                        <span className="text-3xl text-[#9ae600] font-medium">
                            ₹{filteredTotal.toLocaleString()}
                        </span>
                        <span className="text-sm text-[#9f9fa9]">
                            aggregated revenue
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}
