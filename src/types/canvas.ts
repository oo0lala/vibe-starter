export type NoteColor = 'yellow' | 'blue' | 'light-blue' | 'orange' | 'green' | 'light-green' | 'pink' | 'purple';

export interface DotVotes {
  cyan: number;
  green: number;
}

export interface CanvasNote {
  id: string;
  sectionId: CanvasSectionId;
  text: string;
  color: NoteColor;
  tilt: 'tilt-1' | 'tilt-2' | 'tilt-3' | 'tilt-0';
  votes: DotVotes;
  createdAt: string;
  author?: string;
  highlighted?: boolean;
}

export type CanvasSectionId =
  | 'key_partners'
  | 'key_activities'
  | 'key_resources'
  | 'key_propositions'
  | 'customer_relationships'
  | 'channels'
  | 'customer_segments'
  | 'cost_structure'
  | 'revenue_streams';

export interface CanvasSection {
  id: CanvasSectionId;
  title: string;
  promptQuestion: string;
  defaultColor: NoteColor;
  gridArea: string;
  description?: string;
}
