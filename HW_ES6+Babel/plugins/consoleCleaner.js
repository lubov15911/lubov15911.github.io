"use strict";

module.exports = function() {
    return {
        visitor: {
            CallExpression(path) {
                let callee = path.get('callee');
                if (!callee.isMemberExpression()) {
                    return;
                }

                if (!callee.get('object').isIdentifier({ name: 'console' }) ||
                    callee.get('property').isIdentifier({ name: 'error' })) {
                    // Don't remove 'console.error' expression
                    return;
                }

                path.remove();
            }
        }
    };
};