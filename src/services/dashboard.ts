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
    staff_id: string; // From JSON
    staff_name?: string; // Likely joined from staff table, might be missing in raw response
    role?: string; // Likely joined, might be missing
    shift_date: string; // From JSON
    shift_start_time: string; // From JSON
    shift_end_time?: string; // Inferring existence, or might need to use shift_start+minutes
    attendance_status: string; // From JSON
    zones_completed: number; // From JSON
    tasks_completed: number; // From JSON
    total_points: number; // From JSON
    total_work_minutes: number; // From JSON
    total_break_minutes: number; // From JSON
    created_at: string; // From JSON
    updated_at: string; // From JSON
    property_id: string; // From JSON
    // UI computed or optional fields
    efficiency?: number;
    average_time?: string;
    issues_flagged?: number;
    customer_rating?: number;
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

export interface Task {
    task_id: string;
    task_name: string;
    task_description: string;
    photo_required: string; // "yes" | "no"
    estimated_time: string; // "30m"
    category: string;
    // Optional fields if they exist in some responses
    zone_id?: string;
    zone_name?: string;
    priority?: number;
    status?: string;
    assigned_to?: string;
}

interface TasksResponse {
    tasks: Task[];
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
    const params: any = {};
    if (date) {
        params.shift_date = date; // Updated to match API expectation 'shift_date'
    }
    if (propertyId && propertyId !== 'all') {
        params.property_id = propertyId;
    }

    try {
        console.log('Fetching daily reports with params:', params);
        const response = await zoServer.get('/daily-performance', { params });

        // zoServer might return the data directly depending on interceptor configuration,
        // but checking standard axios response format first.
        const json = response.data;
        console.log('Daily Reports API Raw Response:', json);

        if (json && json.success && Array.isArray(json.data)) {
            return json.data;
        } else if (Array.isArray(json)) {
            return json;
        } else if (json && json.reports) {
            return json.reports;
        }
        return [];
    } catch (error) {
        console.warn("Failed to fetch daily reports", error);
        return [];
    }
}

export async function fetchStaffList(propertyId?: string): Promise<StaffMember[]> {
    const params: any = {};
    if (propertyId && propertyId !== 'all') {
        params.property_id = propertyId;
    }

    try {
        const response = await zoServer.get('/staff', { params });
        const json = response.data;
        console.log('Staff API Raw Response:', json); // Debug logging

        // Handle SuccessResponse format
        if (json.success && Array.isArray(json.data)) {
            return json.data;
        }
        // Fallback for previous format just in case
        if (json.staff) {
            return json.staff;
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch staff list", error);
        throw error;
    }
}

export async function fetchTasks(propertyId?: string, zoneId?: string): Promise<Task[]> {
    const params: any = {};
    if (propertyId && propertyId !== 'all') {
        params.property_id = propertyId;
    }
    if (zoneId && zoneId !== 'all') {
        params.zone_id = zoneId;
    }

    try {
        const response = await zoServer.get('/tasks', { params });
        const json = response.data;
        console.log('Tasks API Raw Response:', json); // Debug logging

        // Handle SuccessResponse format
        if (json.success && Array.isArray(json.data)) {
            return json.data;
        }
        if (json.tasks && Array.isArray(json.tasks)) {
            return json.tasks;
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch tasks", error);
        return [];
    }
}
