import 'whatwg-fetch';

const PLAYER_DATA_URL = 'https://wqipgayic2.execute-api.eu-west-1.amazonaws.com/prod/players';

const defaultOptions = {
    method: 'get',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
};

function getEndpoint(url, options = {}){
    return fetch(url, options);
}

export async function getAllPlayers() {
    const res = await getEndpoint(PLAYER_DATA_URL, defaultOptions);

    return await res.json();
}

export async function getPlayerById(id) {
    const endpoint = `${PLAYER_DATA_URL}?id=${id}`;
    const res = await getEndpoint(endpoint, defaultOptions);

    return await res.json();
}
