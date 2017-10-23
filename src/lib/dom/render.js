import select from './select';

/**
 *
 * @param tagName DOM element to render
 * @param parentNode node on which to attach this DOM element (default is body)
 * @param attributes key value pair of attributes for element
 * @param text inner text of element
 * @returns Node the rendered node
 */
export function createElement(tagName, parentNode = select('body'), attributes = [], text = '') {
    const newNode = document.createElement(tagName);
    attributes.forEach((attr) => {
        newNode.setAttribute(attr.key, attr.value);
    });
    newNode.textContent = text;

    parentNode.appendChild(newNode);

    return newNode;
}

/**
 *
 * @param tree tree of DOM nodes, each which has a tagName property for the node type,
 * attribute (optional) in key value pairs, text(optional), and children, which recursively
 * takes further nodes
 * @param parentNode node on which to attach this DOM tree (default is body)
 */
export function renderElementTree(tree = [], parentNode = select('body')) {
    tree.forEach((node) => {
        const newNode = createElement(node.tagName, parentNode, node.attributes, node.text);

        if (node.children) {
            renderElementTree(node.children, newNode);
        }
    });
}

export function renderTable(table = { body: [[]] }, parentNode = select('body'), className = '') {
    const tree = [
        {
            tagName: 'table',
            attributes: [
                { key: 'class', value: className },
            ],
            children: [],
        },
    ];

    //conditionally create table head
    if (table.headers) {
        tree[0].children.push({
            tagName: 'thead',
            children: [
                {
                    tagName: 'tr',
                    children: table.headers.map((heading) => ({
                        tagName: 'th',
                        text: heading,
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
