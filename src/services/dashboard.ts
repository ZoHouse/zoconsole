export interface TopPerformer {
    name: string;
    points: number;
}

import { zoServer } from '../lib/axios';
export { zoServer };

export interface DashboardStats {
    total_staff: number;
    active_now: number;
    on_leave: number;
    revenue_per_employee: number;
    top_performer: {
        name: string;
        points: number;
    };
}

export interface DetailedZone {
    zone_name: string;
    time_taken: string;
    status: string;
}

export interface DailyReport {
    id: number;
    staff_name: string;
    role: string;
    shift_start: string;
    shift_end: string;
    attendance_status: string;
    tasks_completed: number;
    average_time: string; // "XXm"
    efficiency: number; // percentage
    points_earned: number;
    issues_flagged: number;
    customer_rating: number; // 1-5
    date: string;
}

export interface StaffMember {
    staff_id: string;
    staff_name: string;
    role: string;
    department: string;
    status: 'active' | 'on_leave' | 'inactive' | 'On Leave';
    property_id: string;
    shift_start?: string;
    shift_end?: string;
    phone_number?: string;
    created_at?: string;
    updated_at?: string;
}

interface DailyReportsResponse {
    reports: DailyReport[];
}

interface StaffResponse {
    staff: StaffMember[];
}

interface SuccessResponse<T> {
    success: boolean;
    data: T;
}


export async function fetchDashboardStats(propertyId?: string): Promise<DashboardStats> {
    // Since there is no direct stats endpoint on the deployed API yet,
    // we calculate them from the staff list.
    try {
        const staffList = await fetchStaffList(propertyId);

        const total_staff = staffList.length;
        const active_now = staffList.filter(s => s.status === 'active').length;
        const on_leave = staffList.filter(s => s.status === 'on_leave' || s.status === 'On Leave').length;

        // Placeholder values as these can't be computed from staff list alone
        const revenue_per_employee = 0;
        const top_performer = { name: '-', points: 0 };

        return {
            total_staff,
            active_now,
            on_leave,
            revenue_per_employee,
            top_performer
        };
    } catch (error) {
        console.error("Error calculating dashboard stats:", error);
        return {
            total_staff: 0,
            active_now: 0,
            on_leave: 0,
            revenue_per_employee: 0,
            top_performer: { name: '-', points: 0 }
        };
    }
}

export async function fetchDailyReports(date?: string, propertyId?: string): Promise<DailyReport[]> {
    const url = new URL(`${API_BASE_URL}/daily-performance`);
    if (date) {
        url.searchParams.append('date', date);
    }
    if (propertyId && propertyId !== 'all') {
        url.searchParams.append('property_id', propertyId);
    }

    const response = await fetch(url.toString(), {
        headers: {
            'accept': 'application/json',
        },
    });

    if (!response.ok) {
        // Return empty list if endpoint fails (e.g. 404 or 500)
        console.warn(`Failed to fetch daily reports: ${response.statusText}`);
        return [];
    }

    // Handle potential empty body or different format
    try {
        const json = await response.json();
        // Check if it's the SuccessResponse format or direct list
        if (json && json.success && Array.isArray(json.data)) {
            return json.data;
        } else if (Array.isArray(json)) {
            return json;
        } else if (json && json.reports) {
            return json.reports;
        }
        return [];
    } catch (e) {
        console.warn("Failed to parse daily reports", e);
        return [];
    }
}

export async function fetchStaffList(propertyId?: string): Promise<StaffMember[]> {
    const url = new URL(`${API_BASE_URL}/staff`);
    if (propertyId && propertyId !== 'all') {
        url.searchParams.append('property_id', propertyId);
    }

    const response = await fetch(url.toString(), {
        headers: {
            'accept': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch staff list: ${response.statusText}`);
    }

    const json = await response.json();
    // Handle SuccessResponse format
    if (json.success && Array.isArray(json.data)) {
        return json.data;
    }
    // Fallback for previous format just in case
    if (json.staff) {
        return json.staff;
    }
    return [];
}
