export interface Notes {
collaberator: [object],
collaborators: [object],
color: string,
createdDate: Date,
description: string,
id: string,
imageUrl: string,
isArchived: false,
isDeleted: false,
isPined: false,
label: Array<Label>,
labelIdList: [object],
linkUrl: string,
modifiedDate: Date,
noteCheckLists:Array<checkLists>,
noteLabels: Array<Label>,
questionAndAnswerNotes: [object],
reminder: [object],
title: string,
userId: string
}

export interface Label {
    id: string,
    isDeleted: false,
    label: string,
    userId: string
}

export interface checkLists {
    createdDate: Date,
    id: string,
    isDeleted: false,
    itemName: string,
    modifiedDate: Date,
    notesId: string,
    status: string
}