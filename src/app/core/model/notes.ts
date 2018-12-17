import { Label } from '../model/label'
import { CheckLists } from '../model/check-lists'

export class Notes {
    collaborators: Array<object>;
    color: string;
    createdDate: Date;
    description: string;
    id: string;
    imageUrl: string;
    isArchived: boolean;
    isDeleted: boolean;
    isPined: boolean;
    label: Array<Label>;
    labelIdList: Array<object>;
    linkUrl: string;
    modifiedDate: Date;
    noteCheckLists: Array<CheckLists>;
    noteLabels: Array<Label>;
    questionAndAnswerNotes: Array<object>;
    reminder: [Date];
    title: string;
    userId: string
}