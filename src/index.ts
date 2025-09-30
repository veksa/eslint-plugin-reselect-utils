import {noDifferentPropsRule} from './rules/noDifferentProps';
import {requireKeySelectorRule} from './rules/requireKeySelector';
import type {TSESLint} from '@typescript-eslint/utils';

const plugin = {
    meta: {
        name: 'reselect-utils',
    },
    rules: {
        'no-different-props': noDifferentPropsRule,
        'require-key-selector': requireKeySelectorRule,
    },
};

const all: TSESLint.FlatConfig.ConfigArray = [
    {
        name: 'reselect-utils',
        plugins: {
            'reselect-utils': plugin,
        },
        rules: {
            'reselect-utils/no-different-props': 'error',
            'reselect-utils/require-key-selector': 'error',
        },
    }
];

export const reselectUtilsPlugin = {
    configs: {all},
};
