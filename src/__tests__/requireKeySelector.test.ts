import {stripIndent} from 'common-tags';
import {createRuleTester} from '../utils/ruleTester';
import {Errors, requireKeySelectorRule} from '../rules/requireKeySelector';

const ruleTester = createRuleTester();

ruleTester.run('require-key-create-cached-selector', requireKeySelectorRule, {
    valid: [
        {
            code: stripIndent`
        import {createCachedSelector} from '@veksa/re-reselect';
        import {createPropSelector} from '@veksa/reselect-utils';

        const getDefaultOptions = () => ({
          keySelector: () => 1,
        });

        createCachedSelector(
          [],
          () => 1,
        )({
          ...getDefaultOptions(),
        });
      `,
        },
        {
            code: stripIndent`
        import {createCachedSelector} from '@veksa/re-reselect';

        const getDefaultOptions = () => ({});

        createCachedSelector(
          [],
          () => 1,
        )({
          ...getDefaultOptions(),
        keySelector: () => 1,
        });
      `,
        },
        {
            code: stripIndent`
        import {createCachedSelector} from '@veksa/re-reselect';

        const getDefaultOptions = () => ({});

        createCachedSelector(
          [],
          () => 1,
        )({
          keySelector: () => 1,
          ...getDefaultOptions(),
        });
      `,
        },
    ],
    invalid: [
        {
            code: stripIndent`
        import {createCachedSelector} from '@veksa/re-reselect';

        const getDefaultOptions = () => ({});

        createCachedSelector(
          [],
          () => 1,
        )({
          ...getDefaultOptions(),
        });
      `,
            output: stripIndent`
        import {defaultKeySelector} from '@veksa/reselect-utils';
        import {createCachedSelector} from '@veksa/re-reselect';

        const getDefaultOptions = () => ({});

        createCachedSelector(
          [],
          () => 1,
        )({
          ...getDefaultOptions(),
        keySelector: defaultKeySelector
        });
      `,
            errors: [
                {
                    messageId: Errors.KeySelectorIsMissing,
                },
            ],
        },
        {
            code: stripIndent`
        import {createCachedSelector} from '@veksa/re-reselect';

        createCachedSelector(
          [],
          () => 1,
        )({});
      `,
            output: stripIndent`
        import {defaultKeySelector} from '@veksa/reselect-utils';
        import {createCachedSelector} from '@veksa/re-reselect';

        createCachedSelector(
          [],
          () => 1,
        )({
        keySelector: defaultKeySelector
        });
      `,
            errors: [
                {
                    messageId: Errors.KeySelectorIsMissing,
                },
            ],
        },
        {
            code: stripIndent`
        import {createCachedSelector} from '@veksa/re-reselect';
        import {createPropSelector} from '@veksa/reselect-utils';

        const getDefaultOptions = () => ({});

        createCachedSelector(
          [],
          () => 1,
        )({
          ...getDefaultOptions(),
        });
      `,
            output: stripIndent`
        import {createCachedSelector} from '@veksa/re-reselect';
        import {createPropSelector, defaultKeySelector} from '@veksa/reselect-utils';

        const getDefaultOptions = () => ({});

        createCachedSelector(
          [],
          () => 1,
        )({
          ...getDefaultOptions(),
        keySelector: defaultKeySelector
        });
      `,
            errors: [
                {
                    messageId: Errors.KeySelectorIsMissing,
                },
            ],
        },
        {
            code: stripIndent`
        import {createCachedSelector} from '@veksa/re-reselect';
        import {defaultKeySelector} from '@veksa/reselect-utils';

        const getDefaultOptions = () => ({});

        createCachedSelector(
          [],
          () => 1,
        )({
          ...getDefaultOptions(),
        });
      `,
            output: stripIndent`
        import {createCachedSelector} from '@veksa/re-reselect';
        import {defaultKeySelector} from '@veksa/reselect-utils';

        const getDefaultOptions = () => ({});

        createCachedSelector(
          [],
          () => 1,
        )({
          ...getDefaultOptions(),
        keySelector: defaultKeySelector
        });
      `,
            errors: [
                {
                    messageId: Errors.KeySelectorIsMissing,
                },
            ],
        },
    ],
});

