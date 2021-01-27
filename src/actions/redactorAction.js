export const SET_SELECTED_TEXT = '@@redactor/SET_SELECTED_TEXT';

export const setSelectedText = (selectedText) => ({
    type: SET_SELECTED_TEXT,
    selectedText,
});

export const SET_SELECTED_TEXT_NODE = '@@redactor/SET_SELECTED_TEXT_NODE';

export const setSelectedTextNode = (selectedTextNode) => ({
    type: SET_SELECTED_TEXT_NODE,
    selectedTextNode,
});

export const SET_COMMENT_TEXT = '@@redactor/SET_COMMENT_TEXT';

export const setCommentText = (commentText) => ({
    type: SET_COMMENT_TEXT,
    commentText,
});

export const SET_REDACTOR_STATUS = '@@redactor/SET_REDACTOR_STATUS';

export const setRedactorStatus = (isRedactorOpen) => ({
    type: SET_REDACTOR_STATUS,
    isRedactorOpen,
});

export const SET_REDACTOR_MODAL_STATUS = '@@redactor/SET_REDACTOR_MODAL_STATUS';

export const setRedactorModalStatus = (isRedactorModalOpen) => ({
    type: SET_REDACTOR_MODAL_STATUS,
    isRedactorModalOpen,
});


export const SET_ERROR_POSITION_IN_NODE = '@@redactor/SET_ERROR_POSITION_IN_NODE';

export const setErrorPositionInNode = (errorPositionInNode) => ({
    type: SET_ERROR_POSITION_IN_NODE,
    errorPositionInNode,
});