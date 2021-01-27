import update from 'immutability-helper';
import {
    SET_SELECTED_TEXT,
    SET_SELECTED_TEXT_NODE,
    SET_COMMENT_TEXT,
    SET_REDACTOR_STATUS,
    SET_REDACTOR_MODAL_STATUS,
    SET_ERROR_POSITION_IN_NODE,
} from '../actions/redactorAction';

const initialStore = {
    selectedText: '',
    selectedTextNode: '',
    commentText: '',
    isRedactorOpen: false,
    isRedactorModalOpen: false,
    errorPositionInNode: {start: 0, end: 0},
}

export default function redactorReducer(store = initialStore, action) {
    switch (action.type) {
        case SET_SELECTED_TEXT: {
            return update(store, {
                selectedText: {$set: action.selectedText},
            });
        }
        case SET_SELECTED_TEXT_NODE: {
            return update(store, {
                selectedTextNode: {$set: action.selectedTextNode},
            });
        }
        case SET_COMMENT_TEXT: {
            return update(store, {
                commentText: {$set: action.commentText},
            });
        }
        case SET_REDACTOR_STATUS: {
            return update(store, {
                isRedactorOpen: {$set: action.isRedactorOpen},
            });
        }
        case SET_REDACTOR_MODAL_STATUS: {
            return update(store, {
                isRedactorModalOpen: {$set: action.isRedactorModalOpen},
            });
        }
        case SET_ERROR_POSITION_IN_NODE: {
            return update(store, {
                errorPositionInNode: {$set: {
                    start: action.errorPositionInNode.start,
                    end: action.errorPositionInNode.end,
                }},
            });
        }
        default:
            return store;
    }
}