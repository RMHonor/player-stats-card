export default function() {
    let res = {};

    window.location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            const pair = item.split("=");
            res[pair[0]] = pair[1];
        });

    return res;
}
