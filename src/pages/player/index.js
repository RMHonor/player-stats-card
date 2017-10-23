import { getPlayerById } from '../../lib/api/get';
import { renderElementTree, renderTable, renderError } from '../../lib/dom/render';
import select from '../../lib/dom/select';
import getParams from '../../lib/window/getParams';


(async function() {
    const table = {
        head: [
            'balh',
            'fsadf',
        ],
        body: [
            [
                '1',
                '2',
            ],
            [
                '3',
                '4',
            ],
        ],
    };

    try {
        const data = await getPlayerById(getParams().id || -1);
    renderTable(table, select('.container'));

        console.log(data);
    } catch (err) {
        //TODO handle 404
        renderError('Error', 'Unable to load player, please try again later', select('.container'));
    }

    select('.loader').style.display = 'none';
})();
