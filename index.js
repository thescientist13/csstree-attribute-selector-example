import { parse, walk } from 'css-tree';

let finalCss = '';
const exampleCss = `
  pre[class*="language-"] {
    color: white;
  }
`;

const ast = parse(exampleCss);

walk(ast, {
  enter: function (node, item) {
    const { type, name, value } = node;
    // console.debug(`[ENTER] Walking ${type} with value or name => `, { value, name });

    if (type === 'AttributeSelector') {
      finalCss += '[';

      // TODO how to handle matcher?
      if(node.matcher) {
        // finalCss += node.matcher;
      }
    } else if (type === 'TypeSelector') {
      finalCss += name;
    } if (type === 'Identifier' ) {
      finalCss += name;
    } else if (type === 'Block') {
      finalCss += '{';
    } else if (type === 'Declaration') {
      finalCss += `${node.property}:`;
    } else if(type === 'String') {
      finalCss += `'${value}'`;
    }
  },
  leave: function (node, item) {
    const { type, name, value } = node;
    // console.debug(`[LEAVE] Walking ${type} with value or name => `, { value, name });

    if (type === 'AttributeSelector') {
      finalCss += ']';
    } else if (type === 'Block') {
      finalCss += '}';
    }
  }
});

console.log({ finalCss });