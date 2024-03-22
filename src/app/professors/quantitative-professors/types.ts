import { ILattesCurriculum } from '../../shared/services/types';

export type CurriculumProp = keyof ILattesCurriculum;

export interface currProp {
  key: CurriculumProp;
  name: string;
}
