
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PlaylistManager } from '../PlaylistManager';
import * as nodesService from '../../services/nodes';

// Mock the nodes service
vi.mock('../../services/nodes', () => ({
    fetchNodeData: vi.fn(),
    fetchPlaylists: vi.fn(),
    fetchTasks: vi.fn(),
    fetchTemplates: vi.fn(),
    createTask: vi.fn(() => Promise.resolve({ task_id: 'NEW_TASK_ID' })), // Return ID for linking
    createTemplate: vi.fn(),
    createZoneTemplate: vi.fn(),
    createPlaylist: vi.fn(),
    getUniqueZonesFromTasks: vi.fn(() => []),
    getUniqueTemplatesFromTasks: vi.fn(() => [])
}));

// Mock the Modal components with proper data structures
vi.mock('../TaskTemplatePlaylistModals', () => ({
    CreateTaskModal: ({ isOpen, onSave }: any) =>
        isOpen ? <button data-testid="save-task" onClick={() => onSave({
            name: 'New Task',
            templateId: 'T1',
            estimatedMinutes: 10,
            requiresPhoto: true
        })}>Save Task</button> : null,

    CreateTemplateModal: ({ isOpen, onSave }: any) =>
        isOpen ? <button data-testid="save-template" onClick={() => onSave({
            name: 'New Template',
            totalMinutes: 15,
            zone: { id: 'Z1', name: 'Zone 1', floor: '1' },
            description: 'Test Desc'
        })}>Save Template</button> : null,

    CreatePlaylistModal: ({ isOpen, onSave }: any) =>
        isOpen ? <button data-testid="save-playlist" onClick={() => onSave({
            name: 'New Playlist',
            templateIds: ['T1', 'T2'],
            priority: 'urgent',
            totalTimeMins: 60,
            type: 'deep_clean'
        })}>Save Playlist</button> : null
}));

describe('Creation Workflows Integration', () => {
    const mockNodeData = {
        zones: [{ id: 'Z1', name: 'Zone 1', floor: '1', zone_type: 'common' }],
        templates: [{ id: 'T1', name: 'Template 1', use_case: 'Test' }],
        housekeeping_tasks: []
    };

    beforeEach(() => {
        vi.clearAllMocks();
        (nodesService.fetchNodeData as any).mockResolvedValue(mockNodeData);
        (nodesService.fetchPlaylists as any).mockResolvedValue([]);
        (nodesService.fetchTasks as any).mockResolvedValue([]);
        (nodesService.fetchTemplates as any).mockResolvedValue([{
            id: 'TI1',
            node_id: 'prop1',
            template_id: 'T1',
            template_name: 'Template 1',
            item_order: '1',
            task_id: 'TK1',
            task_name: 'Existing Task',
            total_est_time: '15m'
        }]);
        (nodesService.getUniqueZonesFromTasks as any).mockReturnValue([{ id: 'Z1', name: 'Zone 1', floor: '1' }]);
        (nodesService.getUniqueTemplatesFromTasks as any).mockReturnValue([{ id: 'T1', name: 'Template 1', use_case: 'Test' }]);
    });

    it('should call createTask API and link to template when CreateTaskModal saves', async () => {
        render(<PlaylistManager selectedProperty="prop1" onPropertyChange={() => { }} />);

        await waitFor(() => expect(nodesService.fetchNodeData).toHaveBeenCalled());

        // Switch to Tasks tab
        fireEvent.click(screen.getByRole('button', { name: /Tasks/i }));

        // Open Modal
        fireEvent.click(screen.getByText('Create Task'));

        // Trigger Save from Mock Modal
        fireEvent.click(screen.getByTestId('save-task'));

        await waitFor(() => {
            // 1. Check task creation
            expect(nodesService.createTask).toHaveBeenCalledWith(expect.objectContaining({
                node_id: 'prop1',
                task_name: 'New Task',
                estimated_time: '10m',
                photo_required: 'yes'
            }));

            // 2. Check linking to template
            expect(nodesService.createTemplate).toHaveBeenCalledWith(expect.objectContaining({
                node_id: 'prop1',
                template_id: 'T1',
                task_id: 'NEW_TASK_ID',
                task_name: 'New Task',
                total_est_time: '10m'
            }));
        });
    });

    it('should call createTemplate API when CreateTemplateModal saves', async () => {
        render(<PlaylistManager selectedProperty="prop1" onPropertyChange={() => { }} />);

        await waitFor(() => expect(nodesService.fetchNodeData).toHaveBeenCalled());

        // Switch to Templates tab
        fireEvent.click(screen.getByRole('button', { name: /Templates/i }));

        // Open Modal
        fireEvent.click(screen.getByText('Create Template'));

        // Trigger Save from Mock Modal
        fireEvent.click(screen.getByTestId('save-template'));

        await waitFor(() => {
            expect(nodesService.createTemplate).toHaveBeenCalledWith(expect.objectContaining({
                node_id: 'prop1',
                template_name: 'New Template',
                total_est_time: '15m'
            }));

            expect(nodesService.createZoneTemplate).toHaveBeenCalledWith(expect.objectContaining({
                node_id: 'prop1',
                zone_id: 'Z1',
                template_name: 'New Template',
                use_case: 'Test Desc'
            }));
        });
    });

    it('should call createPlaylist API when CreatePlaylistModal saves', async () => {
        render(<PlaylistManager selectedProperty="prop1" onPropertyChange={() => { }} />);

        await waitFor(() => expect(nodesService.fetchNodeData).toHaveBeenCalled());

        // Switch to Playlists tab
        fireEvent.click(screen.getByRole('button', { name: /Playlists/i }));

        // Open Modal
        fireEvent.click(screen.getByText('Create Playlist'));

        // Trigger Save from Mock Modal
        fireEvent.click(screen.getByTestId('save-playlist'));

        await waitFor(() => {
            expect(nodesService.createPlaylist).toHaveBeenCalledWith(expect.objectContaining({
                node_id: 'prop1',
                playlist_type: 'deep_clean',
                templates_included: 'T1,T2',
                priority: 'high',
                est_time: '60m'
            }));
        });
    });
});
