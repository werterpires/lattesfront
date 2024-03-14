import { FilterObject } from '../../shared/filter-input/types';
import { TrabalhoEmEventos } from '../../shared/services/objTypes';

export type EventsWorkKey = keyof TrabalhoEmEventos;

export interface EventProps {
  name: string;
  key: EventsWorkKey;
  showFilter: boolean;
  ascending: boolean;
  filterObject: FilterObject;
}
