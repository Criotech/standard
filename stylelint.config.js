"use strict";

module.exports = {
	customSyntax: require("postcss-scss"),
	rules: {
		// Avoid errors - https://stylelint.io/user-guide/rules/list/#avoid-errors
		"annotation-no-unknown": true,
		"color-no-invalid-hex": true,
		"font-family-no-duplicate-names": true,
		"font-family-no-missing-generic-family-keyword": true,
		"named-grid-areas-no-invalid": true,
		"function-calc-no-unspaced-operator": true,
		"function-linear-gradient-no-nonstandard-direction": true,
		"function-no-unknown": true,
		"string-no-newline": true,
		"unit-no-unknown": true,
		"custom-property-no-missing-var-function": true,
		"property-no-unknown": true,
		"keyframe-declaration-no-important": true,
		"keyframe-block-no-duplicate-selectors": true,
		"declaration-block-no-duplicate-custom-properties": true,
		"declaration-block-no-duplicate-properties": [
			true,
			{ disableFix: true },
		],
		"declaration-block-no-shorthand-property-overrides": true,
		"block-no-empty": true,
		"selector-pseudo-class-no-unknown": true,
		"selector-pseudo-element-no-unknown": true,
		"selector-type-no-unknown": true,
		"media-feature-name-no-unknown": true,
		"at-rule-no-unknown": true,
		"comment-no-empty": true,
		"no-duplicate-at-import-rules": true,
		"no-duplicate-selectors": true,
		"no-empty-source": true,
		"no-invalid-double-slash-comments": true,
		"no-invalid-position-at-import-rule": true,

		// Conventions and other rules
		"length-zero-no-unit": true,
		"max-nesting-depth": 4,
		"rule-empty-line-before": [
			"always-multi-line",
			{
				except: ["after-single-line-comment", "first-nested"],
				ignore: ["after-comment"],
			},
		],
	},
};
