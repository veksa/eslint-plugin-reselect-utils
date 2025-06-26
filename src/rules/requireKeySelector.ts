import {AST_NODE_TYPES, ESLintUtils,} from '@typescript-eslint/experimental-utils';
import {ruleCreator} from '../utils/ruleCreator';
import {getCachedSelectorCreatorOptions} from '../utils/getCachedSelectorCreatorOptions';
import {getKeySelector} from '../utils/getKeySelector';
import {isCachedSelectorCreator} from '../utils/isCachedSelectorCreator';
import {getImportFix} from '../utils/getImportFix';
import {getCommaTokenFix} from '../utils/getCommaTokenFix';
import {getKeySelectorFix} from '../utils/getKeySelectorFix';

export enum Errors {
    KeySelectorIsMissing = 'keySelectorIsMissing',
}

export const requireKeySelectorRule = ruleCreator({
    name: 'require-key-selector',
    defaultOptions: [],
    meta: {
        docs: {
            description: 'Cached selector can`t work without key selector.',
            recommended: 'error',
        },
        fixable: 'code',
        messages: {
            [Errors.KeySelectorIsMissing]:
                'Cached selector can`t work without key selector.',
        },
        schema: [],
        type: 'problem',
    },
    create: (context) => {
        const sourceCode = context.getSourceCode();
        const {esTreeNodeToTSNodeMap, program} = ESLintUtils.getParserServices(
            context,
        );
        const typeChecker = program.getTypeChecker();

        return {
            CallExpression(callExpression) {
                const tsNode = esTreeNodeToTSNodeMap.get(callExpression);

                if (isCachedSelectorCreator(tsNode)) {
                    const cachedOptions = getCachedSelectorCreatorOptions(
                        tsNode,
                        typeChecker,
                    );
                    const keySelector = getKeySelector(cachedOptions);

                    if (keySelector === undefined) {
                        context.report({
                            messageId: Errors.KeySelectorIsMissing,
                            node: callExpression.arguments[0],
                            fix(fixer) {
                                const argument = callExpression.arguments[0];

                                const defaultKeySelector = `defaultKeySelector`;

                                if (argument.type === AST_NODE_TYPES.ObjectExpression) {
                                    const commaTokenFix = getCommaTokenFix(
                                        fixer,
                                        argument,
                                        sourceCode,
                                    );

                                    const keySelectorFix = getKeySelectorFix(
                                        fixer,
                                        argument,
                                        sourceCode,
                                        defaultKeySelector,
                                    );

                                    const importFix = getImportFix(
                                        fixer,
                                        callExpression,
                                        '@veksa/reselect-utils',
                                        ['defaultKeySelector'],
                                    );

                                    return [commaTokenFix, keySelectorFix, importFix];
                                }
                                return null;
                            },
                        });
                    }
                }
            },
        };
    },
});
