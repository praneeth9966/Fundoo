export interface Notes {
collaborators: Array<object>,
color: string,
createdDate: Date,
description: string,
id: string,
imageUrl: string,
isArchived: boolean,
isDeleted: boolean,
isPined: boolean,
label: Array<Label>,
labelIdList: Array<object>,
linkUrl: string,
modifiedDate: Date,
noteCheckLists:Array<checkLists>,
noteLabels: Array<Label>,
questionAndAnswerNotes:Array<object>,
reminder: [Date],
title: string,
userId: string
}

export interface Label {
    id: string,
    isDeleted: boolean,
    label: string,
    userId: string
}

export interface checkLists {
    createdDate: Date,
    id: string,
    isDeleted: boolean,
    itemName: string,
    modifiedDate: Date,
    notesId: string,
    status: string
}