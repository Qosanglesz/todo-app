export interface TodosType {
  todo_id: string;
  name: string;
  description: string;
  isComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
  endedAt: Date;
}

export interface TodoCreateDTO {
  name: string;
  description: string;
  endedAt: Date;
}

export interface TodoUpdateDTO {
  name: string;
  description: string;
  isComplete: boolean;
  endedAt: Date;
}
