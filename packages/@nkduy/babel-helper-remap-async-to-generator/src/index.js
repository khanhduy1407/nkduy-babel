/* @noflow */

import type { NodePath } from "@nkduy/babel-traverse";
import nameFunction from "@nkduy/babel-helper-function-name";
import template from "@nkduy/babel-template";
import * as t from "@nkduy/babel-types";
import rewriteForAwait from "./for-await";

const buildWrapper = template(`
  (() => {
    var REF = FUNCTION;
    return function NAME(PARAMS) {
      return REF.apply(this, arguments);
    };
  })
`);

const namedBuildWrapper = template(`
  (() => {
    var REF = FUNCTION;
    function NAME(PARAMS) {
      return REF.apply(this, arguments);
    }
    return NAME;
  })
`);

const awaitVisitor = {
  Function(path) {
    if (path.isArrowFunctionExpression() && !path.node.async) {
      path.arrowFunctionToShadowed();
      return;
    }
    path.skip();
  },

  AwaitExpression({ node }, { wrapAwait }) {
    node.type = "YieldExpression";
    if (wrapAwait) {
      node.argument = t.callExpression(wrapAwait, [node.argument]);
    }
  },

  ForAwaitStatement(path, { file, wrapAwait }) {
    const { node } = path;

    const build = rewriteForAwait(path, {
      getAsyncIterator: file.addHelper("asyncIterator"),
      wrapAwait
    });

    const { declar, loop } = build;
    const block = loop.body;

    // ensure that it's a block so we can take all its statements
    path.ensureBlock();

    // add the value declaration to the new loop body
    if (declar) {
      block.body.push(declar);
    }

    // push the rest of the original loop body onto our new body
    block.body = block.body.concat(node.body.body);

    t.inherits(loop, node);
    t.inherits(loop.body, node.body);

    if (build.replaceParent) {
      path.parentPath.replaceWithMultiple(build.node);
      path.remove();
    } else {
      path.replaceWithMultiple(build.node);
    }
  }

};

function classOrObjectMethod(path: NodePath, callId: Object) {
  const node = path.node;
  const body = node.body;

  node.async = false;

  const container = t.functionExpression(null, [], t.blockStatement(body.body), true);
  container.shadow = true;
  body.body = [
    t.returnStatement(t.callExpression(
      t.callExpression(callId, [container]),
      []
    ))
  ];

  // Regardless of whether or not the wrapped function is a an async method
  // or generator the outer function should not be
  node.generator = false;
}

function plainFunction(path: NodePath, callId: Object) {
  const node = path.node;
  const isDeclaration = path.isFunctionDeclaration();
  const asyncFnId = node.id;
  let wrapper = buildWrapper;

  if (path.isArrowFunctionExpression()) {
    path.arrowFunctionToShadowed();
  } else if (!isDeclaration && asyncFnId) {
    wrapper = namedBuildWrapper;
  }

  node.async = false;
  node.generator = true;

  node.id = null;

  if (isDeclaration) {
    node.type = "FunctionExpression";
  }

  const built = t.callExpression(callId, [node]);
  const container = wrapper({
    NAME: asyncFnId,
    REF: path.scope.generateUidIdentifier("ref"),
    FUNCTION: built,
    PARAMS: node.params.reduce((acc, param) => {
      acc.done = acc.done || t.isAssignmentPattern(param) || t.isRestElement(param);

      if (!acc.done) {
        acc.params.push(path.scope.generateUidIdentifier("x"));
      }

      return acc;
    }, {
      params: [],
      done: false,
    }).params,
  }).expression;

  if (isDeclaration) {
    const declar = t.variableDeclaration("let", [
      t.variableDeclarator(
        t.identifier(asyncFnId.name),
        t.callExpression(container, [])
      )
    ]);
    declar._blockHoist = true;

    path.replaceWith(declar);
  } else {
    const retFunction = container.body.body[1].argument;
    if (!asyncFnId) {
      nameFunction({
        node: retFunction,
        parent: path.parent,
        scope: path.scope
      });
    }

    if (!retFunction || retFunction.id || node.params.length) {
      // we have an inferred function id or params so we need this wrapper
      path.replaceWith(t.callExpression(container, []));
    } else {
      // we can omit this wrapper as the conditions it protects for do not apply
      path.replaceWith(built);
    }
  }
}

export default function (path: NodePath, file: Object, helpers: Object) {
  if (!helpers) {
    // bc for 6.15 and earlier
    helpers = { wrapAsync: file };
    file = null;
  }
  path.traverse(awaitVisitor, {
    file,
    wrapAwait: helpers.wrapAwait
  });

  if (path.isClassMethod() || path.isObjectMethod()) {
    classOrObjectMethod(path, helpers.wrapAsync);
  } else {
    plainFunction(path, helpers.wrapAsync);
  }
}
