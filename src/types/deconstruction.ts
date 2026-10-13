export interface NoteMakingDimension {
  dimension_type: string;
  extraction: string[];
}

export interface AIDeconstructionDirective {
  word: string;
  demand_of_the_question: string;
}

export interface AIDeconstructionCore {
  core_concepts: string[];
  directive: AIDeconstructionDirective;
  dimensions_asked: string[];
}

export interface TaxonomyMapping {
  primary_anchor: string;
  secondary_anchors: string[];
  micro_themes: string[];
}

export interface AIDeconstructionItem {
  question_id: string;
  taxonomy_mapping: TaxonomyMapping;
  deconstruction: AIDeconstructionCore;
  note_making_dimensions: NoteMakingDimension[];
  stakeholders: string[];
  relatability_hooks: string[];
}

export interface DeconstructionApiResponse {
  source: 'curated' | 'ai_generated' | 'computed' | 'synthesized';
  data?: AIDeconstructionItem | null;
  deconstruction: any;
}