ruleTester.run('require-key-cached-struct-selector', requireKeySelectorRule, {
    valid: [
        {
            code: stripIndent`
        import {createCachedStructuredSelector} from '@veksa/reselect-utils';

        const getDefaultOptions = () => ({
          keySelector: () => 1,
        });

        createCachedStructuredSelector({})({
          ...getDefaultOptions(),
        });
      `,
        },
        {
            code: stripIndent`
        import {createCachedStructuredSelector} from '@veksa/reselect-utils';

        const getDefaultOptions = () => ({});

        createCachedStructuredSelector({})({
          ...getDefaultOptions(),
        keySelector: () => 1,
        });
      `,
        },
        {
            code: stripIndent`
        import {createCachedStructuredSelector} from '@veksa/reselect-utils';

        const getDefaultOptions = () => ({});

        createCachedStructuredSelector({})({
          keySelector: () => 1,
          ...getDefaultOptions(),
        });
      `,
        },
    ],
    invalid: [
        {
            code: stripIndent`
        import {createCachedStructuredSelector} from '@veksa/reselect-utils';

        const getDefaultOptions = () => ({});

        createCachedStructuredSelector({})({
          ...getDefaultOptions(),
        });
      `,
            output: stripIndent`
        import {createCachedStructuredSelector, defaultKeySelector} from '@veksa/reselect-utils';

        const getDefaultOptions = () => ({});

        createCachedStructuredSelector({})({
          ...getDefaultOptions(),
        keySelector: defaultKeySelector
        });
      `,
            errors: [
                {
                    messageId: Errors.KeySelectorIsMissing,
                },
            ],
        },
        {
            code: stripIndent`
        import {createCachedStructuredSelector} from '@veksa/reselect-utils';

        createCachedStructuredSelector({})({
        });
      `,
            output: stripIndent`
        import {createCachedStructuredSelector, defaultKeySelector} from '@veksa/reselect-utils';

        createCachedStructuredSelector({})({
        keySelector: defaultKeySelector
        });
      `,
            errors: [
                {
                    messageId: Errors.KeySelectorIsMissing,
                },
            ],
        },
    ],
});

ruleTester.run('require-key-cached-seq-selector', requireKeySelectorRule, {
    valid: [
        {
            code: stripIndent`
        import {createCachedSequenceSelector} from '@veksa/reselect-utils';

        const getDefaultOptions = () => ({
          keySelector: () => 1,
        });

        createCachedSequenceSelector([])({
          ...getDefaultOptions(),
        });
      `,
        },
        {
            code: stripIndent`
        import {createCachedSequenceSelector} from '@veksa/reselect-utils';

        const getDefaultOptions = () => ({});

        createCachedSequenceSelector([])({
          ...getDefaultOptions(),
        keySelector: () => 1,
        });
      `,
        },
        {
            code: stripIndent`
        import {createCachedSequenceSelector} from '@veksa/reselect-utils';

        const getDefaultOptions = () => ({});

        createCachedSequenceSelector([])({
          keySelector: () => 1,
          ...getDefaultOptions(),
        });
      `,
        },
    ],
    invalid: [
        {
            code: stripIndent`
        import {createCachedSequenceSelector} from '@veksa/reselect-utils';

        const getDefaultOptions = () => ({});

        createCachedSequenceSelector([])({
          ...getDefaultOptions(),
        });
      `,
            output: stripIndent`
        import {createCachedSequenceSelector, defaultKeySelector} from '@veksa/reselect-utils';

        const getDefaultOptions = () => ({});

        createCachedSequenceSelector([])({
          ...getDefaultOptions(),
        keySelector: defaultKeySelector
        });
      `,
            errors: [
                {
                    messageId: Errors.KeySelectorIsMissing,
                },
            ],
        },
        {
            code: stripIndent`
        import {createCachedSequenceSelector} from '@veksa/reselect-utils';

        createCachedSequenceSelector([])({});
      `,
            output: stripIndent`
        import {createCachedSequenceSelector, defaultKeySelector} from '@veksa/reselect-utils';

        createCachedSequenceSelector([])({
        keySelector: defaultKeySelector
        });
      `,
            errors: [
                {
                    messageId: Errors.KeySelectorIsMissing,
                },
            ],
        },
    ],
});
