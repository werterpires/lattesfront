export interface ICurriculum {
  _id: string;
  lattesId: string;
  active: boolean;
  serviceYears: string;
  curriculum: string;
  updatedDate: string;
}

export interface ICreateCurriculums {
  curriculums: ICreateCurriculum[];
}

export interface ICreateCurriculum {
  lattesId: string;
  active: boolean;
  serviceYears: string;
  curriculum: string;
  updatedDate: string;
}
