import { BaseAction } from 'mo/glue/baseAction';
import { CATEGORIES, KeyChord, KeyCode, KeyMod } from 'mo/monaco';
import { IMoleculeContext, KeybindingWeight } from 'mo/types';

import { isInputEle, isNativeWidget } from '../utils';

export default class CopyLineUpAction extends BaseAction {
    static readonly ID = 'menuBar.item.copyLineUp';

    constructor(private molecule: IMoleculeContext) {
        super({
            id: CopyLineUpAction.ID,
            label: molecule.locale.localize('menuBar.item.copyLineUp', 'Copy Line Up'),
            title: molecule.locale.localize('menuBar.item.copyLineUp', 'Copy Line Up'),
            category: CATEGORIES.Developer,
            alias: 'Copy Line Up',
            precondition: undefined,
            f1: true,
            keybinding: {
                when: undefined,
                weight: KeybindingWeight.WorkbenchContrib,
                primary: KeyChord(KeyMod.Shift | KeyMod.Alt | KeyCode.UpArrow),
            },
        });
    }
    run() {
        if (!isInputEle() || !isNativeWidget()) {
            // Proxy action to monaco-editor
            this.molecule.editor
                .getCurrentGroup()
                ?.editorInstance?.trigger('copyLineUp', 'editor.action.copyLinesUpAction', null);
        }
    }
}
