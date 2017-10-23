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

export function renderElementTree(tree = [], parentNode = select('body')) {
    tree.forEach((node) => {
        const newNode = createElement(node.tagName, parentNode, node.attributes, node.text);

        if (node.children) {
            renderElementTree(node.children, newNode);
        }
    });
}

export function renderTable(table = { body: [[]] }, parentNode = select('body')) {
    const tree = [
        {
            tagName: 'table',
            children: [],
        },
    ];

    //conditionally create table head
    if (table.head) {
        tree[0].children.push({
            tagName: 'thead',
            children: [
                {
                    tagName: 'tr',
                    children: table.head.map((heading) => ({
                        tagName: 'th',
                        text: 'heading',
                    }))
                }
            ]
        });
    }

    //create body
    tree[0].children.push({
        tagName: 'tbody',
        children: table.body.map((row) => ({
            tagName: 'tr',
            children: row.map((cell) => ({
                tagName: 'td',
                text: cell,
            })),
        })),
    });

    renderElementTree(tree, parentNode);
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

    renderElementTree(error, parentNode);
}
