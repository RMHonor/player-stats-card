import select from './select';

export function createElement(tagName, parentNode = select('body'), attributes = [], text = '') {
    console.log(attributes);
    const newNode = document.createElement(tagName);
    attributes.forEach((attr) => {
        newNode.setAttribute(attr.key, attr.value);
    });
    newNode.textContent = text;

    parentNode.appendChild(newNode);

    return newNode;
}

export function createElementTree(tree, parentNode = select('body')) {
    tree.forEach((node) => {
        console.log(node);
        const newNode = createElement(node.tagName, parentNode, node.attributes, node.text);

        if (node.children.length) {
            createElementTree(node.children, newNode);
        }
    });
}
