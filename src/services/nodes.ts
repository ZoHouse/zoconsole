import { zoServer } from '../lib/axios';

// Types based on API response from /api/v1/nodes/{node_id}

export interface Zone {
    id: string;
    node_id: string;
    name: string;
    floor: string;
    zone_type: string;
    capacity?: number;
}

export interface NodeTemplate {
    id: string;
    node_id: string;
    name: string;
    description?: string;
    use_case?: string;
}

export interface HousekeepingTask {
    id: string;
    node_id: string;
    zone_id: string;
    zone_name: string;
    floor: string;
    template_id: string;
    template_name: string;
    use_case: string;
}

export interface NodeData {
    zones: Zone[];
    templates: NodeTemplate[];
    housekeeping_tasks: HousekeepingTask[];
}

interface NodeApiResponse {
    success: boolean;
    data: NodeData;
}

/**
 * Fetches node data including zones, templates, and housekeeping tasks
 * @param nodeId - The node identifier (e.g., 'wtfxzo')
 * @returns Promise<NodeData>
 */
export async function fetchNodeData(nodeId: string): Promise<NodeData> {
    try {
        // API expects lowercase node IDs
        const normalizedNodeId = nodeId.toLowerCase();
        const response = await zoServer.get(`/nodes/${normalizedNodeId}`);
        const json = response.data;

        console.log('Node API Raw Response:', json);

        if (json.success && json.data) {
            const apiData = json.data;
            // Map API field names to our internal structure
            // API returns: node_zones, templates, tasks, zone_templates
            return {
                zones: apiData.node_zones || [],
                templates: apiData.templates || [],
                // zone_templates contains zone-template mappings (what we called housekeeping_tasks)
                housekeeping_tasks: apiData.zone_templates || []
            };
        }

        // Fallback for unexpected format
        if (json && typeof json === 'object') {
            const apiData = json as any;
            return {
                zones: apiData.node_zones || apiData.zones || [],
                templates: apiData.templates || [],
                housekeeping_tasks: apiData.zone_templates || apiData.housekeeping_tasks || []
            };
        }

        return {
            zones: [],
            templates: [],
            housekeeping_tasks: []
        };
    } catch (error) {
        console.error('Failed to fetch node data:', error);
        return {
            zones: [],
            templates: [],
            housekeeping_tasks: []
        };
    }
}

/**
 * Helper to get unique zones from housekeeping tasks 
 * (useful for filtering when zones array is limited)
 */
export function getUniqueZonesFromTasks(tasks: HousekeepingTask[]): { id: string; name: string; floor: string }[] {
    if (!tasks || !Array.isArray(tasks)) return [];

    const zoneMap = new Map<string, { id: string; name: string; floor: string }>();

    for (const task of tasks) {
        if (task && task.zone_id && !zoneMap.has(task.zone_id)) {
            zoneMap.set(task.zone_id, {
                id: task.zone_id,
                name: task.zone_name || 'Unknown Zone',
                floor: task.floor || 'Unknown Floor'
            });
        }
    }

    return Array.from(zoneMap.values());
}

/**
 * Helper to get unique templates from housekeeping tasks
 */
export function getUniqueTemplatesFromTasks(tasks: HousekeepingTask[]): { id: string; name: string; use_case: string }[] {
    if (!tasks || !Array.isArray(tasks)) return [];

    const templateMap = new Map<string, { id: string; name: string; use_case: string }>();

    for (const task of tasks) {
        if (task && task.template_id && !templateMap.has(task.template_id)) {
            templateMap.set(task.template_id, {
                id: task.template_id,
                name: task.template_name || 'Unknown Template',
                use_case: task.use_case || ''
            });
        }
    }

    return Array.from(templateMap.values());
}

// ============ CREATE OPERATIONS ============

export interface CreateTaskPayload {
    node_id?: string;  // Associates task with specific property
    task_id: string;
    task_name: string;
    task_description?: string;
    photo_required: 'yes' | 'no';
    estimated_time: string;
    category?: string;
}

export interface CreateTemplatePayload {
    node_id?: string;  // Associates template with specific property
    template_id: string;
    template_name: string;
    item_order?: string;
    task_id?: string;
    task_name?: string;
    total_est_time?: string;
}

export interface CreateZoneTemplatePayload {
    node_id?: string;
    zone_id: string;
    zone_name: string;
    floor: string;
    template_id: string;
    template_name: string;
    use_case?: string;
}

/**
 * Creates a new task
 */
export async function createTask(payload: CreateTaskPayload): Promise<{ id: string } & CreateTaskPayload> {
    const response = await zoServer.post('/tasks', payload);
    const json = response.data;

    if (json.success && json.data) {
        return json.data;
    }
    throw new Error('Failed to create task');
}

/**
 * Creates a new template
 */
export async function createTemplate(payload: CreateTemplatePayload): Promise<{ id: string } & CreateTemplatePayload> {
    const response = await zoServer.post('/templates', payload);
    const json = response.data;

    if (json.success && json.data) {
        return json.data;
    }
    throw new Error('Failed to create template');
}

/**
 * Creates a new zone-template mapping (assigns template to a zone)
 */
export async function createZoneTemplate(payload: CreateZoneTemplatePayload): Promise<{ id: string } & CreateZoneTemplatePayload> {
    const response = await zoServer.post('/zone-templates', payload);
    const json = response.data;

    if (json.success && json.data) {
        return json.data;
    }
    throw new Error('Failed to create zone template');
}

export interface CreatePlaylistPayload {
    node_id?: string;  // Associates playlist with specific property
    playlist_type: string;  // 'daily', 'weekly', etc.
    role?: string;
    zones?: string;  // comma-separated zone IDs
    templates_included: string;  // comma-separated template IDs
    priority: 'high' | 'normal' | 'low';
    est_time?: string;
    trigger_when?: string;
}

/**
 * Creates a new playlist
 */
export async function createPlaylist(payload: CreatePlaylistPayload): Promise<{ id: string } & CreatePlaylistPayload> {
    const response = await zoServer.post('/playlists', payload);
    const json = response.data;

    if (json.success && json.data) {
        return json.data;
    }
    throw new Error('Failed to create playlist');
}

