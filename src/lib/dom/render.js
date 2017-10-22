import select from './select';

export function createElement(tagName, parentNode = select('body'), attributes = [], text = '') {
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
        const newNode = createElement(node.tagName, parentNode, node.attributes, node.text);

        if (node.children) {
            createElementTree(node.children, newNode);
        }
    });
}

export function renderError(header, text, parentNode) {
    const error = [
        {
            tagName: 'div',
            attributes: [
                { key: 'class', value: 'error' },
            ],
            children: [
                {
                    tagName: 'h3',
                    text: header,
                    attributes: [
                        { key: 'class', value: 'error__header' },
                    ],
                },
                {
                    tagName: 'p',
                    text,
                    attributes: [
                        { key: 'class', value: 'error__text' },
                    ],
                },
            ]
        },
    ];

    createElementTree(error, parentNode);
}
